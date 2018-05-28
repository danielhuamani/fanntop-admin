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
                        <select class="custom-select" v-model="familyAttribute.attribute" name="" >
                          <option value="">Seleccione Atributo</option>
                          <option :value="attr.id"  v-for="attr in Attributes">{{attr.name}}</option>
                        </select>
                      </div>
                      <div class="col-6 content__field">
                        <label for="">Posicion</label>
                        <input type="text" name="" v-model='familyAttribute.position' value="" class="form-control">
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
    name: 'familyAttributeAddModal',
    props: ['urlListAttr', 'show',
      'urlFamilyAttr'],
    data () {
      return {
        Attributes: [],
        familyAttribute: {
          family: this.$route.params.id,
          attribute: '',
          is_required: false,
          position: 1
        }
      }
    },
    created () {
      this.getAttributes()
    },
    methods: {
      getAttributes () {
        var self = this
        this.axios.get(self.urlListAttr, {
          params: {
            'family_id': self.$route.params.id,
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
          url: self.urlFamilyAttr,
          data: self.familyAttribute
        }).then(response => {
          EventBus.$emit('alert_bus', 'success', {'Se modifico correctamente': []})
          self.$emit('reloadFamilyGroup')
          self.close()
        })
      }
    }
  }
</script>
