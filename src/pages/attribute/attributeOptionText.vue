<template>
  <div class="col-12 content__field">
    <label for="">Opciones</label>
    <div class="input-group">
      <input type="text" class="form-control" v-model='optionValue'>
      <div class="input-group-btn">
        <a href="" class="btn btn-info" @click.prevent='addOption'>Agregar</a>
      </div>
    </div>
    <div class="options" v-if='dataOptions && typeAttribute === "SELECT_SINGLE" || typeAttribute === "SELECT_MULTIPLE"'>
      <div class="options__value" v-for='option, index in getDataOptions'>
        <p class="options__value__text">{{option.option}}</p>
        <i class="fa fa-times options__value__close" @click="removeOption(index)"></i>
      </div>
    </div>
  </div>
</template>


<style lang='scss'>
  @import "~styles/abstract/variables";
  .options{
    margin-top: 20px;
    &__value{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #eee;
      padding: 0px;
      margin: 10px 0;
      &__text{
        margin: 0;
        padding: 4px 8px;
      }
      &__close{
        font-size: 18px;
        padding: 8px;
        color: white;
        cursor: pointer;
        background: $color-danger;
      }
    }
  }
</style>

<script>
  export default {
    name: 'attributeOptionText',
    props: ['getDataOptions', 'typeAttribute'],
    data () {
      return {
        dataOptions: [],
        optionValue: ''
      }
    },
    mounted () {
    },
    methods: {
      addOption () {
        if (this.optionValue) {
          this.$emit('setDataOptions', {'position': 0, 'option': this.optionValue})
          this.optionValue = ''
        }
      },
      removeOption (index) {
        this.$emit('deleteDataOptions', index)
      }
    }
  }
</script>
