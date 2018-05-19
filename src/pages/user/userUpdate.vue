<template>
  <form @submit.prevent="saveData()" action=""  class="row">
    <div class="col-12 page">
      <h3 class="title_page">Actualizar Usuario</h3>
      <div class="page__header material d-flex  justify-content-end">
        <router-link :to="{ name: 'user'}" class="btn btn-secondary ">
          <i class="fa fa-undo-alt"></i>
          Cancelar
        </router-link>
        <router-link :to="{ name: 'user_change_pass', params: { id: $route.params.id }}" class="btn btn-info btn-cancel">
          <i class="fa fa-change"></i>
          Cambiar Contraseña
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
              <h5 class="material__title">Informacion Basica</h5>
              <div class="row">
                <div class="col-12 content__field content__field--check">
                  <label for="">es activo?</label>
                  <div class="slider-checkbox">
                    <input type="checkbox" id="2" v-model="user.is_active" />
                    <label class="label" for="2">
                      <span class="fa fa-times slider-checkbox__status--inactive slider-checkbox__status"></span>
                      <span class="fa fa-check slider-checkbox__status slider-checkbox__status--active"></span>
                    </label>
                  </div>
                </div>
                <div class="col-12 content__field">
                  <label for="">Nombres</label>
                  <input type="text" name="user_name" v-validate="'required'" :class="{'form-control--error': errors.has('user_name') }" v-model="user.first_name" class="form-control">
                </div>
                <div class="col-12 content__field">
                  <label for="">Apellidos</label>
                  <input type="text" name="user_last_name" v-validate="'required'" :class="{'form-control--error': errors.has('user_last_name') }" v-model="user.last_name" class="form-control">
                </div>
                <div class="col-12 content__field">
                  <label for="">Email</label>
                  <input type="email" name="user_email" v-validate="'required'" :class="{'form-control--error': errors.has('user_email') }" v-model="user.email" class="form-control">
                </div>
            <!--     <div class="col-12 content__field">
                  <label for="">Password</label>
                  <input type="password" name="upassword" v-validate="'required'" :class="{'form-control--error': errors.has('user_password') }" v-model="user.password" class="form-control">
                </div> -->
                <div class="col-12 content__field">
                  <label for="">Tipo de influenciador</label>
                  <select  name="influencer"   v-validate="'required'" class="custom-select" :class="{'input': true, 'form-control--error': errors.has('influencer') }" v-model='show_type_user'>
                    <option v-for="type_user in type_users" :value="type_user.value">{{type_user.name}}</option>
                  </select>
                </div>
                <div class="col-12 content__field" v-if='show_type_user !== "MASTER"'>
                  <label for="">Influenciador</label>
                  <select  name="influencer"    class="custom-select"  v-model='user.influencer'>
                    <option v-for="influencer in influencers" :value="influencer.id" >{{influencer.name}}</option>
                  </select>
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
          email: '',
          first_name: '',
          last_name: '',
          is_active: false,
          password: '',
          influencer: '',
          user_influencer: ''
        },
        influencers: [],
        show_type_user: 'MASTER',
        type_users: [
          {
            name: 'Master',
            value: 'MASTER'
          },
          {
            name: 'Influenciador',
            value: 'INFLUENCIADOR'
          }
        ]
      }
    },
    created () {
      this.getUser()
      this.getInfluencers()
    },
    methods: {
      getInfluencers () {
        var self = this
        this.axios.get('/influencer', {
          params: {
            fields: 'id,name'
          }
        }).then(response => {
          self.influencers = response.data
        })
      },
      getUser () {
        var self = this
        var id = this.$route.params.id
        this.axios.get('/custom_auth/users/' + id + '/', {
        }).then(response => {
          self.user = response.data
          self.user.influencer = response.data.user_influencer_id
          if (response.data.user_influencer_id) {
            self.show_type_user = 'INFLUENCIADOR'
          } else {
            self.show_type_user = 'MASTER'
          }
        })
      },
      saveData () {
        var self = this
        var id = this.$route.params.id
        console.log(self.user, 'id')
        self.$validator.validateAll().then((result) => {
          console.log(result, 'result')
          if (result) {
            self.axios({
              method: 'put',
              url: '/custom_auth/users/' + id + '/',
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