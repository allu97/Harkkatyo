<template>
  <v-layout column>
    <h1 v-if="!$store.state.isUserLoggedIn">Log in to create a new post</h1>
    <div v-if="$store.state.isUserLoggedIn">
      <v-flex xs12>
        <v-card>
          <v-toolbar card color="indigo" dark>
            <v-toolbar-title>Submit a post</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-textarea
              box
              label="Post text"
              required
              :rules="[required]"
              id="name"
              v-model="name">
            </v-textarea>
            <p class="text-sm-left">Add tag (optional)</p>
            <v-text-field
              box
              type="text"
              id="tag"
              v-model="tag"
              placeholder="example: #bored ">
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" depressed v-on:click="createPost">Post</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <br>
      <div class="error" v-if="error">
        {{error}}
      </div>
      <br>
    </div>
    <panel title="Posts">
      <v-layout row wrap>
        <div class="post"
         v-for="(post, tag, user, index) in posts"
         v-bind:text="post"
         v-bind:tag="tag"
         v-bind:user="user"
         v-bind:index="index"
         v-bind:key="post._id">
         <v-flex xs12 pr-2>
           <v-card class="mx-auto" color="indigo" dark width="250" >
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
             <v-btn class="red" v-on:click="deletePost(post._id)">Delete</v-btn>
           </v-card>
           <br>
         </v-flex>
       </div>
     </v-layout>
   </panel>
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
      name: '',
      tag: '',
      user: this.$store.state.user.email,
      error: '',
      required: (value) => !!value || 'Required.'
    }
  },
  async mounted () {
    this.posts = (await PostsService.index()).data
  },
  methods: {
    async createPost () {
      this.error = null
      if (!this.name) {
        this.error = 'Please fill in the required field.'
        return
      }
      try {
        await PostsService.post({name: this.name, tag: this.tag, user: this.user})
      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
      }
      this.posts = (await PostsService.index()).data
    },
    async deletePost (id) {
      await PostsService.deletePost(id)
      this.posts = (await PostsService.index()).data
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
