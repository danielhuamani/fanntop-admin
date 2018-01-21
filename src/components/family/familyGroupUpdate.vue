<template>
  <div class="col-8 second_element">
    <div class="row  material content">
      <div class="col-12 content__field">
        <label for="">Información del grupo atributo</label>
        <div class="input-group">
          <input type="text" class="form-control">
          <input type="number" class="form-control">
          <div class="input-group-btn">
            <a href="" class="btn btn-info" @click.prevent='addOption'>Agregar</a>
          </div>
        </div>
      </div>
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
          <div class="col-12">
            <h6 class="attributes_info__sub_header">Informacion General</h6>
            <div class="attributes_info__attr">
              <div class="row attributes_info__attr__item">
                <div class="col-6">
                  <p class=" attributes_info__attr__value">
                    Marca
                  </p>
                </div>
                <div class="col-6">
                  <label class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input">
                    <span class="custom-control-indicator"></span>
                  </label>
                </div>
              </div>
            </div>
            <div class="attributes_info__attr">
              <div class="row attributes_info__attr__item">
                <div class="col-6">
                  <p class=" attributes_info__attr__value">
                    Marca
                  </p>
                </div>
                <div class="col-6">
                  <label class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input">
                    <span class="custom-control-indicator"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="row attributes_info__sub_header">
              <div class="col-10">
                <h6 class="">Informacion General</h6>
              </div>
              <div class="col-1">
                <i class="fa fa-edit icon_edit"></i>
              </div>
              <div class="col-1">
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
                  <i class="fa fa-edit icon_edit"></i>
                </div>
                <div class="col-1">
                  <i class="fa fa-times icon_delete"></i>
                </div>

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
                  <i class="fa fa-edit icon_edit"></i>
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
  </div>
</template>

<script>
  export default {
    name: 'familyGroupUpdate'
  }
</script>