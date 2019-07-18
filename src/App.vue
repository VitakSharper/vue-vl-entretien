<template>
    <div id="app">
        <app-navbar/>
        <div class="container">
            <router-view/>
        </div>
    </div>
</template>
<script>
    import Navbar from '@/components/app/Navbar.vue'

    export default {
        components: {
            appNavbar: Navbar
        },
        data: () => ({})
    }
</script>
<style lang="scss">
    @import "~materialize-css/dist/css/materialize.min.css";
</style>
