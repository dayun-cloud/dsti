<template>
  <div class="result-view" :style="{ '--hue': type.hue }">
    <div class="result-aura" aria-hidden="true"></div>
    <div class="result-gridlines" aria-hidden="true"></div>

    <div class="shell result-shell">
      <section class="result-hero">
        <span class="eyebrow" v-reveal>
          <Sparkles :size="13" />
          {{ state.mode === 'fish' ? 'Her DSTI Type' : 'Your DSTI Type' }}
        </span>

        <div class="code-grid" v-reveal="60">
          <div v-for="(c, i) in code.split('')" :key="i" class="code-col">
            <div class="code-letter" :class="{ alt: i % 2 === 1 }" :style="{ animationDelay: `${i * 0.11}s` }">
              {{ c }}
            </div>
            <span class="code-label">{{ poleLabel(i) }}</span>
          </div>
        </div>

        <h1 class="type-name" v-reveal="120">「{{ type.name }}」</h1>
        <p class="type-title" v-reveal="160">{{ type.title }}</p>

        <div class="meta-row" v-reveal="190">
          <span class="meta-pill">DSTI-{{ code }}</span>
          <span class="meta-pill">对应 MBTI · {{ code }}</span>
          <span v-if="state.mode === 'fish'" class="meta-pill fish-pill">
            <Fish :size="12" />
            大肥鱼自测
          </span>
          <span v-else class="meta-pill"><Clock3 :size="12" /> 用时 {{ durationText() }}</span>
        </div>

        <p v-if="state.mode === 'fish'" class="self-note" v-reveal="205">
          这 20 题由大肥鱼本人作答，结果是她的 DSTI。
        </p>

        <p class="result-desc" v-reveal="220">{{ type.desc }}</p>

        <div class="info-pair" v-reveal="250">
          <div class="info-tile">
            <span>🍚 干饭风格</span>
            <p>{{ type.rice }}</p>
          </div>
          <div class="info-tile">
            <span>🏠 与主人相处</span>
            <p>{{ type.master }}</p>
          </div>
        </div>

        <div class="hero-actions" v-reveal="280">
          <button class="btn btn-primary" type="button" @click="copyShare">
            <Share2 :size="16" />
            复制分享文案
          </button>
          <button class="btn btn-ghost" type="button" @click="retake">
            <RotateCcw :size="16" />
            {{ retakeLabel }}
          </button>
        </div>
      </section>

      <section class="panel glass bars-panel" v-reveal>
        <header class="panel-head">
          <div>
            <span class="panel-kicker">Dimension Spectrum</span>
            <h2>四个维度的倾向</h2>
          </div>
          <p>每维度 5 题。条越长，代表这一侧越明显。</p>
        </header>

        <div class="bars">
          <div v-for="(d, i) in stats" :key="d.key" class="bar-row">
            <div class="bar-head">
              <span class="pole" :class="{ win: d.dominant === 'left' }">
                <b>{{ d.leftPole }}</b> {{ d.leftName }}
              </span>
              <span class="bar-mid">
                {{ d.label }} · <b>{{ d.leftCount }} : {{ d.rightCount }}</b> · {{ d.strength }}
              </span>
              <span class="pole right" :class="{ win: d.dominant === 'right' }">
                {{ d.rightName }} <b>{{ d.rightPole }}</b>
              </span>
            </div>
            <div class="bar-track">
              <div
                class="bar-half left"
                :class="{ win: d.dominant === 'left' }"
                :style="{ width: mounted ? `${d.leftPct}%` : '0%', transitionDelay: `${i * 110}ms` }"
              >
                <span v-if="d.leftPct >= 18">{{ d.leftPct }}%</span>
              </div>
              <div
                class="bar-half right"
                :class="{ win: d.dominant === 'right' }"
                :style="{ width: mounted ? `${d.rightPct}%` : '0%', transitionDelay: `${i * 110}ms` }"
              >
                <span v-if="d.rightPct >= 18">{{ d.rightPct }}%</span>
              </div>
            </div>
          </div>
        </div>

        <p class="bars-note">
          <Info :size="13" />
          百分比 = 该侧得分 / 5。50% 不是「两边都不像」，只是这 5 题势均力敌。
        </p>
      </section>

      <div class="duo-grid">
        <section class="panel glass persona-panel" v-reveal>
          <div class="persona-portrait">
            <img :src="typeArt" alt="" aria-hidden="true" />
            <span class="persona-code">{{ code }}</span>
            <span class="persona-group">
              <i :style="{ background: group.color }"></i>
              {{ group.label }} · {{ group.labelEn }}
            </span>
          </div>
          <div class="persona-body">
            <span class="panel-kicker">Personality Core</span>
            <h2>性格底色</h2>
            <p>{{ type.pbit }}</p>
          </div>
        </section>

        <section class="panel glass dialogue-panel" v-reveal="80">
          <span class="panel-kicker">How She Talks</span>
          <h2>她会这样说话</h2>
          <div class="dialogue-list">
            <div v-for="(d, i) in type.dg" :key="i" class="dialogue">
              <div class="bubble bubble-user">
                <span class="who">主人</span>
                <p>{{ d.user }}</p>
              </div>
              <div class="bubble bubble-fish">
                <span class="who">大肥鱼</span>
                <p>{{ d.fish }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="panel glass prompt-panel" v-reveal>
        <header class="panel-head prompt-head">
          <div>
            <span class="panel-kicker">Deployable Persona</span>
            <h2>可部署的人设提示词</h2>
            <p class="prompt-sub">
              复制粘贴到 AstrBot 人格 / SillyTavern 角色卡即可开养。人设底座取自大肥鱼社区共识设定，性格部分按你的结果生成。
            </p>
          </div>
        </header>

        <div class="tabs-wrap">
          <div class="tabs" role="tablist" aria-label="提示词格式">
            <button
              v-for="t in tabs"
              :key="t.key"
              type="button"
              class="tab"
              :class="{ active: activeTab === t.key }"
              role="tab"
              :aria-selected="activeTab === t.key"
              @click="switchTab(t.key)"
            >
              <component :is="t.icon" :size="14" />
              {{ t.label }}
            </button>
          </div>

          <div class="prompt-tools">
            <span class="char-count">{{ activeText.length }} 字符</span>
            <button class="tool-btn" type="button" @click="downloadActive">
              <Download :size="14" />
              下载
            </button>
            <button class="tool-btn primary" type="button" @click="copyActive">
              <Check v-if="copied" :size="14" />
              <Copy v-else :size="14" />
              {{ copied ? '已复制' : '复制' }}
            </button>
          </div>
        </div>

        <div class="prompt-box">
          <pre>{{ activeText }}</pre>
        </div>

        <p class="prompt-note">
          <Info :size="12" />
          建议先改掉开头的类型名与口吻示例，其余行为红线可以直接保留。
        </p>
      </section>

      <div class="bottom-actions" v-reveal>
        <button class="btn btn-primary btn-lg" type="button" @click="retake">
          {{ retakeLabel }}
          <RotateCcw :size="17" />
        </button>
        <button class="btn btn-ghost btn-lg" type="button" @click="$emit('home')">
          <House :size="16" />
          回到首页
        </button>
      </div>

      <p class="result-disclaimer">
        本结果为趣味二创测试，非官方、非严肃心理测评，仅供养鱼娱乐。<br />
        想测她的人设？用首页「让大肥鱼自己答」的提示词，让她自己答出 DSTI。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  Braces,
  Check,
  Clock3,
  Copy,
  Download,
  FileText,
  Fish,
  House,
  Info,
  RotateCcw,
  Share2,
  Sparkles,
  Terminal,
} from '@lucide/vue'
import type { Component } from 'vue'
import { useQuiz } from '@/composables/useQuiz'
import { useToast } from '@/composables/useToast'
import { SITE_URL } from '@/config'
import { copyText, downloadText } from '@/lib/clipboard'
import { DIM_ORDER, DIMENSIONS } from '@/data/dimensions'
import { TYPES, groupOf } from '@/data/types'
import { dimensionStats, getResultCode, scoreAnswers } from '@/data/scoring'
import {
  buildQuestionBankJSON,
  buildSTCard,
  buildShareText,
  buildSystemPrompt,
} from '@/data/prompts'
import type { TypeCode } from '@/data/types'
import { TYPE_ART } from '@/data/typeArt'

