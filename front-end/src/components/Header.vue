<template>
  <el-header
    style="
      background-color: #5f6da3;
      color: #f4fcff;
      border-radius: 0px 15px 0px 0px;
    "
  >
    <el-row>
      <el-col :span="21">
        <h3>Logger</h3>
      </el-col>
      <el-col
        v-if="user"
        :span="1"
        style="display: flex; flex-wrap: wrap; align-content: center"
      >
        <el-divider direction="vertical"></el-divider>
      </el-col>

      <el-col
        v-if="user"
        :span="1"
        style="display: flex; flex-wrap: wrap; align-content: center"
        class="tooltip"
      >
        <router-link to="/dashboard">
          <el-avatar :size="30" :src="squareUrl"></el-avatar>
          <span class="tooltiptext">Dashboard</span>
        </router-link>
      </el-col>
      <el-col
        v-if="user"
        :span="1"
        style="display: flex; flex-wrap: wrap; align-content: center"
        class="tooltip"
      >
        <i @click="logout()" class="el-icon-switch-button"></i>
        <span class="tooltiptext">Logout</span>
      </el-col>
    </el-row>
  </el-header>
</template>

<style>
.tooltip {
  position: relative;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 100px;
  text-align: center;
  padding: 2px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 85%;
  margin-left: -75px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>

<script>
import { reactive, toRefs } from "vue";
import axios from "axios";
export default {
  setup() {
    const state = reactive({
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      sizeList: ["large", "medium", "small"],
    });
    return {
      ...toRefs(state),
    };
  },
  data() {
    return {
      user: null,
    };
  },
  methods: {
    logout() {
      axios
        .post(
          "http://127.0.0.1:8000/api/logout",
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          localStorage.removeItem("token");
          console.log(response);
          this.$router.push("/");
        });
    },
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.user = true;
    }
  },
};
</script>