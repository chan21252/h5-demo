<template>
  <div id="app">
  <SlidCard></SlidCard>
  </div>
</template>

<script>
import rem from './module/rem'
import SlidCard from './components/SlidCard.vue'

rem(document, window)

export default {
  name: 'App',
  components: {
    SlidCard
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
