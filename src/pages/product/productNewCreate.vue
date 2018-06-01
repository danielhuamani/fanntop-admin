<template>

  <div class="row">
    <div class="col-12 page">
      <h3 class="title_page">Nuevo Producto</h3>
    </div>
    <div class="col-12">
      <div class="row ">
        <div class="paso col-3" data-tooltip="I’m the tooltip text." :class='isActivePaso("paso-1")'>
          <h5>Paso 1</h5>
        </div>
        <div class="paso col-3" :class='isActivePaso("paso-2")'>
          <h5>Paso 2</h5>
        </div>
        <div class="paso col-3" :class='isActivePaso("paso-3")'>
          <h5>Paso 3</h5>
        </div>
        <div class="paso col-3" :class='isActivePaso("paso-4")'>
          <h5>Paso 4</h5>
        </div>
      </div>
    </div>
    <div class="col-12 content_pasos">
      <transition name="fade" mode="out-in"  appear>
        <router-view ></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'productNewCreate',
    created () {
      this.isActivePaso()
    },
    methods: {
      isActivePaso (paso) {
        let url = this.$route.path.split('/')
        if (paso === url.slice(-1)[0]) {
          return 'paso--active'
        }
        return ''
      }
    }
  }
</script>
<style lang='scss'>
  @import "~styles/abstract/variables";
  .content_pasos{
    margin-top: 10px;
  }
  .next_page{
    position: fixed;
    bottom: 0px;
    background: $color-info;
    padding: 10px;
    width: calc(100% - 200px);
    right: 0;
  }
  .paso{
    text-align: center;
    position: relative;
    &--active{
      &:after{
        content: '';
        width: 0;
        height: 0;
        top:100%;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        border-top: 20px solid $color-info;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
      }
    }
    h5{
      margin: 0;
      margin: auto;
      cursor: pointer;
      color: white;
      padding: 5px;
      width: 120px;
      border-radius: 4px;
      background: $color-info;
    }
  }
</style>