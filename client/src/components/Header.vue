<template>
  <v-toolbar fixed class="indigo" dark>
    <v-toolbar-title>Microblog-site</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat dark router to="login" v-if="!$store.state.isUserLoggedIn">Login</v-btn>
      <v-btn flat dark router to="register" v-if="!$store.state.isUserLoggedIn">Register</v-btn>
      <v-btn flat dark v-if="$store.state.isUserLoggedIn" @click="logout">Logout</v-btn>
      <v-btn flat dark router to="posts" v-if="$store.state.isUserLoggedIn">Posts</v-btn>
      <v-btn flat dark router to="search">Search</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'HelloWorld'
      })
    }
  }
}
</script>

<style scoped>

</style>
