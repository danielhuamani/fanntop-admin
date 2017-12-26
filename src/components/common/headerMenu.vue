<template>
    <header class="header row justify-content-between align-items-center">
        <div class="header__link_menu col-3">
            <i class="fa fa-bars"></i>
        </div>
        <div class="header__content_user col-9 text-right">
            <div class="btn-group">
              <span class="header__user dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fa fa-user"></i>
                {{user.email}}
              </span>
              <div class="dropdown-menu dropdown-menu-right">
                <button class="dropdown-item" type="button">Action</button>
                <button class="dropdown-item" type="button">Another action</button>
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
</style>
<script>
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
      }
    }
  }
</script>