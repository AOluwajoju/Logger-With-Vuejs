import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
    state: {
        user: null,
        logs: [

        ]
    },
    getters: {

    },
    mutations: {
        STORE_USER({ state }, user_data) {
            state.user = user_data;
        },
        LOAD_USER({ state }, log) {
            state.logs.push(log)
        }
    },
    actions: {
        insertUser({ commit }, token) {
            axios
                .get("http://127.0.0.1:8000/api/user", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    commit('STORE_USER', response.data);
                });
        },
        loadLogs({ commit }) {
            axios
                .get("http://127.0.0.1:8000/api/logs")
                .then((response) => commit('LOAD_USER', response.data.data))
                .catch((error) => console.log(error));
        }



    }
})