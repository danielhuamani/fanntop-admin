<template>
    <header class="header row justify-content-between align-items-center">
        <div class="header__link_menu col-3">
            <i class="fa fa-bars"></i>
        </div>
        <div class="header__content_user col-9 text-right">
            <span class="header__user">
                daniel huamani
            </span>
        </div>
    </header>
</template>
<style lang="scss">
    @import "~styles/abstract/variables";
    .header{
        background: $color-white;
        padding: 10px 0px;
        &__link_menu{
            font-size: 24px;
            cursor: pointer;
        }
    }
</style>
<script>
  export default {
    name: 'headerMenu'
  }
</script>