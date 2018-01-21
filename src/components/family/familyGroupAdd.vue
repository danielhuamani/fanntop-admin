<template>
    <div class="col-12 content__field">
        <form @submit.prevent="addGroupFamily('form-1')" action="" data-vv-scope="form-1">
          <label for="">Información del grupo atributo / Posición</label>
          <div class="input-group">
            <input name="name" type="text" v-model='groupFamily.name' v-validate="'required|alpha_spaces'" class="form-control"  :class="{'input': true, 'form-control--error': errors.has('form-1.name') }"   >
            <input name="position" type="number" v-model='groupFamily.position' v-validate="'required|numeric'" class="form-control"  :class="{'input': true, 'form-control--error': errors.has('form-1.position') }"   >
            <div class="input-group-btn">
              <button class="btn btn-info" >Agregar</button>
            </div>
          </div>
        </form>
    </div>
</template>
<script>
  import spanish from 'vee-validate/dist/locale/es'
  import { EventBus } from '@/bus'
  export default {
    name: 'familyGroupAdd',
    data () {
      return {
        groupFamily: {
          name: '',
          family: '',
          position: ''
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
      this.groupFamily.family = this.$route.params.id
    },
    methods: {
      addGroupFamily (scope) {
        const self = this
        this.$validator.validateAll(scope).then((result) => {
          if (result) {
            this.axios({
              method: 'post',
              url: '/family/family-group/',
              data: self.groupFamily
            }).then(response => {
              EventBus.$emit('alert_bus', 'success', {'Se agrego correctamente': []})
              self.groupFamily.name = ''
              self.groupFamily.position = ''
              self.$emit('addGroupFamily')
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
      }
    }
  }
</script>