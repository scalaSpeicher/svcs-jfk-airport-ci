import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate';
import axios from "axios";

let items = {}

export default createStore({
  plugins:[
    createPersistedState()
  ],
  state:{
    authenticated:false,
    user:{},
    items: []
  },
  getters: {
    authenticated(state){
      return state.authenticated
    },
    user(state){
        return state.user
    },
    items: state => {
      return state.items;
    }
  },
  mutations: {
    SET_AUTHENTICATED (state, value) {
      state.authenticated = value
    },
    SET_USER (state, value) {
        state.user = value
    },
    SET_Items (state, items) {
      state.items = items;
    }
  },
  actions: {
    login({commit}){
      return axios.get('/api/user').then(({data})=>{
          commit('SET_USER',data)
          commit('SET_AUTHENTICATED',true)
          router.push({name:'dashboard'})
      }).catch(({response:{data}})=>{
          commit('SET_USER',{})
          commit('SET_AUTHENTICATED',false)
      })
    },
    logout({commit}){
        commit('SET_USER',{})
        commit('SET_AUTHENTICATED',false)
    },
    loadItems ({ commit }) {
      axios
        .get('')
        // .then(response => response.data)
        .then(items => {
            // mocking data for now until endpoint is created
            items =
            [
                {
                    "id": "5-01",
                    "counter_location": "1",
                    "row": "5",
                    "position": "Left",
                    "airline_id": "Latham",
                    "label_id": "Main Cabin",
                    "status": "Open",
                    "updated_at": "12/27/2023 12:12:12",
                    "updated_by": "Marc Rifkin"
                },
                {
                    "id": "5-02",
                    "counter_location": "2",
                    "row": "5",
                    "position": "Left",
                    "airline_id": "Latham",
                    "label_id": "First Class",
                    "status": "Open",
                    "updated_at": "12/27/2023 12:12:12",
                    "updated_by": "Wade Neumeister"
                },
                {
                    "id": "6-01",
                    "counter_location": "6",
                    "row": "6",
                    "position": "Right",
                    "airline_id": "Air France",
                    "label_id": "Priority",
                    "status": "Closed",
                    "updated_at": "12/27/2023 12:12:12",
                    "updated_by": "Doug Peterson"
                },
                {
                    "id": "6-02",
                    "counter_location": "9",
                    "row": "6",
                    "position": "Left",
                    "airline_id": "Air France",
                    "label_id": "Priority",
                    "status": "Open",
                    "updated_at": "12/27/2023 12:12:12",
                    "updated_by": "Mary Wolfe"
                },
                {
                    "id": "5-01",
                    "counter_location": "1",
                    "row": "5",
                    "position": "Left",
                    "airline_id": "Latham",
                    "label_id": "Main Cabin",
                    "status": "Open",
                    "updated_at": "12/27/2023 12:12:12",
                    "updated_by": "Marc Rifkin"
                },
                {
                    "id": "5-02",
                    "counter_location": "2",
                    "row": "5",
                    "position": "Left",
                    "airline_id": "Latham",
                    "label_id": "First Class",
                    "status": "Open",
                    "updated_at": "12/27/2023 12:12:12",
                    "updated_by": "Wade Neumeister"
                },
                {
                    "id": "6-01",
                    "counter_location": "6",
                    "row": "6",
                    "position": "Right",
                    "airline_id": "Air France",
                    "label_id": "Priority",
                    "status": "Closed",
                    "updated_at": "12/27/2023 12:12:12",
                    "updated_by": "Doug Peterson"
                },
                {
                    "id": "6-02",
                    "counter_location": "9",
                    "row": "6",
                    "position": "Left",
                    "airline_id": "Air France",
                    "label_id": "Priority",
                    "status": "Open",
                    "updated_at": "12/27/2023 12:12:12",
                    "updated_by": "Mary Wolfe"
                }
            ];
          commit('SET_Items', items)
          console.log('Store Items: ',items);
        }
      )
    }
  }
});
