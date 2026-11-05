<template>
  <section id="prompt" class="section">
    <div class="shell prompt-grid">
      <div class="prompt-copy" v-reveal>
        <span class="eyebrow"><Terminal :size="13" /> Prompt Generator</span>
        <h2 class="section-title">测完就能直接开养</h2>
        <p class="section-lead">
          结果页会按「大肥鱼社区共识底座 + 你的类型变量」生成完整人设。不用自己拼提示词，复制粘贴就能跑。
        </p>

        <ul class="checklist">
          <li v-for="item in checklist" :key="item.title">
            <span class="check"><Check :size="12" :stroke-width="3" /></span>
            <div>
              <b>{{ item.title }}</b>
              <span>{{ item.desc }}</span>
            </div>
          </li>
        </ul>

        <button class="btn btn-primary" type="button" @click="$emit('start')">
          生成我的人设提示词
          <ArrowRight :size="16" :stroke-width="2.5" />
        </button>
      </div>

      <div class="prompt-visual" v-reveal="100">
        <div class="editor-glow" aria-hidden="true"></div>
        <div class="editor">
          <div class="editor-bar">
            <span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="filename">大肥鱼-INFJ.system.md</span>
            <span class="live-badge">可直接复制</span>
          </div>
          <div class="editor-tabs" aria-hidden="true">
            <span class="active">System Prompt</span>
            <span>SillyTavern</span>
            <span>分享文案</span>
            <span>题库 JSON</span>
          </div>
          <div class="editor-body">
            <pre><span
              v-for="(line, i) in lines"
              :key="i"
              :class="lineClass(line)"
            >{{ line || ' ' }}</span></pre>
            <div class="editor-fade" aria-hidden="true"></div>
          </div>
        </div>
        <p class="editor-note">
          示例为 INFJ「深海灯塔鱼」的实际输出片段 · 共 4 种格式一键切换
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Check, Terminal } from '@lucide/vue'
import { buildSystemPrompt } from '@/data/prompts'

defineEmits<{ (e: 'start'): void }>()

const checklist = [
  { title: 'System Prompt', desc: 'AstrBot / 通用格式，复制进人格设置即可。' },
  { title: 'SillyTavern 角色卡', desc: 'name / description / personality / first_mes 等字段齐全。' },
  { title: '分享文案', desc: '带类型昵称的一句话，发群发圈都能用。' },
  { title: '题库 JSON', desc: '给插件用的标准题目与计分规则，让鱼自己答题。' },
]

const lines = buildSystemPrompt('INFJ').split('\n').slice(0, 30)

function lineClass(line: string) {
  if (line.startsWith('#')) return 'ln-h'
  if (line.startsWith('【')) return 'ln-sec'
  if (line.startsWith('主人：') || line.startsWith('你：')) return 'ln-dlg'
  return ''
}
</script>

<style scoped>
.prompt-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: clamp(32px, 6vw, 76px);
  align-items: center;
}

.prompt-copy .section-title {
  margin-top: 14px;
}

.checklist {
  list-style: none;
  margin: 28px 0 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.checklist li {
  display: flex;
  gap: 12px;
}

.check {
  flex: none;
  width: 22px;
  height: 22px;
  margin-top: 1px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #04212e;
  background: linear-gradient(140deg, #b6f3ff, #5ddcff);
  box-shadow: 0 4px 14px -6px rgba(93, 220, 255, 0.9);
}

.checklist b {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #eaf7ff;
}

.checklist span:not(.check) {
  display: block;
  margin-top: 3px;
  font-size: 12.5px;
  line-height: 1.7;
  color: #8fb2c9;
}

.prompt-visual {
  position: relative;
}

.editor-glow {
  position: absolute;
  inset: 10% 0 -10%;
  background: radial-gradient(circle at 60% 40%, rgba(93, 220, 255, 0.24), transparent 65%);
  filter: blur(50px);
}

.editor {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(154, 214, 255, 0.17);
  background: #02101b;
  box-shadow:
    0 44px 90px -40px rgba(0, 0, 0, 1),
    0 0 60px -26px rgba(93, 220, 255, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  transform: perspective(1200px) rotateY(-2deg) rotateX(1deg);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.editor:hover {
  transform: perspective(1200px) rotateY(0) rotateX(0);
}

.editor-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(154, 214, 255, 0.09);
  background: rgba(255, 255, 255, 0.025);
}

.dots {
  display: flex;
  gap: 6px;
}

.dots i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #ff6b81;
}
.dots i:nth-child(2) {
  background: #ffd166;
}
.dots i:nth-child(3) {
  background: #7ee0c0;
}

.filename {
  font-family: var(--font-mono);
  font-size: 10.5px;
  color: #7fa6c0;
  letter-spacing: 0.02em;
}

.live-badge {
  margin-left: auto;
  font-size: 9.5px;
  letter-spacing: 0.08em;
  color: #8ceaff;
  padding: 3px 8px;
  border-radius: 999px;
  border: 1px solid rgba(140, 234, 255, 0.3);
  background: rgba(93, 220, 255, 0.08);
}

.editor-tabs {
  display: flex;
  gap: 6px;
  padding: 10px 12px;
  border-bottom: 1px solid rgba(154, 214, 255, 0.08);
  overflow: hidden;
}

.editor-tabs span {
  font-size: 10px;
  padding: 5px 9px;
  border-radius: 6px;
  color: #6f94ad;
  white-space: nowrap;
}

.editor-tabs .active {
  color: #e6f9ff;
  background: rgba(93, 220, 255, 0.12);
  border: 1px solid rgba(93, 220, 255, 0.22);
}

.editor-body {
  position: relative;
  max-height: 360px;
  overflow: hidden;
}

.editor-body pre {
  padding: 18px 20px 40px;
  font-family: var(--font-mono);
  font-size: 11.5px;
  line-height: 1.95;
  color: #a9c4d6;
  white-space: pre-wrap;
  word-break: break-word;
}

.editor-body pre span {
  display: block;
}

.ln-h {
  color: #8ceaff;
  font-weight: 700;
  font-size: 12.5px;
}

.ln-sec {
  color: #ffb3d4;
  margin-top: 4px;
}

.ln-dlg {
  color: #e2f4ff;
}

.editor-fade {
  position: absolute;
  inset: auto 0 0;
  height: 90px;
  background: linear-gradient(to bottom, transparent, #02101b 82%);
}

.editor-note {
  margin-top: 14px;
  text-align: center;
  font-size: 10.5px;
  color: #6f94ad;
  letter-spacing: 0.03em;
}

@media (max-width: 1024px) {
  .prompt-grid {
    grid-template-columns: 1fr;
  }
  .editor {
    transform: none;
  }
}

@media (max-width: 560px) {
  .editor-body pre {
    font-size: 10.5px;
  }
}
</style>
