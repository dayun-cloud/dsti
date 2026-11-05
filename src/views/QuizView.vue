<template>
  <div class="quiz-view">
    <header class="quiz-top">
      <div class="shell quiz-top-inner">
        <button class="quiz-brand" type="button" aria-label="退出测试" @click="showExit = true">
          <BrandMark size="sm" />
          <span class="quiz-brand-text">
            <b>DSTI</b>
            <small>大肥鱼人格测试</small>
          </span>
        </button>
        <span class="quiz-top-label">正在测试 · 凭第一直觉</span>
        <button class="exit-btn" type="button" @click="showExit = true">
          <X :size="15" />
          退出
        </button>
      </div>
    </header>

    <main class="quiz-main shell">
      <div class="quiz-card glass" :style="{ '--accent': dim.accent, '--accent-glow': dim.glow }">
        <div class="quiz-progress">
          <div class="progress-meta">
            <span class="step-text">
              第 <b>{{ state.index + 1 }}</b> / {{ total }} 题
            </span>
            <span class="dim-chip">
              <i :style="{ background: dim.accent }"></i>
              {{ dim.label }}
            </span>
          </div>

          <div
            class="step-rail"
            role="progressbar"
            :aria-valuenow="state.index + 1"
            aria-valuemin="1"
            :aria-valuemax="total"
            :aria-label="`进度：第 ${state.index + 1} 题，共 ${total} 题`"
          >
            <i
              v-for="(q, i) in questions"
              :key="q.id"
              class="seg"
              :class="{
                done: i < state.index,
                current: i === state.index,
                answered: state.answers[i] !== null,
              }"
              :style="{ '--seg': dimensions[q.dim].accent }"
            ></i>
          </div>
          <div class="progress-sub">
            <span>已完成 {{ answeredTotal }} / {{ total }}</span>
            <span>选项顺序已随机 · 防手滑</span>
          </div>
        </div>

        <div class="q-zone">
          <div :key="state.index" class="q-body q-in">
            <div class="q-badge-row">
              <span class="q-badge">
                <span class="q-index">{{ String(state.index + 1).padStart(2, '0') }}</span>
                情境题
              </span>
              <span class="q-dim-name">{{ dim.left.name }} <span class="vs">/</span> {{ dim.right.name }}</span>
            </div>

            <p class="q-hint">如果这条鱼是你，你会怎么做？</p>
            <h1 class="q-scenario">{{ question.scenario }}</h1>

            <div class="options">
              <button
                v-for="(text, j) in displayedOptions"
                :key="`${state.index}-${j}`"
                type="button"
                class="opt"
                :class="{
                  chosen: picked !== null && picked === j,
                  prior: picked === null && priorChoice === j,
                }"
                :disabled="locked"
                @click="choose(j)"
              >
                <span class="opt-badge">{{ j }}</span>
                <span class="opt-text">{{ text }}</span>
                <span class="opt-key">{{ j }}</span>
              </button>
            </div>
          </div>
        </div>

        <div class="quiz-foot">
          <button
            class="btn btn-ghost btn-sm"
            type="button"
            :disabled="state.index === 0"
            @click="back"
          >
            <ChevronLeft :size="15" />
            上一题
          </button>
          <div class="key-hints" aria-hidden="true">
            <span><kbd>0</kbd><kbd>1</kbd> 选择</span>
            <span><kbd>←</kbd> 返回</span>
          </div>
          <span class="foot-note">别想太多，鱼不会怪你</span>
        </div>

        <span class="q-watermark" aria-hidden="true">{{ String(state.index + 1).padStart(2, '0') }}</span>
      </div>

      <p class="quiz-tip">
        <Waves :size="13" />
        所有答案只保存在当前浏览器，不会上传
      </p>
    </main>

    <p class="sr-only" aria-live="polite">
      第 {{ state.index + 1 }} 题，共 {{ total }} 题：{{ question.scenario }}
    </p>

    <Transition name="modal">
      <div v-if="showExit" class="exit-modal" role="presentation">
        <div class="exit-backdrop" @click="showExit = false"></div>
        <div class="exit-panel glass" role="dialog" aria-modal="true" aria-label="确认退出测试">
          <span class="exit-icon"><X :size="20" /></span>
          <h2>要离开测试吗？</h2>
          <p>当前答题进度不会保存，退出后需要从第一题重新开始。</p>
          <div class="exit-actions">
            <button class="btn btn-primary btn-sm" type="button" @click="showExit = false">
              继续答题
            </button>
            <button class="btn btn-ghost btn-sm" type="button" @click="$emit('home')">
              退出并清空
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { ChevronLeft, Waves, X } from '@lucide/vue'
import BrandMark from '@/components/BrandMark.vue'
import { useQuiz } from '@/composables/useQuiz'
import { DIMENSIONS } from '@/data/dimensions'
import { QUESTIONS } from '@/data/questions'

const emit = defineEmits<{ (e: 'finish'): void; (e: 'home'): void }>()

const { state, pick, goNext, goPrev } = useQuiz()

const total = QUESTIONS.length
const questions = QUESTIONS
const dimensions = DIMENSIONS

