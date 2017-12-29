<template>
    <div class="table_component material ">
        <div class="table_component__header d-flex justify-content-between">
          <div class="table_component__header__field col-1">
            <input type="checkbox">
          </div>
          <div :class="['table_component__header__field', field.col] " v-for="field in headerField">
            {{field.name}}
          </div>
        </div>
    </div>
</template>
<style lang="scss">
  @import "~styles/abstract/variables";

  .table_component{
    margin-top: 40px;
    padding: 15px;
    background: $color-white;
  }
</style>
<script>
  export default {
    name: 'tableGlobal',
    props: ['headerField']
  }
</script>