const emit = defineEmits<{
  (e: 'restart'): void
  (e: 'home'): void
  (e: 'retakeFish'): void
}>()

const { state, durationText } = useQuiz()
const { show } = useToast()

const typeArt = computed(() => TYPE_ART[code.value])
const mounted = ref(false)
const retakeLabel = computed(() => (state.mode === 'fish' ? '再让鱼答一次' : '再测一次'))

function retake() {
  if (state.mode === 'fish') emit('retakeFish')
  else emit('restart')
}

const score = computed(() => scoreAnswers(state.answers))
const code = computed<TypeCode>(() => getResultCode(score.value))
const type = computed(() => TYPES[code.value])
const group = computed(() => groupOf(code.value))
const stats = computed(() => dimensionStats(score.value))

function poleLabel(index: number): string {
  const dim = DIMENSIONS[DIM_ORDER[index]]
  return code.value[index] === dim.left.key ? dim.left.name : dim.right.name
}

type TabKey = 'sp' | 'st' | 'share' | 'json'

interface TabDef {
  key: TabKey
  label: string
  icon: Component
  ext: string
  suffix: string
}

const tabs: TabDef[] = [
  { key: 'sp', label: 'System Prompt', icon: Terminal, ext: 'md', suffix: 'system-prompt' },
  { key: 'st', label: 'SillyTavern 角色卡', icon: FileText, ext: 'txt', suffix: 'sillytavern-card' },
  { key: 'share', label: '分享文案', icon: Share2, ext: 'txt', suffix: 'share' },
  { key: 'json', label: '题库 JSON', icon: Braces, ext: 'json', suffix: 'question-bank' },
]

