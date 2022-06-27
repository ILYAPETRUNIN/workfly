<template>
    <div>
        <div class="ui-block">
            <div class="ui-block__block">
                <h1 class="ui-block__header">Элементы ввода</h1>
                <base-input name="phone1" label="phone"  type="phone"/>
                <base-input name="phone2" label="phone" cleareble type="phone"/>
                <base-input :notification='{type:"danger",text:"Error"}'/>
                <base-input name="email" label="email" showSuccess :rule="yup.string().required().email()"/>
                <base-input :notification='{type:"warning",text:"warning"}'/>
                <base-input name="password" label="password" :rule="yup.string().required()" type='password'/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import * as yup from 'yup'

import BaseInput from '@/components/input/BaseInput.vue'
import { useForm } from 'vee-validate'

export default defineComponent({
  name: 'UiKit',
  components: { BaseInput },
  setup () {
    const formValues = {
      email: 'example@example.com',
      phone1: 7912321,
      phone2: 7912321
    }

    useForm({
      initialValues: formValues

    })

    const form = ref({
      input: ''
    })

    return { form, yup }
  }
})
</script>

<style scoped lang="stylus">
@require '~@/assets/stylus/mixins/mixins';
@require '~@/assets/stylus/vars/variables';

.ui-block
    width 50%
    &__block
        flexy(center,center,nowrap,column)
        width 100%
        border 2px solid gray
        border-radius 30px
        padding 50px

</style>
