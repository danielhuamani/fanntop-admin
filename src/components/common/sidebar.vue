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
    name: 'sidebar'
  }
</script>