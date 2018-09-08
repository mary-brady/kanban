<template>
  <div class="task-details mt-5 bg-light p-2">
    <div class="underline">
      <h1 class="text-primary"><strong>{{activeTask.title}} &nbsp <span @click="hideDetails"><i class="fa fa-minus-circle clickable"></i></span></strong></h1>
    </div>
    <h4 class="mt-4 mb-3"><strong>Description</strong>: {{activeTask.description}} </h4>
    <ul>
      <li><strong>Status</strong>: {{activeTask.status}}&nbsp &nbsp<span class="clickable"><i class="fa fa-edit"></i></span></li>
      <li><strong>Estimate</strong>: {{activeTask.estTime}}&nbsp &nbsp<span class="clickable"><i class="fa fa-edit"></i></span></li>
      <li><strong>Assignee</strong>: {{activeTask.assignee}}&nbsp &nbsp<span class="clickable"><i class="fa fa-edit"></i></span></li>
      <li><strong>Start Date</strong>: {{activeTask.startDate}}&nbsp &nbsp<span class="clickable"><i class="fa fa-edit"></i></span></li>
      <li><strong>Created</strong>: {{activeTask.created}}</li>

    </ul>

    <h2 class="text-primary underline">Comments</h2>
    <ul>
      <hr />
      <li v-for="comment in comments" :key="comment._id"><strong>{{comment.userName}}</strong> &nbsp {{comment.description}}
        &nbsp <span @click="deleteComment(comment)">
          <i class="fa fa-trash clickable"></i> </span>
        <hr />
      </li>
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

  .underline {
    border-bottom: 2px solid #593196;
  }

  ul {
    list-style-type: none;

    font-size: 1.5em;
  }
</style>