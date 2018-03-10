<template>
    <div class="table  ">
        <div class="table__header material d-flex justify-content-between">
          <div class="table__header__field col-1">
            <label class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input">
              <span class="custom-control-indicator"></span>
            </label>
          </div>
          <div :class="['table__header__field', field.col] " v-for="field in headerField">
            <h6>{{field.name}}</h6>
            <div class="table__header__orderBy" v-if="field.orderBy">
              <i :class="['fa fa-angle-up table__header__orderBy__asc', isActiveOrderBy(field.field, 'asc')]" v-on:click="orderBy(field.field, 'asc')"></i>
              <i :class="['fa fa-angle-down table__header__orderBy__desc', isActiveOrderBy(field.field, 'desc')]" v-on:click="orderBy(field.field, 'desc')"></i>
            </div>
          </div>
        </div>
        <div class="table__body material  ">
            <div class="table__body__row " v-for="dataRow in tablaDataList">
              <router-link :to="{ name: nameUrl, params: { id: dataRow.id }}"  class="table__body__link d-flex justify-content-between align-items-center">
                <div class=" col-1">
                  <label class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input">
                    <span class="custom-control-indicator"></span>
                  </label>
                </div>
                <div :class="[field.col]" v-for="field in headerField">
                  <h6 v-if="field.type == 'text'" >{{getFieldData(dataRow, field)}}</h6>
                  <img :src="getFieldData(dataRow, field)" v-if="field.type == 'image'"/>
                  <span v-if="field.type == 'boolean'" v-bind:class="[getFieldData(dataRow, field) ? 'bg-success' : '', 'table__body__row__status']">
                  </span>
                </div>
              </router-link>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
  @import "~styles/abstract/variables";

  .table{
    margin-top: 40px;
    &__header{
      padding: 15px;
      background: $color-white;
      align-items: center;
      &__field{
        position: relative;
        h6{
          margin:0;
        }
      }
      &__orderBy{
        position: absolute;
        right: 30px;
        top: -9px;
        &__asc, &__desc{
          cursor: pointer;
          font-size: 18px;
          display: block;
          color: $color-gray-cl;
        }
        .order_by_active{
          color: $color-black;
        }
      }
    }
    &__body{
      margin-top: 20px;
      background: $color-white;
      &__link{
        color: $color-table-link;
        &:hover{
          color: $color-black;
          text-decoration: none;
        }
      }
      &__row{
        padding: 10px 15px;
        background: $color-white;
        &__status{
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: $color-gray-cl;
          display: block;

        }
        h6{
          margin: 0;
        }
      },
      &__row:nth-child(even){
        background: #f9f9f9;
      }
    }
  }
</style>
<script>
  export default {
    name: 'tableGlobal',
    props: ['headerField', 'tablaDataList', 'nameUrl'],
    data () {
      return {
        order_by: {
          field: '',
          orderBy: ''
        }
      }
    },
    methods: {
      orderBy (fieldName, order) {
        // this.$set(this.order_by, 'field', fieldName)
        this.order_by = {
          'field': fieldName,
          'orderBy': order
        }
        this.$emit('orderBy', this.order_by)
        // this.$set(this.order_by, 'orderBy', order)
      },
      getType (type) {

      },
      getFieldData (influencer, field) {
        if (field.field.split('.').length > 1) {
          let newField = field.field.split('.')
          return influencer[newField[0]][newField[1]]
        } else {
          return influencer[field.field]
        }
      },
      isActiveOrderBy (fieldName, order) {
        if (this.order_by.field === fieldName && this.order_by.orderBy === order) {
          return 'order_by_active'
        } else {
          return ''
        }
      }
    }
  }
</script>
