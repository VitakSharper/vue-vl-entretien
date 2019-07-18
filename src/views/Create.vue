<template>
    <div class="row">
        <div class="col s6 offset-s3">
            <h1 class="center-align">Create Task</h1>
            <form @submit.prevent="onValidate()">
                <div class="input-field">
                    <input id="title" type="text" class="validate" required v-model="title">
                    <label for="title">Title</label>
                    <span class="helper-text" data-error="Title is required" data-success="right">Helper text</span>
                </div>
                <div class="chips" ref="chips"></div>

                <div class="input-field">
                    <textarea id="description" class="materialize-textarea" v-model="description"></textarea>
                    <label for="description">Description</label>
                    <span class="character-counter"
                          style="float: right; font-size: 12px;">{{description.length}}/2048</span>
                </div>
                <input type="text" ref="datepicker">

                <button class="btn-floating btn-large waves-effect waves-light green darken-4" type="submit"><i
                        class="material-icons">add</i></button>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data: () => ({
            chips: null,
            datepicker: null,
            description: '',
            title: ''
        }),
        computed: {
            ...mapGetters(['getTasks'])
        },
        watch: {
            getTasks(tasks) {
                console.log('Pushed Task: ', tasks)
            }
        },
        mounted() {
            this.chips = M.Chips.init(this.$refs.chips, {
                placeholder: 'Task tags'
            });

            this.datepicker = M.Datepicker.init(this.$refs.datepicker, {
                format: 'dd.mm.yyyy',
                defaultDate: new Date(),
                setDefaultDate: true,
                i18n: {
                    cancel: 'Annuler',
                    done: 'Valider'
                }
            });
        },
        methods: {
            onValidate() {
                const task = {
                    title: this.title,
                    description: this.description,
                    id: Date.now(),
                    status: 'active',
                    tags: this.chips.chipsData,
                    date: this.datepicker.date
                };
                this.$store.dispatch('createTask', task);
                this.$router.push('/list')
            }
        },
        destroyed() {
            if (this.datepicker && this.datepicker.destroy) {
                this.datepicker.destroy();
            }
            if (this.chips && this.chips.destroy) {
                this.chips.destroy();
            }
        }
    }
</script>
