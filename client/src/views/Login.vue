<template>
  <div class="login container-fluid">
    <div class="row header bg-primary text-white text-align-center">
      <div class="col-md-12 mt-3">
      <h1><strong>Welcome to BoardTown</strong></h1>
      </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-12">
    <form v-if="loginForm" @submit.prevent="loginUser">
          <h1 class="underline">Login</h1>
      <div class="form-group mt-3">
      <input type="email" v-model="creds.email" placeholder="email">
      </div>
      <div class="form-group">
      <input type="password" v-model="creds.password" placeholder="password">
      <button class="btn btn-outline-primary" type="submit">Login</button>
      </div>
    </form>
    <form v-else @submit.prevent="register">
      <h1 class="underline">Register</h1>
      <div class="form-group">
      <input type="text" v-model="newUser.name" placeholder="name">
      <br>
      <input type="email" v-model="newUser.email" placeholder="email">
      <br>
      <input type="password" v-model="newUser.password" placeholder="password">
      <button type="submit" class="btn btn-outline-primary">Create Account</button>
      </div>
    </form>
    </div>
    </div>
    <div class="row">
      <div class="col-md-12">
    <div @click="loginForm = !loginForm">
      <p v-if="loginForm">No account? <br><button class="btn btn-primary btn-sm">Register</button></p>
      <p v-else>Already have an account? <br> <button class="btn btn-primary btn-sm">Login</button></p>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: true,
      creds: {
        email: "",
        password: ""
      },
      newUser: {
        email: "",
        password: "",
        name: ""
      }
    };
  },
  methods: {
    register() {
      this.$store.dispatch("register", this.newUser);
    },
    loginUser() {
      this.$store.dispatch("login", this.creds);
    }
  }
};
</script>

<style scoped>
.header {
  border-bottom: 2px solid black;
  height: 12vh;
  text-align: center;
}
.underline {
  border-bottom: 2px solid rgb(0, 0, 0);
  width: 250px;
}
</style>