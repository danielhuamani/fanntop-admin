<template>
  <div class="col-8 second_element">
    <div class="row  material content">

      <div class="col-12 content__field attributes_info">
        <div class="row attributes_info__header">
          <div class="col-6">
            <h6>Attributo</h6>
          </div>
          <div class="col-4">
            <h6>Obligatorio</h6>
          </div>
          <div class="col-1">
            <i class="fa fa-plus icon_add" @click="modalAttrAddData()"></i>
          </div>
          <div class="col-1">

          </div>
        </div>
        <div class="row attributes_info__attr__item"  v-for="attr in familyAttributes">
          <div class="col-6">
            <p class=" attributes_info__attr__value">
              {{attr.name_attr}}
            </p>
          </div>
          <div class="col-4">
            <div class="status" :class='{"status--active" : attr.is_required}'>

            </div>
          </div>
          <div class="col-1">
            <i class="fa fa-edit icon_edit" @click="modalAttrUpdateData(attr.attribute, attr.id)" ></i>
          </div>
          <!-- <div class="col-1">
            <i class="fa fa-times icon_delete"></i>
          </div> -->
        </div>

      </div>
    </div>
  <!--   <family-group-modal v-if="showGroupFamilyModal" :show="showGroupFamilyModal"
    @close="showGroupFamilyModal = false" :modalFamilyGroupId='modalFamilyGroupId'
    :urlFamilyGroup='urlFamilyGroup' @reloadFamilyGroup='reloadFamilyGroup'>
    </family-group-modal> -->
    <family-group-attr-add-modal v-if="showFamilyAttrAddModal" :show="showFamilyAttrAddModal"
    @close="showFamilyAttrAddModal = false"
    :urlListAttr='urlListAttr' :urlFamilyAttr='urlFamilyAttr'
    @reloadFamilyGroup='reloadFamilyGroup'>
  </family-group-attr-add-modal>
  <family-group-attr-update-modal v-if="showGroupFamilyUpdateAddModal" :show="showGroupFamilyUpdateAddModal"
    @close="showGroupFamilyUpdateAddModal = false" :modalFamilyGroupId='modalFamilyGroupId'
    :urlListAttr='urlListAttr' :urlFamilyAttr='urlFamilyAttr' :modalAttrId='modalAttrId' :modalFamilyAttrId='modalFamilyAttrId'
    @reloadFamilyGroup='reloadFamilyGroup'>
  </family-group-attr-update-modal>
  </div>
</template>

<script>
  import { EventBus } from '@/bus'
  import familyGroupModal from './familyGroupModal'
  import familyGroupAttrAddModal from './familyGroupAttrAddModal'
  import familyGroupAttrUpdateModal from './familyGroupAttrUpdateModal'
  export default {
    name: 'familyGroupRead',
    components: {
      familyGroupModal,
      familyGroupAttrAddModal,
      familyGroupAttrUpdateModal
    },
    data () {
      return {
        familyAttributes: [],
        urlFamilyAttr: '/family/family-attribute/',
        urlListAttr: '/family/family_attribute/',
        showGroupFamilyModal: false,
        showFamilyAttrAddModal: false,
        showGroupFamilyUpdateAddModal: false,
        modalFamilyGroupId: '',
        modalAttrId: '',
        modalFamilyAttrId: '',
        modalFamilyGroupUpdate: {
          id: ''
        },
        groupFamily: {
          name: '',
          family: '',
          position: ''
        }
      }
    },

    created () {
      this.getFamilyAttr()
      this.groupFamily.family = this.$route.params.id
    },
    methods: {
      getFamilyAttr () {
        var self = this
        this.axios.get(self.urlFamilyAttr, {
          params: {
            'family_id': self.$route.params.id
          }
        }).then(response => {
          self.familyAttributes = response.data
        })
      },
      reloadFamilyGroup () {
        this.getFamilyAttr()
      },
      clearModalData () {
      },
      modalData (id) {
        this.showGroupFamilyModal = true
        this.modalFamilyGroupId = id
        return this.modalFamilyGroupId
      },
      modalAttrAddData () {
        this.showFamilyAttrAddModal = true
        return this.modalFamilyGroupId
      },
      modalAttrUpdateData (attrId, idFamilyAttr) {
        console.log(attrId, idFamilyAttr, 'idFamilyAttr')
        this.showGroupFamilyUpdateAddModal = true
        this.modalAttrId = attrId
        this.modalFamilyAttrId = idFamilyAttr
        return this.modalFamilyGroupId
      },
      addGroupFamily (scope) {
        const self = this
        this.$validator.validateAll(scope).then((result) => {
          if (result) {
            this.axios({
              method: 'post',
              url: '/family/family-group/',
              data: self.groupFamily
            }).then(response => {
              EventBus.$emit('alert_bus', 'success', {'Se agrego correctamente': []})
              self.groupFamily.name = ''
              self.groupFamily.position = ''
              self.getFamilyAttr()
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
    }
  }
</script>
