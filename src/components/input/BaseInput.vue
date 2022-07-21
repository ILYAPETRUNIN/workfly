<template>
    <div :class="getClass" class="base-input light">
        <div class="base-input__name">
          <label :for="name">{{label}}<span v-if="required">*</span></label>
        </div>
        <div @click="focus" class="base-input__wrapper">
          <slot name="icon-prefix"></slot>
            <pre v-if="sample" class="base-input__placeholder">{{getSample}}</pre>
            <input
            :id="name"
            v-model='value'
            v-maska="mask"
            :type='visible ? "password":"text"'
            ref="input"
            @focus="focus"
            @blur="unfocus"
            :class="{'base-input__input_password':visible}"
            class="base-input__input"/>
          <div @click="clickSuffix" class="base-input__suffix">
            <slot name="icon-suffix">
                    <transition name="animate-icon">
                      <svg-icon v-if="type=='password'" class="base__input__icon base-input__icon_clicable" :name='`eye${visible?"_closed":""}`'/>
                      <svg-icon v-else-if="cleareble" class="base-input__icon base-input__icon_clicable"  name='close'/>
                      <div v-else-if="notify?.type" class="base-input__icon">
                          <svg-icon :name='notify.type'/>
                      </div>
                    </transition>
            </slot>
          </div>

        </div>
        <div class="base-input__notify">
          <Transition name="animate-notify">
            <p class="base-input__notify" :class="notify.type"  v-if="notify">{{notify.text}}</p>
          </Transition>
        </div>
    </div>
</template>

<script lang="ts">
import maska, { useMask, useFocus, useSync, useSample } from '@/composition/input'
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
    }

  },

  setup (props) {
    const visible = ref()

    const mask = useMask(props.type)

    const { focused, input, focus, unfocus } = useFocus()

    const { value, errorMessage } = useSync(props)

    const notify = computed(() => {
      return props.notification
        ? new Notify({ text: props.notification.text, type: props.notification.type })
        : errorMessage.value
          ? new Notify({ text: errorMessage.value, type: 'danger' })
          : (props.showSuccess && value.value) ? new Notify({ type: 'success' }) : null
    })

    const getClass = computed(() => {
      return [
        focused.value ? 'focused' : '',
        notify.value ? `${notify.value.type}` : '',
        props.theme ? props.theme : ''
      ]
    })

    const getSample = props.sample ? useSample(props) : null

    const clickSuffix = () => {
      if (props.type === 'password') visible.value = !visible.value
      else if (props.cleareble) value.value = undefined
    }

    return {
      input,
      getClass,
      focus,
      unfocus,
      visible,
      mask,
      clickSuffix,
      notify,
      value,
      errorMessage,
      getSample
    }
  }
})
</script>

<style scoped lang="stylus">
@require '~@/assets/stylus/components/input';
@require '~@/assets/stylus/vars/variables';

$name='base-input'
$schemes={
  light:{
    base:$theme-light,
    optional:{
        header-color:$color-dark.light
    }
  }
}

generateDefault($name)

for $key in $schemes
  .{$key}
   setTheme($name,$schemes[$key])

   setAnimation('animate-icon',bounce-in-right,'enter',1.1s)
   setAnimation('animate-icon',slide-out-right,'leave',0.5s,cubic-bezier(0.550, 0.085, 0.680, 0.530))
   setAnimation('animate-notify',shake-horizontal,'enter',1.1s,cubic-bezier(0.550, 0.085, 0.680, 0.530))
   setAnimation('animate-notify',fade-out,'leave',0.5s,ease-out)

</style>
