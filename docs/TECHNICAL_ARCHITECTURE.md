# AI 投资研究工作台技术架构

## 1. 总体架构

```text
前端工作台
  ↓
API 服务层
  ↓
任务编排层
  ↓
数据层 + 指标计算层
  ↓
分析引擎层
  ↓
LLM 报告生成层
```

## 2. 推荐技术栈

| 层级 | MVP 实现 | 商业化增强 |
| --- | --- | --- |
| 前端 | Next.js, React, Tailwind CSS | 组件库、权限系统、埋点 |
| 后端 | Next.js Route Handlers 或 FastAPI | 独立 NestJS/FastAPI 服务 |
| 数据库 | PostgreSQL | PostgreSQL + TimescaleDB |
| 向量检索 | pgvector | Milvus / Elasticsearch Hybrid |
| 缓存 | 本地缓存 | Redis |
| 异步任务 | Node/Python 脚本 | Celery / Temporal |
| 指标计算 | TypeScript/Python | 独立 Quant Service |
| AI 层 | 可插拔 LLM Provider | 多模型路由 + 评测 |
| 部署 | 本地 / Vercel / Render | 云数据库 + 队列 + 监控 |

## 3. 模块边界

### 3.1 数据层

负责获取和标准化事实数据：

- 股票基础信息
- 行情 K 线
- 财务三表
- 估值指标
- 新闻事件
- 公司公告
- 行业链条
- 宏观指标

### 3.2 指标计算层

必须由程序计算，不能由 LLM 自由生成：

- PE/PB/PS/EV/EBITDA
- 历史估值分位
- 营收增速、净利润增速、毛利率、ROE、现金流质量
- MA、EMA、MACD、RSI、ATR、布林带
- 涨跌幅、换手率、量价关系
- 评分因子和综合评分

### 3.3 分析引擎层

根据输入类型选择模板：

- `stock_research`
- `news_event_chain`
- `industry_chain`
- `peer_compare`
- `earnings_review`
- `technical_position`

输出结构化 JSON，供报告层渲染。

### 3.4 LLM 报告层

LLM 只处理：

- 意图识别
- 新闻事件分类
- 观点归纳
- 风险和反证语言生成
- 报告正文组织
- 用户追问建议

LLM 不能直接编写财务数字、行情数字、估值数据、公告事实。

## 4. 数据源策略

### 4.1 免费 MVP

- 用户粘贴新闻作为事件输入
- Mock 财务和行情数据用于原型演示
- AkShare / yfinance / TuShare 免费能力作为后续适配
- 公开公告和财报作为手动导入来源

### 4.2 付费增强

- 实时行情
- 资金流
- 机构一致预期
- 财经快讯
- 授权研报摘要
- 行业高频数据

## 5. API 设计草案

| Endpoint | 说明 |
| --- | --- |
| `POST /api/analyze/stock` | 单股分析 |
| `POST /api/analyze/news` | 新闻事件分析 |
| `POST /api/analyze/industry` | 行业链条分析 |
| `POST /api/compare/stocks` | 多股横向对比 |
| `GET /api/reports/:id` | 获取报告 |
| `POST /api/watchlist` | 添加关注 |
| `POST /api/alerts` | 创建跟踪提醒 |

## 6. 工程原则

1. 事实数据结构化存储。
2. 指标由确定性代码计算。
3. LLM 输出必须绑定引用和假设。
4. 报告先生成 JSON，再渲染为自然语言。
5. 合规表达内置在模板层。
6. 每次分析保留版本，方便复盘。

