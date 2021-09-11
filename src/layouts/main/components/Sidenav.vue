<template>
    <div class="sidenav-container">
        <div class="nav-logo">
            <router-link to="/home">
                <img src="@/assets/images/facilita-logo.svg" alt="">
            </router-link>
        </div>
        <nav class="nav-menu">
             <ul class="nav-list">
                <li v-for="(menuItem, key) of menuItens" 
                    :key="key" 
                    class="nav-item" 
                    :class="{'active': menuItem.route == $route.path}">
                    <router-link :to="menuItem.route">
                        <font-awesome-icon :icon="menuItem.icon" />
                        {{ menuItem.label }}
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menuItens: [
                {
                    label: 'Dashboard',
                    icon: 'chart-bar',
                    route: '/home'
                },
                {
                    label: 'Tarefas',
                    icon: 'check-circle',
                    route: '#'
                },
                {
                    label: 'Configurações',
                    icon: 'cogs',
                    route: '#'
                }
            ]
        }
    }
}
</script>


<style lang="stylus" scoped>

.sidenav-container
    display flex
    flex-direction column

.nav-logo
    height 84px
    padding 8px 16px 8px 24px

    img
        width 100%
        height 100%

.nav-menu
    margin auto
    width 100%

.nav-list

    .nav-item
        font-size 12px

        a
            display flex
            flex-direction column
            height 82px
            align-items center
            justify-content center
            text-decoration none

        svg
            font-size 32px
            margin-bottom 8px

</style>