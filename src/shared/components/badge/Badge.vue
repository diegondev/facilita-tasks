<template>
    <div class="badge"
        :class="className">
        <div class="badge-content">
            {{ validateValue }}
        </div>
    </div>
</template>

<script>

function validateValue() {
    return this.value > 99 
        ? '99+' 
        : this.value;
}

export default {
    name: "Badge",
    props: {
        /**
         * Define o conteúdo do badge
         */
        'value': {
            require: true,
            type: Number
        },
        /**
         * Define a cor de fundo do badge
         * @values urgent, important
         */
        "className": {
            type: String
        }
    },
    computed: {
        validateValue
    }
}
</script>

<style lang="stylus" scoped>
.badge
    display inline-block
    width 20px
    height 20px
    font-size 10px
    border-radius 50%
    pointer-events none

    .badge-content
        height 100%
        display flex
        align-items: center;
        justify-content: center;
</style>