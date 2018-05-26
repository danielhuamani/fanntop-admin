<template>
    <header class="header row justify-content-between align-items-center" v-bind:class="{ header_active: getMenuActive }">
        <div class="header__link_menu col-3">
            <i class="fa fa-bars" @click.prevent='changeMenu'></i>
        </div>
        <div class="header__content_user col-9 text-right">
            <div class="btn-group">
              <span class="header__user dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="far fa-user"></i>
                {{user.email}}
              </span>
              <div class="dropdown-menu dropdown-menu-right">
                <router-link :to="{ name: 'profile'}" class="dropdown-item">  <i class="fa fa-user dropdown-menu__icon_out"></i>
                  Mi Perfil
                </router-link>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" @click.prevent="logout" href="#">
                    <i class="fa fa-sign-out-alt dropdown-menu__icon_out"></i>
                    Salir

                </a>
              </div>
            </div>

        </div>
    </header>
</template>
<style lang="scss">
    @import "~styles/abstract/variables";
    .header{
        background: $color-white;
        padding: 10px 0px;
        box-shadow: 0 1px 2px rgba(0,0,0,.1);
        position: fixed;
        width: calc(100% - 180px );
        z-index: 200;
        /* background: red; */
        top: 0;
        left: 0;
        right: 0;
        margin-left: 180px;
        transition: 0.3s ease all;
        &__link_menu{
            font-size: 24px;
            cursor: pointer;
        }
        &__user{
            cursor: pointer;
        }
        .dropdown-menu{
            top: 20px !important;
            box-shadow: 0 1px 2px rgba(0,0,0,.1);
            &__icon_out{
              margin-right: 10px;
            }
        }
    }
    .header_active{
      width:100%;
      margin-left:0;
    }
</style>
<script>
  import { mapGetters } from 'vuex'
  import {authLogout, getEmail} from '@/utils/auth'
  export default {
    name: 'headerMenu',
    data () {
      return {
        user: {
          email: getEmail()
        }
      }
    },
    methods: {
      logout () {
        authLogout()
        this.$router.push({name: 'login'})
      },
      changeMenu () {
        this.$store.dispatch('setMenuActive')
      }
    },
    computed: {
      ...mapGetters([
        'getMenuActive'
      ])
    }
  }
</script>