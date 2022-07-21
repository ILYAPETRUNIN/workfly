<template>
    <div :class="getClass" class="base-code">
      <input @focus="setFocus" ref="input0" class="base-code__input" type="number" v-model='code[0]' min="0" max="9"/>
      <input @focus="setFocus" ref="input1" class="base-code__input" type="number" v-model='code[1]'/>
      <div class="base-code__line"/>
      <input @focus="setFocus" ref="input2" class="base-code__input" type="number" v-model='code[2]' min="0" max="9"/>
      <input @focus="setFocus" ref="input3" class="base-code__input" type="number" v-model='code[3]' min="0" max="9"/>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'

export default defineComponent({
  name: 'Base-code',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Number
    },
    required: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'light'
    }
  },

  setup (props, context) {
    const code = ref(['', '', '', ''])
    const input0 = ref()
    const input1 = ref()
    const input2 = ref()
    const input3 = ref()

    const currentIndex = computed(() => code.value.findIndex((item) => item === ''))

    const reset = () => {
      code.value = ['', '', '', '']
    }

    const setFocus = () => {
      switch (currentIndex.value) {
        case 0:
          input0.value.focus()
          break
        case 1:
          input1.value.focus()
          break
        case 2:
          input2.value.focus()
          break
        case 3:
          input3.value.focus()
          break
        default:
          input0.value.blur()
          input1.value.blur()
          input2.value.blur()
          input3.value.blur()
          break
      }
    }

    watch(currentIndex, (value) => {
      setFocus()
      if (value === -1) context.emit('update:modelValue', code.value.join(''))
    })

    const getClass = computed(() => {
      return [
        props.theme ? props.theme : ''
      ]
    })

    return {
      code,
      setFocus,
      reset,
      getClass,
      currentIndex,
      input0,
      input1,
      input2,
      input3
    }
  }
})
</script>

<style scoped lang="stylus">
@require '~@/assets/stylus/components/code';
@require '~@/assets/stylus/vars/variables';

$name='base-code'
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

</style>
