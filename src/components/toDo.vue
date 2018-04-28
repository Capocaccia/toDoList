<template>
  <div class="task-list">
    <div class="list" v-for="(assignee, idx) in assignees">
      <div class="list-title">
        Tasks For: {{ assignee }}
      </div>
      <div class="task" v-for="(task, idx2) in tasks[idx]">
        <span :class="{task__complete : task.complete}"> {{ task.task }} </span>
        <input type="checkbox" @click="completeTask(assignee, taskKeys[idx][idx2])">
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
      'database'
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
      }
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../scss/style.scss';
</style>
