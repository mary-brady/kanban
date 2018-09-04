<template>
  <div class="board">
    <h2>Single Board View</h2>
    {{boardId}}
     <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required>
      <input type="text" placeholder="description" v-model="newList.description">
      <button type="submit">Create List</button>
    </form>
    <div v-for="list in lists" :key="list._id">
      <button @click="deleteList(list._id)">DELETE LIST</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "board",
  created() {
    //blocks users not logged in
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    }
  },
  methods: {
    addList() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newList = { title: "", description: "" };
    },
    deleteList(listId) {
      this.$store.dispatch("deleteList", listId);
    }
  },
  props: ["boardId"]
};
</script>