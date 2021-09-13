<template>
    <div class="checkbox-container" :class="{'checked': value}" @click="onClick">
        <font-awesome-icon icon="check" class="checkbox-icon" />
    </div>
</template>

<script>
function onClick() {
    this.$emit('input', !this.value);
}

export default {
    name: 'Checkbox',
    props: {
        'value': {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onClick
    }
}
</script>

<style lang="stylus" scoped>
.checkbox-container
    display flex
    justify-content center
    align-items center
    width 32px
    height 32px
    border-radius 5px
    cursor pointer
    font-size 16px

    .checkbox-icon
        display none

    &.checked

        .checkbox-icon
            display block

</style>