<template>
  <div>
    <el-header
      style="
        background-color: #ffffff;
        color: #444d51;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
      "
    >
      <el-row>
        <el-col
          :span="2"
          style="display: flex; flex-wrap: wrap; align-content: center"
        >
          <router-link class="route" to="/">
            <i class="el-icon-arrow-left"> </i>
          </router-link>
        </el-col>
        <el-col
          :span="2"
          style="display: flex; flex-wrap: wrap; align-content: center"
        >
          <el-divider direction="vertical"></el-divider>
        </el-col>
        <el-col
          :span="20"
          style="display: flex; flex-wrap: wrap; align-content: center"
        >
          <h2><i class="el-icon-document"></i>{{ message }}</h2>
        </el-col>
      </el-row>
    </el-header>
    <router-view />
  </div>
</template>

<style>
.route {
  text-decoration: none;
}
</style>

<script>
export default {
  props: {
    message: String,
  },
};
</script>