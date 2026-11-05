<template>
  <button
    type="button"
    class="type-card"
    :style="{ '--hue': type.hue, '--group': group.color }"
    :aria-label="`查看 ${type.code} ${type.name} 的完整画像`"
    @click="$emit('open', type)"
  >
    <div class="portrait">
      <img class="portrait-art" :src="TYPE_ART[type.code]" alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <span class="portrait-shine" aria-hidden="true"></span>
      <span class="portrait-code" aria-hidden="true">{{ type.code }}</span>
      <span class="group-pill">
        <i></i>
        {{ group.label }}
      </span>
      <span class="open-hint">
        查看画像
        <ArrowUpRight :size="13" :stroke-width="2.4" />
      </span>
    </div>

    <div class="card-body">
      <div class="body-top">
        <span class="code">{{ type.code }}</span>
        <span class="mbti">MBTI 同码</span>
      </div>
      <h3>{{ type.name }}</h3>
      <p>{{ type.title }}</p>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUpRight } from '@lucide/vue'
import type { FishType } from '@/data/types'
import { groupOf } from '@/data/types'
import { TYPE_ART } from '@/data/typeArt'

const props = defineProps<{ type: FishType }>()
defineEmits<{ (e: 'open', type: FishType): void }>()

const group = computed(() => groupOf(props.type.code))
</script>

<style scoped>
.type-card {
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: left;
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid rgba(154, 214, 255, 0.13);
  background:
    linear-gradient(165deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.015)),
    rgba(4, 16, 28, 0.5);
  transition:
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.3s ease,
    box-shadow 0.4s ease;
}

.type-card:hover {
  transform: translateY(-6px);
  border-color: hsl(var(--hue) 85% 72% / 0.45);
  box-shadow:
    0 34px 60px -34px rgba(0, 0, 0, 0.95),
    0 0 44px -20px hsl(var(--hue) 90% 65% / 0.65);
}

.portrait {
  position: relative;
  height: 148px;
  overflow: hidden;
  background:
    radial-gradient(120% 110% at 20% 0%, hsl(var(--hue) 92% 72% / 0.6), transparent 60%),
    linear-gradient(155deg, hsl(var(--hue) 86% 58% / 0.55), hsl(calc(var(--hue) + 24) 72% 30% / 0.72) 55%, hsl(calc(var(--hue) - 18) 62% 15% / 0.95));
}

.portrait-art {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 45%;
  opacity: 1;
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.type-card:hover .portrait-art {
  transform: scale(1.06);
}

.portrait-shine {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(3, 12, 20, 0.18) 0%, transparent 38%, rgba(3, 12, 20, 0.62) 100%),
    radial-gradient(80% 55% at 50% 0%, rgba(255, 255, 255, 0.1), transparent 72%);
}

.portrait-code {
  position: absolute;
  right: 12px;
  bottom: -10px;
  font-size: 62px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.05em;
  color: rgba(255, 255, 255, 0.15);
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  pointer-events: none;
}

.group-pill {
  position: absolute;
  top: 12px;
  left: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding-inline: 10px;
  border-radius: 999px;
  background: rgba(3, 14, 24, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(8px);
  font-size: 10.5px;
  letter-spacing: 0.06em;
  color: #e6f7ff;
}

.group-pill i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--group);
  box-shadow: 0 0 8px var(--group);
}

.open-hint {
  position: absolute;
  right: 12px;
  top: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 26px;
  padding-inline: 10px;
  border-radius: 999px;
  background: rgba(3, 14, 24, 0.66);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(8px);
  font-size: 10.5px;
  color: #eaf9ff;
  opacity: 0;
  transform: translateY(-4px);
  transition:
    opacity 0.25s,
    transform 0.25s;
}

.type-card:hover .open-hint {
  opacity: 1;
  transform: translateY(0);
}

.card-body {
  padding: 16px 18px 18px;
}

.body-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.code {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.16em;
  color: hsl(var(--hue) 85% 78%);
}

.mbti {
  font-size: 9.5px;
  letter-spacing: 0.08em;
  color: rgba(150, 190, 215, 0.6);
}

.card-body h3 {
  margin-top: 7px;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #f0faff;
}

.card-body p {
  margin-top: 4px;
  font-size: 11.8px;
  line-height: 1.6;
  color: #8fb2c9;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 560px) {
  .portrait {
    height: 132px;
  }
  .portrait-code {
    font-size: 52px;
  }
}
</style>
