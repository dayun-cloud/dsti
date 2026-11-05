<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="type" class="modal-root" role="presentation">
        <div class="modal-backdrop" @click="emit('close')"></div>
        <div
          class="modal-panel"
          role="dialog"
          aria-modal="true"
          :aria-label="`${type.code} ${type.name} 类型详情`"
          :style="{ '--hue': type.hue }"
        >
          <button ref="closeBtn" class="modal-close" type="button" aria-label="关闭" @click="emit('close')">
            <X :size="18" />
          </button>

          <div class="modal-hero">
            <img :src="TYPE_ART[type.code]" alt="" aria-hidden="true" />
            <div class="modal-hero-text">
              <span class="modal-group">
                <i :style="{ background: groupInfo.color }"></i>
                {{ groupInfo.label }} · {{ groupInfo.labelEn }}
              </span>
              <div class="modal-code" aria-hidden="true">
                <span v-for="(c, i) in type.code.split('')" :key="i" :class="{ alt: i % 2 === 1 }">
                  {{ c }}
                </span>
              </div>
              <h2>{{ type.name }}</h2>
              <p>{{ type.title }}</p>
            </div>
          </div>

          <div class="modal-body">
            <p class="modal-desc">{{ type.desc }}</p>

            <div class="info-grid">
              <div class="info">
                <span class="info-label">🍚 干饭风格</span>
                <p>{{ type.rice }}</p>
              </div>
              <div class="info">
                <span class="info-label">🏠 与主人相处</span>
                <p>{{ type.master }}</p>
              </div>
            </div>

            <blockquote class="pbit">
              <Quote :size="16" />
              <p>{{ type.pbit }}</p>
            </blockquote>

            <div class="dialogues">
              <h3>口吻示例</h3>
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
          </div>

          <div class="modal-foot">
            <span class="foot-code">DSTI-{{ type.code }} · 对应 MBTI {{ type.code }}</span>
            <button class="btn btn-primary btn-sm" type="button" @click="emit('start')">
              测测我养的是哪型
              <ArrowRight :size="15" :stroke-width="2.5" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { ArrowRight, Quote, X } from '@lucide/vue'
import type { FishType } from '@/data/types'
import { groupOf } from '@/data/types'
import { TYPE_ART } from '@/data/typeArt'

const props = defineProps<{ type: FishType | null }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'start'): void }>()

const closeBtn = ref<HTMLButtonElement | null>(null)
const groupInfo = computed(() => (props.type ? groupOf(props.type.code) : groupOf('INTJ')))

let previousOverflow = ''
let previousFocus: HTMLElement | null = null

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

watch(
  () => props.type,
  async (value) => {
    if (value) {
      previousOverflow = document.body.style.overflow
      previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKeydown)
      await nextTick()
      closeBtn.value?.focus()
    } else {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeydown)
      if (previousFocus?.isConnected) previousFocus.focus()
      previousFocus = null
    }
  },
)

