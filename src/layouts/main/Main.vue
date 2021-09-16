<template>
    <div class="main-container">
        <Logo class="logo" />
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
import Logo from '../../shared/components/logo/Logo.vue'
export default {
    name: 'Home',
    components: {
        Sidenav,
        Toolbar,
        Logo
    }
}
</script>

<style lang="stylus" scoped>
@require "../../assets/styles/breakpoints"

.main-container 
    display grid
    height 100vh
    grid-template-columns 106px calc(100vw - 106px)
    grid-template-rows 84px calc(100vh - 84px)

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

@media (max-width: $bp-sm)
    .main-container 
        overflow hidden
        grid-template-columns 106px calc(100vw - 122px) 16px
        grid-template-rows 84px calc(100vh - 168px) 84px

    .logo
        grid-column 1 / 2
        grid-row 1 / 2

    .header
        grid-column 2 / 4
        grid-row 1 / 2

    .content
        width 100%
        grid-column 1 / 4
        grid-row 2 / 3

    .sidenav
        grid-column  1 / 4
        grid-row 3 / 4

    
</style>