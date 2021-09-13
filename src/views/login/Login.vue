<template>
    <div class="login">
        <aside class="bg-primary">
            <img src="../../assets/images/facilita-login-img.svg" alt="">
        </aside>
        <main>
            <form action="#">
                <h3 class="form-title">Entre com seus dados de accesso.</h3>

                <Input label="Nome de usuário ou e-mail" type="text" name="username"/>
                <Input label="Senha" type="password" name="password"/>

                <button class="bg-success" @click="login">Entrar</button>
                <router-link to="/forget-password">Esqueci minha senha</router-link>
            </form>
        </main>
    </div>
</template>

<script>
import Input from '../../shared/components/input/Input.vue';
export default {
    name: 'Login',
    components: {
        Input
    },
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

        button
            margin-top 18px
            margin-bottom 42px

    a
        width 100%
        font-size 12px

.input-container
    margin 0

</style>