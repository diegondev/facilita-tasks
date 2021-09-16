<template>
    <li class="more-menu-list-item" @click="$emit('click')">
        <slot></slot>
    </li>
</template>

<style lang="stylus" scoped>
.more-menu-list-item
    width 100%
    white-space nowrap
    padding 8px 16px
    border-radius 5px
    cursor pointer
</style>