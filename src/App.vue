<template>
  <div id="app">
    <transition name='slide-fade'>
      <keep-alive exclude="lesson-info">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import "./style/style";
.slide-fade{
  position: absolute;left:0;right: 0;
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {

  transition: all .0.5s cubic-bezier(2.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  left:0;right: 0;
  transform: translateX(100%);
  opacity: 1;
}
</style>
