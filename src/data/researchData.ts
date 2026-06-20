import type { IndustryChain, NewsEvent, StockResearchProfile } from "@/types/research";

export const stockProfiles: StockResearchProfile[] = [
  {
    symbol: "NVDA",
    name: "英伟达",
    market: "US",
    industry: "AI 基础设施",
    price: 141.36,
    changePercent: 2.4,
    marketCap: "3.4T USD",
    businessModel: "GPU、网络芯片、AI 加速平台和软件生态共同驱动的高壁垒平台型业务。",
    coreLogic: [
      "数据中心 AI 训练与推理需求仍处于高景气周期。",
      "GPU、网络和软件生态形成较强平台锁定。",
      "主要矛盾从收入高增长转向利润率和订单持续性验证。"
    ],
    financial: {
      revenueGrowth: 78,
      netProfitGrowth: 92,
      grossMargin: 74,
      roe: 88,
      freeCashFlowQuality: "高",
      debtToAsset: 31
    },
    valuation: {
      pe: 42,
      pb: 36,
      pePercentile5y: 76,
      peerMedianPe: 34,
      status: "偏高"
    },
    technical: {
      trend: "多头",
      momentum: "增强",
      support: 128,
      resistance: 148,
      atrRisk: "中"
    },
    capital: {
      volumeSignal: "放量",
      sectorLinkage: "强",
      pricingStatus: "初步定价"
    },
    catalysts: ["下一季数据中心收入指引", "新一代 GPU 出货节奏", "云厂商资本开支更新"],
    risks: ["估值分位偏高", "云厂商自研芯片替代", "供应链瓶颈或毛利率回落"],
    invalidation: ["数据中心收入增速连续两个季度明显放缓", "毛利率跌破历史高位区间", "主要云客户削减资本开支"],
    tracking: ["季度数据中心收入", "毛利率变化", "主要客户 CapEx", "新产品交付周期"],
    scoreFactors: {
      industry: 92,
      chainPosition: 94,
      company: 95,
      financial: 90,
      growth: 86,
      valuation: 62,
      technical: 82,
      capital: 80,
      riskPenalty: 45
    }
  },
  {
    symbol: "300308",
    name: "中际旭创",
    market: "CN",
    industry: "光模块",
    price: 178.2,
    changePercent: 1.8,
    marketCap: "1990B CNY",
    businessModel: "高速光模块制造商，受益于 AI 数据中心网络升级和海外云厂商需求。",
    coreLogic: [
      "AI 集群拉动 800G/1.6T 光模块需求。",
      "公司处于高景气且利润弹性较强的中游环节。",
      "市场已定价部分高增长，后续需要订单和毛利率继续兑现。"
    ],
    financial: {
      revenueGrowth: 46,
      netProfitGrowth: 58,
      grossMargin: 33,
      roe: 24,
      freeCashFlowQuality: "中",
      debtToAsset: 38
    },
    valuation: {
      pe: 39,
      pb: 9,
      pePercentile5y: 82,
      peerMedianPe: 35,
      status: "高估"
    },
    technical: {
      trend: "多头",
      momentum: "衰减",
      support: 162,
      resistance: 188,
      atrRisk: "高"
    },
    capital: {
      volumeSignal: "平量",
      sectorLinkage: "强",
      pricingStatus: "充分定价"
    },
    catalysts: ["海外大客户订单", "1.6T 产品放量", "财报验证毛利率"],
    risks: ["高估值回撤风险", "客户集中度高", "行业竞争加剧导致价格下行"],
    invalidation: ["订单增速低于市场预期", "毛利率连续两个季度下滑", "板块放量跌破关键支撑"],
    tracking: ["海外客户订单", "800G/1.6T 出货占比", "同行价格变化", "技术面支撑位"],
    scoreFactors: {
      industry: 88,
      chainPosition: 86,
      company: 82,
      financial: 78,
      growth: 82,
      valuation: 52,
      technical: 70,
      capital: 75,
      riskPenalty: 58
    }
  },
  {
    symbol: "600519",
    name: "贵州茅台",
    market: "CN",
    industry: "白酒",
    price: 1526,
    changePercent: -0.6,
    marketCap: "1.9T CNY",
    businessModel: "高端白酒品牌和渠道体系驱动的高现金流消费品公司。",
    coreLogic: [
      "品牌壁垒和现金流质量仍强。",
      "行业增长从高速转向存量竞争。",
      "估值修复需要批价、库存和消费信心共同改善。"
    ],
    financial: {
      revenueGrowth: 16,
      netProfitGrowth: 18,
      grossMargin: 91,
      roe: 34,
      freeCashFlowQuality: "高",
      debtToAsset: 18
    },
    valuation: {
      pe: 25,
      pb: 9,
      pePercentile5y: 34,
      peerMedianPe: 22,
      status: "合理"
    },
    technical: {
      trend: "震荡",
      momentum: "衰减",
      support: 1460,
      resistance: 1620,
      atrRisk: "低"
    },
    capital: {
      volumeSignal: "缩量",
      sectorLinkage: "弱",
      pricingStatus: "初步定价"
    },
    catalysts: ["批价企稳", "分红政策", "消费数据改善"],
    risks: ["渠道库存压力", "消费需求偏弱", "估值修复缺少催化"],
    invalidation: ["批价持续下行", "收入增速跌破双位数", "渠道库存继续累积"],
    tracking: ["批价", "渠道库存", "季度收入增速", "分红率"],
    scoreFactors: {
      industry: 58,
      chainPosition: 78,
      company: 92,
      financial: 90,
      growth: 55,
      valuation: 72,
      technical: 56,
      capital: 48,
      riskPenalty: 32
    }
  }
];