const activeTab = ref<TabKey>('sp')
const copied = ref(false)
let copiedTimer: number | undefined

const prompts = computed<Record<TabKey, string>>(() => ({
  sp: buildSystemPrompt(code.value),
  st: buildSTCard(code.value),
  share: buildShareText(code.value, SITE_URL, state.mode === 'fish'),
  json: buildQuestionBankJSON(code.value),
}))

const activeText = computed(() => prompts.value[activeTab.value])

function switchTab(key: TabKey) {
  activeTab.value = key
  copied.value = false
}

async function copyActive() {
  const ok = await copyText(activeText.value)
  if (!ok) {
    show('复制失败，请手动选择文本', 'error')
    return
  }
  copied.value = true
  show('已复制到剪贴板')
  if (copiedTimer) window.clearTimeout(copiedTimer)
  copiedTimer = window.setTimeout(() => {
    copied.value = false
  }, 2000)
}

async function copyShare() {
  const ok = await copyText(prompts.value.share)
  show(ok ? '分享文案已复制' : '复制失败，请手动复制', ok ? 'success' : 'error')
}

function downloadActive() {
  const tab = tabs.find((t) => t.key === activeTab.value)
  if (!tab) return
  const filename =
    tab.key === 'json' ? 'dsti-question-bank-v1.json' : `DSTI-${code.value}-${tab.suffix}.${tab.ext}`
  downloadText(filename, activeText.value)
  show('文件已开始下载', 'info')
}

onMounted(() => {
  if (document.hidden) {
    mounted.value = true
    return
  }
  window.setTimeout(() => {
    mounted.value = true
  }, 80)
})

onBeforeUnmount(() => {
  if (copiedTimer) window.clearTimeout(copiedTimer)
})
</script>

<style scoped>
.result-view {
  position: relative;
  z-index: 1;
  padding-top: clamp(104px, 12vw, 136px);
  padding-bottom: 20px;
  overflow-x: clip;
}

.result-aura {
  position: absolute;
  top: -160px;
  left: 50%;
  width: min(900px, 100vw);
  height: 720px;
  transform: translateX(-50%);
  background: radial-gradient(
    ellipse at 50% 40%,
    hsl(var(--hue) 90% 60% / 0.22),
    transparent 62%
  );
  filter: blur(40px);
  pointer-events: none;
}

