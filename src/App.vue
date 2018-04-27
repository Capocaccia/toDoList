<template>
  <div id="app">
    <admin
        :assignees="assignees"
        :assigneeKeys="assigneeKeys"
        :database="database"
    />
    <toDo
      :assignees="assignees"
      :tasks="tasks"
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
        tasks:[]
      }
  },
  methods: {

  },
  mounted() {
      this.dbRoot.on('value', (snapshot) => {
          this.assignees = Object.keys(snapshot.val())
          snapshot.forEach((childSnap) => {
              let tasks = Object.values(childSnap.val().tasks)
              this.tasks.push(tasks.length > 0 ? tasks : [])
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
  margin-top: 60px;
}
</style>
