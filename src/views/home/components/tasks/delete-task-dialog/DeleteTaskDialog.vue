<template>
    <Modal :value="data.open">
        <Card class="dialog-container">
            <div class="dialog-content">
                <div class="dialog-figure">
                    <font-awesome-icon icon="trash-alt" />
                </div>
                <span class="title-message">Tem certeza que deseja <span class="text-danger">excluir</span> essa tarefa?</span>
                <span class="description-message">Esta opção não pode ser desfeita.</span>
            </div>
            <div class="dialog-footer">
                <button class="bg-success" @click="close(false)">Cancelar</button>
                <button class="bg-danger" @click="close(true)">Confirmar</button>
            </div>
        </Card>
    </Modal>
</template>

<script>
import Modal from '../../../../../shared/components/modal/Modal.vue';
import Card from '../../../../../shared/components/card/Card.vue';

function close(confirm) {
    console.log(this.data)
    this.$emit('onClose', {
        confirm,
        indexTask: this.data.indexTask
    });
}

export default {
    name: 'DeleteTaskDialog',
    components: {
        Modal,
        Card,
    },
    data() {
        return {
            dataTask: null
        }
    },
    props: {
        'data': {
            open: Boolean,
            indexTask: Number
        },
        'task': null,
    },
    methods: {
        close
    }
}
</script>

<style lang="stylus" scoped>
.dialog-container
    display flex
    position relative
    flex-direction column
    max-width 525px
    padding 40px

.dialog-content
    display flex
    flex-direction column
    align-items center

    .dialog-figure
        display flex
        justify-content center
        align-items center
        width 135px
        height 135px
        border-radius 50%
        font-size 64px
        margin-bottom 18px

    .title-message
        font-size 18px
        font-weight bold

.dialog-footer
    display flex
    justify-content center
    align-items flex-start
    margin-top 32px

    button
        margin 0 8px

</style>