<template>
    <button :style="{color:color}" :class="getClass" v-wave="!disabled" class="base-btn">
      <slot>
        <svg-icon v-if="iconName" :name='iconName'/>
      </slot>
    </button>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'

export default defineComponent({
  name: 'Base-btn',
  emits: ['update:modelValue', 'clickSuffix'],
  props: {
    theme: {
      type: String,
      default: 'light'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: false
    },
    iconName: {
      type: String
    },
    size: {
      type: String
    },
    plain: {
      type: Boolean
    },
    color: {
      type: String
    }
  },

  setup (props, context) {
    const getClass = computed(() => {
      return [
        props.theme,
        props.disabled ? 'disabled' : '',
        props.outlined ? 'outlined' : '',
        props.icon ? 'icon' : '',
        props.size,
        props.plain ? 'plain' : ''
      ]
    })
    return {
      getClass
    }
  }
})
</script>

<style scoped lang="stylus">
@require '~@/assets/stylus/components/button';
@require '~@/assets/stylus/vars/variables';

$name='base-btn'
$schemes={
  light:{
    base:$theme-light,
  },
}

for $key in $schemes
  .{$key}
    setTheme($name,$schemes[$key])

generateDefault($name)
setSize($name)
</style>
