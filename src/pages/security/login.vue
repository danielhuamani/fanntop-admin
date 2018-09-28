<template>
    <div class="container-fluid grid grid-login page_login">
        <div class="row row--form justify-content-center align-items-center">
          <div class="col  col-sm-6 col-md-7 background d-none d-sm-block">

          </div>
          <div class="col-12 col-sm-6 col-md-5 background_login">
            <div class="form-login">
               <!--  <div class="row justify-content-center form-login__content-title  align-items-center">

                  <img src="../../assets/img/fanntop.svg" width="80" height="80" class=" ">

                </div>
 -->
                <form v-on:submit.prevent="loginSubmit" class="ui large form ui form error" method="POST" action=".">

                    <div class="alert alert-danger" v-if="existError">
                      <div class="header" v-if="errorLogin.email.length > 0">
                        <p class="alert__header">username</p>
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
                        <span class="input-group-prepend" id="basic-addon1">
                          <i class="fa fa-user input-group-text" aria-hidden="true"></i>
                        </span>
                        <input placeholder="username" class="form-control" type="email" name="email" v-model="login.email">
                      </div>

                      <div class="input-group form-group">
                        <span class="input-group-prepend" id="basic-addon1">
                          <i class="fa fa-unlock-alt input-group-text"></i>
                        </span>
                        <input class="form-control" placeholder="password" type="password" v-model="login.password">
                      </div>
                      <button class="btn btn-block btn--login">Ingresar</button>
                    </div>

                </form>
            </div>
          </div>
        </div>
    </div>
</template>

<style  lang="scss">
  @import "~styles/abstract/_variables";
  .row--form{
    height: 100vh;
  }
  .btn--login{
    background: #512DE7;
    color:white;
  }
  .background{
    background-image: url('../../assets/img/fanntop.png');
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    position: relative;
    &:after{
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
    }
  }
  .background_login{
    background: white;
    height: 100vh;
    display: flex;
    align-items: center;
  }
  .form-login{
    width: 100%;
    max-width: 350px;
    padding: 15px;
    margin:auto;
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