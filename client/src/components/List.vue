<template>
  <div class="list">
    <div v-for="list in myLists" :key="list._id">
      <h4>{{list.title}}</h4>
      <button @click="deleteList(list._id)">DELETE LIST</button>
      <button @click="taskFormVisible == true">Add Task</button>
      <form v-if="taskFormVisible" @submit.prevent="addTask(list._id)">
        <input type="text" name="title" v-model="newTask.title">
        <input type="text" name="description" v-model="newTask.description">
        <input type="text" name="assignee" v-model="newTask.assignee">
        <input type="text" name="status" v-model="newTask.status">
        <input type="text" name="estTime" v-model="newTask.estTime">
        <input type="text" name="startDate" v-model="newTask.startDate">
    </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",

  props: ["boardId"],

  data() {
    return {
      taskFormVisible: false,
      newTask: {
        title: "",
        description: "",
        assignee: "",
        status: "",
        estTime: "",
        startDate: undefined,
        listId: "",
        boardId: this.activeBoard._id
      }
    };
  },

  methods: {
    deleteList(listId) {
      this.$store.dispatch("deleteList", listId);
    },
    addTask(listId) {
      newTask.listId = listId;
      this.$store.dispatch("addTask", newTask);
    }
  },

  computed: {
    myLists() {
      console.log("myList: ", this.$store.state.lists);
      return this.$store.state.lists[this.boardId];
    },
    activeBoard() {
      return this.$store.state.activeBoard;
    }
  }
};
</script>

<style scoped>
</style>
