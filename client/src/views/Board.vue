<template>
  <div class="board">
    <h2>Single Board View</h2>
    {{boardId}}
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required>
      <button type="submit">Create List</button>
    </form>
    <div v-for="list in myLists" :key="list._id">
      <h4>{{list.title}}</h4>
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

    mounted() {
      this.$store.dispatch('setActiveBoard', this.boardId)
    },

    props: ["boardId"],

    data() {
      return {
        newList: {
          title: '',
          boardId: this.boardId
        }
      }
    },

    methods: {
      addList() {
        this.$store.dispatch("addList", this.newList)
        this.newList = { title: '' }
      },

      deleteList(listId) {
        this.$store.dispatch("deleteList", listId);
      }
    },

    computed: {
      myLists() {
        return this.$store.state.lists[this.boardId]
      }
    }

  };
</script>