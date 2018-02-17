<template>
  <div class="col-4 ">
    <div class="row material content content--read-edit">
      <div class="col-12 content__field content__field--one">
        <form @submit.prevent="saveFamily('form-1')" action="" data-vv-scope="form-1">
          <label for="">Nombre Grupo Atributo</label>
          <input name="name" type="text" v-model='family.name' v-validate="'required|alpha'" class="form-control"  :class="{'input': true, 'form-control--error': errors.has('form-1.name') }"   >
          <span v-show="errors.has('form-1.name')" class="help error_text">{{ errors.first('form-1.name') }}</span>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import spanish from 'vee-validate/dist/locale/es'
  import { EventBus } from '@/bus'
  export default {
    name: 'familyNameUpdate',
    data () {
      return {
        family: {
          id: '',
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
      this.getFamily()
    },
    methods: {
      saveFamily (scope) {
        const id = this.$route.params.id
        const self = this
        this.$validator.validateAll(scope).then((result) => {
          if (result) {
            this.axios({
              method: 'put',
              url: '/family/family/' + id + '/',
              data: self.family
            }).then(response => {
              EventBus.$emit('alert_bus', 'success', {'Se guardo correctamente': []})
              self.$emit('changeStatusFamily', 'familyNameRead')
            }).catch(error => {
              let status = ''
              if (error.response.status >= 400 && error.response.status < 500) {
                status = 'danger'
              }
              EventBus.$emit('alert_bus', status, error.response.data)
            })
            return
          }
          EventBus.$emit('alert_bus', 'danger', {'Verifique los campos resaltados': []})
        })
      },
      getFamily () {
        const id = this.$route.params.id
        const self = this
        if (id) {
          this.axios.get('/family/family/' + id + '/', {
          }).then(response => {
            self.family = response.data
          })
        }
      }
    }
  }
</script>