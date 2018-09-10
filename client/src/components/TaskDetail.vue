<template>
  <div class="task-details mt-5 bg-light p-3 slideInRight animated" v-if="detailVisible">
    <div class="underline">
      <h1 class="text-primary"><strong>{{activeTask.title}} &nbsp <span @click="hideDetails"><i class="fa fa-minus-circle clickable"></i></span></strong></h1>
    </div>
    <h4 class="mt-4 mb-3"><strong>Description</strong>: {{activeTask.description}} </h4>
    <ul>
      <li><strong>Status</strong>: {{activeTask.status}}&nbsp &nbsp<span class="clickable" @click="statusFormVisible = !statusFormVisible"><i
            class="fa fa-edit"></i></span></li>
      <form v-if="statusFormVisible" @submit.prevent="updateTaskStatus()" class="form-inline">
        <select name="status" v-model="taskUpdate.status" class="form-control">
          <option value="To-do" selected>To-do</option>
          <option value="In-work">In-work</option>
          <option value="Complete">Complete</option>
        </select>
        <button type="Submit" class="btn btn-primary ml-2">Submit</button>
      </form>
      <li><strong>Estimate</strong>: {{activeTask.estTime}}&nbsp &nbsp<span class="clickable" @click="estimateFormVisible=!estimateFormVisible"><i
            class="fa fa-edit"></i></span></li>
      <form v-if="estimateFormVisible" @submit.prevent="updateTaskEstimate()" class="form-inline">
        <input type="number" name="estimate" v-model="taskUpdate.estTime" class="form-control" />
        <button type="Submit" class="btn btn-primary ml-2">Submit</button>
      </form>
      <li><strong>Assignee</strong>: {{activeTask.assignee}}&nbsp &nbsp<span class="clickable" @click="assigneeFormVisible = !assigneeFormVisible"><i
            class="fa fa-edit"></i></span></li>
      <form v-if="assigneeFormVisible" @submit.prevent="updateTaskAssignee()" class="form-inline">
        <input type="text" name="assignee" v-model="taskUpdate.assignee" class="form-control" />
        <button type="Submit" class="btn btn-primary ml-2">Submit</button>
      </form>
      <li><strong>Start Date</strong>: {{activeTask.startDate}}&nbsp &nbsp<span class="clickable" @click="startDateFormVisible=!startDateFormVisible"><i
            class="fa fa-edit"></i></span></li>
      <form v-if="startDateFormVisible" @submit.prevent="updateTaskStartDate()" class="form-inline">
        <input type="date" name="startDate" v-model="taskUpdate.startDate" class="form-control" />
        <button type="Submit" class="btn btn-primary ml-2">Submit</button>
      </form>
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

    props: ["activeTask", "detailVisible"],

    data() {
      return {
        taskUpdate: {
          status: '',
          estTime: '',
          assignee: '',
          startDate: undefined
        },
        statusFormVisible: false,
        estimateFormVisible: false,
        assigneeFormVisible: false,
        startDateFormVisible: false

      }
    },

    methods: {
      deleteComment(comment) {
        this.$store.dispatch("deleteComment", comment);
      },

      hideDetails() {
        this.$emit('hideDetails')
      },

      updateTaskStatus() {
        this.$store.dispatch('updateTaskStatus', {
          taskId: this.activeTask._id,
          listId: this.activeTask.listId,
          status: this.taskUpdate.status
        })
        this.statusFormVisible = false
        this.taskUpdate.status = ''
      },

      updateTaskEstimate() {
        this.$store.dispatch('updateTaskEstimate', {
          taskId: this.activeTask._id,
          listId: this.activeTask.listId,
          estTime: this.taskUpdate.estTime
        })
        this.estimateFormVisible = false
        this.taskUpdate.estTime = ''
      },

      updateTaskAssignee() {
        this.$store.dispatch('updateTaskAssignee', {
          taskId: this.activeTask._id,
          listId: this.activeTask.listId,
          assignee: this.taskUpdate.assignee
        })
        this.assigneeFormVisible = false
        this.taskUpdate.assignee = ''
      },

      updateTaskStartDate() {
        this.$store.dispatch('updateTaskStartDate', {
          taskId: this.activeTask._id,
          listId: this.activeTask.listId,
          startDate: this.taskUpdate.startDate
        })
        this.startDateFormVisible = false
        this.taskUpdate.startDate = undefined
      }
    },

    computed: {
      comments() {
        return this.$store.state.comments[this.activeTask._id];
      },

      tasks() {
        return this.$store.state.tasks[this.activeTask.listId]
      }
    }
  };
</script>

<style scoped>
  .clickable:hover {
    cursor: pointer;
  }


  .underline {
    border-bottom: 2px solid #593196;
  }

  ul {
    list-style-type: none;

    font-size: 1.5em;
  }

  .slideInRight {
    animation-name: slideInRight;
  }

  .animated {
    animation-duration: 1s;
  }

  @keyframes slideInRight {
    from {
      transform: translate3d(100%, 0, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }
</style>