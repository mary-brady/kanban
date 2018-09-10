<template>
  <div class="login container-fluid">
    <div class="row header bg-primary text-white text-align-center">
      <div class="col-md-12 mt-3">
        <h1><strong>Welcome to BoardTown</strong></h1>
      </div>
    </div>
    <div id="image" class="row">
      <div class="col-md-3 mt-3">
        <div class="form-container">
          <form v-if="loginForm" @submit.prevent="loginUser">
            <h1 class="underline">Login</h1>
            <div class="form-group mt-3">
              <input type="email" v-model="creds.email" placeholder="email">
            </div>
            <div class="form-group">
              <input type="password" v-model="creds.password" placeholder="password"><br>
              <button class="btn btn-lg btn-outline-primary mt-2" type="submit">Login</button>
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
        <div @click="loginForm = !loginForm" class="text-primary">
          <h4 v-if="loginForm">No account?<br><button class="btn btn-primary btn-lg">Register</button></h4>
          <h4 v-else>Already have an account? <br> <button class="btn btn-primary btn-lg">Login</button></h4>
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

  #image {
    background-image: url("../assets/sticky-notes2.png");
    background-size: cover;
    background-repeat: no-repeat;
    min-width: 1400px;
    min-height: 1000px;

  }
</style>