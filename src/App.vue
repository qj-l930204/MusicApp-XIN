<template>
  <div id="app">
    <v-header></v-header>
    <tab></tab>
    <keep-alive>
      <router-view />
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import VHeader from 'components/v-header/v-header'
  import Player from 'components/player/Player'
  import Tab from 'components/tab/Tab'

  export default {
    name: 'App',
    components: {
      VHeader,
      Tab,
      Player
    }
  }
</script>

<style lang="stylus">

</style>
