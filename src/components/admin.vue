<template>
    <div class="admin">
        <div class="control-panel">
            <div class="control-panel__title" @click="sendAssignee">
                <button class="assignee-add">
                    Add Assignee
                </button>
            </div>
            <div class="control-panel__input">
                <input type="text" v-model="assignee">
            </div>
        </div>
        <div class="control-panel" v-for="assignee in assignees">
            <div class="control-panel__title">
                <button class="add_task" @click="sendTaskToAssignee(assignee)">
                    Add Task For: {{ assignee }}
                </button>
            </div>
            <div class="control-panel__input">
                <input type="text" v-model="task">
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'admin',
        props: [
            'assignees',
            'assigneeKeys',
            'database'
        ],
        data () {
            return {
                assignee: '',
                task: ''
            }
        },
        methods: {
            sendAssignee() {
                this.$props.database.ref(`/${this.assignee}`).set(this.assignee)
            },
            sendTaskToAssignee(assignee) {
                this.$props.database.ref(`/${assignee}/tasks`).push(this.task)
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
