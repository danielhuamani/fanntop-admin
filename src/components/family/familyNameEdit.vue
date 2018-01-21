<template>
  <div class="col-4">
    <div class="row material content content--read-edit">
      <div class="col-12 content__field content__field--one">
        <form @submit.prevent="saveFamily('form-1')" action="" data-vv-scope="form-1">
          <label for="">Nombre Grupo Atributo</label>
          <input name="name" type="text" v-model='family.name' v-validate="'required|alpha'" class="form-control"  :class="{'input': true, 'form-control--error': errors.has('form-1.name') }"   >

          <button class="fa fa-save content--read-edit__save content--read-edit__icon" ></button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import spanish from 'vee-validate/dist/locale/es'
  import { EventBus } from '@/bus'
  export default {
    name: 'familyNameEdit',
    data () {
      return {
        family: {
          name: ''
        }
      }
    },
    created () {
      this.$validator.localize('es', {
        messages: spanish.messages,
        attributes: {
          name: ' '

        }
      })
    },
    methods: {
      saveFamily (scope) {
        const self = this
        this.$validator.validateAll(scope).then((result) => {
          if (result) {
            this.axios({
              method: 'post',
              url: '/family/family/',
              data: self.family
            }).then(response => {
              EventBus.$emit('alert', 'success', {'Se guardo correctamente': []})
              self.$router.push({name: 'family_update', params: { id: response.data.id }})
            }).catch(error => {
              let status = ''
              if (error.response.status >= 400 && error.response.status < 500) {
                status = 'danger'
              }
              EventBus.$emit('alert', status, error.response.data)
            })
            return
          }
          EventBus.$emit('alert_bus', 'danger', {'Verifique los campos resaltados': []})
        })
      }
    }
  }
</script>