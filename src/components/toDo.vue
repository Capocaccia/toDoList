<template>
  <div class="task-list">
    <div class="list" v-for="(assignee, idx) in assignees">
      <div class="list-title">
        Tasks For: {{ assignee }}
      </div>
      <div class="task" v-for="task in tasks[idx]">
        {{ task }} <input type="checkbox" @click="completeTask(assignee, task.key)">
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
      'database'
  ],
  data () {
    return {
    }
  },
  methods: {
      completeTask(assignee, key) {
          this.$props.database.ref(`/${assignee}/tasks/${key}`).update({})
      },
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../scss/style.scss';
</style>
