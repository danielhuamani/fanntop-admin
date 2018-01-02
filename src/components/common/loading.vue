<template>
  <div class="container_loading" v-if="loading">
    <section>
      <div class="loader loader-5">
        <div class="loader-pacman"></div>
      </div>
    </section>
  </div>
</template>
<style lang='scss'>
  @import "~styles/abstract/variables";
  .container_loading{
    text-align: center;
  }

  section {
        width: 100%;
        height: 100vh;
        display: inline-block;
        text-align: center;
        min-height: 215px;
        vertical-align: top;
        background: rgba(#080915, 0.5);
        position:fixed;
        top: 0;
        left: 0;
        z-index: 300;
        border-radius: 5px;

  }
  .loader {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 75px;
    display: inline-block;
    vertical-align: middle;
    top:28%;
  }
 .loader-5 {
      border: 8px dotted rgba(255, 255, 0, 1);
      -webkit-transition: all 1s ease;
      -o-transition: all 1s ease;
      transition: all 1s ease;
      animation: dotted-spin 1.5s linear infinite;
      border-bottom-width: 1px;
      border-bottom-color: rgba(255, 255, 0, 0.3);
      border-left-width: 2px;
      border-left-color: rgba(255, 255, 0, 0.5);
      border-top-width: 3px;
      border-right-width: 4px;
      border-top-color: rgba(255, 255, 0, 0.7);
  }
  .loader-5 .loader-pacman,
  .loader-pacman {
      position: absolute;
      top: 40px;
      left: 25px;
      width: 0px;
      height: 0px;
      border-right: 12px solid transparent;
      border-top: 12px solid rgba(255, 255, 0, 1);
      border-left: 12px solid rgba(255, 255, 0, 1);
      border-bottom: 12px solid rgba(255, 255, 0, 1);
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
  }
  @keyframes dotted-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(-360deg);
        transform: rotate(-360deg);
    }
  }
</style>
<script>
  export default {
    name: 'loading',
    props: ['loading']
  }
</script>