import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tasks: JSON.parse(localStorage.getItem('tasks') || '[]') // store the default from localStorage
    },
    mutations: {
        createTask(state, task) {
            state.tasks.push(task);

            localStorage.setItem('tasks', JSON.stringify(state.tasks)) // save state in local storage
        }
    },
    getters: {
        getTasks(state) {
            return state.tasks
        },
        taskById: state => id => state.tasks.find(t => t.id === id)
    },
    actions: {
        createTask({commit}, task) {
            commit('createTask', task)
        }
    }
})
