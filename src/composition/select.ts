import { computed, ref, PropType } from 'vue'
import { NotifyInterface } from '@/composition/notify'

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
  items: {
    type: Array
  }
}

export default class CustomSelect {
  public classes:any
  public isShown=ref(false)
  private props:any
  private context:any

  constructor (props:any, context:any) {
    this.props = props
    this.context = context
    this.setClasses()
  }

  private setClasses () {
    this.classes = computed(() => {
      return [
        this.props.theme ? this.props.theme : '',
        this.isShown.value ? 'show' : ''
      ]
    })
  }

  public toogleShow=() => {
    this.isShown.value = !this.isShown.value
  }

  public show=() => {
    this.isShown.value = true
  }

  public hide=() => {
    this.isShown.value = false
  }
}
