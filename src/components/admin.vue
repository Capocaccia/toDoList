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
        <div class="control-panel" v-for="(assignee, idx) in assignees">
            <div class="control-panel__title">
                <button class="add_task" @click="sendTaskToAssignee(assigneeKeys[idx])">
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
            'db'
        ],
        data () {
            return {
                assignee: '',
                assignees: [],
                assigneeKeys: [],
                database: this.$props.db.ref('/'),
                task: ''
            }
        },
        methods: {
            sendAssignee() {
                this.$props.db.ref(`/${this.assignee}`).set(this.assignee)
            },
            sendTaskToAssignee(assignee) {
                this.$props.db.ref(`/${assignee}/tasks`).push(this.task)
            }
        },
        mounted() {
            this.database.on('value', (snapshot) => {
                this.assignees = Object.keys(snapshot.val())
                snapshot.forEach((childSnap) => {
                    this.assigneeKeys.push(childSnap.key)
                })
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import '../scss/style.scss';
</style>
