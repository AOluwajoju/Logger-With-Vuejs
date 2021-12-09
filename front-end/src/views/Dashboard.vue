<template>
  <el-container>
    <Nav />
    <el-container style="display: block">
      <Header />
      <Pagehead message="Dashboard" />
      <el-container v-loading="loading" class="stay" style="background-color: #f8fafb">
        <el-main>
          <el-card v-if="user" class="box-card dash" style="width: 50%">
            <div
              class="item"
              style="
                text-align: center;
                margin-top: 50px;
                border-bottom: 1px solid black;
                border-radius: 10px;
                padding-bottom: 30px;
              "
            >
              <el-avatar
                shape="circle"
                style="margin-bottom: -60px"
                :size="100"
                :src="squareUrl"
              ></el-avatar>
              <h1 style="font-size: 50px">{{ user.username }}</h1>
              <span style="color: #778899">
                <h1 style="margin-bottom: -2px; margin-top: -50px">
                  {{ logsbyuser.length }}
                </h1>
                logs
              </span>
            </div>
            <div class="block" style="margin-top: -0px">
              <el-timeline>
                <el-timeline-item
                  v-for="(position, index) in shown"
                  :key="index"
                  :timestamp="
                    logsbyuser[logsbyuser.length - position].created_at
                  "
                >
                  {{ logsbyuser[logsbyuser.length - position].body }}
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
  align-items: center;
}

.item {
  margin-bottom: 18px;
}
h1 {
  font-size: 25px;
}
.dash {
  background: url("~@/assets/dash.png");
  background-repeat: no-repeat;
  background-size: 650px 150px;
}
</style>

<script>
import Nav from "@/components/Nav.vue";
import Header from "@/components/Header.vue";
import Pagehead from "@/components/Page-head.vue";
import { reactive, toRefs } from "vue";
import axios from "axios";
export default {
  data() {
    return {
      shown: 2,
      user: null,
      logs: null,
      logsbyuser: null,
      button: true,
      loading: true
    };
  },
  methods: {
    more() {
      var difference = this.logsbyuser.length - this.shown;
      if (difference < 5) {
        this.shown += difference;
      } else {
        this.shown += 5;
      }
      if (this.shown >= this.logsbyuser.length) {
        this.button = false;
      }
    },
    load_logs() {
      axios
        .get("http://127.0.0.1:8000/api/logs")
        .then((response) => {
          this.logs = response.data.data;
          for (var i = 0; i < this.logs.length; i++) {
            var splitter = this.logs[i].created_at;
            this.logs[i].created_at =
              splitter.split("T")[1].split(".", 1) +
              " " +
              splitter.split("T")[0];
          }
        })
        .catch((error) => console.log(error));
    },
  },
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
  components: {
    Nav,
    Pagehead,
    Header,
  },
  mounted() {
    this.load_logs();
    axios
      .get("http://127.0.0.1:8000/api/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.user = response.data;
        var temp = response.data;
        this.logsbyuser = this.logs.filter(function (u) {
          return u.user_id == temp.id;
        });
        this.loading = false;
      });
  },
};
</script>