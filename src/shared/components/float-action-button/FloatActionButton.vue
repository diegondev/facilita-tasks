<template>
    <button class="float-action-button bg-success" @click="onClick">
        <font-awesome-icon :icon="icon" />
    </button>
</template>

<script>
function onClick() {
    this.$emit('click');
}

export default {
    name: 'FloatActionButton',
    props: {
        /**
         * Nome do ícon que será exibido no centro do botão.
         * O ícone deve fazer parte da biblioteca de ícone Font Awesome Icons
         */
        'icon': String
    },
    methods: {
        onClick
    }
}
</script>

<style lang="stylus" scoped>
.float-action-button
    width 78px
    height 78px
    border-radius 50%

    position fixed
    bottom 24px
    right 24px

    font-size 22px
</style>