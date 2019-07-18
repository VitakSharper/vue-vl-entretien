<template>
    <div>
        <h1 class="center-align">List of Tasks</h1>
        <div class="row">
            <div class="input-field col s3">
                <select ref="select" v-model="filter">
                    <option value="" disabled selected>Choose your option</option>
                    <option value="active">Active</option>
                    <option value="outdated">Outdated</option>
                    <option value="completed">Completed</option>
                    <optgroup label="clear" v-if="this.filter">
                        <option value="completed" @click="filter=null">Clear</option>
                    </optgroup>
                </select>
                <label>Status Filter</label>
            </div>
        </div>
        <hr>
        <table v-if="tasks.length">
            <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Date</th>
                <th>Description</th>
                <th>Status</th>
                <th>Open</th>

            </tr>
            </thead>
            <tbody>
            <tr v-for="(task,index) of displayTasks" :key="task.id">
                <td>{{index+1}}</td>
                <td>{{task.title}}</td>
                <td>{{new Date(task.date).toLocaleDateString()}}</td>
                <td class="desc-cell">
                    <div class="desc">{{task.description}}</div>
                </td>
                <td style="font-weight: bold"
                    :style="{color:task.status==='active'?'#536dfe':task.status==='completed'?'#004d40':'#757575'}">
                    {{task.status}}
                </td>
                <td>
                    <router-link tag="button" class="waves-effect waves-teal btn-flat" :to="`/task/${task.id}`"><i
                            class="material-icons">open_in_browser</i>
                    </router-link>
                </td>
            </tr>
            </tbody>
        </table>
        <p v-else>No tasks</p>
    </div>
</template>

<script>
    import * as M from "materialize-css";

    export default {
        data: () => ({
            filter: null
        }),
        computed: {
            tasks() {
                return this.$store.getters.getTasks
            },
            displayTasks() {
                return this.tasks.filter(t => {
                    if (!this.filter) {
                        return true
                    }
                    return t.status === this.filter
                })
            }
        },
        mounted() {
            this.select = M.FormSelect.init(this.$refs.select);
        },
        destroyed() {
            if (this.select && this.select.destroy) {
                this.select.destroy()
            }
        }
    }
</script>

<style scoped>
    .desc {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .desc-cell {
        max-width: 300px;
    }
</style>
