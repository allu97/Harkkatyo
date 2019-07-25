<template>
  <v-layout row>
    <v-flex xs6 class="pr-2">
      <panel title="Search">
        <div class="create-post">
          <p>Search for posts by user:</p>
          <v-text-field
          type="text"
          box
          v-model="user"
          placeholder="Username"
          append-outer-icon="search"
          clearable
          @click:append-outer="searchPostByUser">
          </v-text-field>
          <p>Search for posts by tag:</p>
          <v-text-field
            type="text"
            box
            v-model="tag"
            placeholder="example: #bored"
            append-outer-icon="search"
            clearable
            @click:append-outer="searchPostByTag">
          </v-text-field>
        </div>
        <div class="error" v-if="error">
          {{error}}
        </div>
        <br>
      </panel>
    </v-flex>
    <v-flex xs6>
      <panel title="Search Results">
        <div class="post"
         v-for="(post, tag, user, index) in posts"
         v-bind:text="post"
         v-bind:tag="tag"
         v-bind:user="user"
         v-bind:index="index"
         v-bind:key="post._id">
         <v-card class="mx-auto" color="indigo" dark max-width="400" >
           <v-card-text class="headline font-weight-bold">
             {{post.name}}
             <br>
             {{post.tag}}
           </v-card-text>
           <v-card-actions>
             <v-list-tile class="grow">
               <v-list-tile-content>
                 <v-list-tile-title>{{'- ' + post.user}}</v-list-tile-title>
               </v-list-tile-content>
             </v-list-tile>
           </v-card-actions>
         </v-card>
         <br>
       </div>
     </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import PostsService from '@/services/PostsService'
import Panel from '@/components/Panel'
export default {
  components: {
    Panel
  },
  data () {
    return {
      posts: [],
      user: '',
      name: '',
      tag: '',
      error: ''
    }
  },
  methods: {
    async searchPostByUser (user) {
      this.error = null
      if (!this.user) {
        this.error = 'Enter username first.'
        return
      }
      try {
        this.posts = (await PostsService.searchPostByUser(this.user)).data
      } catch (error) {
        this.error = error.response.data.error
      }
      this.user = ''
    },
    async searchPostByTag (tag) {
      this.error = null
      if (!this.tag) {
        this.error = 'Enter tag first.'
        return
      }
      try {
        this.posts = (await PostsService.searchPostByTag(this.tag)).data
      } catch (error) {
        this.error = error.response.data.error
      }
      this.tag = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: white;
}
.post {
  font-size: 22px;
}
</style>
