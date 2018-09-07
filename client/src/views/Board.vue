<template>
  <div class="board container-fluid">
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <div id="nav">
          <router-link to="/">
            <h5 class="text-primary">Back to Main Page</h5>
          </router-link>
        </div>
        <h2 v-if="activeBoard.title">{{activeBoard.title}}</h2>
        <form @submit.prevent="addList">
          <input type="text" placeholder="title" v-model="newList.title" required>
          <button type="submit">Create List</button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <div class="row">
          <div v-for="list in boardLists" :key="list._id" class="col-md-3">
            <List :list="list" :boardId="boardId" :activeTask="activeTask" v-on:showDetail="showDetail" v-on:hideDetails="hideDetails"
            />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <TaskDetail :activeTask="activeTask" v-if="activeTask._id" v-on:hideDetails="hideDetails" />
      </div>
    </div>
  </div>
</template>

<script>
  import List from "@/components/List.vue";
  import Task from "@/components/Task.vue";
  import TaskDetail from "@/components/TaskDetail.vue";

  export default {
    name: "board",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },

    mounted() {
      let boardId = this.$route.params.boardId;
      this.$store.dispatch("setActiveBoard", this.boardId);
    },
    components: {
      List,
      Task,
      TaskDetail
    },

    props: ["boardId"],

    data() {
      return {
        newList: {
          title: "",
          boardId: this.boardId
        },
        activeTask: {}
      };
    },

    methods: {

      addList() {
        this.$store.dispatch("addList", this.newList);
        this.newList = { title: "" };
      },

      showDetail(task) {
        this.activeTask = task;
      },

      hideDetails() {
        this.activeTask = {}
      }
    },
    computed: {
      boardLists() {
        return this.$store.state.lists[this.boardId];
      },
      activeBoard() {
        return this.$store.state.activeBoard;
      }
    }
  };
</script>

<style>
  .clickable:hover {
    cursor: pointer;
  }
</style>