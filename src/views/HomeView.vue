<template>
  <div class="home-view">
    <HeroSection @start="$emit('start')" />
    <MarqueeStrip />
    <FeatureSection />
    <DimensionSection />
    <HowItWorks @start="$emit('start')" />
    <TypeGallery @start="$emit('start')" />
    <PromptSection @start="$emit('start')" />
    <SelfTestSection @complete="$emit('complete')" />
    <FaqSection />
    <FinalCta @start="$emit('start')" />
  </div>
</template>

<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import MarqueeStrip from '@/components/MarqueeStrip.vue'
import FeatureSection from '@/components/FeatureSection.vue'
import DimensionSection from '@/components/DimensionSection.vue'
import HowItWorks from '@/components/HowItWorks.vue'
import TypeGallery from '@/components/TypeGallery.vue'
import PromptSection from '@/components/PromptSection.vue'
import SelfTestSection from '@/components/SelfTestSection.vue'
import FaqSection from '@/components/FaqSection.vue'
import FinalCta from '@/components/FinalCta.vue'

defineEmits<{ (e: 'start'): void; (e: 'complete'): void }>()
</script>
