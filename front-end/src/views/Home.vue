<template>
  <div>
    <el-container>
      <Nav />
      <el-container style="display: block">
        <Header />
        <el-container class="stay" style="background-color: #f8fafb">
          <el-main style="height: 100%" class="home">
            <div style="text-align: center">
              <h1 style="color: #1c2c64; font-size: 500%">
                Welcome to Logger!
              </h1>
              <router-link to="/login" style="text-decoration-color: #f4fcff">
                <h3 v-if="!user" style="color: #f4fcff">Login</h3>
              </router-link>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <router-view />
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import Header from "@/components/Header.vue";
import { reactive, toRefs } from "vue";
export default {
  name: "Home",

  data() {
    return {
      user: null,
    };
  },

  components: {
    Nav,
    Header,
  },
  setup() {
    const state = reactive({
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      sizeList: ["large", "medium", "small"],
    });
    return {
      ...toRefs(state),
    };
  },
  mounted(){
    if(localStorage.getItem('token')){
      this.user=true;
    }
  }
};
</script>

<style>
.home {
  background: url("~@/assets/home.png");
  background-repeat: no-repeat;
  background-size: 1300px 400px;
  background-attachment: fixed;
  background-position: bottom;
}
</style>