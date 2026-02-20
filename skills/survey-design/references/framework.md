# Framework: Survey Design

This file provides detailed methodology for creating effective research surveys.

## 1. Question Types

### Likert Scales

**Agreement:**
```
Strongly disagree → Disagree → Neutral → Agree → Strongly agree
     1            2          3         4           5
```

**Frequency:**
```
Never → Rarely → Sometimes → Often → Always
   1        2         3         4        5
```

**Importance:**
```
Not at all important → Somewhat important → Very important
       1                      2                   3
```

### NPS (Net Promoter Score)

```
How likely are you to recommend [product] to a friend or colleague?
0 - Not at all likely
1
2
3
4
5
6
7
8
9
10 - Extremely likely

Calculation:
% Promoters (9-10) - % Detractors (0-6) = NPS (-100 to +100)
```

### Rating Scales

**Star rating:**
```
★★★★★ - Excellent
★★★★☆ - Good
★★★☆☆ - Average
★★☆☆☆ - Poor
★☆☆☆☆ - Very Poor
```

**Numeric:**
```
1-5 or 1-10 scales
```

### Multiple Choice

**Single select:**
```
Which feature do you use most?
○ Feature A
○ Feature B
○ Feature C
○ None
```

**Multi-select:**
```
Which features do you use? (Select all that apply)
☑ Feature A
☑ Feature B
☑ Feature C
☑ None
```

---

## 2. Bias Prevention Checklist

### Leading Questions (Avoid)

| Biased | Neutral |
|--------|----------|
| How much do you love X? | How do you feel about X? |
| How amazing is X? | How would you rate X? |
| Don't you agree X is best? | Which do you prefer? |

### Assumptions (Avoid)

| Assumption | Fix |
|------------|-----|
| You use our product | Do you use [product]? |
| You found value | Did you find value in X? |
| You're satisfied | How satisfied are you? |

### Double-Barreled (Avoid)

| Double | Split Into |
|--------|-----------|
| Is X easy and useful? | Is X easy? Is X useful? |

### Balanced Scales

| Unbalanced | Balanced |
|------------|----------|
| Excellent / Good / Fair / Poor | Excellent / Good / Fair / Poor / Terrible |

---

## 3. Survey Flow Templates

### Short Survey (5 questions)

1. Screening question
2. Core metric (NPS/satisfaction)
3. 1-2 topic questions
4. 1 demographic
5. Open-ended (optional)

### Medium Survey (10 questions)

1. Warm-up (1-2)
2. Core metrics (2-3)
3. Topic deep-dive (3-4)
4. Segmentation (2)
5. Open-ended (1-2)

### Long Survey (15 questions)

1. Screening (1-2)
2. Warm-up (2)
3. Main topics (6-8)
4. Segmentation (2-3)
5. Deep-dive (2)
6. Wrap-up (2)

---

## 4. Sample Size Calculation

### Formula

```
n = (Z² × p × (1-p)) / e²

Where:
- Z = Z-score (1.96 for 95% confidence)
- p = response distribution (0.5 for most conservative)
- e = margin of error (0.05 for 5%)
```

### Quick Reference Table

| Population | 5% margin | 3% margin |
|------------|-----------|-----------|
| 100 | 80 | 91 |
| 1,000 | 278 | 526 |
| 10,000 | 370 | 964 |
| 100,000 | 383 | 1,056 |
| 1,000,000 | 384 | 1,068 |

### Adjustments

| Factor | Multiplier |
|--------|-----------|
| Subgroups needed | ×1.5-2 |
| Low response rate | ×2-3 |
| Exclusions | ×1.2 |

---

## 5. Response Rate Benchmarks

| Survey Type | Good Rate | Great Rate |
|-------------|-----------|------------|
| Customer | 20-30% | 40%+ |
| B2B | 10-15% | 25%+ |
| General | 5-10% | 15%+ |
| In-product | 15-25% | 35%+ |

### Improve Response Rates

- Personalize invitation
- Keep short
- Mobile-optimized
- Send at right time
- Send reminders
- Offer incentive

---

## 6. Analysis Approaches

### Quantitative Analysis

| Metric | Calculation | Interpretation |
|--------|-------------|----------------|
| Mean | Average of scale | Higher = more positive |
| NPS | %Promoters - %Detractors | >50 = excellent |
| Top-box | % selecting top option | Higher = more positive |
| Cross-tab | Segment comparison | Identify differences |

### Qualitative Analysis

- Code open-ended responses
- Identify themes
- Quote notable responses
- Group by sentiment

---

## 7. Platform Comparison

| Platform | Best For | Pricing |
|----------|----------|---------|
| Typeform | Beautiful UX, mobile | Free → $25/mo |
| SurveyMonkey | Analytics, templates | Free → $25/mo |
| Google Forms | Simple, free | Free |
| Qualtrics | Enterprise, research | $$$$ |
| Hotjar | In-product surveys | Free → $30/mo |
| Tally | Simple, beautiful | Free |

---

## 8. Integration with Other Skills

### Inputs (Consults)

- **interview-guide-creation:** Topics from interviews inform survey
- **research-objectives:** Research goals

### Outputs (Feeds)

- **data-analysis:** Survey results analysis
- **ab-test-design:** Survey insights inform experiments
