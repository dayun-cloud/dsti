import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

const app = createApp(App)

/**
 * v-reveal：元素进入视口时淡入上浮。
 * 用法：v-reveal 或 v-reveal="120"（延迟毫秒）
 */
app.directive('reveal', {
  mounted(el: HTMLElement, binding) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.classList.add('reveal')

    // 后台标签页里 IntersectionObserver/动画会被暂停，此时直接展示内容，避免空白
    if (reduce || document.hidden || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }

    const delay = typeof binding.value === 'number' ? binding.value : 0
    if (delay > 0) el.style.transitionDelay = `${delay}ms`

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            observer.unobserve(el)
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )

    observer.observe(el)
    ;(el as HTMLElement & { __revealObserver?: IntersectionObserver }).__revealObserver = observer
  },
  unmounted(el: HTMLElement) {
    ;(el as HTMLElement & { __revealObserver?: IntersectionObserver }).__revealObserver?.disconnect()
  },
})

app.mount('#app')
