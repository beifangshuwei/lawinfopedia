<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    // this.$i18n.locale = 'es'
  },
};
</script>

<style lang="less">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
  height: 100%;
  width: 100%;
  // min-width: 1450px;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    background: transparent;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
