<template lang="html">
  <div class="col-12 material content variations">
    <h5 class="material__title">Variaciones</h5>
    <div class="row variations__header">
      <div class="col-1">
      </div>
      <div class="col-3">
        <h4 class="variations__header__title">Variación</h4>
      </div>
      <div class="col-2">
        <h4 class="variations__header__title">Precio</h4>
      </div>
      <div class="col-2">
        <h4 class="variations__header__title">SKU</h4>
      </div>
      <div class="col-2">
        <h4 class="variations__header__title">Inventario</h4>
      </div>
      <div class="col-2">
        <h4 class="variations__header__title"></h4>
      </div>
    </div>
    <div class="row variations__body align-items-center">
      <div class="col-1">
        <label class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" value="10">
          <span class="custom-control-indicator"></span>
        </label>
      </div>
      <div class="col-3">
        <h4 class="variations__body__title">Variación</h4>
      </div>
      <div class="col-2">
        <h4 class="variations__body__title">Precio</h4>
      </div>
      <div class="col-2">
        <h4 class="variations__body__title">SKU</h4>
      </div>
      <div class="col-2">
        <h4 class="variations__body__title">Inventario</h4>
      </div>
      <div class="col-2">
        <h4 class="variations__body__title"></h4>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'productVariant'
}
</script>

<style lang="scss">
@import "~styles/abstract/variables";
.variations{

  &__body{
    margin: 10px 0;

    &__title{
      font-size: 14px;
      margin: 0;
    }
  }
  &__header{
    border-bottom: 1px solid $color-gray-cl;
    margin: 0;
    &__title{
      font-size: 14px;
      margin: 0;
    }
  }

}
</style>
