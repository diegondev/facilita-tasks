<template>
    <Modal :value="open">
        <Card class="dialog-container">
            <form>
                <div class="dialog-title">
                    <h2>Cadastrar Tarefa</h2>
                    <font-awesome-icon class="close-icon" icon="times" @click="close" />
                </div>
                <div class="dialog-content">
                    <Input label="Título"></Input>
                    <Input label="Descrição"></Input>
                </div>
                <div class="dialog-footer">
                <div class="category-radio">
                    <input type="radio" id="urgent" name="fav_language" value="Urgente">
                    <label for="urgent">Urgente</label><br>
                    <input type="radio" id="important" name="fav_language" value="Importante">
                    <label for="important">Importante</label><br>
                </div>
                <button class="bg-success" @click="close" disabled>Adicionar</button>
                </div>
            </form>
        </Card>
    </Modal>
</template>

<script>
import Modal from '../../../../../shared/components/modal/Modal.vue';
import Card from '../../../../../shared/components/card/Card.vue';
import Input from '../../../../../shared/components/input/Input.vue';

function close() {
    this.$emit('onClose', this.dataTask);
}

export default {
    name: 'CreateTaskDialog',
    components: {
        Modal,
        Card,
        Input
    },
    data() {
        return {
            dataTask: null
        }
    },
    props: {
        'open': {
            type: Boolean,
            default: false
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

.dialog-title
    display flex
    justify-content space-between
    margin-bottom 24px

    .close-icon
        position absolute
        font-size 12px
        cursor pointer
        top 16px
        right 16px

.dialog-footer
    display flex
    justify-content space-between
    align-items flex-start

    .category-radio
        display flex
        align-items center

        input
            margin-right 4px

        label
            margin-right 16px
</style>