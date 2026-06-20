# 数据库设计

## 1. 核心实体

### stocks

```sql
create table stocks (
  id uuid primary key,
  symbol text not null,
  market text not null,
  name text not null,
  industry_id uuid,
  currency text not null,
  created_at timestamptz not null default now()
);
```

### companies

```sql
create table companies (
  id uuid primary key,
  stock_id uuid references stocks(id),
  business_model text,
  revenue_structure jsonb,
  profit_structure jsonb,
  moat_tags text[],
  management_notes text,
  updated_at timestamptz not null default now()
);
```

### daily_prices

```sql
create table daily_prices (
  stock_id uuid references stocks(id),
  trade_date date not null,
  open numeric,
  high numeric,
  low numeric,
  close numeric,
  volume numeric,
  turnover numeric,
  primary key (stock_id, trade_date)
);
```

### financial_statements

```sql
create table financial_statements (
  id uuid primary key,
  stock_id uuid references stocks(id),
  period text not null,
  revenue numeric,
  net_profit numeric,
  gross_margin numeric,
  net_margin numeric,
  roe numeric,
  operating_cash_flow numeric,
  free_cash_flow numeric,
  debt_to_asset numeric,
  inventory_turnover numeric,
  receivables_turnover numeric,
  source_document_id uuid
);
```

### valuation_metrics

```sql
create table valuation_metrics (
  stock_id uuid references stocks(id),
  trade_date date not null,
  pe numeric,
  pb numeric,
  ps numeric,
  ev_ebitda numeric,
  pe_percentile_5y numeric,
  pb_percentile_5y numeric,
  primary key (stock_id, trade_date)
);
```

### news_events

```sql
create table news_events (
  id uuid primary key,
  title text not null,
  body text,
  event_type text,
  event_time timestamptz,
  impact_direction text,
  impact_strength text,
  pricing_status text,
  entities jsonb,
  source_document_id uuid,
  created_at timestamptz not null default now()
);
```

### industry_chains

```sql
create table industry_chains (
  id uuid primary key,
  name text not null,
  description text,
  prosperity_score numeric,
  updated_at timestamptz not null default now()
);
```

### industry_nodes

```sql
create table industry_nodes (
  id uuid primary key,
  chain_id uuid references industry_chains(id),
  level text not null,
  name text not null,
  prosperity text,
  competition text,
  profit_elasticity text,
  valuation_state text,
  representative_companies text[],
  risks text[]
);
```

### research_reports

```sql
create table research_reports (
  id uuid primary key,
  report_type text not null,
  subject_type text not null,
  subject_id text not null,
  title text not null,
  rating text,
  score numeric,
  summary text,
  structured_result jsonb not null,
  created_at timestamptz not null default now()
);
```

### source_documents

```sql
create table source_documents (
  id uuid primary key,
  source_type text not null,
  title text not null,
  url text,
  published_at timestamptz,
  content_hash text,
  metadata jsonb,
  created_at timestamptz not null default now()
);
```

### investment_scores

```sql
create table investment_scores (
  id uuid primary key,
  stock_id uuid references stocks(id),
  report_id uuid references research_reports(id),
  industry_score numeric,
  chain_position_score numeric,
  company_score numeric,
  financial_score numeric,
  growth_score numeric,
  valuation_score numeric,
  technical_score numeric,
  capital_score numeric,
  risk_penalty numeric,
  total_score numeric not null,
  rating text not null,
  created_at timestamptz not null default now()
);
```

## 2. 设计重点

1. 报告和来源文档解耦，方便复盘和引用。
2. 行情数据按日期建联合主键，后续可迁移到 TimescaleDB。
3. 评分结果单独存储，保留每次报告生成时的历史状态。
4. 新闻事件与实体使用 JSONB，便于先快速落地，后续再抽象关系表。
5. 产业链节点保留代表公司和风险，支撑前端地图与新闻影响分析。

