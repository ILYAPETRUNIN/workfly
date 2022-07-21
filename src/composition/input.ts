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

export function useSample (props:any) {
  return computed(() => {
    if (props.type === 'phone') {
      const pattern = '+1 (000) 000-0000'
      if (props.modelValue) {
        const numSymbol = props.modelValue.length
        return ' '.repeat(numSymbol) + pattern.substring(numSymbol)
      }
      return pattern
    }
    return null
  })
}

export function useFocus () {
  const focused = ref(false)
  const input = ref()

  const focus = () => {
    focused.value = true
    input.value.focus()
  }

  const unfocus = () => {
    focused.value = false
    input.value.blur()
  }

  return { focused, input, focus, unfocus }
}

export function useSync (props:any) {
  const { value, errorMessage } = useField(props.name, props.rule)
  return { value, errorMessage }
}
