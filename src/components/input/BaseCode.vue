<template>
    <div :class="getClass" class="base-code">
      <input class="base-code__input" ref='code0' type="number" v-model='code[0]' min='1'/>
      <input class="base-code__input" ref='code1' type="number" v-model='code[1]' min='1'/>
      <div class="base-code__line"/>
      <input class="base-code__input" ref='code2' type="number" v-model='code[2]' min='1'/>
      <input class="base-code__input" ref='code3' type="number" v-model='code[3]' min='1'/>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

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

  setup (props) {
    const code = ref(['', '', '', ''])

    const currentIndex = computed(() => code.value.findIndex((item) => item === ''))

    const getClass = computed(() => {
      return [
        props.theme ? props.theme : ''
      ]
    })

    return {
      code,
      getClass,
      currentIndex
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
