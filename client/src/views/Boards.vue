<template>
  <div class="boards container-fluid">
    <div class="row header bg-primary text-white text-align-center">
      <div class="col-md-11 mt-4">
        <h1>Boards on Boards!</h1>
      </div>
      <div class="col-md-1 text-align-right mt-4">
      <button class="btn btn-success" @click="logout">Logout</button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <label for="createNewBoard" class="mt-3 underline new-board">Create a New Board</label>
        <form @submit.prevent="addBoard">
          <div class="form-group">
            <input type="text" placeholder="Title" rows="1" v-model="newBoard.title" required>
          </div>
          <div class="form-group">
            <textarea class="form-control" id="createNewBoard" placeholder="Description of your new amazing board" row="3" cols="20"
              v-model="newBoard.description">
          </textarea>
          </div>
          <button type="submit" class="btn btn-outline-primary">Create Board</button>
        </form>
      </div>
      <div class="col-md-9">
        <div class="row">
          <div v-for="board in boards" :key="board._id" class="card border-primary mb-3 col-md-3 ml-3 mt-3 p-0" style="max-width: 15rem;">
            <div class="card-header">
              <router-link :to="{name: 'board', params: {boardId: board._id}}"><strong>{{board.title}}</strong></router-link>
              |
              <span @click="deleteBoard(board._id)" class="clickable"><i class="fa fa-trash-o"></i></span>
            </div>
            <div class="card-body">
              <p class="card-text">{{board.description}}</p>
          </div>
              <div class="card-footer p-0">
              <p class="card-text"><small class="text-muted"><strong>Created</strong>: {{board.created}}</small></p>
          </div>
          </div>
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
.clickable:hover {
  cursor: pointer;
  color: rgb(33, 11, 51);
}

.header {
  border-bottom: 2px solid black;
  height: 12vh;
  text-align: center;
}

h1 {
  font-family: "Baloo Tammudu", cursive;
}

.underline {
  border-bottom: 1px solid rgb(0, 0, 0);
}

.card {
  text-align: center;
}

.new-board {
  font-size: medium;
}

h2,
h3,
h4,
h5,
p,
label {
  font-family: "Fira Sans Condensed", sans-serif;
}
</style>