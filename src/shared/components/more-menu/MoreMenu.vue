<template>
    <div class="more-menu-container" v-click-outside="close">
        <div class="more-menu-icon" @click="open = !open">
            <font-awesome-icon icon="ellipsis-v" />
        </div>
        <div v-if="open" class="more-menu-collapse">
            <ul class="more-menu-list">
                <slot></slot>
            </ul>
            <font-awesome-icon icon="ellipsis-v" class="icon" @click="close"/>
        </div>
    </div>
</template>

<script>

function close() {
    this.open = false;
}

export default {
    name: "MoreMenu",
    data: () => {
        return {
            open: false
        }
    },
    methods: {
        close
    }
}
</script>

<style lang="stylus" scoped>
.more-menu-container
    display flex
    align-items center
    position relative

.more-menu-icon
    font-size 16px
    text-align center
    width 16px
    height 16px
    border-radius 50%
    cursor pointer

.more-menu-collapse
    display flex
    position absolute
    top 0
    right 0
    padding 8px 0
    border-radius 5px

    .icon
        margin 0 8px

.more-menu-list
    list-style none
    margin-left 8px
</style>