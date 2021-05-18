<template>
  <div id="app">
    <HelloWorld msg="组件介绍" />
    <div id="nav">
      <router-link to="/searchTree">搜索树</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div class="com">
      <div class="c">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'
import SearchTree from '../package/search-tree/index.vue'

@Component({
  components: {
    HelloWorld,
    SearchTree
  }
})
export default class App extends Vue {}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 8px;
}
.com {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  width: 100%;
  height: 70vh;
  .c {
    height: 100%;
    width: 100%;
    border: solid 1px #f2f2f2;
    overflow: auto;
    display: flex;
    justify-content: center;
  }
}
#nav {
  padding: 5px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
