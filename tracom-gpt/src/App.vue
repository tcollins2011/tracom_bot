<template>
  <router-view></router-view>
  <Masthead/>

</template>

<script>
import Masthead from './components/Masthead.vue';

export default {
  name: 'App',
  components: {
    Masthead,
  }
}
</script>

<style>
#app {
  font-family: 'Sohne', sans-serif; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 7vh;
}
</style>
