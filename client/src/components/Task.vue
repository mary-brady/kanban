<template>
<div class="task">
<h4><strong>{{task.title}}</strong>&nbsp<span @click="showDetail(task)"><i class="fa fa-ellipsis-h"></i></span> </h4>
    <button @click="deleteTask(task)">DELETE TASK</button>
    <button @click="commentFormVisible = !commentFormVisible">Add Comment</button>
    <form class="form-group mt-2" v-if="commentFormVisible" @submit.prevent="addComment(task._id)">
      <input type="text" name="description" v-model="newComment.description" placeholder="description">
      <button type="submit" class="btn btn-primary mt-2">Create Comment</button>
    </form>
</div>
</template>

<script>
export default {
  name: "Task",

  props: ["list", "task"],

  data() {
    return {
      commentFormVisible: false,
      newComment: {
        description: "",
        taskId: "",
        userName: ""
      }
    };
  },

  methods: {
    deleteTask(task) {
      this.$store.dispatch("deleteTask", task);
    },
    showDetail(task) {
      this.$parent.$emit("showDetail", task);
    },

    addComment(taskId) {
      this.newComment.taskId = taskId;
      this.newComment.userName = this.userName;
      this.$store.dispatch("addComment", this.newComment);
    }
  },
  computed: {
    userName() {
      return this.$store.state.user.name;
    }
  }
};
</script>

<style scoped>
</style>
