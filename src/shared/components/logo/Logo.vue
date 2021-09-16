<template>
    <div class="logo-container bg-primary">
        <img src="../../../assets/images/facilita-logo.svg" alt="Logo">
    </div>
</template>

<script>
export default {
    name: 'Logo'
}
</script>

<style lang="stylus" scoped>
.logo-container
    display flex
    justify-content center
    align-items center

    img
        height 70%
        padding 0 0 6px 6px
</style>