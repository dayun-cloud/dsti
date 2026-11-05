<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled }">
    <div class="shell header-inner">
      <button class="logo" type="button" aria-label="回到首页" @click="$emit('home')">
        <BrandMark size="md" />
        <span class="logo-text">
          <strong>DSTI</strong>
          <small>大肥鱼人格测试</small>
        </span>
      </button>

      <nav v-if="screen === 'home'" class="nav" aria-label="页面导航">
        <a href="#dimensions">四个维度</a>
        <a href="#pokedex">16 型图鉴</a>
        <a href="#prompt">人设提示词</a>
        <a href="#selftest">让鱼自答</a>
        <a href="#faq">常见问题</a>
      </nav>

      <div class="actions">
        <button
          v-if="screen === 'result'"
          class="btn btn-ghost btn-sm hide-sm"
          type="button"
          @click="$emit('home')"
        >
          回到首页
        </button>
        <button class="btn btn-primary btn-sm" type="button" @click="onPrimary">
          {{ primaryLabel }}
          <ArrowRight :size="15" :stroke-width="2.5" />
        </button>
        <button
          v-if="screen === 'home'"
          class="menu-btn"
          type="button"
          :aria-expanded="menuOpen"
          :aria-label="menuOpen ? '关闭菜单' : '打开菜单'"
          @click="menuOpen = !menuOpen"
        >
          <X v-if="menuOpen" :size="20" />
          <Menu v-else :size="20" />
        </button>
      </div>
    </div>

    <Transition name="drawer">
      <div v-if="menuOpen && screen === 'home'" class="mobile-nav">
        <a href="#dimensions" @click="menuOpen = false">四个维度</a>
        <a href="#pokedex" @click="menuOpen = false">16 型图鉴</a>
        <a href="#prompt" @click="menuOpen = false">人设提示词</a>
        <a href="#selftest" @click="menuOpen = false">让鱼自答</a>
        <a href="#faq" @click="menuOpen = false">常见问题</a>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { ArrowRight, Menu, X } from '@lucide/vue'
import BrandMark from './BrandMark.vue'

const props = defineProps<{ screen: 'home' | 'result'; fish?: boolean }>()
const emit = defineEmits<{
  (e: 'start'): void
  (e: 'home'): void
  (e: 'retakeFish'): void
}>()

const primaryLabel = computed(() => {
  if (props.screen !== 'result') return '开始测试'
  return props.fish ? '让鱼再答' : '重新测试'
})

function onPrimary() {
  if (props.screen === 'result' && props.fish) emit('retakeFish')
  else emit('start')
}

const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 18
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  transition:
    background-color 0.35s ease,
    border-color 0.35s ease,
    backdrop-filter 0.35s ease;
  border-bottom: 1px solid transparent;
}

.site-header.is-scrolled {
  background: rgba(3, 11, 20, 0.72);
  border-bottom-color: rgba(150, 220, 255, 0.1);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
}

.header-inner {
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 11px;
  text-align: left;
}

.logo-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.logo-text strong {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.16em;
  line-height: 1.1;
}

.logo-text small {
  font-size: 10.5px;
  color: #8fb6cf;
  letter-spacing: 0.08em;
}

.nav {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav a {
  position: relative;
  font-size: 13.5px;
  color: #a9c8dc;
  transition: color 0.2s;
  padding-block: 6px;
}

.nav a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1.5px;
  border-radius: 2px;
  background: linear-gradient(90deg, #8ceaff, #ffb3d4);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav a:hover {
  color: #fff;
}

.nav a:hover::after {
  transform: scaleX(1);
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.menu-btn {
  display: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(160, 220, 255, 0.2);
  background: rgba(255, 255, 255, 0.04);
  place-items: center;
  color: #dff4ff;
}

.mobile-nav {
  display: none;
  flex-direction: column;
  gap: 2px;
  padding: 8px 18px 18px;
  background: rgba(3, 11, 20, 0.96);
  border-bottom: 1px solid rgba(150, 220, 255, 0.1);
  backdrop-filter: blur(18px);
}

.mobile-nav a {
  padding: 13px 8px;
  font-size: 14.5px;
  color: #cfe8f8;
  border-bottom: 1px solid rgba(150, 220, 255, 0.07);
}

.mobile-nav a:last-child {
  border-bottom: none;
}

.drawer-enter-active,
.drawer-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 1024px) {
  .nav {
    display: none;
  }
  .menu-btn {
    display: grid;
  }
  .mobile-nav {
    display: flex;
  }
}

@media (max-width: 520px) {
  .hide-sm {
    display: none;
  }
  .header-inner {
    height: 68px;
  }
  .logo-text small {
    display: none;
  }
}
</style>