.result-gridlines {
  position: absolute;
  inset: 0 0 auto;
  height: 700px;
  background-image:
    linear-gradient(rgba(150, 220, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(150, 220, 255, 0.045) 1px, transparent 1px);
  background-size: 92px 92px;
  mask-image: radial-gradient(60% 55% at 50% 30%, #000, transparent 78%);
  -webkit-mask-image: radial-gradient(60% 55% at 50% 30%, #000, transparent 78%);
  pointer-events: none;
}

.result-shell {
  position: relative;
  z-index: 1;
}

/* ---------------- hero ---------------- */

.result-hero {
  text-align: center;
  padding-bottom: clamp(42px, 6vw, 64px);
}

.code-grid {
  display: flex;
  justify-content: center;
  gap: clamp(8px, 1.4vw, 14px);
  margin-top: 26px;
}

.code-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
}

.code-letter {
  width: clamp(58px, 7.4vw, 82px);
  height: clamp(66px, 8.4vw, 92px);
  display: grid;
  place-items: center;
  border-radius: clamp(14px, 1.8vw, 20px);
  font-size: clamp(32px, 4.4vw, 48px);
  font-weight: 900;
  line-height: 1;
  color: #04202e;
  background: linear-gradient(160deg, #e2fcff 0%, #9deeff 45%, #5ddcff 100%);
  box-shadow:
    0 14px 34px -14px rgba(93, 220, 255, 0.9),
    inset 0 1px 0 rgba(255, 255, 255, 0.85);
  animation: pop-letter 0.65s cubic-bezier(0.2, 1.5, 0.4, 1) both;
}

.code-letter.alt {
  background: linear-gradient(160deg, #eaf7ff 0%, #c9a3ff 45%, #ffb3d4 100%);
  box-shadow:
    0 14px 34px -14px rgba(255, 179, 212, 0.85),
    inset 0 1px 0 rgba(255, 255, 255, 0.85);
}

.code-label {
  font-size: 10px;
  letter-spacing: 0.04em;
  color: #7fa6c0;
  white-space: nowrap;
}

.type-name {
  margin-top: 26px;
  font-size: clamp(30px, 4.6vw, 46px);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.2;
  color: #eaf7ff;
  background: linear-gradient(100deg, #eaf7ff 0%, #b6d4ff 45%, #ffb3d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.type-title {
  margin-top: 6px;
  font-size: clamp(14px, 1.6vw, 16.5px);
  color: #cfe9f8;
  letter-spacing: 0.01em;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 18px;
}

.meta-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 28px;
  padding-inline: 12px;
  border-radius: 999px;
  border: 1px solid rgba(154, 214, 255, 0.15);
  background: rgba(255, 255, 255, 0.035);
  font-size: 10.5px;
  letter-spacing: 0.05em;
  color: #9dbfd5;
}

.fish-pill {
  color: #8ceaff;
  border-color: rgba(93, 220, 255, 0.28);
  background: rgba(93, 220, 255, 0.08);
}

.self-note {
  margin-top: 10px;
  text-align: center;
  font-size: 11.5px;
  letter-spacing: 0.02em;
  color: #7fa6c0;
}

.result-desc {
  /* 桌面端尽量一行放下，避免短句被窄栏挤成两行 */
  max-width: 920px;
  margin: 24px auto 0;
  font-size: clamp(14px, 1.5vw, 15.5px);
  line-height: 1.95;
  color: #cde5f4;
}

.info-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  max-width: 720px;
  margin: 26px auto 0;
  text-align: left;
}

.info-tile {
  padding: 16px 18px;
  border-radius: 16px;
  border: 1px solid rgba(154, 214, 255, 0.12);
  background: rgba(255, 255, 255, 0.035);
}

.info-tile span {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #8ceaff;
}

.info-tile p {
  margin-top: 7px;
  font-size: 12.8px;
  line-height: 1.8;
  color: #b9d4e5;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 30px;
}

/* ---------------- panels ---------------- */

.panel {
  border-radius: 26px;
  padding: clamp(22px, 3.4vw, 34px);
  margin-top: 18px;
}

.panel-kicker {
  display: block;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #6f94ad;
}

.panel h2 {
  margin-top: 7px;
  font-size: clamp(19px, 2.2vw, 24px);
  font-weight: 800;
  letter-spacing: -0.015em;
}

.panel-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.panel-head > p {
  font-size: 11.5px;
  color: #7fa6c0;
  padding-bottom: 3px;
}

/* bars */

.bars {
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-top: 28px;
}

.bar-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 12.5px;
  color: #8fb2c9;
}

.bar-head .pole {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 0.3s;
}

.bar-head .pole b {
  font-size: 15px;
  font-weight: 800;
  color: #9dbfd5;
  letter-spacing: 0.02em;
}

.bar-head .pole.win {
  color: #eaf8ff;
}

.bar-head .pole.win b {
  color: #8ceaff;
}

.bar-head .pole.right.win b {
  color: #ffb3d4;
}

.bar-mid {
  font-size: 10.5px;
  color: #6f94ad;
  letter-spacing: 0.04em;
}

.bar-mid b {
  color: #b6dcf2;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.bar-track {
  display: flex;
  height: 13px;
  margin-top: 8px;
  border-radius: 99px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.07);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.35);
}

