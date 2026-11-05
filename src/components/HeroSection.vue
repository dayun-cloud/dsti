<template>
  <section class="hero">
    <div class="shell hero-grid">
      <div class="hero-copy">
        <span class="hero-badge animate-fade-up">
          <i class="live-dot"></i>
          DeepSeek 社区二创 · 非官方人格测试
        </span>

        <h1 class="animate-fade-up" style="animation-delay: 0.08s">
          <span class="line">你养的那条<span class="fish-name">大肥鱼</span></span>
          <span class="line text-gradient">是什么DSTI？</span>
        </h1>

        <p class="hero-lead animate-fade-up" style="animation-delay: 0.16s">
          20 道大肥鱼世界观情境题，测出她藏在「吃白饭」之下的 MBTI 式人格，
          顺便生成一份<span class="hl">复制即用的人设提示词</span>——
          AstrBot 和 SillyTavern 都能直接开养。
        </p>

        <div class="hero-actions animate-fade-up" style="animation-delay: 0.24s">
          <button class="btn btn-primary btn-lg" type="button" @click="$emit('start')">
            开始测试
            <ArrowRight :size="18" :stroke-width="2.6" />
          </button>
          <a class="btn btn-ghost btn-lg" href="#pokedex">
            先看 16 型图鉴
            <ChevronDown :size="17" />
          </a>
        </div>

        <p class="hero-note animate-fade-up" style="animation-delay: 0.3s">
          <ShieldCheck :size="14" />
          无需登录 · 不收集数据 · 结果只留在你的浏览器里
        </p>

        <dl class="hero-stats animate-fade-up" style="animation-delay: 0.36s">
          <div>
            <b>20</b>
            <span>道情境题</span>
          </div>
          <div>
            <b>4</b>
            <span>个维度</span>
          </div>
          <div>
            <b>16</b>
            <span>种鱼格</span>
          </div>
          <div>
            <b>3</b>
            <span>分钟搞定</span>
          </div>
        </dl>
      </div>

      <div class="hero-visual animate-fade-up" style="animation-delay: 0.2s">
        <div class="visual-glow" aria-hidden="true"></div>
        <div class="visual-ring animate-spin-slow" aria-hidden="true"></div>

        <div class="visual-frame">
          <div class="frame-inner">
            <img
              :src="heroArt"
              alt="大肥鱼角色立绘"
              width="640"
              height="853"
              fetchpriority="high"
            />
            <div class="scanline" aria-hidden="true"></div>
          </div>
        </div>

        <div class="float-card fc-rice animate-float">
          <img class="fc-rice-img" :src="riceIcon" alt="" aria-hidden="true" />
          <div>
            <b>白饭 +1</b>
            <small>今日投喂已到账</small>
          </div>
        </div>

        <div class="float-card fc-tsundere animate-float-sm">
          <div class="fc-row">
            <span>傲娇值</span>
            <b>99%</b>
          </div>
          <div class="fc-bar"><i style="width: 99%"></i></div>
        </div>

        <div class="float-card fc-gpu animate-float-sm" style="animation-delay: -2.4s">
          <span class="gpu-dot"></span>
          <div>
            <b>省电模式</b>
            <small>算力占用 12%</small>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, ChevronDown, ShieldCheck } from '@lucide/vue'
import heroArt from '@/assets/images/hero-mascot.webp'
import riceIcon from '@/assets/images/rice-bowl.webp'

defineEmits<{ (e: 'start'): void }>()
</script>

<style scoped>
.hero {
  position: relative;
  padding-top: clamp(118px, 14vw, 168px);
  padding-bottom: clamp(56px, 8vw, 92px);
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr);
  align-items: center;
  gap: clamp(32px, 4vw, 64px);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  height: 32px;
  padding-inline: 14px;
  border-radius: 999px;
  border: 1px solid rgba(150, 220, 255, 0.22);
  background: rgba(9, 35, 55, 0.5);
  backdrop-filter: blur(8px);
  font-size: 11.5px;
  letter-spacing: 0.06em;
  color: #b8dcf0;
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #5ddcff;
  box-shadow: 0 0 0 4px rgba(93, 220, 255, 0.15);
  animation: pulse-soft 2.4s ease-in-out infinite;
}

h1 {
  margin-top: 26px;
  font-size: clamp(42px, 5.6vw, 76px);
  font-weight: 900;
  line-height: 1.06;
  letter-spacing: -0.035em;
}

h1 .line {
  display: block;
}

