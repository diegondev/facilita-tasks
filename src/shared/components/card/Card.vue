<template>
    <div class="card-container">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Card'
}
</script>

<style lang="stylus" scoped>
.card-container
    width 100%
    padding 16px 14px
    border-radius 5px
    margin-bottom 8px
</style>