<template>
  <div class="row material content">
    <div class="col-12 content__field">
      <h5 class="material__title">Opciones</h5>
      <div class="row align-items-center">
        <div class="col-10">
          <span>Valor Atributo</span>
        </div>
        <div class="col-2">
          <span>Agregar</span>
        </div>
      </div>
      <div class="row">
        <div class="col-10">
          <input type="text" class="form-control" v-model='optionValue' :class="{'form-control--error': errorOptionValue }">
        </div>
        <div class="col-2">
          <i class="fa fa-plus icon_add" @click.prevent='addOption'></i>
        </div>
      </div>
      <div class="options__value row" v-for='option, index in getDataOptions'>
        <div class="col-10">
          <span class="options__value__text">{{option.option}}</span>
        </div>
        <div class="col-1" v-if="!option.id">
          <i class="fa fa-times icon_delete" @click="removeOption(index)" ></i>
        </div>
        <div class="col-1" v-if="option.id">
          <i class="fa fa-edit icon_edit" @click="modalData(option.id)" ></i>
        </div>
      </div>
    </div>
    <attribute-modal v-if="showAttributeModal" :show="showAttributeModal"
    @close="showAttributeModal = false" :idModalAttributeOption='idModalAttributeOption'
    :urlAttributeOption='urlAttributeOption' @reloadAttributeOption='reloadAttributeOption'>
    </attribute-modal>
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
      padding: 0px;
      margin-bottom: 10px;
      margin-top: 10px;
      border-bottom: 2px solid #f7f9fd;
      &__text{
        margin: 0;
        padding: 4px 0px;
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
  import attributeModal from './attributeModal'
  export default {
    name: 'attributeOptionText',
    props: ['getDataOptions', 'typeAttribute'],
    components: {
      attributeModal
    },
    data () {
      return {
        dataOptions: [],
        optionValue: '',
        errorOptionValue: false,
        idModalAttributeOption: '',
        urlAttributeOption: '/attribute/attribute-option/',
        showAttributeModal: false
      }
    },
    mounted () {
    },
    methods: {
      addOption () {
        if (this.optionValue) {
          this.$emit('setDataOptions', {'position': 0, 'option': this.optionValue})
          this.optionValue = ''
          this.errorOptionValue = false
        } else {
          this.errorOptionValue = true
        }
      },
      removeOption (index) {
        this.$emit('deleteDataOptions', index)
      },
      modalData (id) {
        console.log(id, 'id')
        this.showAttributeModal = true
        this.idModalAttributeOption = id
      },
      reloadAttributeOption () {
        this.$emit('reloadAttributeOption')
      }
    }
  }
</script>
