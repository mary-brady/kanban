<template>
  <div class="board">
    <h2>Single Board View</h2>
    {{boardId}}
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required>
      <button type="submit">Create List</button>
    </form>
    <div v-for="list in myLists" :key="list._id">
      <List :list = "list"/>
  </div>
  <Task />
  </div>
</template>

<script>
import List from "@/components/List.vue";
import Task from "@/components/Task.vue";

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
    Task
  },

  props: ["boardId"],

  data() {
    return {
      newList: {
        title: "",
        boardId: this.boardId
      }
    };
  },

  methods: {
    addList() {
      this.$store.dispatch("addList", this.newList);
      this.newList = { title: "" };
    }
  },
  computed: {
    myLists() {
      console.log("myList: ", this.$store.state.lists);
      return this.$store.state.lists[this.boardId];
    }
  }
};
</script>