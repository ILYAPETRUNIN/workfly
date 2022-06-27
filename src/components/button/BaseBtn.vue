<template>
    <div class="base-input light">

    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'

export default defineComponent({
  name: 'Base-btn',
  emits: ['update:modelValue', 'clickSuffix'],
  props: {

  },

  setup (props, context) {
    return {
    }
  }
})
</script>

<!-- <style scoped lang="stylus">
@require '~@/assets/stylus/mixins/input';
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
</style> -->
