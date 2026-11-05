<template>
  <section id="selftest" class="section">
    <div class="shell">
      <header class="sec-head" v-reveal>
        <span class="eyebrow"><Bot :size="13" /> Fish Self-Test</span>
        <h2 class="section-title">让大肥鱼自己答</h2>
        <p class="section-lead">
          不用插件，也不用 API。把这段完整提示词发给你的大肥鱼，让她按 0/1 回 20 位答案，
          再粘贴回来就能出她的 DSTI。
        </p>
      </header>

      <div class="self-grid">
        <div class="glass card prompt-side" v-reveal>
          <div class="panel-head">
            <div class="panel-title">
              <span class="step">01</span>
              <h3>复制提示词</h3>
            </div>
            <button class="copy-btn" type="button" @click="copyPrompt">
              <Check v-if="copied" :size="14" />
              <Copy v-else :size="14" />
              {{ copied ? '已复制' : '复制' }}
            </button>
          </div>

          <pre class="prompt-pre">{{ prompt }}</pre>

          <p class="side-note">
            <Info :size="12" />
            提示词里已包含 20 道题和输出格式，整段发给她即可。
          </p>
        </div>

        <div class="glass card paste-side" v-reveal="80">
          <div class="panel-head">
            <div class="panel-title">
              <span class="step">02</span>
              <h3>粘贴她的答案</h3>
            </div>
            <span class="count" :class="{ ok: parsedDigits !== null }">{{ displayCount }} / 20</span>
          </div>

          <label class="answer-label" for="fish-answer">答案只保留 0 和 1，共 20 位</label>
          <textarea
            id="fish-answer"
            v-model="answerText"
            class="answer-input"
            rows="5"
            placeholder="例如：01100110100101101001"
            spellcheck="false"
            @input="error = ''"
          ></textarea>

          <p class="hint">空格、换行和标点会自动忽略；如果她回了解释，只粘贴那串 0/1 即可。</p>
          <p v-if="error" class="error">{{ error }}</p>

          <button class="btn btn-primary submit" type="button" :disabled="!canSubmit" @click="submit">
            生成她的 DSTI
            <ArrowRight :size="16" :stroke-width="2.5" />
          </button>

          <p class="privacy">
            <ShieldCheck :size="12" />
            计算只发生在浏览器本地
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { ArrowRight, Bot, Check, Copy, Info, ShieldCheck } from '@lucide/vue'
import { buildSelfTestPrompt } from '@/data/prompts'
import { copyText } from '@/lib/clipboard'
import { useQuiz } from '@/composables/useQuiz'
import { useToast } from '@/composables/useToast'

const emit = defineEmits<{ (e: 'complete'): void }>()

const { completeSelfTest } = useQuiz()
const { show } = useToast()

const prompt = buildSelfTestPrompt()
const answerText = ref('')
const error = ref('')
const copied = ref(false)
let copiedTimer: number | undefined

const digitCount = computed(() => answerText.value.replace(/[^01]/g, '').length)
const parsedDigits = computed(() => extractDigits(answerText.value))
const canSubmit = computed(() => parsedDigits.value !== null)
const displayCount = computed(() => (parsedDigits.value ? 20 : digitCount.value))

/** 优先识别整段文本里的 20 位 0/1；否则去掉空白后再校验 */
function extractDigits(raw: string): string | null {
  const compact = raw.replace(/\s+/g, '')
  const direct = compact.replace(/[^01]/g, '')
  if (direct.length === 20) return direct

  const runs = compact.match(/[01]{20}/g)
  if (runs && runs.length === 1) return runs[0]
  return null
}

async function copyPrompt() {
  const ok = await copyText(prompt)
  if (!ok) {
    show('复制失败，请手动选择文本', 'error')
    return
  }
  copied.value = true
  show('提示词已复制')
  if (copiedTimer) window.clearTimeout(copiedTimer)
  copiedTimer = window.setTimeout(() => {
    copied.value = false
  }, 2000)
}

