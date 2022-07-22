import { maska } from 'maska'
import { useField } from 'vee-validate'
import { computed, ref, PropType } from 'vue'
import Notify, { NotifyInterface } from '@/composition/notify'
export default maska

interface InputOption{
  name:string,
  params?:any
}

export const props = {
  modelValue: {
    type: String
  },
  name: {
    type: String,
    default: 'name'
  },
  label: {
    type: String
  },
  required: {
    type: Boolean,
    default: false
  },
  type: {
    type: String
  },
  cleareble: {
    type: Boolean
  },
  customMask: {
    type: String
  },
  notification: {
    type: Object as PropType<NotifyInterface>
  },
  showSuccess: {
    type: Boolean
  },
  theme: {
    type: String,
    default: 'light'
  },
  rule: {
    type: Object
  },
  sample: {
    type: Boolean
  },
  readonly: {
    type: Boolean
  }
}

export class CustomInput {
  public mask:any
  public sample:any
  public focused=ref(false)
  public input = ref()
  public value:any
  public errorMessage:any
  public notify:any
  public classes:any
  public visible=ref()

  private props:any
  private context:any

  constructor (props:any, context:any, optionsList:Array<InputOption>) {
    this.props = props
    this.context = context

    this.create()
    this.setClasses()
    optionsList.forEach((item) => {
      switch (item.name) {
        case 'mask':
          this.mask = this.useMask(item.params)
          break
        case 'sample':
          this.sample = this.useSample()
          break
        case 'notify':
          this.notify = this.useNotify()
          break
      }
    })
  }

  private create () {
    const { value, errorMessage } = useField(this.props.name, this.props.rule)
    this.value = value
    this.errorMessage = errorMessage
  }

  private setClasses () {
    this.classes = computed(() => {
      return [
        this.focused.value ? 'focused' : '',
        this.notify.value ? `${this.notify.value.type}` : '',
        this.props.theme ? this.props.theme : ''
      ]
    })
  }

  private useMask (type:string | undefined) {
    return computed(() => {
      switch (type) {
        case 'phone':
          return '+# (###) ###-####'
          break
      }
      return null
    })
  }

  private useSample () {
    return computed(() => {
      if (this.props.type === 'phone') {
        const pattern = '+1 (000) 000-0000'
        if (this.props.modelValue) {
          const numSymbol = this.props.modelValue.length
          return ' '.repeat(numSymbol) + pattern.substring(numSymbol)
        }
        return pattern
      }
      return null
    })
  }

  private useNotify () {
    return computed(() => {
      return this.errorMessage.value
        ? new Notify({ text: this.errorMessage.value, type: 'danger' })
        : (this.props.showSuccess && this.value.value)
            ? new Notify({ type: 'success' })
            : this.props.notification ? new Notify({ text: this.props.notification.text, type: this.props.notification.type }) : null
    })
  }

  public focus=() => {
    this.context.emit('focus')
    this.focused.value = true
    this.input.value.focus()
  }

  public unfocus=() => {
    this.focused.value = false
    this.input.value.blur()
  }

  public clickSuffix=() => {
    this.focus()
    if (this.props.type === 'password') this.visible.value = !this.visible.value
    else if (this.props.cleareble) this.value.value = undefined
  }
}
