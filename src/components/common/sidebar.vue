<template>
  <div class="menu">
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
          Dashboard
        </router-link>
      </li>
      <li class="menu__nav__option">
        <a href="" class="menu__nav__link" @click.prevent="SubMenu('Config')">
          <i class="fa fa-cog"></i>
          Configuración</a>
        <ul class="menu__nav__sub" v-show="openMenu == 'Config'">
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'configuration'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              Configuración
            </router-link>
          </li>
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'category'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              Costos de envio
            </router-link>
          </li>

        </ul>
      </li>
      <li class="menu__nav__option">
        <router-link :to="{ name: 'client'}" class="menu__nav__link" active-class="menu__nav__link--active">
          <i class="fa fa-users"></i>
          Clientes
        </router-link>
      </li>
      <li class="menu__nav__option">
        <router-link :to="{ name: 'influencer'}" class="menu__nav__link" active-class="menu__nav__link--active">
          <i class="fa fa-child"></i>
          Influenciadores
        </router-link>
      </li>
      <li class="menu__nav__option">
        <a href="" class="menu__nav__link" @click.prevent="SubMenu('Producto')">
          <i class="fa fa-shopping-cart"></i>
          Productos</a>
        <ul class="menu__nav__sub" v-show="openMenu == 'Producto'">
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'product'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              Catalogo
            </router-link>
          </li>
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'category'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              Categoria
            </router-link>
          </li>
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'family'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              Grupo Atributos
            </router-link>
          </li>
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'attribute'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              Atributos
            </router-link>
          </li>
        </ul>
      </li>
      <li class="menu__nav__option">
        <router-link :to="{ name: 'order'}" class="menu__nav__link" active-class="menu__nav__link--active">
          <i class="fa fa-truck"></i>
          Pedidos
        </router-link>
      </li>
      <li class="menu__nav__option">
        <a href="" class="menu__nav__link" @click.prevent="SubMenu('Pages')">
          <i class="fa fa-list-alt"></i>
          Pages</a>
        <ul class="menu__nav__sub" v-show="openMenu == 'Pages'">
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'home'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              Home
            </router-link>
          </li>
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'pages'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              Pages
            </router-link>
          </li>
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'question'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              Preguntas Frecuentes
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
          Formularios</a>
        <ul class="menu__nav__sub" v-show="openMenu == 'Forms'">
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'suscription'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              Suscripción
            </router-link>
          </li>
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'pages'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              Contacto
            </router-link>
          </li>
          <li class="menu__nav__sub__option">
            <router-link :to="{ name: 'question'}" class="menu__nav__sub__link" active-class="menu__nav__link--active">
              Libro de Reclamaciones
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
</style>

<script>
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
    }
  }
</script>
