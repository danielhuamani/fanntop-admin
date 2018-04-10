<template>
  <div class="menu" v-bind:class="{ menu_active: getMenuActive }" >
    <div class="menu__container_logo ">
        <img src="../../assets/img/fanntop.svg"  width="60" height="60" class="rounded img-responsive">
    </div>
    <h6 class="menu__title">
      Menu Navegación
    </h6>
    <ul class="menu__nav">
      <li class="menu__nav__option">
        <router-link :to="{ name: 'dashboard'}" class="menu__nav__link" active-class="menu__nav__link--active">
          <i class="fa fa-home"></i>
          <span class='menu__name'>Dashboard</span>
        </router-link>
      </li>
      <li class="menu__nav__option">
        <a href="" class="menu__nav__link" @click.prevent="SubMenu('Config')">
          <i class="fa fa-cog"></i>
          <span class='menu__name'>Configuración</span>
        </a>
        <ul class="menu__nav__sub" v-show="openMenu == 'Config'">
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'configuration'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              <span class='menu__name'>Configuración</span>
            </router-link>
          </li>
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'shipping_cost'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              <span class='menu__name'>Costos de envio</span>
            </router-link>
          </li>

        </ul>
      </li>
      <li class="menu__nav__option">
        <router-link :to="{ name: 'client'}" class="menu__nav__link" active-class="menu__nav__link--active">
          <i class="fa fa-users"></i>
          <span class='menu__name'>Clientes</span>
        </router-link>
      </li>
      <li class="menu__nav__option">
        <router-link :to="{ name: 'influencer'}" class="menu__nav__link" active-class="menu__nav__link--active">
          <i class="fa fa-child"></i>
          <span class='menu__name'>Influenciadores</span>
        </router-link>
      </li>
      <li class="menu__nav__option">
        <a href="" class="menu__nav__link" @click.prevent="SubMenu('Producto')">
          <i class="fa fa-shopping-cart"></i>
          <span class='menu__name'>Productos</span></a>
        <ul class="menu__nav__sub" v-show="openMenu == 'Producto'">
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'product'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              <span class='menu__name'>Catalogo</span>
            </router-link>
          </li>
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'category'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              <span class='menu__name'>Categoria</span>
            </router-link>
          </li>
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'family'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              <span class='menu__name'>Grupo Atributos</span>
            </router-link>
          </li>
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'attribute'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              <span class='menu__name'>Atributos</span>
            </router-link>
          </li>
        </ul>
      </li>
      <li class="menu__nav__option">
        <router-link :to="{ name: 'coupon'}" class="menu__nav__link" active-class="menu__nav__link--active">
          <i class="fa fa-users"></i>
          <span class='menu__name'>Cupones</span>
        </router-link>
      </li>
      <li class="menu__nav__option">
        <router-link :to="{ name: 'order'}" class="menu__nav__link" active-class="menu__nav__link--active">
          <i class="fa fa-truck"></i>
          <span class='menu__name'>Pedidos</span>
        </router-link>
      </li>
      <li class="menu__nav__option">
        <a href="" class="menu__nav__link" @click.prevent="SubMenu('Pages')">
          <i class="fa fa-list-alt"></i>
          <span class='menu__name'>Pages</span></a>
        <ul class="menu__nav__sub" v-show="openMenu == 'Pages'">
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'home'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              <span class='menu__name'>Home</span>
            </router-link>
          </li>
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'pages'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              <span class='menu__name'>Pages</span>
            </router-link>
          </li>
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'frecuent_question'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              <span class='menu__name'>Preguntas Frecuentes</span>
            </router-link>
          </li>
<!--           <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'terms_conditions'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              Terminos Y Condiciones
            </router-link>
          </li>
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'payment_methods'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              Formas de Pago
            </router-link>
          </li> -->
        </ul>
      </li>
      <li class="menu__nav__option">
        <a href="" class="menu__nav__link" @click.prevent="SubMenu('Forms')">
          <i class="fa fa-table"></i>
          <span class='menu__name'>Formularios</span></a>
        <ul class="menu__nav__sub" v-show="openMenu == 'Forms'">
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'suscription'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              <span class='menu__name'>Suscripción</span>
            </router-link>
          </li>
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'contact'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              <span class='menu__name'>Contacto</span>
            </router-link>
          </li>
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'complaints_book'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              <span class='menu__name'>Libro de Reclamaciones</span>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">

  @import "~styles/abstract/variables";

  .menu {
    background: #37485F;
    width: 250px;
    max-width: 250px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    transition: 0.3s ease all;
    &__name{
      display: inline;
    }
    &__container_logo{
      padding: 20px 10px;
      display: flex;
      justify-content: center;
      background: darken( $color-sidebar, 5% );
    }
    &__title{
      padding: 10px;
      color: $color-white;
    }
    &__nav{
      margin: 0;
      margin-top: 20px;
      padding: 0;
      height: calc(100% - 200px);
      overflow-y: scroll;
      &__sub{
        margin: 0;
        padding: 0;
        &__option{
          list-style-type: none;
        }
        &__link{
          color: $color-white;
          padding: 10px 10px 10px 30px;
          display: block;
          &:hover, &--active{
            background: darken( $color-sidebar, 5% );
            color: $color-white;
            text-decoration: none;
            transition: 0.3s ease all;
            font-weight: bold;
          }
        }
      }
      &__option{
        list-style-type: none;
      }
      &__link{
        color: $color-white;
        padding: 10px;
        display: block;
        &:hover, &--active{
          background: darken( $color-sidebar, 5% );
          color: $color-white;
          text-decoration: none;
          transition: 0.3s ease all;
          font-weight: bold;
        }
      }
    }
  }
  .menu_active{
    width: 0px;
    overflow: hidden;
  }
</style>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'sidebar',
    data () {
      return {
        subMenu: {
          Producto: false,
          Pages: false
        },
        openMenu: ''
      }
    },
    methods: {
      SubMenu (nameMenu) {
        if (this.openMenu === nameMenu) {
          this.openMenu = ''
        } else {
          this.openMenu = nameMenu
        }
      },
      isSubMenu (nameMenu) {
        return this.subMenu[nameMenu]
      }
    },
    computed: {
      ...mapGetters([
        'getMenuActive'
      ])
    }
  }
</script>
