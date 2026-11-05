<template>
  <a class="skip-link" href="#main">跳到主要内容</a>

  <OceanBackground />

  <AppHeader
    v-if="screen !== 'quiz'"
    :screen="screen === 'result' ? 'result' : 'home'"
    :fish="state.mode === 'fish'"
    @start="startQuiz"
    @home="goHome"
    @retake-fish="retakeFish"
  />

  <main id="main">
    <div :key="screen" class="view-frame">
      <HomeView v-if="screen === 'home'" @start="startQuiz" @complete="finishSelfTest" />
      <QuizView v-else-if="screen === 'quiz'" @finish="finishQuiz" @home="goHome" />
      <ResultView v-else @restart="startQuiz" @home="goHome" @retake-fish="retakeFish" />
    </div>
  </main>

  <AppFooter v-if="screen !== 'quiz'" @navigate="navigateTo" @start="startQuiz" />

  <ToastMessage />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import OceanBackground from '@/components/OceanBackground.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import ToastMessage from '@/components/ToastMessage.vue'
import HomeView from '@/views/HomeView.vue'
import QuizView from '@/views/QuizView.vue'
import ResultView from '@/views/ResultView.vue'
import { useQuiz, restoreProgress, saveProgress, type QuizScreen } from '@/composables/useQuiz'
import { useToast } from '@/composables/useToast'

const restored = restoreProgress()
const screen = ref<QuizScreen>(restored?.screen ?? 'home')
const { start, state } = useQuiz()

if (restored) {
  const { show } = useToast()
  show(
    restored.screen === 'result'
      ? restored.mode === 'fish'
        ? '已恢复上次的大肥鱼自测结果'
        : '已恢复上次的测试结果'
      : `已恢复上次进度 · 第 ${restored.index + 1} 题`,
    'info',
  )
}

/* 答题进度、结果与当前页面写入 localStorage，刷新后可恢复 */
watch(
  () => [screen.value, state.index, state.answers.slice(), state.orders.slice(), state.finishedAt, state.mode],
  () => saveProgress(screen.value),
)

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'auto' })
}

function startQuiz() {
  start()
  screen.value = 'quiz'
  scrollTop()
}

function finishQuiz() {
  screen.value = 'result'
  scrollTop()
}

function finishSelfTest() {
  screen.value = 'result'
  scrollTop()
}

function scrollToSection(id: string) {
  const section = document.getElementById(id)
  if (!section) return
  // 直接定位到区块内容，跳过 section 自身的上下留白，避免导航后上方空太多
  const content =
    section.querySelector<HTMLElement>('.sec-head, .gallery-head, .prompt-grid, .faq-grid') ?? section
  const top = content.getBoundingClientRect().top + window.scrollY - 88
  window.scrollTo({
    top: Math.max(0, top),
    behavior: document.hidden ? 'instant' : 'smooth',
  })
}

function retakeFish() {
  screen.value = 'home'
  window.setTimeout(() => scrollToSection('selftest'), 420)
}

function goHome() {
  screen.value = 'home'
  scrollTop()
}

function navigateTo(id: string) {
  if (screen.value !== 'home') {
    screen.value = 'home'
    window.setTimeout(() => scrollToSection(id), 420)
    return
  }
  scrollToSection(id)
}

/** 拦截页内 section 锚点，滚动时跳过 section 顶部留白 */
function onDocumentClick(e: MouseEvent) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
    return
  }
  const target = e.target as Element | null
  const anchor = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
  if (!anchor) return

  const hash = anchor.getAttribute('href')
  if (!hash || hash.length < 2) return

  const id = decodeURIComponent(hash.slice(1))
  const section = document.getElementById(id)
  if (!section || !section.classList.contains('section')) return

  e.preventDefault()
  scrollToSection(id)
}

watch(screen, () => {
  // 视图切换后确保回到顶部（Transition 为 out-in，元素稍后挂载）
  window.scrollTo({ top: 0, behavior: 'auto' })
})

onMounted(() => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  document.addEventListener('click', onDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
})
</script>

<style scoped>
.view-frame {
  animation: view-in 0.42s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 只做位移、不改透明度：标签页后台暂停动画时也不会出现空白页 */
@keyframes view-in {
  from {
    transform: translateY(14px);
  }
}

.skip-link {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translate(-50%, -160%);
  z-index: 200;
  padding: 10px 18px;
  border-radius: 999px;
  background: #8ceaff;
  color: #03222f;
  font-size: 13px;
  font-weight: 700;
  transition: transform 0.2s ease;
}

.skip-link:focus {
  transform: translate(-50%, 0);
}
</style>