.bar-half {
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 9.5px;
  font-weight: 700;
  color: rgba(4, 20, 30, 0.75);
  transition: width 1.05s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
}

.bar-half.left {
  justify-content: flex-end;
  padding-right: 8px;
  background: linear-gradient(90deg, #7fe6ff, #5ddcff);
  opacity: 0.72;
}

.bar-half.right {
  justify-content: flex-start;
  padding-left: 8px;
  background: linear-gradient(90deg, #c9a3ff, #ffb3d4);
  opacity: 0.85;
}

.bar-half.win {
  opacity: 1;
  box-shadow: 0 0 18px -4px currentColor;
}

.bars-note {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(154, 214, 255, 0.08);
  font-size: 10.5px;
  line-height: 1.7;
  color: #6f94ad;
}

.bars-note svg {
  flex: none;
  margin-top: 1px;
}

/* duo */

.duo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.persona-panel {
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.persona-portrait {
  position: relative;
  flex: 1 1 auto;
  min-height: 158px;
  overflow: hidden;
  background:
    radial-gradient(120% 110% at 20% 0%, hsl(var(--hue) 92% 72% / 0.6), transparent 60%),
    linear-gradient(
      155deg,
      hsl(var(--hue) 86% 58% / 0.55),
      hsl(calc(var(--hue) + 24) 72% 30% / 0.72) 55%,
      hsl(calc(var(--hue) - 18) 62% 15% / 0.95)
    );
}

.persona-portrait img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
  opacity: 1;
}

.persona-portrait::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(3, 12, 21, 0.12) 0%, transparent 40%, rgba(3, 12, 21, 0.7) 100%);
  pointer-events: none;
  z-index: 0;
}

.persona-code,
.persona-group {
  z-index: 1;
}

.persona-code {
  position: absolute;
  right: 14px;
  bottom: -12px;
  font-size: 74px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.05em;
  color: rgba(255, 255, 255, 0.16);
}

.persona-group {
  position: absolute;
  top: 12px;
  left: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 25px;
  padding-inline: 10px;
  border-radius: 999px;
  background: rgba(3, 14, 24, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(8px);
  font-size: 10px;
  letter-spacing: 0.05em;
  color: #eaf9ff;
}

.persona-group i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.persona-body {
  padding: 22px 26px 26px;
}

.persona-body p {
  margin-top: 10px;
  font-size: 13.2px;
  line-height: 1.9;
  color: #b9d4e5;
}

.dialogue-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 18px;
}

