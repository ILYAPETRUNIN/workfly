<template>
    <div>
        <div class="ui-block">
            <div>
                <base-input name="email" v-model="email" label="email" showSuccess/>
                <base-input name="phone" v-model="phone" label="phone" type='phone' sample/>
                <base-input name="password" v-model="password" label="password" type='password'/>
                <base-input name="text" v-model="text" label="text" cleareble/>
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
            <div>
              <base-code v-model='code'/>
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
    const code = ref()
    const email = ref()
    const phone = ref()
    const password = ref()
    const text = ref()

    const schema = yup.object({
      email: yup.string().required().email(),
      phone: yup.string().required(),
      password: yup.string().required()
    })

    useForm({
      validationSchema: schema
    })

    const form = ref({
      input: ''
    })

    return { form, code, email, phone, password, text }
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
