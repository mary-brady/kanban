<template>
  <div class="boards container-fluid">
    <div class="row">
      <div class="col-md-12 justify-content-center">
        <h1>Boards on Boards!</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 justify-content-center">
        <form @submit.prevent="addBoard">
          <input type="text" placeholder="title" v-model="newBoard.title" required>
          <input type="text" placeholder="description" v-model="newBoard.description">
          <button type="submit">Create Board</button>
        </form>
        <button @click="logout">Logout</button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div v-for="board in boards" :key="board._id" class="card border-primary mb-3 col-md-3 ml-3 mt-3" style="max-width: 15rem;">
        <div class="card-header">
          <router-link :to="{name: 'board', params: {boardId: board._id}}"><strong>{{board.title}}</strong></router-link>
        </div>
        <div class="card-body">
          <p class="card-text">{{board.description}}</p>
          <button @click="deleteBoard(board._id)">Delete Board</button>
        </div>
      </div>
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
        return this.$store.state.boards;
      },

      lists() {
        return this.$store.state.lists;
      },

      tasks() {
        return this.$store.state.tasks;
      }
    },
    methods: {
      deleteBoard(boardId) {
        if (this.lists[boardId])
          this.lists[boardId].forEach(list => {
            this.tasks[list._id].forEach(task => {
              this.$store.dispatch("deleteTaskComments", task._id);
            });
            this.$store.dispatch("deleteListTasks", list._id);
          });
        this.$store.dispatch("deleteBoardLists", boardId);
        this.$store.dispatch("deleteBoard", boardId);
      },

      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },

      logout() {
        this.$store.dispatch("logout");
      }
    }
  };
</script>
<style scoped>
</style>