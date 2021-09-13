<template>
    <div class="more-menu-container" v-click-outside="close">
        <div class="more-menu-icon" @click="open = !open">
            <font-awesome-icon icon="ellipsis-v" />
        </div>
        <div v-if="open" class="more-menu-collapse">
            <ul class="more-menu-list">
                <li  class="more-menu-list-item" 
                v-for="(menu, key) of menus" :key="key"
                @click="execAction(menu.action)">
                    {{ menu.title }}
                </li>
            </ul>
            <font-awesome-icon icon="ellipsis-v" class="icon" @click="close"/>
        </div>
    </div>
</template>

<script>

/* Menus
[
    {
        title: '',
        action: () => {}
    },
    ...
]
*/

function close() {
    this.open = false;
}

function execAction(action) {
    action();
    this.close();
}

export default {
    name: "MoreMenu",
    props: {
        'menus': []
    },
    data: () => {
        return {
            open: false
        }
    },
    methods: {
        close,
        execAction
    }
}
</script>

<style lang="stylus" scoped>
.more-menu-container
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
    top -8px
    right -4px
    padding 8px 0
    border-radius 5px

    .icon
        margin 0 8px

.more-menu-list
    list-style none
    margin-left 8px

.more-menu-list-item
    width 100%
    white-space nowrap
    padding 8px 16px
    border-radius 5px
    cursor pointer
</style>