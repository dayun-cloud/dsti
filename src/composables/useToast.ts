import { reactive } from 'vue'

type ToastTone = 'success' | 'info' | 'error'

const toast = reactive({
  visible: false,
  message: '',
  tone: 'success' as ToastTone,
})

let timer: ReturnType<typeof setTimeout> | undefined

export function useToast() {
  function show(message: string, tone: ToastTone = 'success') {
    toast.message = message
    toast.tone = tone
    toast.visible = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      toast.visible = false
    }, 2200)
  }

  return { toast, show }
}
