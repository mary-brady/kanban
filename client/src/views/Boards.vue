<template>
  <div class="boards">
    WELCOME TO THE BOARDS!!!
    <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required>
      <input type="text" placeholder="description" v-model="newBoard.description">
      <button type="submit">Create Board</button>
    </form>
    <div v-for="board in boards" :key="board._id">
      <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
      <button @click="deleteBoard(board._id)">Delete Board</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "boards",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards
      },

      lists() {
        return this.$store.state.lists
      },

      tasks() {
        return this.$store.state.tasks
      }

    },
    methods: {

      deleteBoard(boardId) {
        this.lists[boardId].forEach(list => {
          this.tasks[list._id].forEach(task => {
            this.$store.dispatch('deleteTaskComments', task._id)
          })
          this.$store.dispatch('deleteListTasks', list._id)
        })
        this.$store.dispatch('deleteBoardLists', boardId)
        this.$store.dispatch("deleteBoard", boardId)
      },

      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      }
    }
  };
</script>