function submit() {
  const digits = extractDigits(answerText.value)
  if (!digits) {
    error.value = `需要正好 20 位 0/1，当前识别到 ${digitCount.value} 位。请只粘贴她输出的答案。`
    return
  }
  if (!completeSelfTest(digits)) {
    error.value = '答案格式不对，请确认是 20 位 0/1。'
    return
  }
  show('已生成大肥鱼的 DSTI')
  emit('complete')
}

onBeforeUnmount(() => {
  if (copiedTimer) window.clearTimeout(copiedTimer)
})
</script>

<style scoped>
.sec-head {
  max-width: 760px;
  margin-bottom: clamp(34px, 5vw, 50px);
}

.sec-head .section-title {
  margin-top: 14px;
}

.self-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 18px;
  align-items: start;
}

.prompt-side,
.paste-side {
  padding: clamp(22px, 3vw, 28px);
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.step {
  display: grid;
  place-items: center;
  height: 26px;
  padding-inline: 9px;
  border-radius: 8px;
  border: 1px solid rgba(93, 220, 255, 0.25);
  background: rgba(93, 220, 255, 0.08);
  color: #8ceaff;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.panel-title h3 {
  font-size: 16px;
  font-weight: 700;
  color: #eaf7ff;
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 32px;
  padding-inline: 12px;
  border-radius: 9px;
  border: 1px solid rgba(154, 214, 255, 0.18);
  background: rgba(255, 255, 255, 0.04);
  color: #b6d8ec;
  font-size: 11.5px;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s;
}

.copy-btn:hover {
  border-color: rgba(140, 230, 255, 0.45);
  color: #fff;
}

.prompt-pre {
  margin-top: 16px;
  max-height: 380px;
  overflow: auto;
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px solid rgba(154, 214, 255, 0.12);
  background: rgba(2, 12, 21, 0.72);
  color: #cfe6f5;
  font-family: var(--font-mono);
  font-size: 11.5px;
  line-height: 1.9;
  white-space: pre-wrap;
  word-break: break-word;
}

.side-note {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-top: 12px;
  font-size: 10.5px;
  line-height: 1.7;
  color: #6f94ad;
}

.side-note svg {
  flex: none;
  margin-top: 1px;
}

.count {
  font-size: 11.5px;
  font-variant-numeric: tabular-nums;
  color: #6f94ad;
  letter-spacing: 0.04em;
}

.count.ok {
  color: #7ee0c0;
}

.answer-label {
  display: block;
  margin-top: 18px;
  font-size: 11.5px;
  color: #8fb2c9;
}

.answer-input {
  display: block;
  width: 100%;
  min-height: 140px;
  margin-top: 8px;
  padding: 13px 15px;
  border-radius: 14px;
  border: 1px solid rgba(154, 214, 255, 0.18);
  background: rgba(2, 12, 21, 0.72);
  color: #eaf7ff;
  font-family: var(--font-mono);
  font-size: 15px;
  line-height: 1.8;
  letter-spacing: 0.14em;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
}

.answer-input::placeholder {
  color: #4f748c;
  letter-spacing: 0.08em;
}

.answer-input:focus {
  border-color: rgba(93, 220, 255, 0.55);
}

.hint {
  margin-top: 9px;
  font-size: 10.5px;
  line-height: 1.7;
  color: #6f94ad;
}

.error {
  margin-top: 9px;
  font-size: 11px;
  line-height: 1.7;
  color: #ffb3d4;
}

.submit {
  width: 100%;
  margin-top: 16px;
}

.privacy {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 12px;
  font-size: 10px;
  color: #5f839a;
}

@media (max-width: 900px) {
  .self-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .prompt-side,
  .paste-side {
    padding: 20px 18px;
  }
  .prompt-pre {
    max-height: 300px;
    font-size: 10.8px;
  }
  .panel-title h3 {
    font-size: 15px;
  }
}
</style>