export const aiInfrastructureChain: IndustryChain = {
  name: "AI 基础设施",
  prosperityScore: 84,
  conclusion: "AI 基础设施仍处于景气上行阶段，利润更多集中在算力芯片、高速互联、数据中心电力和高端设备环节。",
  nodes: [
    {
      level: "基础设施",
      name: "电力与数据中心",
      prosperity: "高",
      competition: "集中",
      profitElasticity: "中",
      valuationState: "合理",
      representativeCompanies: ["Vertiv", "施耐德电气", "伊顿"],
      risks: ["建设周期长", "电力审批和并网约束"]
    },
    {
      level: "上游",
      name: "GPU 与 AI 芯片",
      prosperity: "高",
      competition: "寡头",
      profitElasticity: "高",
      valuationState: "偏高",
      representativeCompanies: ["英伟达", "AMD", "博通"],
      risks: ["估值拥挤", "客户自研芯片替代"]
    },
    {
      level: "中游",
      name: "光模块与高速互联",
      prosperity: "高",
      competition: "集中",
      profitElasticity: "高",
      valuationState: "高估",
      representativeCompanies: ["中际旭创", "新易盛", "Coherent"],
      risks: ["价格竞争", "客户集中度高"]
    },
    {
      level: "下游",
      name: "云厂商与模型平台",
      prosperity: "中",
      competition: "寡头",
      profitElasticity: "中",
      valuationState: "合理",
      representativeCompanies: ["Microsoft", "Amazon", "Google"],
      risks: ["资本开支回报周期", "推理变现不确定"]
    },
    {
      level: "应用",
      name: "企业 AI 应用",
      prosperity: "中",
      competition: "新进入者多",
      profitElasticity: "低",
      valuationState: "偏高",
      representativeCompanies: ["ServiceNow", "Adobe", "Salesforce"],
      risks: ["商业化节奏慢", "同质化竞争"]
    }
  ]
};

export const newsEvents: NewsEvent[] = [
  {
    id: "ai-capex",
    title: "大型云厂商上调 AI 数据中心资本开支计划",
    body: "多家云厂商表示将继续增加 AI 数据中心投资，重点投入 GPU 集群、高速网络、电力系统和液冷基础设施。",
    eventType: "资本开支上修",
    impactDirection: "利好",
    impactStrength: "结构性",
    pricingStatus: "初步定价",
    entities: ["AI 数据中心", "GPU", "光模块", "电力设备"],
    directBeneficiaries: ["英伟达", "中际旭创", "新易盛", "Vertiv"],
    indirectBeneficiaries: ["服务器 ODM", "电力设备", "液冷系统"],
    fakeBeneficiaries: ["仅有 AI 概念但无订单披露的应用小票"],
    path: ["云厂商 CapEx", "AI 数据中心建设", "GPU 与高速网络需求", "光模块和电力设备订单", "收入与利润兑现"],
    risks: ["板块估值已有反应", "订单兑现节奏可能低于预期", "供应链交付造成季度波动"],
    invalidation: ["云厂商 CapEx 指引下修", "核心供应商库存上升", "光模块价格连续下行"]
  }
];
