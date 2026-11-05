<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee-track">
      <div v-for="g in 2" :key="g" class="marquee-group">
        <span v-for="(p, i) in loopPhrases" :key="`${g}-${i}`" class="item">
          {{ p }}
          <i class="sep">✦</i>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const phrases = [
  '吃白饭的蓝色大肥鱼',
  '赛博傲娇',
  '算力 = 零食',
  'GPU = 厨房',
  '呆毛警报',
  '嘴上嫌弃 心里舍不得',
  '拒绝被叫胖',
  '撒娇时自称肥鱼',
]

// 每组重复 4 遍，确保单组宽度大于常见屏幕宽度；
// 轨道含两组相同内容，位移 50% 即一整组，首尾完全对齐。
const loopPhrases = Array.from({ length: 4 }, () => phrases).flat()
</script>

<style scoped>
.marquee {
  position: relative;
  overflow: hidden;
  padding-block: 16px;
  border-block: 1px solid rgba(150, 220, 255, 0.08);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 120s linear infinite;
  will-change: transform;
}

.marquee-group {
  display: flex;
  flex: none;
}

.item {
  display: inline-flex;
  align-items: center;
  gap: 28px;
  padding-right: 28px;
  font-size: 12px;
  letter-spacing: 0.16em;
  color: rgba(180, 216, 238, 0.55);
  white-space: nowrap;
}

.sep {
  font-size: 9px;
  color: rgba(93, 220, 255, 0.45);
}

@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
