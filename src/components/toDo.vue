<template>
  <div class="task-list">
    <div class="inbox" v-for="(assignee, idx) in assignees">
      Tasks For: {{ assignee }} <span v-if="loggedIn" class="fa fa-trash" @click="deleteList(assignee)"></span>
      <div class="item" v-for="(task, idx2) in tasks[idx]">
        <span>
          <input type="checkbox" @click="completeTask(assignee, taskKeys[idx][idx2])" :checked=task.complete>
          <span :class="{task__complete : task.complete}"> {{ task.task }} </span>
        </span>
        <div v-if="loggedIn" class="fa fa-minus-circle" @click="deleteItem(assignee, taskKeys[idx][idx2])"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'toDo',
  props: [
      'assignees',
      'tasks',
      'taskKeys',
      'database',
      'loggedIn'
  ],
  data () {
    return {
    }
  },
  methods: {
      completeTask(assignee, key) {
          let update = {}
          this.$props.database.ref(`/${assignee}/tasks/${key}/complete`).once('value')
              .then((snapshot) => {
                    snapshot.val() ? update[`/${assignee}/tasks/${key}/complete`] = false : update[`/${assignee}/tasks/${key}/complete`] = true
                    this.$props.database.ref().update(update)
                })
      },
      deleteItem(assignee, key) {
          this.$props.database.ref(`/${assignee}/tasks/${key}/`).remove()
      },
      deleteList(assignee) {
          this.$props.database.ref(`/${assignee}/`).remove()
      }
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
