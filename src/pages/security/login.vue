<template>
    <div class="container grid grid-login page_login">
        <div class="row row--form justify-content-center align-items-center">
          <div class="form-login">
              <div class="row justify-content-center form-login__content-title  align-items-center">

                <img src="../../assets/img/fanntop.svg" width="60" height="60" class=" ">
                <div class="content form-login__title">
                  Ingresar
                </div>
              </div>

              <form v-on:submit.prevent="loginSubmit" class="ui large form ui form error" method="POST" action=".">

                  <div class="alert alert-danger" v-if="existError">
                    <div class="header" v-if="errorLogin.email.length > 0">
                      <p class="alert__header">email</p>
                      <ul class="alert__list">
                        <li v-for="error_email in errorLogin.email">
                          {{error_email}}
                        </li>
                      </ul>
                    </div>
                    <div class="header" v-if="errorLogin.password.length > 0">
                      <p class="alert__header">password</p>
                      <ul class="alert__list">
                        <li v-for="error_password in errorLogin.password">
                          {{error_password}}
                        </li>
                      </ul>
                    </div>
                    <div class="header" v-if="errorLogin.non_field_errors.length > 0">
                      <ul class="alert__list">
                        <li v-for="error_non_field_errors in errorLogin.non_field_errors">
                          {{error_non_field_errors}}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="ui stacked segment">
                    <div class="input-group form-group">
                      <span class="input-group-addon" id="basic-addon1">
                        <i class="fa fa-user" aria-hidden="true"></i>
                      </span>
                      <input placeholder="email" class="form-control" type="email" name="email" v-model="login.email">
                    </div>

                    <div class="input-group form-group">
                      <span class="input-group-addon" id="basic-addon1">
                        <i class="fa fa-unlock-alt"></i>
                      </span>
                      <input class="form-control" placeholder="password" type="password" v-model="login.password">
                    </div>
                    <button class="btn btn-block btn-primary">Ingresar</button>
                  </div>

              </form>
          </div>
        </div>
    </div>
</template>

<style  lang="scss">
  @import "~styles/abstract/_variables";
  .row--form{
    height: 100vh;
  }
  .form-login{
    width: 350px;
    max-width: 350px;
    padding: 15px;
    background: $color-white;
    &__content-title{
      margin-bottom: 10px;
    }
    &__title{
      margin-left: 10px;
    }
  }
  .error{
    text-align: left;
    &__list{
      margin-left: 10px;
      margin-bottom: 10px;
    }
  }
</style>

<script>
import {setTokenData} from '@/utils/auth'
export default {
  name: 'Login',
  data () {
    return {
      login: {
        email: '',
        password: ''
      },
      errorLogin: {
        email: [],
        password: [],
        non_field_errors: []
      }
    }
  },
  methods: {
    loginSubmit () {
      const self = this
      this.axios.post('/security/token-auth/', self.login
        )
        .then((response) => {
          let token = response.data.token
          setTokenData(token)
          console.log(self.$router, '---', self.$route)
          self.$router.push({name: 'dashboard'})
        })
        .catch((error) => {
          if (error.response.data) {
            if (error.response.data.email) {
              self.$set(self.errorLogin, 'email', error.response.data.email)
            } else {
              self.$set(self.errorLogin, 'email', [])
            }
            if (error.response.data.email) {
              self.$set(self.errorLogin, 'password', error.response.data.password)
            } else {
              self.$set(self.errorLogin, 'password', [])
            }
            if (error.response.data.non_field_errors) {
              self.$set(self.errorLogin, 'non_field_errors', error.response.data.non_field_errors)
            } else {
              self.$set(self.errorLogin, 'non_field_errors', [])
            }
          }
        })
    }
  },
  computed: {
    existError () {
      console.log(this.errorLogin.email, this.errorLogin.password)
      return this.errorLogin.email.length > 0 || this.errorLogin.password.length > 0 || this.errorLogin.non_field_errors.length > 0
    }
  }
}
</script>