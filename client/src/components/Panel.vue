<template>
  <div class ="white elevation-2">
    <v-toolbar flat dense class="indigo" dark>
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>

    <div class="pl-4 pr-4 pt-2 pb-2 ">
      <slot>
        <v-alert :value="true" color="error" icon="warning">
        Nothing to display here :(
      </v-alert>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>

<style scoped>
</style>
