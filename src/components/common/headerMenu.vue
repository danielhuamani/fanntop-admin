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
              <div class="drop_menu">
                <div class="dropdown-menu dropdown-menu-right">
                  <router-link :to="{ name: 'profile'}" class="dropdown-item">  <i class="far fa-user dropdown-menu__icon_out"></i>
                    Mi Perfil
                  </router-link>
                  <a class="dropdown-item" @click.prevent="logout" href="#">
                      <i class="far fa-sign-out-alt dropdown-menu__icon_out"></i>
                      Salir

                  </a>
                </div>
              </div>
            </div>

        </div>
    </header>
</template>
<style lang="scss">
    @import "~styles/abstract/variables";
    .header{
        background: $sidebar;
        padding: 10px 0px;
        box-shadow: 0 1px 2px rgba(0,0,0,.1);
        position: fixed;
        width: calc(100% - 200px );
        z-index: 200;
        /* background: red; */
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        top: 0;
        left: 0;
        right: 0;
        margin-left: 200px;
        transition: 0.3s ease all;
        &__link_menu{
            font-size: 24px;
            cursor: pointer;
            color: $color-info;
        }
        &__user{
            cursor: pointer;
            color: $color-info;
        }
        .drop_menu{
          .dropdown-menu{
              top: 10px ;
              transition: 0.3s ease all;
              margin: 0;
              padding: 0;
              box-shadow: 0 1px 2px rgba(0,0,0,.1);
              &__icon_out{
                margin-right: 10px;
              }
              .dropdown-item{
                padding: 10px;
              }
          }
          .show{
            opacity: 1;
            top: 20px !important;
          }
        }
    }
    .header_active{
      width: calc(100% - 100px );
      margin-left:100px;

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