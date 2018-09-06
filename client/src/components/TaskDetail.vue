<template>
<div class="TaskDetails">
<h1>{{activeTask.title}}</h1>
<p>Description: {{activeTask.description}}</p>
<ul>
<li><strong>Status</strong>: {{activeTask.status}}</li>
<li><strong>Estimate</strong>: {{activeTask.estTime}}</li>
<li><strong>Assignee</strong>: {{activeTask.assignee}}</li>
<li><strong>Start Date</strong>: {{activeTask.startDate}}</li>
<li><strong>Created</strong>: {{activeTask.created}}</li>

</ul>

<h2>Comments</h2>
<ul>
    <li v-for="comment in comments" :key="comment._id">{{comment.userName}} &nbsp {{comment.description}}</li>

</ul>

</div>    
</template>
<script>
export default {
  name: "TaskDetail",

  props: ["activeTask"],

  computed: {
    comments() {
      return this.$store.state.comments[this.activeTask._id];
    }
  }
};
</script>
<style scoped>
</style>