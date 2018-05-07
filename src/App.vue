<template>
  <div id="app">
    <div class="admin-controls" v-if="!loggedIn">
      <button @click="adminInput = !adminInput">Admin</button>
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
      console.log('here')
      if(this.password.toLowerCase() === '212ericson'){
        this.loggedIn = true
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

<style>

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
    background-color: #FFC338;
    padding: 50px;
  }

  body {
    margin: 0;
    padding: 0;
  }

  button {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    background: #fff;
    border: 0;
    font-size: 1rem;
    cursor: pointer;
    position: relative;
    box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin: 0 .5rem;
  }

</style>
