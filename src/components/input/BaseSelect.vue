<template>
  <div v-click-away="hide" :class="classes"  class="base-select">
    <base-input readonly v-model="inputVal" @focus="show" v-bind="$props">
      <template v-slot:icon-suffix>
        <svg-icon @click.stop='toogleShow' class="base-select__icon" name='arrow'/>
      </template>
    </base-input>

    <Transition name="animate-menu">
      <div v-if="isShown" class="base-select__menu">
        <div :class="{selected:inputVal==item}" @click.stop="selectItem(item)" v-wave class="base-select__menu__item" v-for="(item,index) in items" :key="index">{{item}}</div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import CustomSelect, { props } from '@/composition/select'
import useSync from '@/composition/syncModel'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Base-select',
  emits: ['update:modelValue'],
  props: { ...props },

  setup (props, context) {
    const { classes, isShown, toogleShow, show, hide } = new CustomSelect(props, context)
    const inputVal = useSync(props, context)

    function selectItem (item:any) {
      inputVal.value = item
      hide()
    }

    return { classes, isShown, toogleShow, show, hide, selectItem, inputVal }
  }
})
</script>

<style scoped lang="stylus">
@require '~@/assets/stylus/components/select';
@require '~@/assets/stylus/vars/variables';

$name='base-select'
$schemes={
  light:{
    base:$theme-light,
  }
}

generateDefault($name)

for $key in $schemes
  .{$key}
   setTheme($name,$schemes[$key])

setAnimation('animate-menu',fade-in,'enter',0.25s)
setAnimation('animate-menu',fade-out,'leave',0.25s)
</style>
