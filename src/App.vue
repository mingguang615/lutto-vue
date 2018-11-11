<template>
  <div id="app">
    <nav_lutto v-if="show"></nav_lutto>
    <div style="height: 70px"></div>
    <router-view @flushnav="flushnav"></router-view>
    <footer_lutto></footer_lutto>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return{
      show: true
    }
  },
  methods:{
    flushnav: function () {
      this.show = false;
      this.$nextTick(()=>{
        this.show = true
      })
    }
  }

}
</script>

<style>

body{
  /*隐藏横向滚动条*/
  overflow-x: hidden;
  background: #f3f3f3;
}

</style>
