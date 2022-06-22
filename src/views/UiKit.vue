<template>
    <div>
        <div class="ui-block">
            <div class="ui-block__block">
                <h1 class="ui-block__header">Элементы ввода</h1>
                <base-input v-model='form.input'/>
                <base-input v-model='form.input' :notification='{type:"danger",text:"Error"}'/>
                <base-input v-model='form.input' :notification='{type:"success"}'/>
                <base-input v-model='form.input' :notification='{type:"warning",text:"warning"}'/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { defineComponent, PropType, ref } from 'vue'

import BaseInput from '@/components/input/BaseInput.vue'
import { Notify } from '@/composition/notify'

export default defineComponent({
  name: 'UiKit',
  components: { BaseInput },
  setup (props) {
    const form = ref({
      input: ''
    })

    return { form }
  }
})
</script>

<style scoped lang="stylus">
@require '~@/assets/stylus/mixins/mixins';
@require '~@/assets/stylus/vars/variables';

.ui-block
    width 30%
    &__block
        flexy(center,center,nowrap,column)
        width 100%
        border 2px solid gray
        border-radius 30px
        padding 50px

</style>
