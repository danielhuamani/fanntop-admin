<template>
  <div class="row">
    <div class="col-12 page">
      <h3 class="title_page">Actualizar Atributo</h3>
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
              <label for="">Es Variación</label>
              <div class="slider-checkbox">
                <input type="checkbox" id="1" v-model="attribute.is_variation" disabled="disabled" />
                <label class="label" for="1">
                  <span class="fa fa-times slider-checkbox__status--inactive slider-checkbox__status"></span>
                  <span class="fa fa-check slider-checkbox__status slider-checkbox__status--active"></span>
                </label>
              </div>
            </div>
            <div class="col-12 content__field">
              <label for="">Nombre Atributo</label>
              <input type="text" v-model="attribute.name" class="form-control">
            </div>
            <!-- <div class="col-12 content__field">
              <label for="">Nombre en la Tienda</label>
              <input type="text" v-model="attribute.name_store" class="form-control">
            </div> -->

         <!--    <div class="col-12 content__field">
              <label for="">Uso en Filtros</label>
              <div class="slider-checkbox">
                <input type="checkbox" id="1" v-model="attribute.is_filter" />
                <label class="label" for="1">
                  <span class="fa fa-times slider-checkbox__status--inactive slider-checkbox__status"></span>
                  <span class="fa fa-check slider-checkbox__status slider-checkbox__status--active"></span>
                </label>
              </div>
            </div> -->
          </div>
        </div>
        <div class="col-8 second_element">
          <div class="row  material content">
            <div class="col-12 content__field">
              <label for="">Tipo de Atributo</label>
              <span v-for="typeAttribute in getTypeAttributes" v-if="typeAttribute.value === attribute.type_name" >
                {{typeAttribute.name}}
              </span>
            <!--   <select  class="custom-select" v-model="attribute.type_name" v-if="!isDisabled()"  @change="selectTypeAttribute($event.target.value, true)" >
                <option value=""  >Seleccione Atributo</option>
                <option v-for="typeAttribute in getTypeAttributes" :value="typeAttribute.value">{{typeAttribute.name}}</option>
              </select> -->
            </div>


          </div>
          <component v-bind:is="is_component" :typeAttribute="typeAttribute" :getDataOptions='attribute.attribute_options' v-on:setDataOptions='setDataOptions' v-on:deleteDataOptions='deleteDataOptions' v-on:reloadAttributeOption="reloadAttributeOption">
          </component>
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
    name: 'attributeUpdate',
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
        typeAttribute: '',
        is_component: ''
      }
    },
    created () {
      this.getData()
    },
    mounted () {
    },
    methods: {
      getData () {
        var self = this
        var id = this.$route.params.id
        this.axios.get('/attribute/attribute/' + id + '/', {
          params: self.params
        }).then(response => {
          self.attribute = response.data
          self.typeAttribute = response.data.type_name
          self.selectTypeAttribute(self.attribute.type_name, false)
        })
      },
      selectTypeAttribute (value, status) {
        const self = this
        if (status) {
          this.attribute.attribute_options = []
        }
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
        var id = this.$route.params.id
        this.axios({
          method: 'put',
          url: '/attribute/attribute/' + id + '/',
          data: self.attribute
        }).then(response => {
          this.$emit('alert', 'success', {'Se guardo correctamente': []})
          console.log({name: 'attribute_update', params: { id: response.data.id }}, 's')
          self.$router.push({name: 'attribute_update', params: { id: response.data.id }})
          self.getData()
        }).catch(error => {
          let status = ''
          if (error.response.status >= 400 && error.response.status < 500) {
            status = 'danger'
          }
          this.$emit('alert', status, error.response.data)
        })
      },
      setDataOptions (dataOptions) {
        this.attribute.attribute_options.push(dataOptions)
      },
      deleteDataOptions (index) {
        this.$delete(this.attribute.attribute_options, index)
      },
      reloadAttributeOption () {
        this.getData()
      },
      isDisabled () {
        if (['SELECT_SINGLE', 'COLOUR', 'SELECT_MULTIPLE'].indexOf(this.attribute.type_name) === -1) {
          return false
        } else {
          return true
        }
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
