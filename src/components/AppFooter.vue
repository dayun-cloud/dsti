<template>
  <footer class="site-footer">
    <div class="shell">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="brand-row">
            <BrandMark size="md" />
            <div class="brand-name">
              <b>DSTI</b>
              <span>大肥鱼人格测试</span>
            </div>
          </div>
          <p>
            DeepSeek Type Indicator —— 把 MBTI 四维度测试塞进大肥鱼的世界观。
            测的是鱼，讲的是你。
          </p>
        </div>

        <div class="footer-cols">
          <div class="footer-col">
            <h4>站内</h4>
            <button type="button" @click="$emit('navigate', 'dimensions')">四个维度</button>
            <button type="button" @click="$emit('navigate', 'pokedex')">16 型图鉴</button>
            <button type="button" @click="$emit('navigate', 'prompt')">人设提示词</button>
            <button type="button" @click="$emit('navigate', 'selftest')">让鱼自答</button>
            <button type="button" @click="$emit('navigate', 'faq')">常见问题</button>
          </div>
          <div class="footer-col">
            <h4>相关资料</h4>
            <a
              href="https://github.com/whyever77/dafeiyu-astrbot"
              target="_blank"
              rel="noopener noreferrer"
            >
              大肥鱼 AstrBot 人设卡
              <ExternalLink :size="11" />
            </a>
            <a
              href="https://docs.sillytavern.app/usage/core-concepts/characterdesign"
              target="_blank"
              rel="noopener noreferrer"
            >
              SillyTavern 角色卡文档
              <ExternalLink :size="11" />
            </a>
            <a href="https://aigengtu.com/zh/whale-chan" target="_blank" rel="noopener noreferrer">
              鲸鱼娘角色百科 · 梗鲸
              <ExternalLink :size="11" />
            </a>
          </div>
        </div>
      </div>

      <div class="footer-note">
        <p>
          本测试为 MBTI 四维度框架的趣味二创，非官方、非严肃心理测评，结果仅供养鱼娱乐。<br />
          角色形象源自 DeepSeek 社区二创（原型：溟月，作者：上善无形），与 DeepSeek 官方无关。
        </p>
        <button class="back-top" type="button" @click.prevent="backToTop">
          回到顶部
          <ArrowUp :size="15" />
        </button>
      </div>

      <div class="footer-bottom">
        <span>© 2026 DSTI · 仅供养鱼娱乐</span>
        <span class="footer-meta">
          <span class="made">Made with <span class="rice">🍚</span> &amp; 呆毛</span>
          <span class="meta-sep">·</span>
          <a
            class="footer-signature"
            :href="AUTHOR_URL"
            target="_blank"
            rel="noopener noreferrer"
          >
            设计与开发 · {{ AUTHOR_NAME }}
          </a>
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ArrowUp, ExternalLink } from '@lucide/vue'
import BrandMark from './BrandMark.vue'
import { AUTHOR_NAME, AUTHOR_URL } from '@/config'

defineEmits<{ (e: 'navigate', id: string): void; (e: 'start'): void }>()

function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.site-footer {
  position: relative;
  z-index: 1;
  padding-top: 48px;
  border-top: 1px solid rgba(154, 214, 255, 0.09);
  background: linear-gradient(180deg, rgba(3, 12, 20, 0), rgba(2, 8, 14, 0.75));
}

.footer-top {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  gap: 40px;
  padding-bottom: 34px;
}

.brand-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-name {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.brand-name b {
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.brand-name span {
  font-size: 11px;
  color: #8fb6cf;
}

.footer-brand > p {
  margin-top: 18px;
  max-width: 340px;
  font-size: 12.5px;
  line-height: 1.9;
  color: #7fa4bc;
}

.footer-cols {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 24px;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-col h4 {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: #6f94ad;
  text-transform: uppercase;
  margin-bottom: 2px;
}

.footer-col button,
.footer-col a {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12.5px;
  color: #b1cee1;
  text-align: left;
  transition: color 0.2s;
  width: fit-content;
}

.footer-col button:hover,
.footer-col a:hover {
  color: #8ceaff;
}

.footer-note {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 18px 0;
  border-top: 1px solid rgba(154, 214, 255, 0.08);
}

.footer-note p {
  max-width: 720px;
  font-size: 11px;
  line-height: 1.9;
  color: #5f839a;
}

.back-top {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  flex: none;
  height: 40px;
  padding-inline: 18px;
  border-radius: 999px;
  border: 1px solid rgba(154, 214, 255, 0.2);
  background: rgba(255, 255, 255, 0.04);
  font-size: 13px;
  font-weight: 500;
  color: #b6d8ec;
  white-space: nowrap;
  transition:
    color 0.2s,
    border-color 0.2s,
    background-color 0.2s,
    transform 0.2s;
}

.back-top:hover {
  color: #fff;
  border-color: rgba(140, 230, 255, 0.55);
  background: rgba(93, 220, 255, 0.1);
  transform: translateY(-2px);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 0 24px;
  border-top: 1px solid rgba(154, 214, 255, 0.06);
  font-size: 10.5px;
  color: #5c7f96;
  letter-spacing: 0.03em;
}

.footer-meta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.meta-sep {
  opacity: 0.45;
}

.made {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.rice {
  font-size: 12px;
}

.footer-signature {
  color: #9fc3da;
  letter-spacing: 0.04em;
  transition: color 0.2s;
}

.footer-signature:hover {
  color: #8ceaff;
}

@media (max-width: 760px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .footer-cols {
    gap: 20px;
  }
  .footer-note {
    flex-direction: column;
    align-items: flex-start;
  }
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
