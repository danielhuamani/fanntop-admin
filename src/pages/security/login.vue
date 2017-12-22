<template>
    <div class="ui middle aligned center aligned grid grid-login">
        <div class="column">
            <h2 class="ui header">
              <img src="../../assets/img/fanntop.svg" class="image">
              <div class="content">
                Ingresar
              </div>
            </h2>
            <form class="ui large form ui form error" method="POST" action=".">

                <div class="ui error message">



                </div>

              <div class="ui stacked segment">
                <div class="field">
                  <div class="ui left icon input">
                    <i class="user icon"></i>
                  </div>
                </div>
                <div class="field">
                  <div class="ui left icon input">
                    <i class="lock icon"></i>
                  </div>
                </div>
                <button class="ui fluid large  blue  button">Login</button>
              </div>

              <div class="ui error message"></div>

            </form>
        </div>
    </div>
</template>

<style>

</style>

<script>
export default {
  name: 'Login'
}
</script>