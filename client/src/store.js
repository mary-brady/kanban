import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'


Vue.use(Vuex)

let auth = Axios.create({
  baseURL: "//localhost:3000/auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: "//localhost:3000/api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: {},
    tasks: {},
    comments: {}
  },

  mutations: {

    setUser(state, user) {
      state.user = user
      console.log("user", state.user)
    },
    setBoards(state, boards) {
      state.boards = boards
    },

    setActiveBoard(state, boardId) {
      state.activeBoard = state.boards.find(board => board._id == boardId)
      console.log('activeBoard = ', state.activeBoard)
    },

    setLists(state, lists) {
      // state.lists[state.activeBoard._id] = lists
      Vue.set(state.lists, state.activeBoard._id, lists)
      console.log('state.lists = ', state.lists)
    },

    setTasks(state, taskList) {
      Vue.set(state.tasks, taskList.listId, taskList.tasks)
      console.log('state.tasks = ', state.tasks)
    }
  },
  actions: {
    //AUTH STUFF
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },

    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },

    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },



    //BOARDS
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },

    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },

    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
    },

    setActiveBoard({ commit, dispatch }, boardId) {
      commit('setActiveBoard', boardId)
      dispatch('getLists', boardId)
    },

    //LISTS
    getLists({ commit, dispatch }, boardId) {
      api.get('lists/by-board/' + boardId)
        .then(res => {
          commit('setLists', res.data)
          res.data.forEach(list => {
            dispatch('getTasks', list._id)
          })
        })
        .catch(err => console.log(err.message))
    },
    addList({ commit, dispatch }, listData) {
      api.post('lists/', listData)
        .then(serverList => {
          dispatch('getLists', listData.boardId)
        })
    },
    deleteList({ commit, dispatch }, listData) {
      api.delete('list/${listInfo._id}', listData)
        .then(res => {
          dispatch('getLists', listData.boardId)
        })
        .catch(err => console.log(err.message))
    },

    //TASK STUFF
    getTasks({ commit, dispatch }, listId) {
      api.get('tasks/by-list/' + listId)
        .then(res => {
          console.log("getTasks = ", res.data)
          commit('setTasks', { listId: listId, tasks: res.data })
        })
        .catch(err => console.log(err.message))
    },

    addTask({ commit, dispatch }, newTask) {
      api.post('tasks/', newTask)
        .then(res => {
          console.log("response to addTask = ", res.data)
          dispatch('getTasks', res.data.listId)
        })
        .catch(err => console.log(err.message))
    }
  }
})