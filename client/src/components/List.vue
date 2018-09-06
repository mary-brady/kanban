<template>
  <div class="list mt-5">
    <h4><strong>{{list.title}}</strong></h4>
    <button @click="deleteList(list)">DELETE LIST</button>
    <button @click="taskFormVisible = !taskFormVisible">Add Task</button>
    <form class="form-group mt-2" v-if="taskFormVisible" @submit.prevent="addTask(list._id)">
      <input type="text" name="title" v-model="newTask.title" placeholder="task title">
      <input type="text" name="description" v-model="newTask.description" placeholder="description">
      <input type="text" name="assignee" v-model="newTask.assignee" placeholder="task assigned to">
      <input type="text" name="status" v-model="newTask.status" placeholder="status(to-do, in-work, complete)">
      <input type="text" name="estTime" v-model="newTask.estTime" placeholder="estimated duration (hrs)">
      <input type="text" name="startDate" v-model="newTask.startDate" placeholder="start date (YYYY/MM/DD)"><br>
      <button type="submit" class="btn btn-primary mt-2">Create Task</button>
    </form>
    <div class="task">
      <div v-for="task in taskList" :key="task._id" class="col-md-2">
        <Task :task="task" :list="list" v-on:showDetail="showDetail" />
    </div>
  </div>
</div>
</template>

<script>
import Task from "@/components/Task.vue";

export default {
  name: "List",

  props: ["list", "boardId"],

  components: {
    Task
  },

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
        boardId: this.boardId
      }
    };
  },

  methods: {
    deleteList(list) {
      this.$store.dispatch("deleteList", list);
    },

    addTask(listId) {
      this.newTask.listId = listId;
      this.$store.dispatch("addTask", this.newTask);
      this.newTask = {
        title: "",
        description: "",
        assignee: "",
        status: "",
        estTime: "",
        startDate: undefined
      };
      this.taskFormVisible = false;
    },
    showDetail(task) {
      this.$parent.$emit("showDetail", task);
    }
  },

  computed: {
    taskList() {
      return this.$store.state.tasks[this.list._id];
    }
  }
};
</script>

<style scoped>
</style>