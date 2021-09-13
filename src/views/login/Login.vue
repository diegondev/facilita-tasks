<template>
    <div class="login">
        <aside class="bg-primary">
            <img src="../../assets/images/facilita-login-img.svg" alt="">
        </aside>
        <main>
            <form action="#">
                <h3 class="form-title">Entre com seus dados de accesso.</h3>

                <label for="username">Nome de usuário ou e-mail</label>
                <input id="username" name="username" type="text">

                <label for="password">Senha</label>
                <input id="password" type="password">

                <button class="bg-primary" @click="login">Entrar</button>
                <router-link to="/forget-password">Esqueci minha senha</router-link>
            </form>
        </main>
    </div>
</template>

<script>
export default {
    name: 'Login',
    methods: {
        login: function () {
            // Login validation
            this.$router.push('/home')
        }
    }
}
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
        flex-direction column
        justify-content center
        align-items: center

        form 
            display flex
            flex-direction column
            justify-content center
            width 35%

        .form-title
            margin-bottom 42px
            font-weight bold

        label
            font-size 12px
            margin 8px 0

        input
            height 52px
            border-radius 5px
            padding 0 8px

        button
            margin-top 18px
            margin-bottom 42px

    a
        width 100%
        font-size 12px

</style>