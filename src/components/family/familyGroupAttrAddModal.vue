<template>
  <transition name="modal">
          <div class="modal-mask" @click="close" v-show="show">
              <div class="modal-container" @click.stop>
                  <div class="modal-header">
                      <h4>Attributo</h4>
                  </div>
                  <div class="modal-body ">
                    <div class="row">
                      <div class="col-6 content__field">
                        <label for="">Atributo</label>
                        <select class="custom-select" name="" @change="changeAttr($event)">
                          <option value="">Seleccione Atributo</option>
                          <option :value="attr.id" v-for="attr in Attributes">{{attr.name}}</option>
                        </select>
                      </div>
                      <div class="col-6 content__field">
                        <label for="">Posicion</label>
                        <input type="text" name="" v-model='familyGroupAttr.position' value="" class="form-control">
                      </div>
                      <div class="col-6 content__field">
                        <label for="">Obligatorio</label>
                        <label class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" v-model="familyGroupAttr.is_required">
                          <span class="custom-control-indicator"></span>
                        </label>
                      </div>
                    </div>

                  </div>
                  <div class="modal-footer text-right">
                      <button class="btn btn-info" @click="savePost()">
                          Guardar
                      </button>
                  </div>
              </div>
          </div>
      </transition>
</template>
<style >
  * {
    box-sizing: border-box;
  }


</style>
<script>
  import { EventBus } from '@/bus'
  export default {
    name: 'familyGroupModal',
    props: ['modalFamilyGroupId', 'urlListAttr', 'show', 'urlFamilyGroupAttr'],
    data () {
      return {
        Attributes: [],
        familyGroupAttr: {
          family_group: this.modalFamilyGroupId,
          atribute: '',
          is_required: false,
          position: 1
        }
      }
    },
    mounted () {
      this.getAttributes(this.modalFamilyGroupAttrId)
    },
    methods: {
      getAttributes (id) {
        var self = this
        this.axios.get(self.urlListAttr, {
          params: {
            'family_group': self.modalFamilyGroupId,
            'fields': 'id,name'
          }
        }).then(response => {
          self.Attributes = response.data
        })
      },
      close () {
        this.$emit('close')
      },
      savePost () {
        var self = this
        this.axios({
          method: 'post',
          url: self.urlFamilyGroupAttr,
          data: self.familyGroupAttr
        }).then(response => {
          EventBus.$emit('alert_bus', 'success', {'Se modifico correctamente': []})
          self.$emit('reloadFamilyGroup')
          self.close()
        })
      },
      changeAttr (e) {
        this.familyGroupAttr.atribute = e.target.value
      }
    }
    // watch: {
    //   modal_data: function () {
    //     this.id = this.modal_data.id
    //     this.name = this.modal_data.name
    //     this.position = this.modal_data.position
    //   }
    // }
  }
</script>
