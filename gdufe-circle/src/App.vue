<template>
  <div id="app">
    <div>
      <keep-alive>
        <transition>
          <router-view v-if="$route.meta.keepAlive" />
        </transition>
      </keep-alive>
      <NavBar class="nav" v-if="$route.meta.ifNav"></NavBar>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/navBar.vue'
export default {
  name: 'App',
  data() {
    return {
      transitionNameIn:'',
      transitionNameOut: '',
    }
  },
  watch: {
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
/*       if(to.meta.index > from.meta.index){
        this.transitionNameIn = 'fadeIn';
        this.transitionNameOut = 'fadeOut';
      } */
    }
  },
  components: { NavBar }
}
</script>

<style lang='less' scoped>
  #app {
    height: 100vh;
  }
  .nav {
    position: fixed;
    bottom: 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

</style>
