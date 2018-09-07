<template>
  <div class="list mt-5">
    <div class="underline mb-3">
      <h2 class="text-primary"><strong>{{list.title}}</strong></h2>
    </div>
    <button class="btn btn-success" @click="deleteList(list)">DELETE LIST</button>
    <button class="btn btn-success ml-3" @click="taskFormVisible = !taskFormVisible">Add Task</button>
    <form class="form-group mt-2" v-if="taskFormVisible" @submit.prevent="addTask(list._id)">
      <input class="form-control" type="text" name="title" v-model="newTask.title" placeholder="task title">
      <textarea class="form-control" name="description" rows="5" v-model="newTask.description" placeholder="description"></textarea>
      <input class="form-control" type="text" name="assignee" v-model="newTask.assignee" placeholder="task assigned to">
      <select name="status" v-model="newTask.status" class="form-control">
        <option value="To-do" selected>To-do</option>
        <option value="In-work">In-work</option>
        <option value="Complete">Complete</option>
      </select>
      <input class="form-control" type="text" name="estTime" v-model="newTask.estTime" placeholder="estimated duration (hrs)">
      <input class="form-control" type="date" name="startDate" v-model="newTask.startDate" placeholder="start date (YYYY/MM/DD)"><br>
      <button type="submit" class="btn btn-primary mt-2">Create Task</button>
    </form>
    <drop class="drop list pl-2 pr-2 pt-3 pb-5 mt-2" @drop="handleDrop(list, ...arguments)">
      <drag v-for="task in taskList" :key="task._id" class="mt-3 drag" :class="{[task]: true}" :transfer-data="{task: task}">
        <Task :task="task" :list="list" :activeTask="activeTask" v-on:showDetail="showDetail" v-on:hideDetails="hideDetails" />
      </drag>
    </drop>

  </div>
</template>

<script>
  import Task from "@/components/Task.vue";
  import { Drag, Drop } from 'vue-drag-drop'

  export default {
    name: "List",

    props: ["list", "boardId", "activeTask"],

    components: {
      Task,
      Drag,
      Drop
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
        this.taskList.forEach(task => {
          this.$store.dispatch('deleteTaskComments', task._id)
        })
        this.$store.dispatch("deleteList", list);
      },

      addTask(listId) {
        this.newTask.listId = listId;
        console.log("new task ", this.newTask)
        this.$store.dispatch("addTask", this.newTask);
        this.newTask = {
          title: "",
          description: "",
          assignee: "",
          status: "",
          estTime: "",
          startDate: undefined,
          boardId: this.boardId
        };
        this.taskFormVisible = false;
      },
      showDetail(task) {
        this.$emit("showDetail", task);
      },

      hideDetails() {
        this.$parent.$emit("hideDetails")
      },

      handleDrop(toList, data) {
        console.log("I moved!")
        this.$store.dispatch('updateTask', {
          taskId: data.task._id,
          oldListId: data.task.listId,
          newListId: toList._id
        })
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
  .drop {
    min-height: 70vh;
    background-color: rgba(241, 239, 239, 0.678);
  }

  .underline {
    border-bottom: 2px solid #593196;
  }
</style>