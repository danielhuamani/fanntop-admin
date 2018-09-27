<template>
    <div class="table  ">
        <div class="table__header material d-flex justify-content-between">
          <div class="table__header__field col-1">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="customCheck1">
              <label class="custom-control-label" for="customCheck1"></label>
            </div>
          </div>
          <div :class="['table__header__field', field.col] " v-for="field in headerField">
            <h6>{{field.name}}</h6>
            <div class="table__header__orderBy" v-if="field.orderBy">
              <i :class="['fa fa-angle-up table__header__orderBy__asc', isActiveOrderBy(field.fieldOrder, 'asc')]" v-on:click="orderBy(field.fieldOrder, 'asc')"></i>
              <i :class="['fa fa-angle-down table__header__orderBy__desc', isActiveOrderBy(field.fieldOrder, 'desc')]" v-on:click="orderBy(field.fieldOrder, 'desc')"></i>
            </div>
          </div>
        </div>
        <div class="table__body material  ">
            <div class="table__body__row_first " v-for="dataRow in tablaDataList">
              <div class="table__body__row">
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
              <div class="table__body__row table__body__row--second" v-for="datasecondRow in dataRow.category_categories">
                <router-link :to="{ name: nameUrl, params: { id: datasecondRow.id }}"  class="table__body__link table__body__link--second d-flex justify-content-between align-items-center">
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
                <div class="table__body__row table__body__row--second" v-for="datathirdRow in datasecondRow.category_categories">
                  <router-link :to="{ name: nameUrl, params: { id: datathirdRow.id }}"  class="table__body__link table__body__link--third d-flex justify-content-between align-items-center">
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
        </div>
    </div>
</template>
<style lang="scss" scope>
  @import "~styles/abstract/variables";

  .table{
    margin-top: 40px;
    &__header{
      padding: 15px 0;
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
      margin-top: 2px;
      background: $color-white;
      &__link{
        color: $color-table-link;
        width: 100%;
        &--second{
          padding-left: 30px;
        }
        &--third{
          padding-left: 60px;
        }
        &:hover{
          color: $color-black;
          text-decoration: none;
        }
      }
      &__row{
        padding: 10px 0;
        background: $color-white;

        &--third{

        }
        &__status{
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: $color-gray-cl;
          display: block;

        }
        h6{
          margin: 0;
          font-size: 14px;
        }
      }
      &__row:nth-child(even){
        background: #f9f9f9;
      }
    }
  }
</style>
<script>
  export default {
    name: 'tableNivelGlobal',
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
        return influencer[field.field]
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