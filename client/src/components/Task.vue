<template>
  <div class="task card border-primary mb-3">
    <div class="card-header bg-secondary text-white">
      <h3>
        <span class="clickable right" @click="showDetail(task)"><i class="fa fa-ellipsis-h"></i></span>&nbsp&nbsp
        <span class="clickable" @click="deleteTask(task)"><i class="fa fa-trash-o"></i></i></span>
      </h3>
    </div>
    <div class="card-body">
      <h4 class="card-title text-primary"><strong>{{task.title}}</strong></h4>
      <p class="card-text">{{task.description}}</p>
    </div>
    <div class="card-body">
      <button @click="commentFormVisible = !commentFormVisible" class="btn btn-primary disabled clickable">Add Comment</button>
      <form class="form-group mt-2 bg-light" v-if="commentFormVisible" @submit.prevent="addComment(task._id)">
        <input type="text" name="description" v-model="newComment.description" placeholder="comment here"><br>
        <button type="submit" class="btn btn-success disabled mt-2 clickable">Create Comment</button>
      </form>
    </div>


  </div>
</template>

<script>
  export default {
    name: "Task",

    props: ["list", "task", "activeTask"],

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
        if (task == this.activeTask) {
          this.$parent.$emit('hideDetails')
        }
      },
      showDetail(task) {
        this.$emit("showDetail", task);
      },

      addComment(taskId) {
        this.newComment.taskId = taskId;
        this.newComment.userName = this.userName;
        this.$store.dispatch("addComment", this.newComment);
        this.newComment = {
          description: "",
          taskId: "",
          userName: ""
        }
        this.commentFormVisible = false
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
  .clickable:hover {
    cursor: pointer;
  }
</style>