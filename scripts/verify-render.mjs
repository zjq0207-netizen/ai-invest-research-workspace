import { existsSync, mkdirSync, rmSync, statSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawn, spawnSync } from "node:child_process";

const PORT = Number(process.env.VERIFY_PORT ?? 3210);
const BASE_URL = `http://127.0.0.1:${PORT}`;
const ROOT = process.cwd();
const ARTIFACT_DIR = resolve(ROOT, ".next", "verify-artifacts");

const routes = [
  { path: "/", name: "Dashboard", requiredText: ["🐽🐽跑步向💰进", "组合全景", "资产类别分布"] },
  { path: "/holdings", name: "Holdings", requiredText: ["持仓明细 Holdings", "按品类筛选与排序"] },
  { path: "/holdings?category=GOLD", name: "Gold holdings", requiredText: ["持仓明细 Holdings", "积存金", "积存金逐笔买入记录"] },
  { path: "/analytics", name: "Analytics", requiredText: ["资产分析 Analytics", "分布、贡献与风险"] },
  { path: "/advice", name: "Advice", requiredText: ["投资建议 Advice", "规则驱动建议"] }
];

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: ROOT,
    env: process.env,
    shell: false,
    stdio: "inherit",
    ...options
  });

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status ?? "unknown"}.`);
  }
}

function startServer() {
  const child = spawn("npm", ["run", "start", "--", "-p", String(PORT)], {
    cwd: ROOT,
    env: { ...process.env, PORT: String(PORT) },
    stdio: ["ignore", "pipe", "pipe"]
  });

  child.stdout.on("data", (chunk) => process.stdout.write(`[next-start] ${chunk}`));
  child.stderr.on("data", (chunk) => process.stderr.write(`[next-start] ${chunk}`));

  return child;
}

async function waitForServer(child) {
  const startedAt = Date.now();
  let lastError = "";

  while (Date.now() - startedAt < 60000) {
    if (child.exitCode !== null) {
      throw new Error(`next start exited before serving pages. Exit code: ${child.exitCode}`);
    }

    try {
      const response = await fetch(BASE_URL, { signal: AbortSignal.timeout(2500) });
      if (response.ok) return;
      lastError = `${response.status} ${response.statusText}`;
    } catch (error) {
      lastError = error.message;
    }

    await new Promise((resolveWait) => setTimeout(resolveWait, 1000));
  }

  throw new Error(`Timed out waiting for ${BASE_URL}. Last error: ${lastError}`);
}

function cssLinksFrom(html) {
  const links = new Set();
  const linkPattern = /<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match;

  while ((match = linkPattern.exec(html))) {
    links.add(match[1].replaceAll("&amp;", "&"));
  }

  return [...links];
}

function toAbsoluteUrl(href) {
  return new URL(href, BASE_URL).toString();
}

async function fetchText(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
  const text = await response.text();
  return { response, text };
}

async function verifyRoute(route) {
  const url = `${BASE_URL}${route.path}`;
  const { response, text } = await fetchText(url);

  if (!response.ok) {
    throw new Error(`${route.name} returned ${response.status} ${response.statusText}.`);
  }

  const errorMarkers = ["Cannot find module", "Internal Server Error", "data-next-hide-fouc"];
  for (const marker of errorMarkers) {
    if (text.includes(marker)) {
      throw new Error(`${route.name} contains error marker: ${marker}`);
    }
  }

  for (const required of route.requiredText) {
    if (!text.includes(required)) {
      throw new Error(`${route.name} is missing required text: ${required}`);
    }
  }

  const cssLinks = cssLinksFrom(text);
  if (cssLinks.length === 0) {
    throw new Error(`${route.name} has no stylesheet links.`);
  }

  for (const href of cssLinks) {
    const cssUrl = toAbsoluteUrl(href);
    const { response: cssResponse, text: cssText } = await fetchText(cssUrl);

    if (!cssResponse.ok) {
      throw new Error(`${route.name} stylesheet ${href} returned ${cssResponse.status}.`);
    }

    if (cssText.includes("Cannot find module") || cssText.includes("<!DOCTYPE html>")) {
      throw new Error(`${route.name} stylesheet ${href} returned an error document.`);
    }

    if (!cssText.includes(".bg-slate-50") && !cssText.includes("box-sizing:border-box")) {
      throw new Error(`${route.name} stylesheet ${href} does not look like compiled Tailwind CSS.`);
    }
  }

  console.log(`OK route: ${route.name}`);
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "google-chrome",
    "chromium",
    "chromium-browser"
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (candidate.includes("/") && existsSync(candidate)) return candidate;
    if (!candidate.includes("/")) {
      const lookup = spawnSync("command", ["-v", candidate], { shell: true, encoding: "utf8" });
      if (lookup.status === 0 && lookup.stdout.trim()) return lookup.stdout.trim();
    }
  }

  return null;
}

async function runChromeScreenshot({ chromePath, label, viewport, path }) {
  const userDataDir = await mkdtemp(join(tmpdir(), `richnbeauty-${label}-`));
  const screenshotPath = join(ARTIFACT_DIR, `${label}.png`);

  const args = [
    "--headless=new",
    "--disable-gpu",
    "--disable-background-networking",
    "--disable-dev-shm-usage",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    "--run-all-compositor-stages-before-draw",
    "--virtual-time-budget=5000",
    `--user-data-dir=${userDataDir}`,
    `--window-size=${viewport}`,
    `--screenshot=${screenshotPath}`,
    `${BASE_URL}${path}`
  ];

  const result = spawnSync(chromePath, args, {
    cwd: ROOT,
    encoding: "utf8",
    killSignal: "SIGTERM",
    timeout: 30000
  });
  await rm(userDataDir, { force: true, recursive: true });

  const hasScreenshot = existsSync(screenshotPath) && statSync(screenshotPath).size >= 10000;

  if (result.status !== 0 && !hasScreenshot) {
    throw new Error(`Chrome screenshot failed for ${label}: ${result.stderr || result.stdout}`);
  }

  if (!hasScreenshot) {
    throw new Error(`Chrome screenshot for ${label} was not created or is too small.`);
  }

  if (result.signal) {
    console.warn(`Chrome screenshot for ${label} needed timeout cleanup after writing the image.`);
  }

  console.log(`OK screenshot: ${screenshotPath}`);
}

async function verifyScreenshots() {
  const chromePath = findChrome();
  if (!chromePath) {
    throw new Error("Chrome/Chromium was not found. Set CHROME_PATH to enable visual smoke tests.");
  }

  rmSync(ARTIFACT_DIR, { force: true, recursive: true });
  mkdirSync(ARTIFACT_DIR, { recursive: true });

  await runChromeScreenshot({ chromePath, label: "desktop-dashboard", viewport: "1440,1100", path: "/" });
  await runChromeScreenshot({ chromePath, label: "mobile-holdings-gold", viewport: "390,900", path: "/holdings?category=GOLD" });
}

async function main() {
  let server;

  try {
    console.log("Building clean production bundle...");
    run("npm", ["run", "build"]);

    console.log("Starting production server for render verification...");
    server = startServer();
    await waitForServer(server);

    console.log("Checking routes and CSS resources...");
    for (const route of routes) {
      await verifyRoute(route);
    }

    console.log("Running Chrome visual smoke tests...");
    await verifyScreenshots();

    console.log("Render verification passed.");
  } finally {
    if (server && server.exitCode === null) {
      server.kill("SIGTERM");
    }
  }
}

main().catch((error) => {
  console.error(`Render verification failed: ${error.message}`);
  process.exit(1);
});
