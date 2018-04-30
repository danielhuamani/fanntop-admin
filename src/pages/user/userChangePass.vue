<template>
  <form @submit.prevent="saveData()" action=""  class="row">
    <div class="col-12 page">
      <h3 class="title_page">Cambiar Password</h3>
      <div class="page__header material d-flex  justify-content-end">
        <router-link :to="{ name: 'user_update' , params: { id: $route.params.id }}" class="btn btn-secondary btn-cancel">
          <i class="fa fa-undo-alt"></i>
          Cancelar
        </router-link>
        <button class="btn btn-success btn-save">
          <i class="fa fa-save"></i>
          Guardar
        </button>
      </div>
       <div class="d-flex  ">
        <div class="col-12 ">
          <div class="row material content">
            <div class="col-12 ">
              <h5 class="material__title">Cambiar Password</h5>
              <div class="row">

                <div class="col-12 content__field">
                  <label for="">Password</label>
                  <input type="password" name="new_password" v-validate="'required'" :class="{'form-control--error': errors.has('new_password') }" v-model="user.new_password" class="form-control">
                </div>
                <div class="col-12 content__field">
                  <label for="">Confirmar Password</label>
                  <input type="password" name="confirm_password" v-validate="'required'" :class="{'form-control--error': errors.has('confirm_password') }" v-model="user.confirm_password" class="form-control">
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
  import { EventBus } from '@/bus'
  export default {
    name: 'userUpdate',
    data () {
      return {
        user: {
          confirm_password: '',
          new_password: ''
        }
      }
    },
    methods: {
      saveData () {
        var self = this
        var id = this.$route.params.id
        self.$validator.validateAll().then((result) => {
          console.log(result, 'result')
          if (result) {
            self.axios({
              method: 'put',
              url: '/custom_auth/user-password/' + id + '/',
              data: self.user
            }).then(response => {
              EventBus.$emit('alert_bus', 'success', {'Se guardo correctamente': []})
              self.$router.push({name: 'user_update', params: { id: id }})
            }).catch(error => {
              EventBus.$emit('alert_bus', 'danger', error.response.data)
            })
          } else {
            console.log('error')
          }
        })
      }
    }
  }
</script>