.dialogue {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.bubble {
  max-width: 90%;
  padding: 9px 13px;
  border-radius: 13px;
  font-size: 12.5px;
  line-height: 1.75;
}

.bubble .who {
  display: block;
  font-size: 9px;
  letter-spacing: 0.1em;
  margin-bottom: 2px;
  opacity: 0.55;
}

.bubble-user {
  align-self: flex-start;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(154, 214, 255, 0.1);
  color: #bcd6e6;
  border-bottom-left-radius: 4px;
}

.bubble-fish {
  align-self: flex-end;
  background: linear-gradient(135deg, rgba(93, 220, 255, 0.14), rgba(93, 220, 255, 0.05));
  border: 1px solid rgba(93, 220, 255, 0.22);
  color: #e6f9ff;
  border-bottom-right-radius: 4px;
}

/* prompt */

.prompt-head .prompt-sub {
  margin-top: 10px;
  max-width: 640px;
  font-size: 12.5px;
  line-height: 1.8;
  color: #8fb2c9;
}

.tabs-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 22px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(154, 214, 255, 0.09);
}

.tabs {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 2px;
}

.tabs::-webkit-scrollbar {
  display: none;
}

.tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding-inline: 13px;
  border-radius: 999px;
  border: 1px solid rgba(154, 214, 255, 0.14);
  background: rgba(255, 255, 255, 0.03);
  color: #9dbfd5;
  font-size: 11.5px;
  white-space: nowrap;
  transition:
    color 0.2s,
    border-color 0.2s,
    background-color 0.2s;
}

.tab:hover {
  color: #eaf8ff;
  border-color: rgba(154, 214, 255, 0.3);
}

.tab.active {
  color: #04212e;
  font-weight: 700;
  border-color: transparent;
  background: linear-gradient(115deg, #b6f3ff, #5ddcff);
  box-shadow: 0 6px 16px -8px rgba(93, 220, 255, 0.8);
}

.prompt-tools {
  display: flex;
  align-items: center;
  gap: 8px;
}

.char-count {
  font-size: 10px;
  color: #6f94ad;
  font-variant-numeric: tabular-nums;
  margin-right: 4px;
}

.tool-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 32px;
  padding-inline: 12px;
  border-radius: 9px;
  border: 1px solid rgba(154, 214, 255, 0.16);
  background: rgba(255, 255, 255, 0.04);
  color: #b6d8ec;
  font-size: 11.5px;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s;
}

.tool-btn:hover {
  border-color: rgba(140, 230, 255, 0.45);
  color: #fff;
}

.tool-btn.primary {
  background: linear-gradient(115deg, #b6f3ff, #5ddcff);
  border-color: transparent;
  color: #03222f;
  font-weight: 700;
}

.tool-btn.primary:hover {
  color: #03222f;
  filter: brightness(1.05);
}

.prompt-box {
  margin-top: 16px;
  border-radius: 16px;
  border: 1px solid rgba(154, 214, 255, 0.12);
  background: rgba(2, 12, 21, 0.72);
  max-height: 460px;
  overflow: auto;
}

.prompt-box pre {
  padding: 20px 22px;
  font-family: var(--font-mono);
  font-size: 11.8px;
  line-height: 1.95;
  color: #cfe6f5;
  white-space: pre-wrap;
  word-break: break-word;
}

.prompt-note {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  font-size: 10.5px;
  color: #6f94ad;
}

.bottom-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 34px;
}

.result-disclaimer {
  margin-top: 28px;
  text-align: center;
  font-size: 10.5px;
  line-height: 1.9;
  color: #5c7f96;
}

@media (max-width: 860px) {
  .duo-grid {
    grid-template-columns: 1fr;
  }
  .info-pair {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .result-view {
    padding-top: 96px;
  }
  .panel {
    padding: 20px 18px;
    border-radius: 22px;
  }
  .persona-panel {
    padding: 0;
  }
  .persona-body {
    padding: 18px 20px 22px;
  }
  .prompt-tools {
    width: 100%;
    justify-content: flex-end;
  }
  .char-count {
    margin-right: auto;
  }
  .bar-mid {
    order: 3;
    width: 100%;
    text-align: center;
  }
  .prompt-box {
    max-height: 380px;
  }
  .prompt-box pre {
    font-size: 10.8px;
    padding: 16px;
  }
  .bottom-actions .btn {
    flex: 1 1 auto;
  }
}
</style>
