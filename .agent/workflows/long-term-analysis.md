# 中長期投資分析流程

對標的進行深度基本面拆解，評估其是否具備中長期（1-3 年）持有的投資價值。

**使用方式**: `/long-term-analysis [TICKER]`  
**範例**: `/long-term-analysis 2330.TW`

---

## Step 1: 財務健康檢查 (Fundamental Health)

### 1.1 盈利能力與成長性

// turbo
1. 搜尋「[TICKER] ROE net profit margin trend 3 years」
2. 搜尋「[TICKER] EPS CAGR analyst projections 2026-2028」
3. 優先使用：Yahoo Finance, Morningstar, 財報狗 (Taiwan)

### 1.2 債務與現金流

// turbo
1. 搜尋「[TICKER] debt to equity ratio operating cash flow」
2. 確認自由現金流 (FCF) 是否長期為正。

---

## Step 2: 護城河與競爭優勢 (Moat Analysis)

### 2.1 競爭地位搜尋

// turbo
1. 搜尋「[TICKER] market share industry ranking」
2. 搜尋「[TICKER] competitive advantage moat analysis」
3. 確認標的是否具備：規模經濟、技術壁壘、品牌力或高切換成本。

---

## Step 3: 安全邊際與 Valuation (估值分析)

### 3.1 歷史倍數區間

// turbo
1. 搜尋「[TICKER] historical PE ratio PB ratio band 5 years」
2. 確認當前價位處於歷史高位、中值還是低位。

### 3.2 股利與殖利率

// turbo
1. 搜尋「[TICKER] dividend history payout ratio sustainability」
2. 搜尋「[TICKER] analyst price target DCF valuation 2026」

---

## Step 4: 長期風險評估

評估以下因素：
- [ ] 產業週期性 (Cyclicality)
- [ ] 政策與地緣政治風險
- [ ] 技術替換或顛覆性競爭

---

## Step 5: 輸出長期投資評等

**輸出格式**：

```markdown
# [TICKER] 中長期投資分析報告

## 💎 綜合評等: [🌟🌟🌟🌟🌟]
**投資建議**: [價值買入 / 穩定增長 / 暫避]
**持股週期**: 1-3 年

---

### 💹 賺錢能力 (財務指標)
| 指標 | 數據 | 小白解釋 |
|------|------|----------|
| 賺錢效率 (ROE) | XX% | 公司拿股東的錢去賺錢的效率 |
| 毛利率 | XX% | 賣出一件商品扣掉成本賺多少 |
| 欠債比 (負債) | XX% | 公司有沒有欠太多錢 |

### 🛡️ 投資安全評核
- **綜合得分**: **XX/100**
    - **產業地位 (40%)**: XX/40 (是否為龍頭)
    - **財務穩定 (30%)**: XX/30 (現金夠不夠)
    - **分紅大方度 (30%)**: XX/30 (配息穩定性)


### 🏰 護城河 (為什麼對手贏不了它)
- [關鍵優勢 1]
- [關鍵優勢 2]

### 💰 存股價值 (估值分析)
- **歷史便宜/貴區間**: [當前算便宜 / 中間 / 有點貴]
- **合理買進價**: $XX.X - $XX.X (在這個區間買較有安全感)
- **分紅 (殖利率)**: XX% (放著一年大概可以領多少利息)

### ⚠️ 老實說這間公司的風險
- [風險項目 1]
- [風險項目 2]
```
