<template>
    <div class="pill"
        :class="className">
        <div class="pill-content">
            {{ value }}
        </div>
    </div>
</template>

<script>
export default {
    name: "Pill",
    props: {
        /**
         * Define o conteúdo da pill
         */
        'value': {
            require: true,
            type: String
        },
        /**
         * Define a cor de fundo da pill
         * @values urgent, important
         */
        'className': String
    },
}
</script>

<style lang="stylus" scoped>
.pill
    display inline-block
    font-weight bold
    padding 0 8px
    height 20px
    font-size 10px
    border-radius 10px

    .pill-content
        height 100%
        display flex
        align-items: center;
        justify-content: center;
</style>