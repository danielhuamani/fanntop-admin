<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="scss">
    @import "~styles/main";
    #app{
        height: 100%;
        background: #f4f6f8;
    }
</style>
<script>
export default {
  name: 'app'
}
</script>

