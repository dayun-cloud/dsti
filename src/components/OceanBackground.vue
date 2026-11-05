<template>
  <div class="ocean" aria-hidden="true">
    <div class="ocean-base"></div>
    <div class="orb orb-a"></div>
    <div class="orb orb-b"></div>
    <div class="orb orb-c"></div>
    <div class="beam beam-a"></div>
    <div class="beam beam-b"></div>
    <div class="mesh"></div>
    <div class="bubbles">
      <i
        v-for="(b, i) in bubbles"
        :key="i"
        :style="{
          left: b.left + '%',
          width: b.size + 'px',
          height: b.size + 'px',
          animationDuration: b.duration + 's',
          animationDelay: b.delay + 's',
          '--bubble-drift': b.drift + 'vw',
          '--bubble-opacity': b.opacity,
        }"
      ></i>
    </div>
    <div class="vignette"></div>
    <div class="grain"></div>
  </div>
</template>

<script setup lang="ts">
interface Bubble {
  left: number
  size: number
  duration: number
  delay: number
  drift: number
  opacity: number
}

const bubbles: Bubble[] = Array.from({ length: 18 }, () => ({
  left: Math.random() * 100,
  size: 4 + Math.random() * 22,
  duration: 15 + Math.random() * 20,
  delay: -Math.random() * 30,
  drift: -5 + Math.random() * 12,
  opacity: 0.18 + Math.random() * 0.4,
}))
</script>

<style scoped>
.ocean {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.ocean-base {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(120% 85% at 50% -12%, #0c3c61 0%, #061b2e 42%, #02070d 100%),
    #02070d;
}

.orb {
  position: absolute;
  width: 58vw;
  height: 58vw;
  min-width: 420px;
  min-height: 420px;
  border-radius: 50%;
  filter: blur(90px);
  will-change: transform;
}

.orb-a {
  top: -22%;
  left: -12%;
  background: radial-gradient(circle, rgba(46, 201, 242, 0.3), transparent 66%);
  animation: drift 26s ease-in-out infinite;
}

.orb-b {
  top: 14%;
  right: -26%;
  background: radial-gradient(circle, rgba(201, 163, 255, 0.14), transparent 66%);
  animation: drift 34s ease-in-out infinite reverse;
}

.orb-c {
  bottom: -30%;
  left: 14%;
  background: radial-gradient(circle, rgba(255, 158, 199, 0.12), transparent 66%);
  animation: drift 40s ease-in-out infinite;
  animation-delay: -12s;
}

.beam {
  position: absolute;
  top: -30%;
  height: 150%;
  background: linear-gradient(180deg, rgba(140, 230, 255, 0.09), transparent 72%);
  filter: blur(18px);
  transform: rotate(14deg);
  transform-origin: top center;
}

.beam-a {
  left: 8%;
  width: 16vw;
  opacity: 0.55;
}

.beam-b {
  left: 46%;
  width: 10vw;
  opacity: 0.34;
  transform: rotate(20deg);
}

.mesh {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(150, 220, 255, 0.038) 1px, transparent 1px),
    linear-gradient(90deg, rgba(150, 220, 255, 0.038) 1px, transparent 1px);
  background-size: 84px 84px;
  mask-image: radial-gradient(80% 70% at 50% 30%, #000 0%, transparent 78%);
  -webkit-mask-image: radial-gradient(80% 70% at 50% 30%, #000 0%, transparent 78%);
}

.bubbles {
  position: absolute;
  inset: 0;
}

.bubbles i {
  position: absolute;
  bottom: -70px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 32% 28%,
    rgba(214, 248, 255, 0.6),
    rgba(120, 200, 255, 0.06) 68%
  );
  border: 1px solid rgba(190, 240, 255, 0.16);
  animation-name: rise-bubble;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform, opacity;
}

.vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 90% 75% at 50% 45%, transparent 42%, rgba(2, 7, 13, 0.7) 100%);
}

.grain {
  position: absolute;
  inset: 0;
  opacity: 0.045;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}
</style>
