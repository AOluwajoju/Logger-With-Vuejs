<template>
  <el-container>
    <Nav />
    <el-container style="display: block">
      <Header auth="user" />
      <Pagehead message="Logs" />

      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" v-if="user" v-on:click="edit()"
          >Edit</el-menu-item
        >
        <el-menu-item index="2" v-on:click="refresh()"
          >Activity Logs</el-menu-item
        >
      </el-menu>
      <el-container
        v-loading="loading"
        class="stay"
        style="background-color: #f8fafb"
      >
        <el-main>
          <el-card class="box-card" v-if="editing">
            <form action="" @submit.prevent="post()">
              <el-input placeholder="Post a Log!" v-model="log.body" />
              <span style="font-size: 10px; color: grey">
                Posting as {{ user.username }}</span
              >
              <el-button
                type="primary"
                size="small"
                style="margin-left: 85%; margin-top: 6px"
                @click="post()"
                >Log</el-button
              >
            </form>
          </el-card>
          <el-card class="box-card" v-if="!editing" style="width: 35%">
            <div class="block" v-if="logs">
              <el-timeline>
                <el-timeline-item
                  v-for="(position, index) in shown"
                  :key="index"
                  :timestamp="logs[logs.length - position].created_at"
                >
                  <strong>{{ logs[logs.length - position].body }}</strong>
                  <br /><span style="font-size: 12px"
                    >[from {{ logs[logs.length - position].owner }}]</span
                  >
                </el-timeline-item>
              </el-timeline>
              <el-button
                v-if="button"
                plain
                size="medium"
                style="width: 35%; margin-left: 35%"
                @click="more()"
                >load more</el-button
              >
            </div>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  margin-left: 25%;
  margin-right: 25%;
}
</style>

<script>
import axios from "axios";
import Nav from "@/components/Nav.vue";
import Header from "@/components/Header.vue";
import Pagehead from "@/components/Page-head.vue";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      editing: false,
      button: true,
      shown: 5,
      logs: null,
      user: null,
      users: null,
      likes: 10,
      log: { body: "" },
      loading: true,
    };
  },
  created() {
    this.$store.dispatch("loadLogs");
    this.load_users();
    this.$store.dispatch("insertUser", localStorage.getItem("token"));
    this.user = this.$store.state.user;
  },
  props: {
    message: Boolean,
    auth: Boolean,
  },

  methods: {
    edit() {
      this.editing = true;
    },
    refresh() {
      this.editing = false;
      this.$router.go();
    },
    more() {
      var difference = this.logs.length - this.shown;
      if (difference < 5) {
        this.shown += difference;
      } else {
        this.shown += 5;
      }
      if (this.shown >= this.logs.length) {
        this.button = false;
      }
    },
    post() {
      axios
        .post("http://127.0.0.1:8000/api/logs", this.log, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.log = "";
          ElMessage({
            showClose: true,
            message: "Log Successfully posted!",
            type: "success",
          });
        })
        .catch((err) => {
          ElMessage({
            showClose: true,
            message: "Log not posted!",
            type: "error",
          });
          console.log(err);
        });
    },
    load_users() {
      axios
        .get("http://127.0.0.1:8000/api/users")
        .then((response) => {
          this.users = response.data.data;
          for (var i = 0; i < this.logs.length; i++) {
            for (var j = 0; j < this.users.length; j++) {
              if (this.logs[i].user_id === this.users[j].id) {
                this.logs[i].owner = this.users[j].username;
              }
            }
            var splitter = this.logs[i].created_at;
            this.logs[i].created_at =
              splitter.split("T")[1].split(".", 1) +
              " " +
              splitter.split("T")[0];
          }
          this.loading = false;
        })
        .catch((error) => console.log(error));
    },
  },
  components: {
    Nav,
    Pagehead,
    Header,
  },
};
</script>