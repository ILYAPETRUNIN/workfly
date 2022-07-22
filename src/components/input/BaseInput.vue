<template>
    <div :class="classes" class="base-input light">
        <div class="base-input__name">
          <label :for="name">{{label}}<span v-if="required">*</span></label>
        </div>
        <div v-click-away="unfocus" @click="focus" class="base-input__wrapper">
          <slot name="icon-prefix"></slot>
            <pre v-if="sample" class="base-input__placeholder">{{sample}}</pre>
            <input
            :readonly="readonly"
            :id="name"
            v-model='value'
            v-maska="mask"
            :type='visible ? "password":"text"'
            ref="input"
            @focus="focus"
            :class="{'base-input__input_password':visible}"
            class="base-input__input"/>
            <div @click="clickSuffix" class='base-input__suffix'>
              <slot name="icon-suffix">
                      <transition name="animate-icon">
                        <svg-icon  v-if="type=='password'" class="base__input__icon base-input__icon_clicable" :name='`eye${visible?"_closed":""}`'/>
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
import maska, { CustomInput, props } from '@/composition/input'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Base-input',
  emits: ['update:modelValue', 'clickSuffix', 'focus'],
  directives: { maska },
  props: { ...props },

  setup (props, context) {
    const customInput = new CustomInput(props, context, [
      { name: 'mask', params: props.type },
      { name: 'sample' },
      { name: 'notify' }
    ])

    const { mask, sample, focused, input, value, errorMessage, notify, classes, visible, focus, unfocus, clickSuffix } = customInput

    return { mask, sample, focused, input, value, errorMessage, notify, classes, visible, focus, unfocus, clickSuffix }
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
