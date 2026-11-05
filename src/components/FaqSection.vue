<template>
  <section id="faq" class="section">
    <div class="shell faq-grid">
      <div class="faq-intro" v-reveal>
        <span class="eyebrow"><CircleHelp :size="13" /> FAQ</span>
        <h2 class="section-title">你可能想问</h2>
        <p class="section-lead">
          DSTI 是一个玩梗优先的趣味测试，仅供鱼乐。但提示词是真的能跑。
        </p>
        <div class="faq-aside">
          <span>还有别的问题？</span>
          <p>
            所有答题与计分都在这台设备上完成，不需要登录。想重新测一次，点结果页的「再测一次」就行。
          </p>
        </div>
      </div>

      <div class="faq-list" v-reveal="80">
        <div
          v-for="(item, i) in faqs"
          :key="item.q"
          class="faq-item"
          :class="{ open: openIndex === i }"
        >
          <button
            type="button"
            class="faq-q"
            :aria-expanded="openIndex === i"
            :aria-controls="`faq-a-${i}`"
            @click="toggle(i)"
          >
            <span>{{ item.q }}</span>
            <ChevronDown :size="17" class="chev" />
          </button>
          <div :id="`faq-a-${i}`" class="faq-answer" role="region">
            <div>
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown, CircleHelp } from '@lucide/vue'

const openIndex = ref<number | null>(0)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}

const faqs = [
  {
    q: '这是 DeepSeek 官方的人格测试吗？',
    a: '不是。「大肥鱼」是 DeepSeek 社区二创的鲸鱼娘形象，DSTI 是基于社区共识设定的同人趣味测试，与 DeepSeek 官方无关，也不是临床、职业或教育测评。',
  },
  {
    q: 'DSTI 和 MBTI 是什么关系？',
    a: 'DSTI 借用 MBTI 的四个二分维度（E/I、S/N、T/F、J/P）和四字母类型码，方便你直接对照；但题目、计分和结果文案都是为大肥鱼世界观重写的，与 MBTI 官方及版权方没有关联。',
  },
  {
    q: '只有 20 题，结果准吗？',
    a: '它的定位是 3 分钟趣味自测，不是诊断工具。每个维度 5 题、奇数题量天然避免平票，结果页会给出倾向百分比；20 题适合快速自我观察，不适合替代专业测评。想要更稳，可以隔一段时间重测，看四个维度是否稳定。',
  },
  {
    q: '为什么每次选项顺序不一样？',
    a: '每题的两个选项会随机左右展示，用来削弱「总选第一个」的位置惯性；计分时会映射回原始选项，不影响结果。让大肥鱼自测时固定为 0/1，是为了方便模型只输出 20 位数字。',
  },
  {
    q: '为什么我和朋友同型，表现却差很多？',
    a: '16 型只有 16 种组合，同型很常见。真正的差异在四个维度的百分比强弱：同样是 INTJ，有人 J 只有 60%，有人接近 100%，表现会不一样。结果页的倾向条比四个字母更值得看。',
  },
  {
    q: '生成的提示词能直接用在哪里？',
    a: 'System Prompt 可以贴进 AstrBot 的人格设置，或任意支持系统提示词的客户端；SillyTavern 角色卡按 name / description / personality / scenario / first_mes / mes_example 字段输出。另外还提供分享文案和插件可用的题库 JSON。',
  },
  {
    q: '怎么让大肥鱼自己答题？',
    a: '首页「让大肥鱼自己答」会生成一段包含全部 20 道题的提示词。发给你的大肥鱼，让她按题目顺序只回 20 位 0/1，再粘贴回页面即可生成她的 DSTI，不需要插件、API Key 或后端。她如果附了解释，页面只识别 0/1，其余文字会自动忽略。',
  },
  {
    q: '我的答案会被上传吗？',
    a: '不会。答题、计分、生成提示词全部在你的浏览器里完成，没有后端接口，也没有账号系统。答题进度保存在本地 localStorage 中，刷新或关闭页面后可以继续；清除站点数据即可删除。',
  },
  {
    q: '测出来和我想的不一样，怎么办？',
    a: '强迫二选一必然会丢掉中间状态，当下的心情、最近的经历也会影响选择。把它当成一面镜子和聊天话题，而不是判决书；重点看四个维度的百分比条，以及结果文案里哪几句让你觉得「被说中了」。',
  },
]
</script>

<style scoped>
.faq-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: clamp(32px, 6vw, 80px);
  align-items: start;
}

.faq-intro .section-title {
  margin-top: 14px;
}

.faq-aside {
  margin-top: 34px;
  padding: 18px 20px;
  border-radius: 16px;
  border: 1px solid rgba(154, 214, 255, 0.11);
  background: rgba(255, 255, 255, 0.025);
}

.faq-aside span {
  font-size: 11px;
  letter-spacing: 0.12em;
  color: #8ceaff;
  font-weight: 700;
}

.faq-aside p {
  margin-top: 8px;
  font-size: 12.5px;
  line-height: 1.8;
  color: #8fb2c9;
}

.faq-list {
  border-top: 1px solid rgba(154, 214, 255, 0.12);
}

.faq-item {
  border-bottom: 1px solid rgba(154, 214, 255, 0.12);
}

.faq-q {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 20px 4px;
  text-align: left;
  font-size: 14.5px;
  font-weight: 600;
  color: #d8edfa;
  transition: color 0.2s;
}

.faq-q:hover,
.faq-item.open .faq-q {
  color: #fff;
}

.chev {
  flex: none;
  color: #7fa6c0;
  transition:
    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    color 0.2s;
}

.faq-item.open .chev {
  transform: rotate(180deg);
  color: #8ceaff;
}

.faq-answer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.38s cubic-bezier(0.16, 1, 0.3, 1);
}

.faq-answer > div {
  overflow: hidden;
}

.faq-answer p {
  padding: 0 34px 22px 4px;
  font-size: 13.3px;
  line-height: 1.9;
  color: #97b9d0;
}

.faq-item.open .faq-answer {
  grid-template-rows: 1fr;
}

@media (max-width: 900px) {
  .faq-grid {
    grid-template-columns: 1fr;
  }
  .faq-aside {
    margin-top: 24px;
  }
}
</style>
