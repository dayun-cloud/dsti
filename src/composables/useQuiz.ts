import { computed, reactive } from 'vue'
import { QUESTIONS } from '@/data/questions'
import type { Answer } from '@/data/scoring'

export type QuizScreen = 'home' | 'quiz' | 'result'
export type QuizMode = 'human' | 'fish'

interface QuizState {
  index: number
  answers: (Answer | null)[]
  /** 每题展示顺序：值为原始选项下标 */
  orders: number[][]
  startedAt: number
  finishedAt: number
  /** human = 用户手动答题；fish = 粘贴大肥鱼自己给出的 20 位答案 */
  mode: QuizMode
}

const state = reactive<QuizState>({
  index: 0,
  answers: Array<Answer | null>(QUESTIONS.length).fill(null),
  orders: [],
  startedAt: 0,
  finishedAt: 0,
  mode: 'human',
})

function buildOrders(): number[][] {
  return QUESTIONS.map(() => (Math.random() < 0.5 ? [0, 1] : [1, 0]))
}

/* ------------------------------------------------------------------ */
/*  本地进度（localStorage）                                           */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = 'dsti.quiz.v1'

interface SavedQuiz {
  version: 1
  screen: QuizScreen
  index: number
  answers: (Answer | null)[]
  orders: number[][]
  startedAt: number
  finishedAt: number
  mode: QuizMode
}

export interface RestoredProgress {
  screen: 'quiz' | 'result'
  index: number
  answered: number
  mode: QuizMode
}

function isAnswer(value: unknown): value is Answer | null {
  return value === null || value === 0 || value === 1
}

/** 把当前答题状态写入 localStorage，页面刷新/关闭后可恢复 */
export function saveProgress(screen: QuizScreen): void {
  try {
    const payload: SavedQuiz = {
      version: 1,
      screen,
      index: state.index,
      answers: state.answers,
      orders: state.orders,
      startedAt: state.startedAt,
      finishedAt: state.finishedAt,
      mode: state.mode,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // 隐私模式、配额不足等情况下静默失败，不影响答题
  }
}

/** 读取并校验上次进度；没有可恢复内容时返回 null */
export function restoreProgress(): RestoredProgress | null {
  try {
    if (typeof localStorage === 'undefined') return null
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const data = JSON.parse(raw) as Partial<SavedQuiz>
    if (data.version !== 1) return null
    if (data.screen !== 'quiz' && data.screen !== 'result') return null

    const answers = data.answers
    if (!Array.isArray(answers) || answers.length !== QUESTIONS.length || !answers.every(isAnswer)) {
      return null
    }

    const orders = data.orders
    if (
      !Array.isArray(orders) ||
      orders.length !== QUESTIONS.length ||
      !orders.every(
        (order) =>
          Array.isArray(order) &&
          order.length === 2 &&
          order.every((n) => n === 0 || n === 1),
      )
    ) {
      return null
    }

    const index = data.index
    if (typeof index !== 'number' || !Number.isInteger(index)) return null
    if (index < 0 || index >= QUESTIONS.length) return null

    const answered = answers.filter((a) => a !== null).length
    if (data.screen === 'quiz' && answered === 0) return null
    if (data.screen === 'result' && answered !== QUESTIONS.length) return null

    // 已经答完但停在答题页（例如答完最后一题后立刻刷新）→ 直接看结果
    const screen: 'quiz' | 'result' =
      answered === QUESTIONS.length ? 'result' : 'quiz'

    state.index = index
    state.answers = answers as (Answer | null)[]
    state.orders = orders as number[][]
    state.startedAt = typeof data.startedAt === 'number' ? data.startedAt : 0
    state.finishedAt =
      typeof data.finishedAt === 'number' && data.finishedAt > 0
        ? data.finishedAt
        : screen === 'result'
          ? Date.now()
          : 0
    state.mode = data.mode === 'fish' ? 'fish' : 'human'

    return { screen, index: state.index, answered, mode: state.mode }
  } catch {
    return null
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

/* ------------------------------------------------------------------ */

export function useQuiz() {
  const answeredCount = computed(() => state.answers.filter((a) => a !== null).length)
  const isComplete = computed(() => answeredCount.value === QUESTIONS.length)

  function start() {
    state.index = 0
    state.answers = Array<Answer | null>(QUESTIONS.length).fill(null)
    state.orders = buildOrders()
    state.startedAt = Date.now()
    state.finishedAt = 0
    state.mode = 'human'
  }

  /** displayIndex 是打乱后的展示位置，映射回原始选项下标 */
  function pick(displayIndex: number): Answer {
    const original = (state.orders[state.index]?.[displayIndex] ?? displayIndex) as Answer
    state.answers[state.index] = original
    return original
  }

  function goNext() {
    if (state.index < QUESTIONS.length - 1) {
      state.index += 1
    } else {
      state.finishedAt = Date.now()
    }
  }

  function goPrev() {
    if (state.index > 0) state.index -= 1
  }

  function reset() {
    state.index = 0
    state.answers = Array<Answer | null>(QUESTIONS.length).fill(null)
    state.orders = buildOrders()
    state.startedAt = 0
    state.finishedAt = 0
    state.mode = 'human'
  }

  /**
   * 大肥鱼自测：0/1 序列直接对应每题原始选项（0 = a[0]，1 = a[1]）。
   * 只接受 20 位；调用方负责校验。
   */
  function completeSelfTest(digits: string): boolean {
    const clean = digits.replace(/[^01]/g, '')
    if (clean.length !== QUESTIONS.length) return false

    state.index = QUESTIONS.length - 1
    state.answers = clean.split('').map((d) => (d === '0' ? 0 : 1)) as Answer[]
    state.orders = QUESTIONS.map(() => [0, 1])
    state.startedAt = Date.now()
    state.finishedAt = Date.now()
    state.mode = 'fish'
    return true
  }

  function durationText(): string {
    if (!state.startedAt) return '约 3 分钟'
    const end = state.finishedAt || Date.now()
    const seconds = Math.max(1, Math.round((end - state.startedAt) / 1000))
    if (seconds < 60) return `${seconds} 秒`
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return s ? `${m} 分 ${s} 秒` : `${m} 分钟`
  }

  return {
    state,
    answeredCount,
    isComplete,
    start,
    pick,
    goNext,
    goPrev,
    reset,
    completeSelfTest,
    durationText,
  }
}
