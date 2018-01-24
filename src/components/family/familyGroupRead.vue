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
                <div class="col-10" >
                    <h6 class="">{{family_group.name}}</h6>
                </div>

                <div class="col-1" >
                    <i class="fa fa-edit icon_edit " data-toggle="modal" @click="modalData(family_group.id)"
                    data-target="#exampleModalCenter">
                    </i>
                </div>
                <div class="col-1" >
                    <i class="fa fa-times icon_delete"></i>
                </div>

            </div>

            <div class="attributes_info__attr">
              <div class="row attributes_info__attr__item">
                <div class="col-6">
                  <p class=" attributes_info__attr__value">
                    Marca
                  </p>
                </div>
                <div class="col-4">
                  <label class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input">
                    <span class="custom-control-indicator"></span>
                  </label>
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
    <family-group-modal v-if="showModal" :show="showModal" @close="showModal = false" :modalFamilyGroupId='modalFamilyGroupId' :urlFamilyGroup='urlFamilyGroup'>
    </family-group-modal>
  </div>
</template>

<script>
  import familyGroupModal from './familyGroupModal'
  import familyGroupAdd from './familyGroupAdd'
  import familyGroupHeaderRead from './familyGroupHeaderRead'
  export default {
    name: 'familyGroupRead',
    components: {
      familyGroupAdd,
      familyGroupHeaderRead,
      familyGroupModal
    },
    data () {
      return {
        familyGroupList: [],
        modalFamilyGroupId: '',
        urlFamilyGroup: '/family/family-group/',
        showModal: false
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
      editGroupFamily () {
        this.getFamilyGroup()
      },
      clearModalData () {

      },
      existModal () {
        if (this.modalFamilyGroupId) {
          return true
        }
        return false
      },
      close () {
        this.modalFamilyGroupId = ''
      },
      modalData (id) {
        this.showModal = true
        this.modalFamilyGroupId = id
        return this.modalFamilyGroupId
      }
    }
  }
</script>
