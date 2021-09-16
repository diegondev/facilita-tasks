<template>
    <div v-if="value" class="modal-container" @click="close">
        <slot></slot>
    </div>
</template>

<script>
function close() {
    this.$emit('input', false);
}
export default {
    name: 'Modal',
    props: {
        /**
         * Valor que define se a modal é exibida ou não
         * @model
         */
        value: {
            
            type: Boolean,
            default: false
        }
    },
    methods: {
        close
    }
};
</script>

<style lang="stylus" scoped>
.modal-container
    display flex
    justify-content center
    align-items center
    position absolute
    width 100vw
    height 100vh
    top 0
    botton 0
    left 0
    right 0
    z-index 1000
</style>