onBeforeUnmount(() => {
  document.body.style.overflow = previousOverflow
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.modal-root {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: grid;
  place-items: center;
  padding: 24px;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(2, 8, 14, 0.72);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.modal-panel {
  position: relative;
  width: min(680px, 100%);
  max-height: min(86vh, 900px);
  display: flex;
  flex-direction: column;
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid rgba(154, 214, 255, 0.2);
  background: linear-gradient(170deg, rgba(10, 31, 48, 0.98), rgba(3, 12, 21, 0.99));
  box-shadow:
    0 50px 120px -40px rgba(0, 0, 0, 1),
    0 0 80px -30px hsl(var(--hue) 85% 60% / 0.45);
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 3;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(4, 16, 26, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #dff4ff;
  backdrop-filter: blur(8px);
  transition:
    background-color 0.2s,
    transform 0.2s;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: rotate(90deg);
}

.modal-hero {
  position: relative;
  flex: none;
  height: 240px;
  padding: 24px 28px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  background:
    radial-gradient(110% 130% at 15% 0%, hsl(var(--hue) 90% 66% / 0.55), transparent 62%),
    linear-gradient(150deg, hsl(var(--hue) 82% 46% / 0.5), hsl(calc(var(--hue) + 20) 70% 22% / 0.9));
}

.modal-hero img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 38%;
  opacity: 1;
}

.modal-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(3, 12, 21, 0.94) 0%, rgba(3, 12, 21, 0.68) 38%, rgba(3, 12, 21, 0.12) 78%),
    linear-gradient(180deg, rgba(3, 12, 21, 0.05) 0%, rgba(3, 12, 21, 0.88) 100%);
}

.modal-hero-text {
  position: relative;
  z-index: 1;
}

.modal-group {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 24px;
  padding-inline: 10px;
  border-radius: 999px;
  background: rgba(3, 14, 24, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(8px);
  font-size: 10px;
  letter-spacing: 0.08em;
  color: #eaf9ff;
}

.modal-group i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.modal-code {
  display: flex;
  gap: 6px;
  margin-top: 12px;
}

.modal-code span {
  display: grid;
  place-items: center;
  width: 38px;
  height: 42px;
  border-radius: 10px;
  font-size: 21px;
  font-weight: 900;
  color: #04202e;
  background: linear-gradient(160deg, #d8fbff, #8ceaff);
  box-shadow: 0 6px 18px -8px rgba(93, 220, 255, 0.9);
}

.modal-code span.alt {
  background: linear-gradient(160deg, #eaf7ff, #c9a3ff 45%, #ffb3d4);
  box-shadow: 0 6px 18px -8px rgba(255, 179, 212, 0.8);
}

.modal-hero h2 {
  margin-top: 12px;
  font-size: 27px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #fff;
}

.modal-hero p {
  margin-top: 3px;
  font-size: 13.5px;
  color: #cfe9f8;
}

.modal-body {
  overflow-y: auto;
  padding: 24px 28px 8px;
}

.modal-desc {
  font-size: 14.5px;
  line-height: 1.9;
  color: #cfe6f5;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 20px;
}

.info {
  padding: 14px 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(154, 214, 255, 0.12);
}

.info-label {
  font-size: 11.5px;
  font-weight: 700;
  color: #8ceaff;
  letter-spacing: 0.04em;
}

.info p {
  margin-top: 7px;
  font-size: 12.8px;
  line-height: 1.8;
  color: #b9d4e5;
}

.pbit {
  position: relative;
  display: flex;
  gap: 10px;
  margin-top: 16px;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid rgba(255, 158, 199, 0.2);
  background: rgba(255, 158, 199, 0.06);
  color: #ffd0e4;
}

.pbit svg {
  flex: none;
  margin-top: 3px;
  opacity: 0.7;
}

.pbit p {
  font-size: 12.8px;
  line-height: 1.8;
}

.dialogues {
  margin-top: 22px;
}

.dialogues h3 {
  font-size: 12px;
  letter-spacing: 0.12em;
  color: #7fa6c0;
  font-weight: 600;
}

.dialogue {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bubble {
  max-width: 88%;
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 12.8px;
  line-height: 1.75;
}

.bubble .who {
  display: block;
  font-size: 9.5px;
  letter-spacing: 0.1em;
  margin-bottom: 3px;
  opacity: 0.55;
}

.bubble-user {
  align-self: flex-start;
  background: rgba(255, 255, 255, 0.055);
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

.modal-foot {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 16px 28px;
  border-top: 1px solid rgba(154, 214, 255, 0.1);
  background: rgba(4, 14, 24, 0.6);
}

.foot-code {
  font-size: 11px;
  letter-spacing: 0.06em;
  color: #7fa6c0;
}

/* transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.28s ease;
}

.modal-enter-active .modal-panel,
.modal-leave-active .modal-panel {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-panel,
.modal-leave-to .modal-panel {
  transform: translateY(24px) scale(0.97);
}

@media (max-width: 620px) {
  .modal-root {
    padding: 0;
    align-items: flex-end;
  }
  .modal-panel {
    width: 100%;
    max-height: 92vh;
    border-radius: 26px 26px 0 0;
    border-bottom: none;
  }
  .modal-hero {
    height: 200px;
    padding: 20px 20px;
  }
  .modal-body {
    padding: 20px 20px 6px;
  }
  .info-grid {
    grid-template-columns: 1fr;
  }
  .modal-foot {
    padding: 14px 20px calc(14px + env(safe-area-inset-bottom));
  }
  .foot-code {
    display: none;
  }
  .modal-foot .btn {
    width: 100%;
  }
}
</style>
