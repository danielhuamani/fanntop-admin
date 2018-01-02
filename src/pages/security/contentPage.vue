<template>
  <div class="d-flex full-width">
    <loading :loading="is_loading"></loading>
    <sidebar></sidebar>
    <div class="row_wrapper container-fluid">
      <menu-header></menu-header>
      <alert :data_alert="alert" ></alert>
      <div class="content-page">
        <transition name="fade" mode="out-in"  appear>
          <router-view v-on:loading="loading" v-on:alert="message_alert"></router-view>
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
    // background: $color-panel;
  }
  .row_wrapper{
    width: calc( 100% - 250px);
    margin-left: 250px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  .content-page{
    margin-top: 90px;
    padding-bottom: 30px;
  }
</style>
<script>
  import sidebar from '@/components/common/sidebar'
  import menuHeader from '@/components/common/headerMenu'
  import loading from '@/components/common/loading'
  import alert from '@/components/common/alert'
  export default {
    name: 'contentPage',
    components: {
      sidebar,
      menuHeader,
      loading,
      alert
    },
    data () {
      return {
        is_loading: false,
        alert: {
          status: '',
          message: null
        }
      }
    },
    methods: {
      loading (status) {
        this.is_loading = status
      },
      message_alert (status, message) {
        console.log(status, message)
        this.alert = {status: status, message: message}
      }
    }
  }
</script>