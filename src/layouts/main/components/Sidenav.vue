<template>
    <div class="sidenav-container">
        <div class="nav-logo">
            <router-link to="/home">
                <img src="@/assets/images/facilita-logo.svg" alt="">
            </router-link>
        </div>
        <nav class="nav-menu">
             <ul class="nav-list">
                <li class="nav-item"><router-link to="/home">
                    <font-awesome-icon icon="chart-bar" />
                    Dashboard
                </router-link></li>
                <li class="nav-item"><router-link to="#">
                    <font-awesome-icon icon="check-circle" />
                    Tarefas
                </router-link></li>
                <li class="nav-item"><router-link to="#">
                    <font-awesome-icon icon="cogs" />
                    Configrações
                </router-link></li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {

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