<template>
    <div :class="getClass" class="base-input light">
        <p class="base-input__name">{{label}}<span v-if="required">*</span></p>
        <div @click="focus" class="base-input__wrapper">
          <slot name="icon-prefix"></slot>
            <input
            v-model='value'
            @input="update"
            v-maska="mask"
            :type='isPassword ? "password":"text"'
            ref="input"
            @focus="focused = true"
            @blur="focused = false"
            :class="{'base-input__input_password':isPassword}"
            class="base-input__input"/>
          <div @click="clickSuffix" class="base-input__suffix">
            <slot name="icon-suffix">
                    <transition name="animate-icon">
                      <svg-icon v-if="type=='password'" class="base__input__icon base-input__icon_clicable" :name='`eye${isPassword?"_closed":""}`'/>
                      <div v-else-if="cleareble" class="base-input__icon base-input__icon_clicable" >
                        <svg-icon name='close'/>
                      </div>
                      <div v-else-if="getNotify" class="base-input__icon">
                          <svg-icon :name='getNotify.type'/>
                      </div>
                    </transition>
            </slot>
          </div>

        </div>
        <div class="base-input__notify">
          <transition name="animate-notify">
            <p :class="getNotify.type" class="shake-horizontal" v-if="getNotify">{{getNotify.text}}</p>
          </transition>
        </div>
    </div>
</template>

<script lang="ts">
import maska, { useMask, useFocus, useValidation } from '@/composition/input'
import Notify, { NotifyInterface } from '@/composition/notify'

import { defineComponent, PropType, computed, ref } from 'vue'

export default defineComponent({
  name: 'Base-input',
  emits: ['update:modelValue', 'clickSuffix'],
  directives: { maska },
  props: {
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
    rule: {
      type: Object
    },
    notification: {
      type: Object as PropType<NotifyInterface>
    },
    showSuccess: {
      type: Boolean
    }

  },

  setup (props, context) {
    const isPassword = ref()

    const mask = useMask(props.type)
    const { focused, input, focus } = useFocus()
    const { errorMessage, value } = useValidation(props.name, props.rule)

    const getNotify = computed(() => {
      return props.notification
        ? new Notify({ text: props.notification.text, type: props.notification.type })
        : errorMessage.value
          ? new Notify({ text: errorMessage.value, type: 'danger' })
          : !errorMessage.value && props.showSuccess && value.value ? new Notify({ text: '', type: 'success' }) : null
    })

    const getClass = computed(() => {
      return [
        focused.value ? 'focused' : '',
        getNotify.value ? `${getNotify.value.type}` : ''
      ]
    })

    const clickSuffix = () => {
      if (props.type === 'password') isPassword.value = !isPassword.value
      else if (props.cleareble) value.value = undefined
    }

    const update = (event:any) => {
      context.emit('update:modelValue', event.target.value)
    }

    return {
      focused,
      input,
      getClass,
      focus,
      isPassword,
      mask,
      clickSuffix,
      getNotify,
      value,
      update
    }
  }
})
</script>

<style scoped lang="stylus">
@require '~@/assets/stylus/mixins/components/input';
@require '~@/assets/stylus/vars/components/variables';

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

setAnimation('animate-icon','bounce-in-right','enter-active',1.1s)
setAnimation('animate-icon','slide-out-right','leave-active',0.5s,cubic-bezier(0.550, 0.085, 0.680, 0.530))
setAnimation('animate-notify','shake-horizontal','enter',1.1s,cubic-bezier(0.550, 0.085, 0.680, 0.530))
setAnimation('animate-notify','fade-out','leave-active',0.5s,ease-out)

</style>
