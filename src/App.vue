<template>
  <div id="app">
    <button class="admin-access-button" @click="openAdminOrLogOut">
      <span v-if="!loggedIn">Admin</span>
      <span v-if="loggedIn"> Logout </span>
    </button>
    <div class="admin-controls" v-if="!loggedIn">
      <input placeholder="password" v-if="adminInput" v-model="password" type="password">
      <button v-if="adminInput" @click="checkAdminAccess">Submit</button>
    </div>
    <admin
        :assignees="assignees"
        :assigneeKeys="assigneeKeys"
        :database="database"
        :loggedIn="loggedIn"
    />
    <toDo
      :assignees="assignees"
      :tasks="tasks"
      :taskKeys="taskKeys"
      :database="database"
      :loggedIn="loggedIn"
    />
  </div>
</template>

<script>
  import db from './firebaseConfig'
  import toDo from './components/toDo'
  import admin from './components/admin'

export default {
  name: 'App',
  components: {
    toDo,
    admin
  },
  data () {
      return {
        assigneeKeys: [],
        database: db.database(),
        dbRoot: db.database().ref('/'),
        assignees: null,
        tasks:[],
        taskKeys:[],
        adminInput: false,
        password: '',
        loggedIn: false
      }
  },
  methods: {
    checkAdminAccess() {
      if(this.password.toLowerCase() === '212ericson'){
        this.loggedIn = true
      }
    },
    openAdminOrLogOut() {
        if(this.loggedIn) {
            this.loggedIn = false
        } else {
            this.adminInput = !this.adminInput
        }
    }
  },
  mounted() {
      this.dbRoot.on('value', (snapshot) => {
          this.assignees = snapshot.val() ? Object.keys(snapshot.val()) : []
          this.taskKeys = []
          this.tasks = []
          this.assigneeKeys = []
            snapshot.forEach((childSnap) => {
              let tasks = childSnap.val().tasks ? Object.values(childSnap.val().tasks): []
              let taskKeys = childSnap.val().tasks ? Object.keys(childSnap.val().tasks): []

              this.taskKeys.push(taskKeys)
              this.tasks.push(tasks)
              this.assigneeKeys.push(childSnap.key)
          })
      })
  }
}

</script>

<style lang="scss">
  @import 'scss/style.scss';
</style>
