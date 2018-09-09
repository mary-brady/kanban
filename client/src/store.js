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

    logout(state) {
      state.user = {}
      state.boards = []
      state.activeBoard = {}
      state.lists = {}
      state.tasks = {}
      state.comments = {}
      router.push({ name: 'login' })
    },

    setBoards(state, boards) {
      state.boards = boards
    },

    setActiveBoard(state, boardId) {
      state.activeBoard = state.boards.find(board => board._id == boardId)
      console.log('activeBoard = ', state.activeBoard)
    },

    deleteBoardLists(state, boardId) {
      delete state.lists[boardId]
    },

    setLists(state, lists) {
      Vue.set(state.lists, lists.boardId, lists.lists)
    },

    deleteListTasks(state, listId) {
      delete state.tasks[listId]
    },

    setTasks(state, taskList) {
      Vue.set(state.tasks, taskList.listId, taskList.tasks)
      state.tasks[taskList.listId].forEach(task => {
        task.created = new Date(task.created).toISOString().substring(0, 10)
        if (task.startDate) {
          task.startDate = task.startDate.substring(0, 10)
        }
        router.push({ path: '/board/' + state.activeBoard._id })
      })
    },
    setComments(state, commentList) {
      Vue.set(state.comments, commentList.taskId, commentList.comments)
      router.push({ path: '/board/' + state.activeBoard._id })
    },

    deleteTaskComments(state, taskId) {
      delete state.comments[taskId]
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

    logout({ commit, dispatch }) {
      auth.delete('logout')
        .then(res => {
          console.log(res.data)
          commit('logout')
        })
        .catch(err => console.log(err.message))
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
          commit('setLists', { boardId: boardId, lists: res.data })
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
      api.delete('lists/' + listData._id)
        .then(res => {
          dispatch('deleteListTasks', listData._id)
          dispatch('getLists', listData.boardId)
        })
        .catch(err => console.log(err.message))
    },

    deleteBoardLists({ commit, dispatch }, boardId) {
      api.delete('lists/by-board/' + boardId)
        .then(res => {
          commit('deleteBoardLists', boardId)
        })
        .catch(err => console.log(err.message))
    },

    //TASK STUFF
    getTasks({ commit, dispatch }, listId) {
      api.get('tasks/by-list/' + listId)
        .then(res => {
          commit('setTasks', { listId: listId, tasks: res.data })
          res.data.forEach(task => {
            dispatch('getComments', task._id)
          })
        })
        .catch(err => console.log(err.message))
    },

    addTask({ commit, dispatch }, newTask) {
      api.post('tasks/', newTask)
        .then(res => {
          dispatch('getTasks', newTask.listId)
        })
        .catch(err => console.log(err.message))
    },

    moveTask({ commit, dispatch }, taskUpdate) {
      api.put('/tasks/' + taskUpdate.taskId, { listId: taskUpdate.newListId })
        .then(res => {
          dispatch('getTasks', taskUpdate.oldListId)
          dispatch('getTasks', taskUpdate.newListId)
        })
        .catch(err => console.log(err.message))
    },

    updateTaskStatus({ commit, dispatch }, taskUpdate) {
      api.put('/tasks/' + taskUpdate.taskId, { status: taskUpdate.status })
        .then(res => {
          dispatch('getTasks', taskUpdate.listId)
        })
        .catch(err => console.log(err.message))
    },

    updateTaskEstimate({ commit, dispatch }, taskUpdate) {
      api.put('/tasks/' + taskUpdate.taskId, { estTime: taskUpdate.estTime })
        .then(res => {
          dispatch('getTasks', taskUpdate.listId)
        })
        .catch(err => console.log(err.message))
    },

    updateTaskAssignee({ commit, dispatch }, taskUpdate) {
      api.put('/tasks/' + taskUpdate.taskId, { assignee: taskUpdate.assignee })
        .then(res => {
          dispatch('getTasks', taskUpdate.listId)
        })
        .catch(err => console.log(err.message))
    },

    updateTaskStartDate({ commit, dispatch }, taskUpdate) {
      api.put('/tasks/' + taskUpdate.taskId, { startDate: taskUpdate.startDate })
        .then(res => {
          dispatch('getTasks', taskUpdate.listId)
        })
        .catch(err => console.log(err.message))
    },

    deleteTask({ commit, dispatch }, taskData) {
      api.delete('tasks/' + taskData._id)
        .then(res => {
          dispatch('deleteTaskComments', taskData._id)
          dispatch('getTasks', taskData.listId)
        })
        .catch(err => console.log(err.message))
    },

    deleteListTasks({ commit, dispatch }, listId) {
      api.delete('tasks/by-list/' + listId)
        .then(res => {
          commit('deleteListTasks', listId)
        })
        .catch(err => console.log(err.message))
    },
    //COMMENT STUFF
    addComment({ commit, dispatch }, newComment) {
      api.post('comments/', newComment)
        .then(res => {
          console.log("add comment: ", res.data)
          dispatch('getComments', newComment.taskId)
        })
    },
    getComments({ commit, dispatch }, taskId) {
      api.get('comments/by-task/' + taskId)
        .then(res => {
          commit('setComments', { taskId: taskId, comments: res.data })
        })
        .catch(err => console.log(err.message))
    },
    deleteComment({ commit, dispatch }, commentData) {
      api.delete('comments/' + commentData._id)
        .then(res => {
          dispatch('getComments', commentData.taskId)
        })
        .catch(err => console.log(err.message))
    },

    deleteTaskComments({ commit, dispatch }, taskId) {
      api.delete('/comments/by-task/' + taskId)
        .then(res => {
          commit('deleteTaskComments', taskId)
        })
        .catch(err => console.log(err.message))
    }

  }
})