<template>
  <form @submit.prevent="saveFamily('form-1')" action="" data-vv-scope="form-1" class="row">
    <div class="col-12 page">
      <h3 class="title_page">Grupo Atributo {{family.name}}</h3>
      <div class="page__header material d-flex  justify-content-between">
        <a href="" @click.prevent='modal.show=true' class='btn btn-danger '><i class='far fa-trash-alt'></i> Eliminar</a>
        <div class="button-group">
          <router-link :to="{ name: 'family'}" class="btn btn-secondary btn-cancel">
            <i class="fa fa-undo-alt"></i>
            Cancelar
          </router-link>
          <button class="btn btn-success btn-save">
            <i class="fa fa-save"></i>
            Guardar
          </button>
        </div>
      </div>
      <div class="d-flex  ">
        <div class="col-4 ">
          <div class="row material content content--read-edit">
            <div class="col-12 content__field content__field--one">
              <label for="">Nombre Grupo Atributo</label>
              <input name="name" type="text" v-model='family.name' v-validate="'required|alpha'" class="form-control"  :class="{'input': true, 'form-control--error': errors.has('form-1.name') }"   >
              <span v-show="errors.has('form-1.name')" class="help error_text">{{ errors.first('form-1.name') }}</span>
            </div>
          </div>
        </div>
        <!-- <component v-bind:is="statusFamily" v-on:changeStatusFamily='changeStatusFamily'>
        </component> -->
        <family-group-read>
        </family-group-read>
      </div>
    </div>
    <modalDelete :modal='modal' @close='close'></modalDelete>
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
      &__row{
        margin-bottom: 4px;
      }
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

  .status{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: $color-gray-cl;
    &--active{
      background: $color-success;

    }
  }
</style>
<script>
  import { EventBus } from '@/bus'
  import modalDelete from '@/componentsGlobals/modalDelete'
  import familyGroupRead from '@/components/family/familyGroupRead'
  export default {
    name: 'familyUpdate',
    components: {
      familyGroupRead,
      modalDelete
    },
    data () {
      return {
        modal: {
          show: false,
          message: '',
          url: '',
          urlRedirect: 'family'
        },
        family: {
          id: null,
          name: ''

        },
        attributes: [],
        is_component: '',
        statusFamily: 'familyNameRead',
        statusFamilyGroup: 'familyGroupRead'
      }
    },
    created () {
      this.getFamily()
    },
    mounted () {
      this.modal.url = '/family/family/' + this.$route.params.id + '/'
    },
    methods: {
      close () {
        this.modal.show = false
      },
      getFamily () {
        const id = this.$route.params.id
        const self = this
        if (id) {
          this.axios.get('/family/family/' + id + '/', {
          }).then(response => {
            self.family = response.data
            self.modal.message = response.data.name
          })
        }
      },
      getAttribute () {
        var self = this
        this.axios.get('/family/family_attribute/', {
          params: self.params
        }).then(response => {
          self.attributes = response.data
        })
      },
      saveFamily (scope) {
        const id = this.$route.params.id
        const self = this
        this.$validator.validateAll(scope).then((result) => {
          if (result) {
            this.axios({
              method: 'put',
              url: '/family/family/' + id + '/',
              data: self.family
            }).then(response => {
              EventBus.$emit('alert_bus', 'success', {'Se guardo correctamente': []})
              self.$emit('changeStatusFamily', 'familyNameRead')
            }).catch(error => {
              let status = ''
              if (error.response.status >= 400 && error.response.status < 500) {
                status = 'danger'
              }
              EventBus.$emit('alert_bus', status, error.response.data)
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
