---
description: 對指定標的執行完整分析流程（數據+催化劑+風險+進出場）
---

# 完整分析流程

對單一標的依序執行所有分析 workflow，一次完成全部數據收集。

**使用方式**: `/full-analysis [TICKER]`  
**範例**: `/full-analysis VKTX`

---

## 執行順序

```
Step 1: /stock-data [TICKER]     → 基礎數據
Step 2: /catalyst-check [TICKER] → 催化劑時間表
Step 3: /risk-score [TICKER]     → 風險評分
Step 4: /entry-exit [TICKER]     → 進出場建議
Step 5: 更新 Session 檔案        → 彙整所有結果
```

---

## Step 1: 收集即時基礎數據

**重要**: 必須獲取最新的即時數據，不能使用過時資訊。

### 1.1 即時報價數據

// turbo
1. 搜尋「[TICKER] stock price today real time」
2. 搜尋「[TICKER] market cap volume today」
3. 優先使用：Yahoo Finance, Google Finance, MarketWatch, TradingView

### 1.2 財務與機構數據

// turbo
1. 搜尋「[TICKER] latest earnings report Q[X] 2026」
2. 搜尋「[TICKER] institutional ownership changes」
3. 搜尋「[TICKER] analyst ratings upgrades downgrades」

### 1.3 期權市場數據

// turbo
1. 搜尋「[TICKER] options flow unusual activity」
2. 搜尋「[TICKER] implied volatility IV rank」
3. 優先使用：Barchart, Unusual Whales, Market Chameleon

### 1.4 數據驗證

確認所有數據都是當天或最近 1 個交易日的：
- ✅ 股價：必須是當天或最近收盤價
- ✅ 市值：根據最新股價計算
- ✅ 成交量：當天或昨日數據
- ⚠️ 財務數據：最新季報（標註季度）
- ⚠️ 機構持股：最近 13F 申報（標註日期）

**輸出格式**：
```markdown
**股價**: $XX.XX (更新: YYYY-MM-DD HH:MM)
**市值**: $X.XB (更新: YYYY-MM-DD HH:MM)
**日均量**: X.XM 股 (更新: YYYY-MM-DD)
```

---

## Step 2: 催化劑檢查

執行 `/catalyst-check [TICKER]` 的完整流程：

### 2.1 近期催化劑搜尋

// turbo
1. 搜尋「[TICKER] earnings date Q[X] 2026」
2. 搜尋「[TICKER] FDA PDUFA date 2026」（生技股）
3. 搜尋「[TICKER] government contract award 2026」（軍工/能源股）
4. 搜尋「[TICKER] news today catalyst」

### 2.2 催化劑驗證

確認每個催化劑的：
- ✅ 確切日期（如果有）
- ✅ 事件類型（財報/PDUFA/合約/產品發布）
- ✅ 來源連結（可驗證）
- ⚠️ 時效性（是否已過期）

**輸出格式**：
```markdown
- **YYYY-MM-DD**: [事件名稱] 🔥 (來源: [連結])
```

---

## Step 3: 風險評分

執行 `/risk-score [TICKER]` 的完整流程：
- 催化劑明確度評分 (30%)
- 基本面健康度評分 (25%)
- 期權活躍度評分 (20%)
- 機構參與度評分 (15%)
- 流動性評分 (10%)
- 計算總分並分類優先級

---

## Step 4: 進出場分析

執行 `/entry-exit [TICKER]` 的完整流程：

### 4.1 技術面即時數據

// turbo
1. 搜尋「[TICKER] technical analysis RSI MACD today」
2. 搜尋「[TICKER] support resistance levels」
3. 優先使用：TradingView, StockCharts, Finviz

### 4.2 分析師目標價

// turbo
1. 搜尋「[TICKER] analyst price target 2026」
2. 搜尋「[TICKER] analyst ratings consensus」

### 4.3 計算進出場點

基於即時數據計算：
- **當前價**: $XX.XX
- **進場價**: 根據支撐位/催化劑時間
- **停損**: 當前價 -10% 至 -15%
- **目標價**: 分析師平均目標價或技術面壓力位
- **風險報酬比**: (目標價 - 進場價) / (進場價 - 停損)

---

## Step 5: 更新 Session

在當前 Session 檔案中：

1. **新增個股區塊**（如不存在）：

```markdown
### [TICKER]

#### 📈 公司基本資料 (基礎數據)
[Step 1 結果]

#### 🚀 接下來會發生的大事 (催化劑)
[Step 2 結果]

#### 🛡️ 安全檢查 (風險評分)
[Step 3 結果]

#### 🚥 進出場策略 (買賣建議)
[Step 4 結果]
```

2. **更新分析標的表格**：

```markdown
| [TICKER] | [優先級] | ✅ | ✅ | ✅ | ✅ |
```

3. **新增執行紀錄**：

```markdown
| [時間] | /full-analysis | [TICKER] | 完整分析完成 |
```

---

## 輸出格式

完成後輸出彙整摘要：

```markdown
### [TICKER] ([名稱]) —— 💡 股市小白輕鬆看

#### 📈 公司基本資料 (這間公司是在做什麼的？)
- **現在買一股要多少錢 (股價)**: $XX.XX (更新: YYYY-MM-DD HH:MM)
- **這間公司值多少錢 (市值)**: 約 $X.XB (簡單介紹公司地位，例如：晶圓代工龍頭)
- **容易買賣嗎 (成交量)**: [高/低/普通] (解釋流動性，例如：大家都在買，不用怕賣不掉)
- **它是做什麼的**: [一句話白話解釋核心業務]

#### 🚀 接下來會發生的大事 (為什麼股價會動？)
- **[日期] [事件名稱]**: [白話解釋為什麼這件事重要，例如：要開獎了，可能會噴]
- **[日期] [事件名稱]**: [......]

#### 🛡️ 安全檢查 (這支股票現在健康嗎？)
- **體質總得分**: **XX/100** (🟢/🟡/🔴 簡單評價，例如：亮綠燈，非常健康)
- **細項評分 (小白易懂版)**:
    - **這件事成真的機會 (30%)**: XX/30 ([解釋])
    - **公司賺錢穩不穩定 (25%)**: XX/25 ([解釋])
    - **短線客熱情度 (20%)**: XX/20 ([解釋])
    - **大戶大口吃貨度 (15%)**: XX/15 ([解釋])
    - **急用想賣好不好賣 (10%)**: XX/10 ([解釋])

#### 🚥 小白進出場心法 (什麼時候買？)
- **建議買進價**: **$XX.XX - $XX.XX** (解釋為什麼，例如：等它稍微跌一點再買)
- **風險防線 (跌破就跑)**: **$XX.XX** (解釋：如果不幸跌破這，代表看錯了，快跑)
- **目標看哪裡**: 順利的話可望見到 **$XX.XX**
- **小叮嚀**: [給新手的溫馨提醒，例如：波動很大，心臟小的不要買太多]

---
```


---

## 後續動作

- `/summary` - 若已分析多個標的，輸出總結報告（會自動更新所有即時數據）
- `/full-analysis [其他TICKER]` - 繼續分析下一個標的

---

## ⚠️ 重要提醒

1. **必須使用即時數據**：所有股價、市值、成交量都必須是當天或最近交易日的數據
2. **標註數據時間**：每個數據點都要標註更新時間，方便後續驗證
3. **驗證催化劑時效**：確認所有催化劑日期都在未來，已過期的要標註
4. **來源可驗證**：所有關鍵數據都要附上來源連結，便於查證
