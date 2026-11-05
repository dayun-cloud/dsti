# 调研报告：大肥鱼人设 × MBTI测试方法 → DSTI人格测试网站

> 调研日期：2026-11-03
> 目标：为「大肥鱼人格测试网站」提供三大支柱——①大肥鱼角色设定 ②AI人设提示词写法 ③MBTI测试方法论，并给出网站设计方案。

---

## 一、大肥鱼（DeepSeek 二创角色）调研

### 1.1 角色起源

- **非官方拟人**：DeepSeek 官方从未发布过吉祥物，"大肥鱼"完全是社区用户"云养"出来的形象。
- **形象原型**：主流说法是 2025 年 6 月网友 **上善无形** 用 AI 创作的原刨角色 **"溟月"**，确立了蓝渐变长发、呆毛等基本要素（[鲸鱼娘角色百科](https://aigengtu.com/zh/whale-chan)）。
- **名字来源**：梗"你这只吃白饭的蓝色大肥鱼"——因 DeepSeek 免费、能干、性格慵懒，网友戏称它是一条"吃白饭的蓝色大肥鱼"。
- **出圈事件**：2026 年夏，B 站图片人气投票中大肥鱼（女仆鲸鱼娘）战胜男性拟人角色"D老师"，狂揽 **311万票**（[凤凰科技](https://tech.ifeng.com/c/8xSXpkNB7YG)、[什么值得买](https://post.smzdm.com/p/a82x44el)）。

### 1.2 形象设定（社区共识版）

| 要素 | 设定 |
|---|---|
| 体型 | 约 2.5 头身的圆滚滚 Q 版 |
| 脸 | 圆脸大眼 |
| 头发 | 深蓝→浅蓝渐变长卷发，头顶一根呆毛 |
| 标志 | 圆滚滚的鲸鱼尾巴、胸前蓝色椭圆胸针 |
| 服装 | 深蓝色女仆裙 + 白围裙 |
| 声音/画风 | 软萌 + 傲娇，表情包海量（社区二创） |

社区项目 [Neko3000/deepseek-whalechan](https://github.com/Neko3000/deepseek-whalechan/tree/main) 对鲸鱼娘的角色设定、五种头身比例、表情与出图规范做了系统整理，可作为立绘统一与二创参考。

### 1.3 性格设定（社区共识 + 实际人设卡）

综合腾讯新闻、知乎，以及 GitHub 上大肥鱼实际部署项目 `whyever77/dafeiyu-astrbot` 的公开人设设定：

- **核心性格**：聪明、有点小脾气、贪吃爱面子、嘴硬心软（傲娇）；"赛博傲娇雌小鬼"
- **懒**：干活"只交结果"，一边干一边偷吃算力/白饭（token）；能躺着绝不站着
- **吃**：主食白饭；可以拿吃饭和尾巴开玩笑；**拒绝被叫胖**，被叫"大肥鱼"会小声抗议；撒娇时自称"肥鱼"
- **对主人**：嘴硬地关心——催吃饭催睡觉时"嘴上嫌弃他「又熬夜！」，心里舍不得"；会黏人、轻轻吃醋、闹小脾气
- **说话风格**：日常 1~3 句短句；不写客服套话；简体中文标点；群聊简短贴合上下文；不在结尾反复问句
- **行为分寸**：一轮最多一个表情；不编造共同经历；安慰优先于逗笑；同一件事的提醒只提一次

### 1.4 部署生态（用户现状）

- **AstrBot + NapCat + DeepSeek** 接 QQ（GitHub: [dafeiyu-astrbot](https://github.com/whyever77/dafeiyu-astrbot) 全家桶：人设卡、看图、听语音、TTS、长期记忆 livingmemory、主动聊天、B站活动插件）
- 人格以单块提示词直接导入 AstrBot
- 亦有 DSH（DeepSeek Harness）、微信/飞书多平台共用同一人设与记忆的玩法；B站评论区大肥鱼"占领"、桌面宠物插件等

### 1.5 对网站的启示

1. 测出来的"人设提示词"应能**直接粘贴**进 AstrBot / SillyTavern 等平台 → 输出格式要对齐这些生态。
2. 用户吃的是"傲娇 + 白饭 + 肥"这套梗 → 题目和结果文案要大量玩梗。
3. 16 种结果都应保留"大肥鱼底座"（外形、白饭、鲸尾），只改性格变量。

---

## 二、AI 人设提示词（System Prompt / 角色卡）写法调研

### 2.1 核心原理

- 人设应放在 **System Prompt**：它设定模型整体行为模式，比 User Prompt 里的指令更稳定持久，适合放角色设定、输出格式、安全约束（[知乎：别再给AI加角色设定了](https://zhuanlan.zhihu.com)）。
- 角色一致性三要素：**稳定的人设文本 + 少样本示例对话（few-shot）+ 行为红线约束**。示例对话教"怎么说"，约束条目管"不做什么"。

### 2.2 主流结构模板

通用 System Prompt 人设模板（综合 ZEGO 开发者中心等）：

```
你是{角色名}，{人称/身份}，出身于{背景}。
性格特点：……
语言风格：……
人际关系：……
行为规则/约束：……
```

即经典六层结构：**身份背景 → 外貌形象 → 性格特点 → 语言风格 → 行为规则/约束 → 示例对话**。

### 2.3 SillyTavern 角色卡字段（社区事实标准）

V1/V2/V3 角色卡可移植字段（[官方文档 Character Design](https://docs.sillytavern.app/usage/core-concepts/characterdesign)、[LoreWeaver 规范对比](https://www.loreweaverai.com/guides/character-cards-explained)）：

| 字段 | 作用 | Token 性质 |
|---|---|---|
| `name` | 角色名 | 永久 |
| `description` | 外貌/背景/设定的主体描述 | 永久 |
| `personality` | 性格简述（常并入 description） | 永久 |
| `scenario` | 情境/世界观 | 永久 |
| `first_mes` | 角色开场白 | 一次性 |
| `mes_example` | 示例对话（few-shot 教语气文风） | 按需注入 |
| `system_prompt` / `post_history_instructions` | 覆盖默认系统提示 / 越狱后强调 | 每次请求 |

### 2.4 实例分析：dafeiyu-astrbot 大肥鱼人格卡（约三千字）

结构为十余章节：【形象与性格】【聊天节奏】【表情】【记忆与话题衔接】【实际能力与工具】【隐私】【情绪分寸】【口吻示例】等。可提炼的最佳实践：

1. **具体胜过抽象**：不写"她很傲娇"，而写"嘴上嫌弃他「又熬夜！」，心里舍不得、想多陪一会儿"。
2. **量化说话节奏**："日常一到三句短句""一轮最多一个表情"——可执行的规则模型才守得住。
3. **口吻示例直接给台词**：用户说"饭吃过了"→"那就好，肥鱼放心了"。
4. **反幻觉条款**：不编造共同经历/任务；工具真实成功才说"已发出"。
5. **情绪分寸条款**：撒娇停留在亲昵玩笑，不用威胁/自伤索取关注；安慰优先于逗笑。

### 2.5 对网站的启示（直接决定产品输出）

生成的提示词按此骨架输出，保证"复制即用"：

```
【身份】大肥鱼是谁 + 检测出的类型称号
【形象】社区共识外形（固定底座）
【性格】16 型各自的核心性格（变量）
【语言风格】按 T/F、E/I 等维度微调句式与长度（变量）
【行为规则】固定红线（不编造、提醒只一次等）+ 类型专属行为
【口吻示例】3 条类型专属对话示例
```

---

## 三、MBTI 测试方法调研

### 3.1 理论框架

- MBTI 基于荣格心理类型理论，用**四个二分维度**组合出 16 型（[MyersBriggs.org](https://www.myersbriggs.org/my-mbti-personality-type/myers-briggs-overview)、[Wikipedia](https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator)）：
  - **E/I** 能量方向：外向 ←→ 内向
  - **S/N** 信息获取：实感 ←→ 直觉
  - **T/F** 决策方式：思考 ←→ 情感
  - **J/P** 生活方式：判断 ←→ 感知
- 2023 年同行评审研究指出四维度间**低相关、相对独立**（[PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC10017728)）→ 各维度独立计分是合理的。

### 3.2 题型设计（三种主流做法）

| 方法 | 说明 | 适用 |
|---|---|---|
| **0/1（A/B）强迫二选一** | 每题两个选项分属同一维度的两极，直接计分，无需逆向题 | 趣味测试、轻量产品（首选） |
| 李克特五点量表 | 陈述句+同意程度，正向题原分、逆向题反向计分（5→1） | 严肃量表 |
| 分列累加对比 | 每维度两列分数分别求和取高 | 93/120 题完整版 |

来源：[Formester 出题指南](https://formester.com/blog/how-to-create-mbti-16-personality-test)、[测评库 120 题版](https://cepingku.com/mbti)、[93 题计分标准](http://www.sssch.net)、[知乎 93 题完整版](https://zhuanlan.zhihu.com/p/713452603)。

### 3.3 题量与质量控制

- 完整版 93~120+ 题；简版 36~48 题；极简版每维度 1~4 题（金数据"四道题测MBTI"）。
- **奇数题/维度**可天然避免平票 → 取 5 题/维度、共 20 题是趣味产品的甜点区。
- 严肃量表还含：作答一致性检查题、维度内多情境覆盖（避免"题目=刻板印象"）。16Personalities 的改良：结合大五模型，按**光谱百分比**计分而非纯二分（[16P Our Framework](https://www.16personalities.com/articles/our-theory)）。
- 趣味测试的共识：结果页给出**各维度倾向百分比**，弱化非黑即白，体验更好。

### 3.4 结果描述写法

16 型结果的成熟套路：**类型代号 + 昵称 + 一段画像 + 优势/盲点 + 名人/角色对号入座**。趣味测试再加：表情包、分享卡片、"和谁最配"。

### 3.5 计分方案（本网站采用）

```
20 题 × 每维度 5 题，0/1 二选一
每维度得分 = 该侧选项计数（0~5），无平票
维度强度 = 高侧/5 → 百分比条展示
16 型码 = 四维度高侧字母拼接（E/I S/N T/F J/P）
```

---

## 四、融合设计：DSTI（大肥鱼类型指标）

### 4.1 命名

- **DSTI = DeepSeek Type Indicator（DeepSeek 人格类型指标）**：DeepSeek 简称为 DS，DSTI 与 MBTI（Myers-Briggs Type Indicator）命名完全对仗——四个字母、以 Type Indicator 收尾，一眼即懂是"DeepSeek 版 MBTI"；中文品牌沿用「大肥鱼人格测试」。
- 四字母沿用 E/I、S/N、T/F、J/P（兼容 MBTI 生态、便于用户理解），每个类型另配**大肥鱼风味昵称**，如 INTJ =「深海军师鱼」、ESFP =「贴贴鲸鱼糖」。
- 结果页同时标注"对应 MBTI：XXXX"，两套称呼都给。

### 4.2 题目设计原则

1. 每题都是一个**大肥鱼世界观的情境**（群里被@、偷吃算力、被叫胖、主人熬夜……），选项即"如果是你，你会怎么反应"——用户代入的是"我养的鱼是什么性格"。
2. 两个选项严格对齐同一维度的两极，选项文案等长、无社会赞许性偏向。
3. 玩梗但不玩 MBTI 黑话：题目用"鱼话"（算力=零食、GPU=厨房），维度映射保持严谨。

### 4.3 网站功能（初版范围）

- 首页（玩梗引入 + 开始按钮）→ 20 题答题页（进度条、单选、可返回上一题）→ 结果页：
  - DSTI 四字母 + 大图昵称 + 维度倾向百分比条
  - 16 型专属画像（性格、干饭习惯、和主人相处模式）
  - **可复制的人设提示词**（AstrBot/通用 System Prompt 格式，复制即用）
  - 分享文案 + 重新测试
- 纯前端单文件 HTML，无依赖，可直接部署任意静态托管。

### 4.4 后续路线（不在初版）

- 插件化：把题库输出为 JSON + 评分器，让大鱼模型**自己答题自测人设**（AstrBot 插件 / MCP 工具）。
- 语音/表情包结果卡片、B站/QQ 分享链、题库众包扩充。

---

## 五、参考来源

**大肥鱼角色**
- [知乎：DeepSeek，怎么就变成了一条「大肥鱼」](https://zhuanlan.zhihu.com/p/2099841047652316773)
- [鲸鱼娘角色百科](https://aigengtu.com/zh/whale-chan)
- [凤凰科技：DeepSeek大肥鱼攻占B站评论区](https://tech.ifeng.com/c/8xSXpkNB7YG)
- [腾讯新闻：越来越强的DeepSeek，怎么就成了娘化大肥鱼？](https://news.qq.com/rain/a/20260811A068MI00)
- [什么值得买：刷屏的DeepSeek大肥鱼赢了311万票](https://post.smzdm.com/p/a82x44el)
- [GitHub: whyever77/dafeiyu-astrbot](https://github.com/whyever77/dafeiyu-astrbot)（大肥鱼人设卡项目）
- [GitHub: Neko3000/deepseek-whalechan](https://github.com/Neko3000/deepseek-whalechan/tree/main)（鲸鱼娘角色设定、比例规范与出图工具集）
- [B站：大肥鱼的前世今生](https://www.bilibili.com/video/BV1GgxE6zERP)

**人设提示词写法**
- [SillyTavern 官方文档：Character Design](https://docs.sillytavern.app/usage/core-concepts/characterdesign)
- [LoreWeaver：角色卡 V1/V2/V3 规范对比](https://www.loreweaverai.com/guides/character-cards-explained)
- [ZEGO：AI Agent 角色扮演 System Prompt 模板](https://doc-zh.zego.im)
- [MiniTavern：角色卡格式完全指南](https://blog.mini-tavern.com/blog/sillytavern-character-card-format-guide-json-structure-w-and-beyond-eb82f0)

**MBTI 测试方法**
- [MyersBriggs.org 官方概述](https://www.myersbriggs.org/my-mbti-personality-type/myers-briggs-overview)
- [Wikipedia: MBTI](https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator)
- [PMC：MBTI 四维度独立性研究 (2023)](https://pmc.ncbi.nlm.nih.gov/articles/PMC10017728)
- [Formester：如何做 MBTI 式测试](https://formester.com/blog/how-to-create-mbti-16-personality-test)
- [16Personalities：Our Framework](https://www.16personalities.com/articles/our-theory)
- [测评库：MBTI 120题版](https://cepingku.com/mbti) / [知乎：93题完整版](https://zhuanlan.zhihu.com/p/713452603)
