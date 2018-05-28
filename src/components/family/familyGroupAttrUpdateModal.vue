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
                        <select class="custom-select" v-model="familyAttr.attribute" name="" >
                          <option value="">Seleccione Atributo</option>
                          <option :value="attr.id"  v-for="attr in Attributes">{{attr.name}}</option>
                        </select>
                      </div>
                      <div class="col-6 content__field">
                        <label for="">Posicion</label>
                        <input type="text" name="" v-model='familyAttr.position' value="" class="form-control">
                      </div>
                      <div class="col-6 content__field">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" v-model="familyAttribute.is_required" class="custom-control-input" id="customCheck1">
                          <label class="custom-control-label" for="customCheck1">Obligatorio</label>
                        </div>
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
    name: 'familyGroupAttrUpdateModal',
    props: ['modalFamilyGroupId', 'urlListAttr', 'show',
      'modalFamilyAttrId', 'modalAttrId', 'urlFamilyAttr'],
    data () {
      return {
        Attributes: [],
        familyAttr: {
          family_group: '',
          attribute: '',
          is_required: false,
          position: 1
        }
      }
    },
    created () {
      this.getAttributes()
      this.getFamilyGroupAttr()
      // this.getFamilyGroups()
      // this.familyAttr.atribute = this.modalFamilyAttrId
    },
    methods: {
      getAttributes () {
        var self = this
        this.axios.get(self.urlListAttr, {
          params: {
            'family_id': self.$route.params.id,
            'fields': 'id,name',
            'attr_id': self.modalAttrId
          }
        }).then(response => {
          self.Attributes = response.data
        })
      },
      // getFamilyGroups () {
      //   var self = this
      //   this.axios.get(self.urlFamilyGroup, {
      //     params: {
      //       'family': self.$route.params.id
      //     }
      //   }).then(response => {
      //     self.familyGroups = response.data
      //   })
      // },
      getFamilyGroupAttr () {
        var self = this
        this.axios.get(self.urlFamilyAttr + self.modalFamilyAttrId)
        .then(response => {
          self.familyAttr = response.data
        })
      },
      close () {
        this.$emit('close')
      },
      savePost () {
        var self = this
        this.axios({
          method: 'put',
          url: self.urlFamilyAttr + self.familyAttr.id + '/',
          data: self.familyAttr
        }).then(response => {
          EventBus.$emit('alert_bus', 'success', {'Se modifico correctamente': []})
          self.$emit('reloadFamilyGroup')
          self.close()
        })
      }
    }
  }
</script>