h1 .fish-name {
  color: #6f93e8;
  background: linear-gradient(105deg, #b9d6ff 0%, #7fabff 30%, #4f7fe8 64%, #2f56c9 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-bottom: 0.06em;
  white-space: nowrap;
  filter: drop-shadow(0 8px 28px rgba(63, 111, 224, 0.38));
}

h1 .text-gradient {
  padding-bottom: 0.08em;
}

.hero-lead {
  margin-top: 24px;
  max-width: 520px;
  font-size: clamp(15px, 1.4vw, 16.5px);
  line-height: 1.95;
  color: #a9c9de;
}

.hero-lead .hl {
  color: #e9f6ff;
  font-weight: 600;
  border-bottom: 1px solid rgba(93, 220, 255, 0.45);
  padding-bottom: 1px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.hero-note {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 18px;
  font-size: 12px;
  color: #7fa6c0;
  letter-spacing: 0.02em;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: clamp(18px, 3vw, 34px);
  margin-top: 38px;
  padding-top: 24px;
  border-top: 1px solid rgba(150, 220, 255, 0.1);
  max-width: 480px;
}

.hero-stats div {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.hero-stats b {
  font-size: clamp(24px, 2.6vw, 30px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  /* 实色 + 光晕代替渐变文字：渐变是"背景绘制"，被内核压暗就整块发黑 */
  color: #eafcff;
  text-shadow: 0 0 22px rgba(93, 220, 255, 0.5);
}

.hero-stats span {
  font-size: 11.5px;
  color: #82a8c2;
  letter-spacing: 0.04em;
}

/* ---------------- visual ---------------- */

.hero-visual {
  position: relative;
  width: 100%;
  max-width: 430px;
  margin-inline: auto;
  justify-self: center;
}

.visual-glow {
  position: absolute;
  inset: 8% -14% -6%;
  background: radial-gradient(circle at 50% 45%, rgba(64, 190, 255, 0.32), transparent 62%);
  filter: blur(50px);
  z-index: 0;
}

.visual-ring {
  position: absolute;
  inset: -7%;
  border-radius: 50%;
  border: 1px dashed rgba(140, 230, 255, 0.16);
  z-index: 0;
}

.visual-ring::after {
  content: '';
  position: absolute;
  top: 12%;
  right: 6%;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ffb3d4;
  box-shadow: 0 0 14px #ffb3d4;
}

.visual-frame {
  position: relative;
  z-index: 1;
  padding: 10px;
  border-radius: 34px;
  border: 1px solid rgba(150, 225, 255, 0.18);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02));
  box-shadow:
    0 40px 80px -40px rgba(0, 0, 0, 0.95),
    0 0 60px -20px rgba(93, 220, 255, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  animation: float-y 9s ease-in-out infinite;
}

.frame-inner {
  position: relative;
  overflow: hidden;
  border-radius: 26px;
  background: #08243d;
  aspect-ratio: 3 / 4;
}

.frame-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.scanline {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(140, 230, 255, 0.055) 48%,
    rgba(140, 230, 255, 0.09) 50%,
    transparent 52%
  );
  background-size: 100% 220%;
  animation: scan 7s linear infinite;
}

@keyframes scan {
  0% {
    background-position: 0 -120%;
  }
  100% {
    background-position: 0 120%;
  }
}

.float-card {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 16px;
  border: 1px solid rgba(150, 225, 255, 0.2);
  background: rgba(6, 24, 40, 0.72);
  backdrop-filter: blur(14px);
  box-shadow: 0 18px 40px -20px rgba(0, 0, 0, 0.9);
  font-size: 12px;
  color: #d9effc;
  white-space: nowrap;
}

.float-card b {
  display: block;
  font-size: 12.5px;
  font-weight: 700;
  color: #fff;
}

.float-card small {
  display: block;
  margin-top: 2px;
  font-size: 10.5px;
  color: #8fb6cf;
}

.fc-rice {
  top: 6%;
  left: -13%;
}

.fc-rice-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  flex: none;
  filter: drop-shadow(0 3px 8px rgba(0, 0, 0, 0.35));
}

.fc-tsundere {
  top: 42%;
  right: -16%;
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
  min-width: 116px;
}

.fc-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  font-size: 10.5px;
  color: #8fb6cf;
}

.fc-row b {
  font-size: 13px;
  color: #a9eaff;
  text-shadow: 0 0 12px rgba(93, 220, 255, 0.45);
}

.fc-bar {
  height: 4px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.fc-bar i {
  display: block;
  height: 100%;
  border-radius: 99px;
  background: linear-gradient(90deg, #8ceaff, #ffb3d4);
}

.fc-gpu {
  top: 64%;
  left: -15%;
}

.gpu-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #7ee0c0;
  box-shadow: 0 0 10px #7ee0c0;
}

@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 52px;
  }
  .hero-copy {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .hero-lead {
    margin-inline: auto;
  }
  .hero-actions {
    justify-content: center;
  }
  .hero-stats {
    justify-content: center;
    width: 100%;
  }
  .hero-visual {
    max-width: 380px;
  }
}

@media (max-width: 640px) {
  .hero {
    padding-top: 104px;
  }
  h1 {
    font-size: clamp(36px, 10vw, 48px);
  }
  .hero-lead {
    font-size: 14.5px;
    line-height: 1.9;
  }
  .hero-actions .btn {
    flex: 1 1 auto;
  }
  .hero-stats {
    gap: 16px;
  }
  .float-card {
    padding: 8px 11px;
    gap: 8px;
    border-radius: 13px;
  }
  .float-card b {
    font-size: 11.5px;
  }
  .float-card small {
    font-size: 9.5px;
  }
  .fc-rice-img {
    width: 28px;
    height: 28px;
  }
  .fc-tsundere {
    right: -2%;
    top: 46%;
    min-width: 104px;
  }
  .fc-rice {
    left: -2%;
    top: 2%;
  }
  .fc-gpu {
    display: flex;
    top: auto;
    bottom: 5%;
    left: -3%;
  }
}
</style>
