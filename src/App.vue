<template>
    <div id="app" class="h-100">
        <router-view></router-view>
    </div>
</template>

<script>
export default {};
</script>
<style>

html {
    height: 100%;
}

html, body {
    min-height: 100% !important;
    height: 100%;
}
.v-btn {
    text-transform: unset!important;
}
#app{
    /* background-image: url('../../assets/background-1.jpg'); */
    background-image: url(https://www.ordermanzer.mu/modules/cms/images/1-about-bg.jpg);
    background-repeat: no-repeat;
    height: 100%;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
    /* position: relative; */
}

*,
:before,
:after {
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
}
</style>

