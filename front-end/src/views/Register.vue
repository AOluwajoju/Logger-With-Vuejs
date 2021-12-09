<template>
  <el-container>
    <Nav />
    <el-container style="display: block">
      <Header />
      <Pagehead message="Registration" />
      <el-container class="stay" style="background-color: #f8fafb">
        <el-main>
          <form action="" method="post">
            <el-card class="box-card home">
              <template #header>
                <div class="card-header">
                  <span>Register</span>
                </div>
              </template>
              <el-form>
                <el-form-item>
                  <el-input
                    placeholder="Your Name"
                    v-model="registration.name"
                  />
                </el-form-item>
                <el-form-item>
                  <el-input
                    placeholder="Username"
                    v-model="registration.username"
                  />
                </el-form-item>
                <el-form-item>
                  <el-input placeholder="Email" v-model="registration.email" />
                </el-form-item>
                <el-form-item>
                  <el-input
                    type="password"
                    autocomplete="off"
                    placeholder="Password"
                    v-model="registration.password"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                  <el-input
                    type="password"
                    autocomplete="off"
                    placeholder="Confirm Password"
                    v-model="registration.confirm"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    size="large"
                    style="width: 100%"
                    @click="register()"
                    >Register</el-button
                  >
                </el-form-item>
              </el-form>
            </el-card>
          </form>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Nav from "@/components/Nav.vue";
import Header from "@/components/Header.vue";
import Pagehead from "@/components/Page-head.vue";
//import { ref } from "vue";
import axios from "axios";
export default {
  data() {
    return {
      registration: {
        email: "",
        username: "",
        name: "",
        password: "",
        confirm: "",
      },
    };
  },
  components: {
    Nav,
    Pagehead,
    Header,
  },
  methods: {
    register() {
      axios
        .post(
          "http://127.0.0.1:8000/api/register?name=" +
            this.registration.name +
            "&email=" +
            this.registration.email +
            "&password=" +
            this.registration.password +
            "&password_confirmation=" +
            this.registration.confirm +
            "&username=" +
            this.registration.username
        )
        .then((response) => {
          console.log(response);
          localStorage.setItem('token', response.data.token);
          this.$router.push("/logs");
        })
        .catch((error) => console.log(error));

      // console.log(this.registration)
    },
  },
};
</script>