<template>
    <li class="category-item" :class="{'selected': selected}"
        @click="$emit('click', data)">
        <font-awesome-icon class="category-item-icon" icon="chevron-right"/>
        <span class="category-item-title">{{ title }}</span>

        <Badge v-if="badge >= 0"
            :className="badgeClass"
            :value="badge">
        </Badge>
    </li>
</template>

<script>
import Badge from '@/shared/components/badge/Badge.vue';
export default {
    name: 'CategoryListItem',
    components: {
        Badge
    },
    props: {
        title: String,
        data: {
            default: ''
        },
        selected: Boolean,
        badge: Number,
        /**
         * Define a cor de fundo do badge
         * @values urgent, important
         */
        badgeClass: String 
    }
}
</script>

<style lang="stylus" scoped>
.category-item
        display flex
        flex-wrap nowrap
        align-items center
        margin-bottom 18px
        cursor pointer
    
        .categorty-item-title
            margin-right 8px

        .category-item-icon
            font-size 10px
            margin-right 8px
</style>