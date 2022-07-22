import { computed } from 'vue'

export default function useSync (props:any, context:any) {
  return computed(
    {
      get () {
        return props.modelValue
      },
      set (val) {
        context.emit('update:modelValue', val)
      }
    }
  )
}
