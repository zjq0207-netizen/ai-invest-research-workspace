# AI 投资研究工作台

面向个人投资者和半专业投资者的 AI 投研工作台。当前版本是本地可运行、可上线部署的 MVP，内置单股分析、新闻拆解、产业链地图、报告中心、评分模型、风险反证和结构化报告生成流程。

当前 MVP 使用本地模拟数据和规则模型，后续可以替换为真实行情、财务、公告、新闻和 LLM API。

## 本地启动

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。

临时需要更快热更新时可以使用：

```bash
npm run dev:fast
```

## 页面

- `/`：投研首页 Dashboard
- `/stocks`：个股分析
- `/news`：新闻拆解
- `/industry`：产业链地图
- `/reports`：报告中心
- `/reports/stock-NVDA`：报告详情示例
- `/analytics`：组合分析，保留原资产分析能力
- `/holdings`：持仓明细，保留原资产明细能力

## 核心文档

- 产品 PRD：`docs/PRD.md`
- 技术架构：`docs/TECHNICAL_ARCHITECTURE.md`
- 数据库设计：`docs/DATABASE_DESIGN.md`

## 核心代码

- 分析引擎：`src/utils/researchEngine.ts`
- 模拟投研数据：`src/data/researchData.ts`
- 投研类型定义：`src/types/research.ts`
- 投研组件：`src/components/research/`

## 构建检查

```bash
npm run build
```

当前已验证 `npm run build` 可以通过。

## 部署到线上

项目已经包含两套部署配置：

- `render.yaml`：用于 Render + GitHub Blueprint 部署。
- `vercel.json`：用于 Vercel + GitHub 部署。

### 方案一：Render

1. 确保最新代码已经推送到 GitHub。
2. 打开 Render Dashboard。
3. 选择 New -> Blueprint。
4. 连接 GitHub 仓库：`zjq0207-netizen/ai-invest-research-workspace`。
5. Render 会读取 `render.yaml`：
   - Service Name: `ai-invest-research-workspace`
   - Runtime: `node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`
   - Plan: `free`
6. 部署完成后会得到类似：

```text
https://ai-invest-research-workspace.onrender.com
```

Render Blueprint deeplink：

```text
https://dashboard.render.com/blueprint/new?repo=https://github.com/zjq0207-netizen/ai-invest-research-workspace
```

### 方案二：Vercel

1. 打开 Vercel Dashboard。
2. 新建项目并导入 GitHub 仓库：`zjq0207-netizen/ai-invest-research-workspace`。
3. Framework Preset 选择 Next.js。
4. Build Command 使用 `npm run build`。
5. Output Directory 保持默认。
6. 部署完成后会得到类似：

```text
https://ai-invest-research-workspace.vercel.app
```

## 环境变量

MVP 不依赖必填环境变量，可以直接部署。

后续如果接入真实服务，可增加：

```bash
OPENAI_API_KEY=
MARKET_DATA_API_KEY=
NEWS_API_KEY=
DATABASE_URL=
```

涉及密钥的变量不要提交到仓库，应在 Render/Vercel Dashboard 中配置。

## Figma 原型

Figma 原型文件：

```text
https://www.figma.com/design/Bazqgwx19UzoNkdgUlYOIB
```
