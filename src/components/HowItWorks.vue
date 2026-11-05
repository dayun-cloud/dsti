<template>
  <section id="how" class="section how-section">
    <div class="shell">
      <div class="glass how-panel" v-reveal>
        <div class="how-head">
          <div>
            <span class="eyebrow"><Route :size="13" /> How it works</span>
            <h2 class="section-title">三步，把鱼看明白</h2>
          </div>
          <button class="btn btn-primary hide-sm" type="button" @click="$emit('start')">
            现在就开始
            <ArrowRight :size="16" :stroke-width="2.5" />
          </button>
        </div>

        <ol class="steps">
          <li v-for="(s, i) in steps" :key="s.title" class="step">
            <div class="step-top">
              <span class="step-num">{{ String(i + 1).padStart(2, '0') }}</span>
              <span v-if="i < steps.length - 1" class="step-connector" aria-hidden="true"></span>
            </div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>
          </li>
        </ol>

        <button class="btn btn-primary btn-block-mobile" type="button" @click="$emit('start')">
          开始 20 题
          <ArrowRight :size="16" :stroke-width="2.5" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Route } from '@lucide/vue'

defineEmits<{ (e: 'start'): void }>()

const steps = [
  {
    title: '凭直觉答题',
    desc: '20 道大肥鱼情境题，0/1 强迫二选一。选项顺序每次随机，防止手滑和位置偏差。',
  },
  {
    title: '看四个维度',
    desc: '不只是四个字母——每个维度都给出两侧倾向百分比，能看出你的偏向有多明显。',
  },
  {
    title: '领走人设',
    desc: '结果页附类型画像、干饭风格、相处模式，以及可复制 / 下载的完整人设提示词。',
  },
]
</script>

<style scoped>
.how-section {
  padding-top: 0;
}

.how-panel {
  position: relative;
  border-radius: 30px;
  padding: clamp(28px, 4vw, 48px);
  overflow: hidden;
}

.how-panel::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 480px;
  height: 480px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(93, 220, 255, 0.14), transparent 65%);
  filter: blur(40px);
  pointer-events: none;
}

.how-head {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.how-head .section-title {
  margin-top: 12px;
  font-size: clamp(26px, 3.2vw, 36px);
}

.steps {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin-top: 40px;
  list-style: none;
}

.step-top {
  display: flex;
  align-items: center;
  gap: 12px;
}

.step-num {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #04212e;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: linear-gradient(140deg, #c6f6ff, #5ddcff);
  box-shadow: 0 6px 18px -8px rgba(93, 220, 255, 0.9);
  flex: none;
}

.step-connector {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(93, 220, 255, 0.4), rgba(93, 220, 255, 0.04));
}

.step h3 {
  margin-top: 18px;
  font-size: 16.5px;
  font-weight: 700;
}

.step p {
  margin-top: 8px;
  font-size: 13.5px;
  line-height: 1.85;
  color: #9dbfd5;
}

.btn-block-mobile {
  display: none;
  margin-top: 32px;
  width: 100%;
}

@media (max-width: 780px) {
  .steps {
    grid-template-columns: 1fr;
    gap: 26px;
  }
  .step-connector {
    display: none;
  }
  .step p {
    margin-top: 6px;
  }
  .hide-sm {
    display: none;
  }
  .btn-block-mobile {
    display: inline-flex;
  }
}
</style>
