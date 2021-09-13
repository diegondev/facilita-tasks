<template>
    <Card class="task-item-container" :class="{'checked': checked}">
        <Checkbox :value="checked" @input="onChangeCheck" />
        <div class="task-item-content">
            <span class="task-item-title">{{ title }}</span>
            <Pill v-if="category" :value="category" :urgency="urgencyFromCategory"/>
        </div>
        <slot name="trailing"></slot>
    </Card>
</template>

<script>
import Card from '../../../../../shared/components/card/Card.vue';
import Checkbox from '../../../../../shared/components/checkbox/Checkbox.vue';
import Pill from '../../../../../shared/components/pill/Pill.vue';

function onChangeCheck() {
    this.$emit('onChangeCheck', !this.checked);
}

function urgencyFromCategory() {
    let urgency = '';

    switch (this.category) {
        case 'Importante':
            urgency = 'important';
            break;
        case 'Urgente':
            urgency = 'urgent';
            break;
        default:
            break;
    }

    return urgency;
}

export default {
    name: 'TaskItem',
    components: {
        Card,
        Checkbox,
        Pill
    },
    props: {
        'title': String,
        'checked': Boolean,
        'category': String
    },
    computed: {
        urgencyFromCategory
    },
    methods: {
        onChangeCheck
    }
}
</script>

<style lang="stylus" scoped>

.task-item-container
    display flex
    flex-direction row
    width 100%

    &.checked
        opacity .5

        .task-item-title
            text-decoration line-through

.task-item-content
    display flex 
    flex 1 
    align-items center
    justify-content space-between
    margin auto 14px

.task-item-title
    font-weight bold
    margin-right 8px
    
</style>