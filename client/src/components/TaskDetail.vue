<template>
  <div class="task-details mt-3">
    <h1>{{activeTask.title}} &nbsp <span @click="hideDetails"><i class="fa fa-minus-circle clickable"></i></span></h1>
    <p>Description: {{activeTask.description}} </p>
    <ul>
      <li><strong>Status</strong>: {{activeTask.status}}</li>
      <li><strong>Estimate</strong>: {{activeTask.estTime}}</li>
      <li><strong>Assignee</strong>: {{activeTask.assignee}}</li>
      <li><strong>Start Date</strong>: {{activeTask.startDate}}</li>
      <li><strong>Created</strong>: {{activeTask.created}}</li>

    </ul>

    <h2>Comments</h2>
    <ul>
      <li v-for="comment in comments" :key="comment._id">{{comment.userName}} &nbsp {{comment.description}} &nbsp <span @click="deleteComment(comment)">
          <i class="fa fa-trash clickable"></i> </span> </li>
    </ul>

  </div>
</template>
<script>
  export default {
    name: "TaskDetail",

    props: ["activeTask"],

    methods: {
      deleteComment(comment) {
        this.$store.dispatch("deleteComment", comment);
      },

      hideDetails() {
        this.$emit('hideDetails')
      }
    },

    computed: {
      comments() {
        return this.$store.state.comments[this.activeTask._id];
      }
    }
  };
</script>
<style scoped>
  .clickable:hover {
    cursor: pointer;
  }

  .task-details {
    border-left-color: #593196;
    border-left-width: 2px;
  }
</style>