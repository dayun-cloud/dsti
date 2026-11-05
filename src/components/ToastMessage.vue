<template>
  <Transition name="toast">
    <div v-if="toast.visible" class="toast" :class="toast.tone" role="status" aria-live="polite">
      <span class="toast-icon">
        <Check v-if="toast.tone === 'success'" :size="12" :stroke-width="3.2" />
        <Info v-else :size="12" :stroke-width="2.6" />
      </span>
      {{ toast.message }}
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Check, Info } from '@lucide/vue'
import { useToast } from '@/composables/useToast'

const { toast } = useToast()
</script>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
  z-index: 120;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  height: 44px;
  padding: 0 20px 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(154, 214, 255, 0.22);
  background: rgba(5, 20, 33, 0.94);
  backdrop-filter: blur(14px);
  box-shadow: 0 20px 50px -20px rgba(0, 0, 0, 0.9);
  font-size: 12.5px;
  color: #e6f7ff;
  white-space: nowrap;
}

.toast-icon {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(93, 220, 255, 0.16);
  color: #8ceaff;
}

.toast.error .toast-icon {
  background: rgba(255, 158, 199, 0.16);
  color: #ffc0dc;
}

.toast.info .toast-icon {
  background: rgba(201, 163, 255, 0.16);
  color: #c9a3ff;
}

.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(14px);
}

@media (max-width: 520px) {
  .toast {
    bottom: 20px;
    max-width: calc(100vw - 32px);
    white-space: normal;
    height: auto;
    min-height: 44px;
    padding-block: 10px;
    font-size: 12px;
    line-height: 1.5;
  }
}
</style>
