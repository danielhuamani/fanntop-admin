<template>
  <form @submit.prevent="saveData()" action=""  class="row">
    <div class="col-12 page">
      <h3 class="title_page">Nuevo Atributo</h3>
      <div class="page__header material d-flex  justify-content-end">
        <router-link :to="{ name: 'attribute'}" class="btn btn-secondary btn-cancel">
          <i class="fa fa-undo-alt"></i>
          Cancelar
        </router-link>
        <button class="btn btn-success btn-save">
          <i class="fa fa-save"></i>
          Guardar
        </button>
      </div>
      <div class="d-flex  ">
        <div class="col-4 ">
          <div class="row material content">
            <div class="col-12 content__field">
              <label for="">Nombre Atributo</label>
              <input type="text" name="name" v-validate="'required|alpha_spaces'" :class="{'form-control--error': errors.has('name') }" v-model="attribute.name" class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Nombre en la Tienda</label>
              <input type="text" name="name_store" :class="{'form-control--error': errors.has('name_store') }" v-validate="'required|alpha_spaces'" v-model="attribute.name_store" class="form-control">
            </div>
            <div class="col-12 content__field content__field--check">
              <label for="">Es Variación</label>
              <div class="slider-checkbox">
                <input type="checkbox" id="1" v-model="attribute.is_variation" />
                <label class="label" for="1">
                  <span class="fa fa-times slider-checkbox__status--inactive slider-checkbox__status"></span>
                  <span class="fa fa-check slider-checkbox__status slider-checkbox__status--active"></span>
                </label>
              </div>
            </div>
            <div class="col-12 content__field content__field--check">
              <label for="">Uso en Filtros</label>
              <div class="slider-checkbox">
                <input type="checkbox" id="1" v-model="attribute.is_filter" />
                <label class="label" for="1">
                  <span class="fa fa-times slider-checkbox__status--inactive slider-checkbox__status"></span>
                  <span class="fa fa-check slider-checkbox__status slider-checkbox__status--active"></span>
                </label>
              </div>
            </div>
          </div>

        </div>
        <div class="col-8 second_element">
          <div class="row  material content">
            <div class="col-12 content__field">
              <label for="">Tipo de Atributo</label>
              <select  class="custom-select" name="type_name" v-validate="'required'" v-model="attribute.type_name" :class="{'form-control--error': errors.has('name_store') }"  @change="selectTypeAttribute($event)" >
                <option value=""  >Seleccione Atributo</option>
                <option v-for="typeAttribute in getTypeAttributes" :value="typeAttribute.value">{{typeAttribute.name}}</option>
              </select>
            </div>
          </div>
          <component v-bind:is="is_component"  :getDataOptions='attribute.attribute_options' v-on:setDataOptions='setDataOptions' v-on:deleteDataOptions='deleteDataOptions'>
          </component>
        </div>

      </div>
    </div>
  </form>
</template>
<script>
  import VueCkeditor from 'vueckeditor'
  import attributeMixin from '@/mixins/attributeMixin'
  import attributeOptionText from './attributeOptionText'
  import attributeOptionColour from './attributeOptionColour'
  export default {
    name: 'attributeCreate',
    components: {
      VueCkeditor,
      attributeOptionText,
      attributeOptionColour
    },
    mixins: [attributeMixin],
    data () {
      return {
        attribute: {
          id: null,
          name: '',
          name_store: '',
          is_variation: false,
          is_filter: false,
          attribute_options: [],
          type_name: ''
        },
        is_component: ''

      }
    },
    created () {
    },
    mounted () {

    },
    methods: {

      selectTypeAttribute (event) {
        const value = event.target.value
        const self = this
        this.attribute.attribute_options = []
        switch (value) {
          case 'SELECT_SINGLE' :
            self.is_component = 'attributeOptionText'
            break
          case 'SELECT_MULTIPLE' :
            self.is_component = 'attributeOptionText'
            break
          case 'COLOUR' :
            self.is_component = 'attributeOptionColour'
            break
          default:
            self.is_component = ''
        }
      },
      saveData () {
        var self = this
        self.$validator.validateAll().then((result) => {
          if (result) {
            this.axios({
              method: 'post',
              url: '/attribute/attribute/',
              data: self.attribute
            }).then(response => {
              this.$emit('alert', 'success', {'Se guardo correctamente': []})
              self.$router.push({name: 'attribute_update', params: { id: response.data.id }})
            }).catch(error => {
              let status = ''
              if (error.response.status >= 400 && error.response.status < 500) {
                status = 'danger'
              }
              this.$emit('alert', status, error.response.data)
            })
          }
        })
      },
      dataOptions (dataOptions) {
        console.log(dataOptions, 'dataOptions')
        this.attribute.attribute_options = dataOptions
      },
      setDataOptions (dataOptions) {
        this.attribute.attribute_options.push(dataOptions)
      },
      deleteDataOptions (index) {
        this.$delete(this.attribute.attribute_options, index)
      }

    },
    computed: {
      getTypeAttributes () {
        if (this.attribute.is_variation) {
          if (['SELECT_SINGLE', 'COLOUR'].indexOf(this.attribute.type_name) === -1) {
            this.attribute.type_name = ''
            this.is_component = ''
            this.attribute.attribute_options = []
          }
          return this.typeAttributesVariation
        } else {
          return this.typeAttributes
        }
      }
    }
  }
</script>
