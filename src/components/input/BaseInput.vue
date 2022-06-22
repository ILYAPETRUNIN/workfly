<template>
    <div :class="getClass" class="base-input light">
        <p class="base-input__name">{{name}}<span v-if="required">*</span></p>
        <div @click="focus" class="base-input__wrapper">
          <slot name="icon-prefix"></slot>
            <input ref="input" @focus="focused = true" @blur="focused = false" class="base-input__input" type="text" v-model='inputVal'/>
          <slot name="icon-suffix">
              <div v-if="notification" class="bounce-in-right base-input__notify_icon">
                  <svg-icon :name='notification.type'/>
              </div>
          </slot>
        </div>
        <p :class="notification.type" class="base-input__notify" v-if="notification">{{notification.text}}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, reactive, ref } from 'vue'

import { NotifyInterface } from '@/composition/notify'

export default defineComponent({
  name: 'Base-input',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String
    },
    notification: {
      type: Object as PropType<NotifyInterface>
    },
    name: {
      type: String,
      default: 'name'
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  setup (props, context) {
    const focused = ref(false)
    const input = ref()

    const getClass = computed(() => {
      return [
        focused.value ? 'focused' : '',
        props.notification ? `${props.notification.type}` : ''
      ]
    })

    const focus = () => {
      input.value.focus()
    }

    const inputVal = computed({
      get () {
        return props.modelValue
      },
      set (val) {
        context.emit('update:modelValue', val)
      }
    })
    return {
      inputVal,
      focused,
      input,
      getClass,
      focus
    }
  }
})
</script>

<style scoped lang="stylus">
@require '~@/assets/stylus/mixins/input';
@require '~@/assets/stylus/vars/variables';
@require '~@/assets/stylus/base/animations';

$name='base-input'
$schemes={
  light:{
    base:$theme-light,
    optional:{
        header-color:$color-dark.light
    }
  }
}

generateDefault($name,$schemes[$key])

for $key in $schemes
  .{$key}
    setTheme($name,$schemes[$key])

</style>
