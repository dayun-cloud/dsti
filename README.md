# DSTI · 大肥鱼人格测试

**DeepSeek Type Indicator** —— 把 MBTI 四维度测试放进「大肥鱼」（DeepSeek 社区二创鲸鱼娘）的世界观：回答 20 道情境题，得到 16 型之一，并生成可直接使用的人设提示词。

> 线上地址：**https://dsti.dayun.cool**  
> 作者：**大沄**

## 特点

- 20 道大肥鱼情境题，4 维度 × 5 题，0/1 强制二选一
- 四字母 DSTI 码 + 16 型昵称 + 各维度倾向百分比
- 结果页可复制 / 下载 System Prompt、SillyTavern 角色卡、分享文案、题库 JSON
- 「让大肥鱼自己答」：生成含全部题目的提示词，粘贴 20 位 0/1 即可出结果
- 纯前端运行，无后端、无账号、无路由，答题与计分都在本地，不上传数据
- 答题进度自动保存在 localStorage，刷新或关闭页面后可恢复；主动退出不保留
- 支持键盘作答（`0` / `1` 选择、`←` 返回、`Esc` 退出）、响应式布局与 reduced-motion

## 技术栈

Vue 3.5（Composition API + `<script setup>`）+ TypeScript + Vite 6 + Tailwind CSS 4 + Lucide 图标

## 本地运行

```bash
npm install
npm run dev        # 开发服务器
npm run build      # 类型检查 + 生产构建，产物在 dist/
npm run preview    # 预览构建产物
npm run typecheck  # 仅类型检查
```

## 目录

```text
src/
├── data/          # 题库、16 型画像、维度、计分、提示词模板、立绘映射
├── composables/   # 答题状态与本地存档、轻提示
├── components/    # 首页区块与通用组件
├── views/         # home / quiz / result 三个视图
├── lib/           # 剪贴板复制与文件下载
├── assets/        # 字体、首页图与 16 型立绘
├── config.ts      # 站点地址与作者信息
└── style.css      # Tailwind 与设计令牌
```

## 计分规则

每题两个选项分属同一维度的两极，选一极计 1 分；每维度 5 题，奇数题量不会平票。四维度高侧字母拼成 DSTI 码，结果页的倾向百分比 = 该侧得分 / 5（即 0% 到 100%，步长 20%）。


## 定制入口

| 想改什么 | 去哪 |
|---|---|
| 题目与选项 | `src/data/questions.ts` |
| 16 型昵称、画像、口吻 | `src/data/types.ts` |
| 16 型立绘 | `src/data/typeArt.ts` + `src/assets/images/types/` |
| 维度名称与主题色 | `src/data/dimensions.ts` |
| 人设提示词与行为红线 | `src/data/prompts.ts` |
| 配色、圆角、动效 | `src/style.css` |
| 站点地址、作者信息 | `src/config.ts` |

> 增删题目时请保持每个维度为奇数题，避免平票。

## 说明

本测试是 MBTI 四维度框架的趣味二创，非官方、非严肃心理测评。角色形象源自 DeepSeek 社区二创（原型：溟月，作者：上善无形），与 DeepSeek 官方无关。
