<template>
  <div class="col-8 second_element">
    <div class="row  material content">
      <family-group-add v-on:addGroupFamily="addGroupFamily">
      </family-group-add>
      <div class="col-12 content__field attributes_info">
        <div class="row attributes_info__header">
          <div class="col-6">
            <h6>Attributo</h6>
          </div>
          <div class="col-4">
            <h6>Obligatorio</h6>
          </div>
          <div class="col-1">

          </div>
          <div class="col-1">

          </div>
        </div>
        <div class="row attributes_group">
          <div class="col-12" v-for='family_group in familyGroupList'>
            <div class="row attributes_info__sub_header align-items-center">
                <div class="col-9" >
                    <h6 class="">{{family_group.name}}</h6>
                </div>
                <div class="col-1" >
                    <i class="fa fa-plus icon_add" @click="modalAttrAddData(family_group.id)"></i>
                </div>
                <div class="col-1" >
                    <i class="fa fa-edit icon_edit " @click="modalData(family_group.id)"
                    >
                    </i>
                </div>
                <div class="col-1" >
                    <i class="fa fa-times icon_delete"></i>
                </div>

            </div>

            <div class="attributes_info__attr">
              <div class="row attributes_info__attr__item" v-for="attr in family_group.familygroup_familygroupatribute">
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
                  <i class="fa fa-edit icon_edit"  ></i>
                </div>
                <div class="col-1">
                  <i class="fa fa-times icon_delete"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <family-group-modal v-if="showGroupFamilyModal" :show="showGroupFamilyModal"
    @close="showGroupFamilyModal = false" :modalFamilyGroupId='modalFamilyGroupId'
    :urlFamilyGroup='urlFamilyGroup' @reloadFamilyGroup='reloadFamilyGroup'>
    </family-group-modal>
    <family-group-attr-add-modal v-if="showGroupFamilyAttrAddModal" :show="showGroupFamilyAttrAddModal"
    @close="showGroupFamilyAttrAddModal = false" :modalFamilyGroupId='modalFamilyGroupId'
    :urlListAttr='urlListAttr' :urlFamilyGroupAttr='urlFamilyGroupAttr' @reloadFamilyGroup='reloadFamilyGroup'>
  </family-group-attr-add-modal>
  </div>
</template>

<script>
  import familyGroupModal from './familyGroupModal'
  import familyGroupAttrAddModal from './familyGroupAttrAddModal'
  import familyGroupAdd from './familyGroupAdd'
  export default {
    name: 'familyGroupRead',
    components: {
      familyGroupAdd,
      familyGroupModal,
      familyGroupAttrAddModal
    },
    data () {
      return {
        familyGroupList: [],
        modalFamilyGroupId: '',
        urlFamilyGroup: '/family/family-group/',
        urlFamilyGroupAttr: '/family/family-group-attribute/',
        urlListAttr: '/family/family_attribute/',
        showGroupFamilyModal: false,
        showGroupFamilyAttrAddModal: false
      }
    },
    mounted () {
      this.getFamilyGroup()
    },
    methods: {
      getFamilyGroup () {
        var self = this
        this.axios.get(self.urlFamilyGroup, {
          params: {
            'family': self.$route.params.id
          }
        }).then(response => {
          self.familyGroupList = response.data
        })
      },
      addGroupFamily () {
        this.getFamilyGroup()
      },
      reloadFamilyGroup () {
        this.getFamilyGroup()
      },

      clearModalData () {

      },
      modalData (id) {
        this.showGroupFamilyModal = true
        this.modalFamilyGroupId = id
        return this.modalFamilyGroupId
      },
      modalAttrAddData (id) {
        this.showGroupFamilyAttrAddModal = true
        this.modalFamilyGroupId = id
        return this.modalFamilyGroupId
      }
    }
  }
</script>
