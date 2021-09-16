<template>
    <div class="main-container">
        <Sidenav class="sidenav" />
        <Toolbar class="header">...</Toolbar>
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script>
import Sidenav from './components/Sidenav.vue';
import Toolbar from './components/Toolbar.vue';
export default {
    name: 'Home',
    components: {
        Sidenav,
        Toolbar
    }
}
</script>

<style lang="stylus" scoped>
.main-container 
    display grid
    height 100vh
    grid-template-columns 106px calc(100vw - 106px)
    grid-template-rows 84px calc(100vh - 84px)
    grid-template-areas "sidenav header"
                        "sidenav content";

.sidenav
    grid-column  1 / 2
    grid-row 1 / 3

.header
    width calc(100vw - 106px)
    grid-column 2 /3
    grid-row 1 / 2

.content
    width calc(100vw - 106px)
    grid-column 2
    grid-row 2
    grid-area 'content'
    overflow auto
    
</style>