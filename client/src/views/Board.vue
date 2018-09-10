<template>
  <div class="board container-fluid">
    <div class="row bg-primary text-white">
      <div class="col-md-4">
        <form @submit.prevent="addList" class="mt-5 mb-5">
          <h3>Add New List</h3>
          <input class="form-control-lg" name="new-list" type="text" placeholder="list title" v-model="newList.title" required>
          <button class="btn-lg btn-secondary ml-2" type="submit">Create List</button>
        </form>
      </div>
      <div class="col-md-4">
        <div class="underline">
          <h1 v-if="activeBoard.title" class="mt-3">{{activeBoard.title}}</h1>
        </div>
        <h5 class="mb-4 mt-3">{{activeBoard.description}}</h5>
      </div>
      <div class="col-md-4 text-right">
        <div id="nav">
          <router-link to="/">
            <h5 class="clickable inline">Back to Main Page &nbsp |</h5>
          </router-link>
          <h5 class="clickable inline" @click="logout">&nbsp Logout</h5>
        </div>
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
      <div class="col-md-4 detail-jar">
        <TaskDetail :activeTask="activeTask" :detailVisible="detailVisible" v-on:hideDetails="hideDetails" />
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
        detailVisible: false
      };
    },

    methods: {

      addList() {
        this.$store.dispatch("addList", this.newList);
        this.newList = { title: "", boardId: this.boardId };
      },

      showDetail(task) {
        this.$store.dispatch('setActiveTask', task);
        this.detailVisible = true;
      },

      hideDetails() {
        this.detailVisible = false;
        //this.activeTask = {}
      },

      logout() {
        this.$store.dispatch('logout')
      }
    },

    computed: {
      boardLists() {
        return this.$store.state.lists[this.boardId];
      },

      activeBoard() {
        return this.$store.state.activeBoard;
      },
      activeTask() {
        return this.$store.state.activeTask;
      }
    }
  };
</script>

<style scoped>
  .clickable {
    color: lightgray;
  }

  .clickable:hover {
    cursor: pointer;
    color: orange;
  }

  .inline {
    display: inline-block;
  }

  .list-bucket {
    min-height: 70vh;
    border-right: 2px solid purple;
  }

  .header {
    border-bottom: 2px solid black;
  }

  .underline {
    border-bottom: 2px solid white;
  }

  .detail-jar {
    overflow-x: hidden;
  }

  .text-right {
    text-align: right;
  }
</style>