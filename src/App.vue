<template>
  <div id="app">
    <transition name='slide-fade'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import "./style/app";
</style>
