<template>
  <div class="base-select">
    <base-input v-bind="$props">
      <template v-slot:icon-suffix>
        <svg-icon class="base-select__icon" name='arrow'/>
      </template>
    </base-input>
  </div>
</template>

<script lang="ts">
import { props } from '@/composition/input'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Base-input',
  emits: ['update:modelValue'],
  props: { ...props },

  setup (props) {
    return { }
  }
})
</script>

<style scoped lang="stylus">
@require '~@/assets/stylus/components/select';
@require '~@/assets/stylus/vars/variables';

$name='base-select'

generateDefault($name)

</style>
