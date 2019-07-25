<template>
  <h1 v-if="$store.state.isUserLoggedIn">You are now logged in!</h1>
  <div v-else-if="!$store.state.isUserLoggedIn">
    <h1>Login</h1>
    <v-container align-baseline>
      <v-flex>
        <v-text-field
          label="Email"
          placeholder="example@email.com"
          v-model="email"
        ></v-text-field>
        <br>
        <v-text-field
          label="Password"
          type="password"
          placeholder="Enter password here"
          v-model="password"
        ></v-text-field>
      </v-flex>
    </v-container>
    <br>
    <div class="error" v-html="error" />
    <br>
    <v-btn @click="login">Login</v-btn>
    <br><br>
    <v-btn router to="Register">Don't have an account? Click here to register.</v-btn>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'HelloWorld',
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        // send login request to backend
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: white;
}
</style>
