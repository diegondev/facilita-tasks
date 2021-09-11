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
    components: {
        Sidenav,
        Toolbar
  }
}
</script>

<style lang="stylus" scoped>
.main-container 
    display grid
    width 100%
    height 100vh
    grid-template-columns 106px 1fr
    grid-template-rows 84px 1fr
    grid-template-areas "sidenav header"
                        "sidenav content";

.sidenav
    grid-column  1 / 2
    grid-row 1 / 3

.header
    grid-column 2 /3
    grid-row 1 / 2
    box-shadow 0px 0px 2px lightgray

.content
    grid-column 2
    grid-row 2
    grid-area 'content'
    
</style>