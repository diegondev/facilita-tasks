<template>
    <ul class="category-list">
        <slot></slot>
    </ul>
</template>

<script>
export default {
    name: 'CategoryList'
}
</script>

<style lang="stylus" scoped>
.category-list
    font-size 14px
    font-weight bold
    margin 58px 0
    list-style none
</style>