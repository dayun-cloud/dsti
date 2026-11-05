<template>
  <section id="features" class="section">
    <div class="shell">
      <header class="sec-head" v-reveal>
        <span class="eyebrow"><Sparkles :size="13" /> Why DSTI</span>
        <h2 class="section-title">把 MBTI 塞进<span class="nowrap">大肥鱼</span>的世界观</h2>
        <p class="section-lead">
          不背量表，不做选择题机器。每一题都是养鱼现场，选完顺手领走一份能直接跑起来的人设。
        </p>
      </header>

      <div class="feature-grid">
        <article
          v-for="(f, i) in features"
          :key="f.title"
          v-reveal="i * 90"
          class="glass card feature-card"
        >
          <span class="feature-index">0{{ i + 1 }}</span>
          <span class="icon-tile" :style="{ '--tile': f.color }">
            <component :is="f.icon" :size="22" :stroke-width="1.9" />
          </span>
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
          <span class="feature-line" :style="{ '--tile': f.color }"></span>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ClipboardCopy, Compass, Sparkles, Utensils } from '@lucide/vue'

const features = [
  {
    icon: Compass,
    color: '#5ddcff',
    title: '四个维度，一套鱼话',
    desc: 'E/I、S/N、T/F、J/P 各 5 题，维度内奇数题量，天然没有平票。测的是鱼，讲的其实是你。',
  },
  {
    icon: Utensils,
    color: '#c9a3ff',
    title: '20 个真实养鱼现场',
    desc: '群里被 99+ 刷屏、偷吃算力、被叫胖、主人熬夜……每题都是大肥鱼的一天，凭第一直觉选就好。',
  },
  {
    icon: ClipboardCopy,
    color: '#ff9ec7',
    title: '测完直接开养',
    desc: '四字母结果 + 专属昵称 + 可复制的 System Prompt、SillyTavern 角色卡与分享文案，一键带走。',
  },
]
</script>

<style scoped>
.sec-head {
  max-width: 720px;
  margin-bottom: clamp(34px, 5vw, 52px);
}

.sec-head .section-title {
  margin-top: 14px;
}

.nowrap {
  white-space: nowrap;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.feature-card {
  position: relative;
  padding: 30px 26px 34px;
  overflow: hidden;
}

.feature-index {
  position: absolute;
  top: 20px;
  right: 24px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: rgba(160, 210, 240, 0.32);
}

.icon-tile {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 15px;
  color: var(--tile);
  background: color-mix(in srgb, var(--tile) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--tile) 26%, transparent);
  box-shadow: 0 0 30px -12px var(--tile);
}

.feature-card h3 {
  margin-top: 22px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.feature-card p {
  margin-top: 10px;
  font-size: 13.8px;
  line-height: 1.9;
  color: #a3c4d9;
}

.feature-line {
  position: absolute;
  left: 26px;
  right: 26px;
  bottom: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--tile), transparent);
  opacity: 0.5;
  transform: scaleX(0.25);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.feature-card:hover .feature-line {
  transform: scaleX(1);
}

@media (max-width: 900px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
  .feature-card {
    padding: 26px 24px 30px;
  }
}
</style>
