<template>
  <div class="d-flex full-width">
    <sidebar></sidebar>
    <div class="row_wrapper container-fluid">
      <menu-header></menu-header>
      <div class="content-page">
        <transition name="fade" mode="out-in"  appear>
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import "~styles/abstract/variables";
  .full-width{
    height: 100vh;
    padding: 0px;
    background: $color-panel;
  }
  .row_wrapper{
    width: calc( 100% - 250px);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
<script>
  import sidebar from '@/components/common/sidebar'
  import menuHeader from '@/components/common/headerMenu'
  export default {
    name: 'contentPage',
    components: {
      sidebar,
      menuHeader
    }
  }
</script>