<template>
  <section id="pokedex" class="section">
    <div class="shell">
      <header class="gallery-head" v-reveal>
        <div>
          <span class="eyebrow"><Fish :size="13" /> Type Atlas</span>
          <h2 class="section-title">16 型大肥鱼图鉴</h2>
          <p class="section-lead">
            先认认脸。点开任意一型，看看她的性格底色、干饭方式和与主人相处的小习惯。
          </p>
        </div>
        <span class="gallery-hint">共 16 型 · 点击卡片展开画像</span>
      </header>

      <div class="filters" role="group" aria-label="按类型分组筛选" v-reveal="60">
        <button
          type="button"
          class="chip"
          :class="{ 'is-active': active === 'all' }"
          :aria-pressed="active === 'all'"
          @click="active = 'all'"
        >
          全部
          <span class="count">{{ TYPE_CODES.length }}</span>
        </button>
        <button
          v-for="g in GROUPS"
          :key="g.key"
          type="button"
          class="chip"
          :class="{ 'is-active': active === g.key }"
          :aria-pressed="active === g.key"
          @click="active = g.key"
        >
          <i class="chip-dot" :style="{ background: g.color }"></i>
          {{ g.label }}
          <span class="count">{{ counts[g.key] }}</span>
        </button>
      </div>

      <div :key="active" class="type-grid grid-anim">
        <TypeCard v-for="t in visibleTypes" :key="t.code" :type="t" @open="selected = $event" />
      </div>
    </div>

    <TypeModal :type="selected" @close="selected = null" @start="startFromModal" />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Fish } from '@lucide/vue'
import TypeCard from './TypeCard.vue'
import TypeModal from './TypeModal.vue'
import {
  GROUPS,
  TYPES,
  TYPE_CODES,
  type FishType,
  type GroupKey,
} from '@/data/types'

const emit = defineEmits<{ (e: 'start'): void }>()

const active = ref<'all' | GroupKey>('all')
const selected = ref<FishType | null>(null)

const counts = computed(() => {
  const map = { analyst: 0, diplomat: 0, sentinel: 0, explorer: 0 }
  for (const code of TYPE_CODES) map[TYPES[code].group] += 1
  return map
})

const visibleTypes = computed(() =>
  TYPE_CODES.map((code) => TYPES[code]).filter(
    (t) => active.value === 'all' || t.group === active.value,
  ),
)

function startFromModal() {
  selected.value = null
  emit('start')
}
</script>

<style scoped>
.gallery-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 26px;
}

.gallery-head .section-title {
  margin-top: 14px;
}

.gallery-hint {
  font-size: 11.5px;
  letter-spacing: 0.06em;
  color: #6f94ad;
  padding-bottom: 4px;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 22px;
}

.count {
  font-size: 10px;
  opacity: 0.6;
  font-variant-numeric: tabular-nums;
}

.type-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

/* 切换筛选时整组淡入，避免个别卡片从第二行“跳”到第一行 */
.grid-anim {
  animation: grid-in 0.42s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes grid-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 560px) {
  .gallery-hint {
    display: none;
  }
  .type-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
}
</style>
