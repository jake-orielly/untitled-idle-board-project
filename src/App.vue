<template>
  <div id="app">
    <GameContainer msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import GameContainer from './components/GameContainer.vue'

export default {
  name: 'App',
  components: {
    GameContainer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
