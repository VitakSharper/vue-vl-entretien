<template>
    <div class="row">
        <div v-if="task" class="col s6 offset-s3">
            <h3 class="center-align">{{task.title}}</h3>
            <form @submit.prevent="onValidate()">

                <div class="chips" ref="chips"></div>

                <div class="input-field">
                    <textarea id="description" class="materialize-textarea" v-model="description"
                              ref="textarea"></textarea>
                    <label for="description">Description</label>
                    <span class="character-counter"
                          style="float: right; font-size: 12px;">{{description.length}}/2048</span>
                </div>
                <input type="text" ref="datepicker">

                <button class="btn-floating btn-large waves-effect waves-light green darken-4" type="submit"><i
                        class="material-icons">update</i></button>
            </form>
        </div>
        <h1 class="center-align red-text text-darken-4" v-else>Task Not Found!!</h1>
    </div>
</template>

<script>
    import * as M from "materialize-css";

    export default {
        data: () => ({
            chips: null,
            datepicker: null,
            description: '',
        }),
        computed: {
            task() {
                return this.$store.getters.taskById(+this.$route.params['id'])
            }
        },
        mounted() {

            this.description = this.task.description;

            this.chips = M.Chips.init(this.$refs.chips, {
                placeholder: 'Task tags',
                data: this.task.tags
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
            this.$nextTick(() => {
                M.textareaAutoResize(this.$refs.textarea);
                M.updateTextFields();
            });
        },
        methods: {
            onValidate() {
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

<style scoped>

</style>
