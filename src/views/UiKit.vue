<template>
    <div>
        <div class="ui-block">
            <div >
                <base-input name="phone1" label="phone"  type="phone"/>
                <base-input name="phone2" label="phone" cleareble type="phone"/>
                <base-input :notification='{type:"danger",text:"Error"}'/>
                <base-input name="email" :notification='{text:"Please, enter your work e-mail"}' label="email" showSuccess :rule="yup.string().required().email()"/>
                <base-input :notification='{type:"warning",text:"warning"}'/>
                <base-input name="password" label="password" :rule="yup.string().required()" type='password'/>
            </div>
            <div class="ui-block__column">
              <div class="ui-block__row">
                <base-btn>Base</base-btn>
                <base-btn outlined>Outlined</base-btn>
                <base-btn disabled>Disabled</base-btn>
              </div>
              <div class="ui-block__row">
                <base-btn icon iconName='play' size='lg'/>
                <base-btn icon outlined iconName='notify' size='lg'/>
                <base-btn icon iconName='play' size='sm'/>
                <base-btn icon iconName='eye' plain size='sm'/>
              </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import * as yup from 'yup'

import { useForm } from 'vee-validate'

export default defineComponent({
  name: 'UiKit',
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
    &__row
      flexy(center,center)

</style>
