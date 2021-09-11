<template>
    <div class="home">
        <aside class="categories-list-container">
            <h3>Categorias</h3>
            <ul class="category-list">
                <li 
                    v-for="(category, key) of categories" 
                    :key="key" 
                    class="category-item">
                    {{ category.name }}
                    <div v-if="category.quantity" 
                        class="badge"
                        :class="category.urgency">
                        {{ category.quantity }}
                    </div>
                </li>
            </ul>
        </aside>
        <main></main>
    </div>
</template>

<script>

export default {
    name: 'Home',
    data() {
        return {
            categories: [
                {
                    name: 'Todas',
                },
                {
                    name: 'Urgentes',
                    quantity: 1,
                    urgency: 'urgent'
                },
                {
                    name: 'Importantes',
                    quantity: 2,
                    urgency: 'important'
                },
                {
                    name: 'Outras',
                },
                {
                    name: 'Finalizadas',
                }
            ]
        }
  }
}
</script>

<style lang="stylus" scoped>
.home
  display flex
  flex row
  height 100%

  aside
    display flex
    flex-direction column
    align-items center
    justify-content center
    width 260px

    h3
        margin-left -24px

  main
    flex 1

.category-list
    font-size 16px
    font-weight bold
    margin 58px 0
    list-style none

    .category-item
        margin-bottom 18px

        &:before
            content ''
            display inline-block
            margin-right 8px
            height 12px
            width 12px
            background-image url('../assets/icons/chevron-right-solid.svg')
            background-repeat no-repeat
            background-size contain
            background-position center

        .badge
            display inline-block
            width 20px
            height 20px
            font-size 10px
            padding 4px
            text-align center
            border-radius 50%
</style>
