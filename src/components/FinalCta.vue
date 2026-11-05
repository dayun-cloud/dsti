<template>
  <section class="cta-section">
    <div class="shell">
      <div class="cta-band" v-reveal>
        <div class="cta-orb orb-1" aria-hidden="true"></div>
        <div class="cta-orb orb-2" aria-hidden="true"></div>
        <div class="cta-ring" aria-hidden="true"></div>

        <div class="cta-copy">
          <span class="eyebrow"><Sparkles :size="13" /> One last thing</span>
          <h2>所以，你的大肥鱼<br /><span class="text-gradient">到底是什么DSTI？</span></h2>
          <p>20 道题，三分钟。测完顺便把能直接部署的人设卡领走。</p>
        </div>

        <div class="cta-action">
          <button class="btn btn-primary btn-lg" type="button" @click="$emit('start')">
            开始测试
            <ArrowRight :size="18" :stroke-width="2.6" />
          </button>
          <span class="cta-hint">免费 · 无需登录 · 结果仅存本地</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Sparkles } from '@lucide/vue'

defineEmits<{ (e: 'start'): void }>()
</script>

<style scoped>
.cta-section {
  padding-block: clamp(40px, 6vw, 72px) clamp(56px, 8vw, 96px);
}

.cta-band {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
  padding: clamp(32px, 5vw, 56px);
  border-radius: 32px;
  overflow: hidden;
  border: 1px solid rgba(154, 214, 255, 0.16);
  background:
    linear-gradient(135deg, rgba(93, 220, 255, 0.09), rgba(255, 158, 199, 0.04)),
    rgba(5, 18, 30, 0.6);
  backdrop-filter: blur(18px);
  box-shadow:
    0 40px 90px -46px rgba(0, 0, 0, 1),
    inset 0 1px 0 rgba(255, 255, 255, 0.09);
}

.cta-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(50px);
  pointer-events: none;
}

.orb-1 {
  width: 340px;
  height: 340px;
  top: -60%;
  left: 8%;
  background: radial-gradient(circle, rgba(93, 220, 255, 0.3), transparent 65%);
}

.orb-2 {
  width: 300px;
  height: 300px;
  bottom: -70%;
  right: 12%;
  background: radial-gradient(circle, rgba(255, 158, 199, 0.16), transparent 65%);
}

.cta-ring {
  position: absolute;
  right: -60px;
  top: 50%;
  width: 280px;
  height: 280px;
  margin-top: -140px;
  border-radius: 50%;
  border: 1px dashed rgba(140, 230, 255, 0.14);
  pointer-events: none;
}

.cta-copy {
  position: relative;
  z-index: 1;
}

.cta-copy h2 {
  margin-top: 14px;
  font-size: clamp(26px, 3.6vw, 42px);
  font-weight: 800;
  line-height: 1.22;
  letter-spacing: -0.025em;
}

.cta-copy p {
  margin-top: 12px;
  font-size: 14px;
  color: #9dbfd5;
}

.cta-action {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.cta-hint {
  font-size: 10.5px;
  letter-spacing: 0.06em;
  color: #6f94ad;
}

@media (max-width: 720px) {
  .cta-band {
    flex-direction: column;
    align-items: flex-start;
  }
  .cta-action {
    width: 100%;
  }
  .cta-action .btn {
    width: 100%;
  }
}
</style>
