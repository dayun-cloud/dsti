<template>
  <section id="dimensions" class="section">
    <div class="shell">
      <header class="sec-head" v-reveal>
        <span class="eyebrow"><Compass :size="13" /> Four Dimensions</span>
        <h2 class="section-title">四个维度，四条鱼生岔路</h2>
        <p class="section-lead">
          每个维度 5 道题，按两侧极性累计得分，高侧字母拼起来就是你的 DSTI 四字母码。没有平票，也没有「偏中间」的模糊地带。
        </p>
      </header>

      <div class="dim-grid">
        <article
          v-for="(d, i) in dims"
          :key="d.key"
          v-reveal="i * 80"
          class="glass card dim-card"
          :style="{ '--accent': d.accent, '--accent-glow': d.glow }"
        >
          <div class="dim-head">
            <span class="dim-index">维度 0{{ i + 1 }}</span>
            <span class="dim-label">{{ d.label }}</span>
            <span class="dim-sub">{{ d.subtitle }}</span>
          </div>

          <div class="dim-scale" aria-hidden="true">
            <b class="pole-letter">{{ d.left.key }}</b>
            <span class="scale">
              <i class="scale-line"></i>
              <i class="scale-knob"></i>
            </span>
            <b class="pole-letter">{{ d.right.key }}</b>
          </div>

          <div class="poles">
            <div class="pole">
              <b>{{ d.left.name }}</b>
              <span>{{ d.left.desc }}</span>
            </div>
            <div class="pole pole-right">
              <b>{{ d.right.name }}</b>
              <span>{{ d.right.desc }}</span>
            </div>
          </div>
        </article>
      </div>

      <p class="dim-foot" v-reveal>
        <Info :size="14" />
        示例：E 得 4 分、I 得 1 分 → 记为 <b>E</b>；四个维度依次拼接，得到如 <b>ENFP</b> 的类型码。
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Compass, Info } from '@lucide/vue'
import { DIM_ORDER, DIMENSIONS } from '@/data/dimensions'

const dims = DIM_ORDER.map((k) => DIMENSIONS[k])
</script>

<style scoped>
.sec-head {
  max-width: 720px;
  margin-bottom: clamp(34px, 5vw, 50px);
}

.sec-head .section-title {
  margin-top: 14px;
}

.dim-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.dim-card {
  position: relative;
  padding: 26px 26px 24px;
  overflow: hidden;
  transition:
    border-color 0.3s ease,
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.4s ease;
}

.dim-card::before {
  content: '';
  position: absolute;
  inset: -40% -30% auto auto;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent-glow), transparent 65%);
  filter: blur(30px);
  opacity: 0.55;
  transition: opacity 0.4s;
}

.dim-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--accent) 42%, transparent);
  box-shadow:
    0 30px 60px -34px rgba(0, 0, 0, 0.9),
    0 0 40px -18px var(--accent-glow);
}

.dim-head {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.dim-index {
  font-size: 10.5px;
  letter-spacing: 0.14em;
  color: rgba(160, 210, 240, 0.4);
}

.dim-label {
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 24%, transparent);
}

.dim-sub {
  font-size: 12px;
  color: #86aac2;
}

.dim-scale {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 28px;
}

.pole-letter {
  font-size: 30px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--accent);
  text-shadow: 0 0 26px color-mix(in srgb, var(--accent) 45%, transparent);
}

.scale {
  position: relative;
  flex: 1;
  height: 10px;
  display: flex;
  align-items: center;
}

.scale-line {
  width: 100%;
  height: 2px;
  border-radius: 99px;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--accent) 80%, transparent),
    rgba(255, 255, 255, 0.12) 50%,
    color-mix(in srgb, var(--accent) 80%, transparent)
  );
}

.scale-knob {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 12px;
  height: 12px;
  margin: -6px 0 0 -6px;
  border-radius: 50%;
  background: #eaf9ff;
  border: 2px solid var(--accent);
  box-shadow: 0 0 18px var(--accent);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.dim-card:hover .scale-knob {
  transform: scale(1.2);
}

.poles {
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 18px;
}

.pole {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.pole-right {
  text-align: right;
}

.pole b {
  font-size: 14px;
  font-weight: 700;
  color: #e9f6ff;
}

.pole span {
  font-size: 12px;
  color: #8fb2c9;
  line-height: 1.6;
}

.dim-foot {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  font-size: 12.5px;
  color: #7fa6c0;
}

.dim-foot b {
  color: #bfe9ff;
  font-weight: 700;
}

@media (max-width: 760px) {
  .dim-grid {
    grid-template-columns: 1fr;
  }
  .dim-card {
    padding: 22px 20px;
  }
  .dim-foot {
    align-items: flex-start;
    line-height: 1.7;
  }
}
</style>
