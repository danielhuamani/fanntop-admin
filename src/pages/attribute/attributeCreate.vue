<template>
  <div class="row">
    <div class="col-12 page">
      <h3 class="title_page">Nuevo Atributo</h3>
      <div class="page__header material d-flex  justify-content-end">
        <router-link :to="{ name: 'attribute'}" class="btn btn-secondary btn-cancel">
          <i class="fa fa-undo-alt"></i>
          Cancelar
        </router-link>
        <a href="" class="btn btn-success btn-save" @click.prevent="saveData">
          <i class="fa fa-save"></i>
          Guardar
        </a>
      </div>
      <div class="d-flex  ">
        <div class="col-4 ">
          <div class="row material content">
            <div class="col-12 content__field">
              <label for="">Nombre Atributo</label>
              <input type="text" v-model="attribute.name" class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Nombre en la Tienda</label>
              <input type="text" v-model="attribute.name_store" class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Es Variación</label>
              <div class="checkbox">
                <label class="label">
                  <input  class="label__checkbox" v-model="attribute.is_variation" type="checkbox" />
                  <span class="label__text">
                    <span class="label__check">
                      <i class="fa fa-check icon"></i>
                    </span>
                  </span>
                </label>
              </div>
            </div>
            <div class="col-12 content__field">
              <label for="">Uso en Filtros</label>
              <div class="checkbox">
                <label class="label">
                  <input  class="label__checkbox" v-model="attribute.is_filter" type="checkbox" />
                  <span class="label__text">
                    <span class="label__check">
                      <i class="fa fa-check icon"></i>
                    </span>
                  </span>
                </label>
              </div>
            </div>
          </div>

        </div>
        <div class="col-8 second_element">
          <div class="row  material content">

            <div class="col-12 content__field">
              <label for="">Tipo de Atributo</label>
              <select  class="custom-select" v-model="attribute.type_name" @change="selectTypeAttribute($event)" >
                <option value=""  >Seleccione Atributo</option>
                <option v-for="typeAttribute in typeAttributes" :value="typeAttribute.value">{{typeAttribute.name}}</option>
              </select>
            </div>
            <component v-bind:is="is_component" :getDataOptions='attribute.attribute_options' v-on:setDataOptions='setDataOptions' v-on:deleteDataOptions='deleteDataOptions'>
            </component>

          </div>
        </div>

      </div>
    </div>
  </div>
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

        this.axios({
          method: 'post',
          url: '/attribute/',
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
      },
      dataOptions (dataOptions) {
        console.log(dataOptions, 'dataOptions')
        this.attribute.attribute_options = dataOptions
      },
      setDataOptions (dataOptions) {
        console.log(dataOptions, 'dataOptions')
        this.attribute.attribute_options.push(dataOptions)
      },
      deleteDataOptions (index) {
        this.$delete(this.attribute.attribute_options, index)
      }

    },
    computed: {

    }
  }
</script>
