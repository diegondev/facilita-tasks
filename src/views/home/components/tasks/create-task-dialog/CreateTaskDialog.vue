<template>
    <Modal :value="open">
        <Card class="dialog-container">
            <form>
                <div class="dialog-title">
                    <h2>Cadastrar Tarefa</h2>
                    <font-awesome-icon class="close-icon" icon="times" @click="close" />
                </div>
                <div class="dialog-content">
                    <Input label="Título" v-model="dataTask.title"></Input>
                    <Input label="Descrição" v-model="dataTask.description"></Input>
                </div>
                <div class="dialog-footer">
                <div class="category-radio">
                    <input type="radio" id="urgent" name="fav_language" value="Urgentes" v-model="dataTask.category">
                    <label for="urgent">Urgente</label><br>
                    <input type="radio" id="important" name="fav_language" value="Importantes" v-model="dataTask.category">
                    <label for="important">Importante</label><br>
                </div>
                <button class="bg-success" @click="confirmAndClose" :disabled="!validateForm">Adicionar</button>
                </div>
            </form>
        </Card>
    </Modal>
</template>

<script>
import Modal from '../../../../../shared/components/modal/Modal.vue';
import Card from '../../../../../shared/components/card/Card.vue';
import Input from '../../../../../shared/components/input/Input.vue';

function close(event) {
    event.preventDefault();
    this.$emit('onClose');
    this.dataTask = {};
}

function confirmAndClose(event) {
    event.preventDefault();
    const newTask = { ...this.dataTask };
    this.$emit('onClose', newTask);
    this.dataTask = {};
}

function validateForm() {
    return (this.dataTask.title && this.dataTask.description);
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
            dataTask: {}
        }
    },
    props: {
        'open': {
            type: Boolean,
            default: false
        },
        'task': {},
    },
    methods: {
        close,
        confirmAndClose
    },
    computed: {
        validateForm
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