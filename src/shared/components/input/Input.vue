<template>
    <div class="input-container">
        <label class="input-label" :for="name">{{ label }}</label>
        <input class="input-field" :id="name" 
        :name="name" 
        :type="type"
        :placeholder="placeholder"
        :value="value"
        @input="onInput($event.target.value)">
        <font-awesome-icon class="input-icon" :icon="icon" />
    </div>
</template>

<script>
function onInput(value) {
    this.$emit('input', value)
}

export default {
    name: "Input",
    props: {
        'name': String,
        'label': String,
        'icon': String,
        'placeholder': String,
        'value': String,
        'type': {
            type: String,
            default: 'text'
        },
    },
    methods: {
        onInput
    }
}
</script>

<style lang="stylus" scoped>
.input-container
    position relative
    margin 8px 0

.input-label
    font-size 12px

.input-field
    margin 8px 0
    width 100%
    height 52px
    border-radius 5px
    padding 0 8px
    background-color transparent 

.input-icon
    position absolute
    height 52px
    margin 8px 16px
    right 0

</style>