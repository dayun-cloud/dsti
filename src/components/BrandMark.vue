<template>
  <span class="brand-mark" :class="sizeClass">
    <img :src="logo" alt="" aria-hidden="true" draggable="false" />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import logo from '@/assets/images/logo.webp'

const props = withDefaults(defineProps<{ size?: 'sm' | 'md' | 'lg' }>(), { size: 'md' })

const sizeClass = computed(
  () =>
    ({
      sm: 'h-8 w-8 rounded-[10px]',
      md: 'h-10 w-10 rounded-[13px]',
      lg: 'h-12 w-12 rounded-2xl',
    })[props.size],
)
</script>

<style scoped>
.brand-mark {
  display: grid;
  place-items: center;
  box-shadow:
    0 8px 22px -8px rgba(93, 220, 255, 0.75),
    0 4px 18px -10px rgba(255, 158, 199, 0.35);
  flex: none;
  overflow: hidden;
}

.brand-mark img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
}
</style>
