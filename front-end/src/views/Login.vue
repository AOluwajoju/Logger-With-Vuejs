<template>
  <div>
    <el-container>
      <Nav />
      <el-container style="display: block">
        <Header />
        <Pagehead message="Login" />
        <el-container class="stay" style="background-color: #f8fafb">
          <el-main>
            <el-card class="box-card login" style="width: 50%; padding: 25px">
              <!-- <img src="..\assets\svg.png" style="width:250px; position: absolute; float: left"/> -->
              <el-col
                :span="8"
                style="
                  padding: 50;
                  color: white;
                  display: flex;
                  flex-wrap: wrap;
                  align-content: center;
                "
              >
                <h1 style="">Welcome!</h1>
                <p>
                  Sign in to your account to start keeping logs of your work.
                </p>
                <p>
                  If you don't have a account, click 'Create new account' to
                  create a new account
                </p>
              </el-col>

              <el-col
                :span="16"
                style="
                  left: 50%;
                  text-align: center;
                  display: flex;
                  flex-wrap: wrap;
                  align-content: center;
                "
              >
                <el-avatar
                  icon="el-icon-user-solid"
                  :size="50"
                  style="
                    margin-left: 225px;
                    margin-bottom: 25px;
                    background-color: #1c2c64;
                  "
                ></el-avatar>

                <el-form
                  ref="registration"
                  :rules="rules"
                  style="margin-left: 150px; width: 200px"
                  @submit.prevent="sign_in()"
                >
                  <el-form-item prop="email">
                    <el-input placeholder="Email" v-model="login.email"
                      ><i class="el-icon-user"
                    /></el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input
                      type="password"
                      placeholder="Password"
                      v-model="login.password"
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      size="large"
                      style="
                        width: 100%;
                        border-radius: 25px 25px 25px 25px;
                        background-color: #1c2c64;
                      "
                      @click="sign_in()"
                      >Login</el-button
                    >
                  </el-form-item>
                  <router-link to="/register" style="color: grey"
                    >Create new account</router-link
                  >
                </el-form>
              </el-col>
            </el-card>
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
import Pagehead from "@/components/Page-head.vue";
import { reactive, toRefs } from "vue";
import axios from "axios";
export default {
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    sign_in() {
      axios
        .post("http://127.0.0.1:8000/api/login", this.login)
        .then((response) => {
          localStorage.removeItem("token");
          response.data.token;
          localStorage.setItem("token", response.data.token);
          this.$router.push("/logs");
        })
        .catch((err) => {
          console.log(err);
          window.alert("Invalid Email or Password!");
        });
    },
  },
  components: {
    Nav,
    Pagehead,
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
};
</script>

<style>
.login {
  background: url("~@/assets/svg.png");
  background-repeat: no-repeat;
  background-size: 700px 700px;
}
</style>