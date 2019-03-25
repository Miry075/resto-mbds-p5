<template>
  <div id="user">
    <p> Je suis {{prenom}} {{nom}}</p>
  </div>
</template>

<script>

export default {
  name: 'user',
  props:['nom','prenom'],
  data () {
    return {
    }
  }
}
</script>

<style>
p{
    border : 2px dashed red;
}
</style>
