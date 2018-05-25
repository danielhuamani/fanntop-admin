<template>
  <div class="row">
    <div class="col-12">
      <form class="row" @submit.prevent='saveData'>

        <div class="col-12 mb-20">
          <div class="card">
            <div class="card-header">
              <h5 class="card-header__title">Información</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <label for="">Nombre</label>
                    <input type="text" v-model='user.first_name' class='form-control' :class='{"form-control--errors": hasError("first_name")}'>
                    <div class="form-group__errors">
                      <p v-for='err in getError("first_name")'>{{err}}</p>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label for="">Apellidos</label>
                    <input type="text" v-model='user.last_name' class='form-control' :class='{"form-control--errors": hasError("last_name")}'>
                     <div class="form-group__errors">
                      <p v-for='err in getError("last_name")'>{{err}}</p>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label for="">Email</label>
                    <input type="text" v-model='user.email' class='form-control' :class='{"form-control--errors": hasError("email")}'>
                    <div class="form-group__errors">
                      <p v-for='err in getError("email")'>{{err}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between">
              <router-link :to='{ name: "change_pass"}' class='btn btn-primary'>Cambiar contraseña</router-link>
              <div class="button-group">
                <button class='btn btn-success'> Guardar</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import { EventBus } from '@/bus'
  import errorsDJ from '@/mixins/errorsDJ'
  export default {
    name: 'Profile',
    mixins: [errorsDJ],
    data () {
      return {
        user: {
          email: '',
          first_name: '',
          last_name: ''
        }
      }
    },
    created () {
      this.getUser()
    },
    methods: {
      getUser () {
        const self = this
        this.axios({
          method: 'get',
          url: '/security/profile/'
        }).then(response => {
          self.user = response.data
        })
      },
      saveData () {
        const self = this
        this.axios({
          method: 'put',
          url: '/security/profile/',
          data: self.user
        }).then(response => {
          self.user = response.data
          EventBus.$emit('alert_bus', 'success', {'Se modifico correctamente': []})
          // Bus.$emit('message_bus', 'success', 'Se guardo correctamente', false)
        }).catch(error => {
          self.errorsDj = error.response.data
          // Bus.$emit('message_bus', 'danger', 'Hubo un error', false)
        })
      }
    }
  }
</script>