<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#1c2c64"
    class="el-menu-vertical-demo"
    text-color="#fff"
    :collapse="true"
    style="border-radius: 15px 0px 0px 0px"
    id="navigate"
  >
    <router-link to="/">
      <el-menu-item index="1" class="tooltip">
        <i class="el-icon-house"></i>
        <span class="tooltiptext">Home</span>
      </el-menu-item>
    </router-link>
    <router-link to="/logs">
      <el-menu-item index="2" class="tooltip">
        <i class="el-icon-document"></i>
        <span class="tooltiptext">Logs</span>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<style>
#navigate a.router-link-exact-active {
  color: #42b983;
}

.tooltip {
  position: relative;

}

.tooltip .tooltiptext {
  visibility: hidden;
  background-color: white;
  color: black;
  text-align: center;
  padding: 2px 0;
  
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 85%;
  margin-left: -25px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>