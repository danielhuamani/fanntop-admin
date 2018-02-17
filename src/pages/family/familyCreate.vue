<template>
  <form @submit.prevent="saveFamily('form-1')" action="" data-vv-scope="form-1" class="row">
    <div class="col-12 page">
      <h3 class="title_page">Nuevo Grupo Atributo</h3>
      <div class="page__header material d-flex  justify-content-end">
        <router-link :to="{ name: 'family'}" class="btn btn-secondary btn-cancel">
          <i class="fa fa-undo-alt"></i>
          Cancelar
        </router-link>
        <button class="btn btn-success btn-save">
          <i class="fa fa-save"></i>
          Guardar
        </button>
      </div>
      <div class="d-flex  ">
        <div class="col-4">
          <div class="row material content content--read-edit">
            <div class="col-12 content__field content__field--one">
              <label for="">Nombre Grupo Atributo</label>
              <input name="name" type="text" v-model='family.name' v-validate="'required|alpha'" class="form-control"  :class="{'input': true, 'form-control--error': errors.has('form-1.name') }"   >
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<style lang="scss">
  @import "~styles/abstract/variables";
  .attributes{
    &__item{
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid $color-panel;
      padding: 5px 0px;
      align-items: center;
      &__name{
        margin: 0;
        font-size: 14px;
      }
      &__add{
        font-size: 14px;
        cursor: pointer;
        color: $color-success;
      }
    }
  }
  .attributes_info{
    &__header{
      border-bottom: 1px solid $color-gray-cl;
      padding-bottom: 4px;
      margin-bottom: 0px;
      p{
        margin-bottom: 0px;
      }
    }
    &__sub_header{
      margin-top: 15px;
      margin-bottom: 15px;
      border-bottom: 1px solid $color-gray-cl;

    }
    &__attr{
      &__item{
        margin: 10px 0;
        border-bottom: 2px solid $color-panel;


      }
      &__value{
        margin: 0;
      }
    }
  }
  .icon_edit{
    color: $color-success;
  }
  .icon_delete{
    color: $color-danger;
  }
</style>
<script>
  import spanish from 'vee-validate/dist/locale/es'
  import { EventBus } from '@/bus'
  import VueCkeditor from 'vueckeditor'
  export default {
    name: 'familyCreate',
    components: {
      VueCkeditor
    },
    data () {
      return {
        family: {
          id: null,
          name: ''

        },
        attributes: [],
        is_component: ''

      }
    },
    created () {
      this.$validator.localize('es', {
        messages: spanish.messages,
        attributes: {
          name: ' '

        }
      })
      this.getAttribute()
    },
    mounted () {

    },
    methods: {
      getAttribute () {
        var self = this
        this.axios.get('/family/family_attribute/', {
          params: self.params
        }).then(response => {
          self.attributes = response.data
        })
      },
      saveFamily (scope) {
        const self = this
        this.$validator.validateAll(scope).then((result) => {
          if (result) {
            this.axios({
              method: 'post',
              url: '/family/family/',
              data: self.family
            }).then(response => {
              EventBus.$emit('alert', 'success', {'Se guardo correctamente': []})
              self.$router.push({name: 'family_update', params: { id: response.data.id }})
            }).catch(error => {
              let status = ''
              if (error.response.status >= 400 && error.response.status < 500) {
                status = 'danger'
              }
              EventBus.$emit('alert', status, error.response.data)
            })
            return
          }
          EventBus.$emit('alert_bus', 'danger', {'Verifique los campos resaltados': []})
        })
      }
    },
    computed: {

    }
  }
</script>
