<template>
    <div class="login">
        <aside class="bg-primary">
            <img src="../assets/images/facilita-login-img.svg" alt="">
        </aside>
        <main>
            <form action="#">
                <input type="text">
            </form>
        </main>
    </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
    .login 
        display flex
        flex-direction row
        height 100vh

    aside
        display flex
        flex 2

        img
            width 60%
            margin auto

    main
        flex 3
        display flex

</style>