const question = computed(() => QUESTIONS[state.index])
const dim = computed(() => DIMENSIONS[question.value.dim])
const displayedOptions = computed(() => {
  const order = state.orders[state.index] ?? [0, 1]
  return order.map((original) => question.value.a[original])
})

const answeredTotal = computed(() => state.answers.filter((a) => a !== null).length)

const picked = ref<number | null>(null)
const locked = ref(false)
const showExit = ref(false)
let advanceTimer: number | undefined

const priorChoice = computed<number | null>(() => {
  const answer = state.answers[state.index]
  if (answer === null || answer === undefined) return null
  const order = state.orders[state.index] ?? [0, 1]
  const displayIndex = order.indexOf(answer)
  return displayIndex >= 0 ? displayIndex : null
})

function choose(displayIndex: number) {
  if (locked.value) return
  locked.value = true
  picked.value = displayIndex
  pick(displayIndex)

  advanceTimer = window.setTimeout(() => {
    if (state.index >= total - 1) {
      goNext()
      emit('finish')
    } else {
      goNext()
      picked.value = null
      locked.value = false
    }
  }, 260)
}

function back() {
  if (state.index === 0 || locked.value) return
  picked.value = null
  goPrev()
}

function onKeydown(e: KeyboardEvent) {
  if (showExit.value) {
    if (e.key === 'Escape') showExit.value = false
    return
  }
  if (locked.value) return

  const key = e.key.toLowerCase()
  if (key === '0') {
    e.preventDefault()
    choose(0)
  } else if (key === '1') {
    e.preventDefault()
    choose(1)
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    back()
  } else if (e.key === 'Escape') {
    showExit.value = true
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  if (advanceTimer) window.clearTimeout(advanceTimer)
})
</script>

<style scoped>
.quiz-view {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.quiz-top {
  padding-top: 18px;
}

.quiz-top-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 52px;
}

.quiz-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quiz-brand-text {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.quiz-brand-text b {
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.quiz-brand-text small {
  font-size: 10px;
  color: #8fb6cf;
}

.quiz-top-label {
  font-size: 11px;
  letter-spacing: 0.1em;
  color: #6f94ad;
}

.exit-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding-inline: 14px;
  border-radius: 999px;
  border: 1px solid rgba(160, 220, 255, 0.16);
  background: rgba(255, 255, 255, 0.03);
  font-size: 12px;
  color: #a9c8dc;
  transition:
    border-color 0.2s,
    color 0.2s,
    background-color 0.2s;
}

.exit-btn:hover {
  border-color: rgba(255, 158, 199, 0.45);
  color: #ffc0dc;
  background: rgba(255, 158, 199, 0.06);
}

.quiz-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: clamp(20px, 4vh, 48px);
  padding-bottom: clamp(32px, 6vh, 72px);
}

.quiz-card {
  position: relative;
  width: 100%;
  max-width: 820px;
  margin-inline: auto;
  padding: clamp(24px, 4vw, 40px);
  border-radius: 30px;
  overflow: hidden;
}

.quiz-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: 50%;
  width: 620px;
  height: 420px;
  transform: translateX(-50%);
  background: radial-gradient(ellipse, var(--accent-glow), transparent 65%);
  filter: blur(50px);
  opacity: 0.5;
  pointer-events: none;
}

.quiz-progress {
  position: relative;
  z-index: 1;
}

.progress-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.step-text {
  font-size: 12.5px;
  color: #8fb2c9;
  letter-spacing: 0.04em;
}

.step-text b {
  font-size: 15px;
  font-weight: 800;
  color: #fff;
  font-variant-numeric: tabular-nums;
}

.dim-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 28px;
  padding-inline: 11px;
  border-radius: 999px;
  border: 1px solid rgba(154, 214, 255, 0.16);
  background: rgba(255, 255, 255, 0.04);
  font-size: 11px;
  color: #c7e6f8;
}

.dim-chip i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  box-shadow: 0 0 8px currentColor;
}

.step-rail {
  display: flex;
  gap: 3px;
  margin-top: 14px;
}

.seg {
  flex: 1;
  height: 5px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.08);
  transition:
    background-color 0.35s ease,
    box-shadow 0.35s ease,
    opacity 0.35s ease;
}

.seg:nth-child(5n):not(:last-child) {
  margin-right: 7px;
}

.seg.done {
  background: var(--seg);
  opacity: 0.72;
}

.seg.answered:not(.done) {
  background: var(--seg);
  opacity: 0.72;
}

.seg.current {
  background: linear-gradient(90deg, var(--seg), rgba(255, 255, 255, 0.55));
  opacity: 1;
  box-shadow: 0 0 10px -1px var(--seg);
}

.progress-sub {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
  font-size: 10px;
  letter-spacing: 0.04em;
  color: #5f839a;
}

.q-zone {
  position: relative;
  z-index: 1;
  margin-top: clamp(24px, 4vw, 38px);
}

.q-body {
  width: 100%;
}

