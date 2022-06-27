import { maska } from 'maska'
import { useField } from 'vee-validate'
import { computed, ref } from 'vue'
export default maska

export function useMask (type:string | undefined) {
  return computed(() => {
    switch (type) {
      case 'phone':
        return '+# (###) ###-####'
        break
    }
    return null
  })
}

export function useFocus () {
  const focused = ref(false)
  const input = ref()

  const focus = () => {
    input.value.focus()
  }

  return { focused, input, focus }
}

export function useSync (props:any, context:any) {
  return computed({
    get () {
      return props.modelValue
    },
    set (val) {
      context.emit('update:modelValue', val)
    }
  })
}

export function useValidation (name:any, rule:any) {
  const { errorMessage, value } = useField(name, rule)
  return { errorMessage, value }
}