/* 入场只做位移、不动透明度：即使标签页在后台暂停动画，内容也不会隐形 */
.q-in {
  animation: q-in 0.42s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes q-in {
  from {
    transform: translateX(20px);
  }
}

.q-badge-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.q-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 10.5px;
  letter-spacing: 0.12em;
  color: #8fb6cf;
}

.q-index {
  display: inline-grid;
  place-items: center;
  min-width: 26px;
  height: 20px;
  padding-inline: 5px;
  border-radius: 6px;
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  color: var(--accent);
  font-weight: 800;
  letter-spacing: 0.06em;
}

.q-dim-name {
  font-size: 10.5px;
  letter-spacing: 0.06em;
  color: #7fa6c0;
}

.q-dim-name .vs {
  margin-inline: 5px;
  opacity: 0.4;
}

.q-hint {
  margin-top: 20px;
  font-size: 12px;
  color: #7fa6c0;
  letter-spacing: 0.04em;
}

.q-scenario {
  margin-top: 8px;
  font-size: clamp(21px, 3vw, 29px);
  font-weight: 700;
  line-height: 1.62;
  letter-spacing: -0.015em;
  color: #f2fbff;
  max-width: 22em;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: clamp(22px, 3vw, 30px);
}

.opt {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  min-height: 66px;
  padding: 16px 54px 16px 18px;
  text-align: left;
  border-radius: 17px;
  border: 1.5px solid rgba(154, 214, 255, 0.16);
  background: rgba(255, 255, 255, 0.035);
  color: #e3f3fc;
  font-size: 15px;
  line-height: 1.65;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.2s ease;
}

.opt:hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--accent) 55%, transparent);
  background: color-mix(in srgb, var(--accent) 7%, transparent);
  transform: translateX(4px);
}

.opt:hover:not(:disabled) .opt-key {
  opacity: 1;
}

.opt:disabled {
  cursor: default;
}

.opt-badge {
  flex: none;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1.5px solid color-mix(in srgb, var(--accent) 42%, transparent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  color: var(--accent);
  font-size: 14px;
  font-weight: 800;
  transition:
    background-color 0.2s,
    color 0.2s,
    border-color 0.2s;
}

.opt-text {
  flex: 1;
}

.opt-key {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 1px solid rgba(154, 214, 255, 0.14);
  color: #6f94ad;
  font-size: 10.5px;
  opacity: 0;
  transition: opacity 0.2s;
}

.opt.chosen,
.opt.prior {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  box-shadow: 0 0 34px -12px var(--accent-glow);
}

.opt.chosen .opt-badge,
.opt.prior .opt-badge {
  background: var(--accent);
  border-color: var(--accent);
  color: #04212e;
}

.quiz-foot {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 26px;
  padding-top: 20px;
  border-top: 1px solid rgba(154, 214, 255, 0.08);
}

.key-hints {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 10.5px;
  color: #5f839a;
}

.key-hints span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

kbd {
  display: inline-grid;
  place-items: center;
  min-width: 20px;
  height: 20px;
  padding-inline: 5px;
  border-radius: 5px;
  border: 1px solid rgba(154, 214, 255, 0.16);
  background: rgba(255, 255, 255, 0.04);
  font-family: var(--font-sans);
  font-size: 10px;
  color: #9dbfd5;
}

.foot-note {
  font-size: 10.5px;
  color: #5f839a;
}

.q-watermark {
  position: absolute;
  right: 12px;
  bottom: -26px;
  font-size: 190px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.06em;
  color: rgba(255, 255, 255, 0.022);
  pointer-events: none;
  user-select: none;
}

.quiz-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 18px;
  font-size: 10.5px;
  color: #5f839a;
  letter-spacing: 0.03em;
}

/* exit dialog */
.exit-modal {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: grid;
  place-items: center;
  padding: 20px;
}

.exit-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(2, 8, 14, 0.72);
  backdrop-filter: blur(8px);
}

.exit-panel {
  position: relative;
  width: min(400px, 100%);
  padding: 28px;
  border-radius: 24px;
  text-align: center;
}

.exit-icon {
  display: inline-grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 158, 199, 0.1);
  border: 1px solid rgba(255, 158, 199, 0.28);
  color: #ffc0dc;
}

.exit-panel h2 {
  margin-top: 14px;
  font-size: 19px;
  font-weight: 800;
}

.exit-panel p {
  margin-top: 8px;
  font-size: 12.5px;
  line-height: 1.8;
  color: #8fb2c9;
}

.exit-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 22px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.22s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .quiz-top-label {
    display: none;
  }
  .quiz-main {
    padding-top: 12px;
  }
  .quiz-card {
    padding: 22px 18px;
    border-radius: 24px;
  }
  .q-scenario {
    font-size: 19.5px;
    line-height: 1.65;
  }
  .opt {
    font-size: 14px;
    padding: 14px 16px;
    gap: 12px;
  }
  .opt-key {
    display: none;
  }
  .key-hints {
    display: none;
  }
  .foot-note {
    font-size: 10px;
  }
  .q-watermark {
    font-size: 130px;
  }
  .progress-sub span:last-child {
    display: none;
  }
}
</style>
