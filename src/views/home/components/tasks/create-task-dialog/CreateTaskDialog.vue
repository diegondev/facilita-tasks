<template>
    <Modal :value="data.open">
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
                <div class="category-radio-group">
                    <div class="category-radio" v-for="category of categories" :key="category.id">
                        <input type="radio" :id="category.id + category.name" :value="category" v-model="dataTask.category">
                        <label :for="category.id + category.name">{{ category.name }}</label>
                    </div>
                </div>
                <button class="bg-success" @click="confirmAndClose" :disabled="!validateForm">Adicionar</button>
                </div>
            </form>
        </Card>
    </Modal>
</template>

<script>
import Modal from '@/shared/components/modal/Modal.vue';
import Card from '@/shared/components/card/Card.vue';
import Input from '@/shared/components/input/Input.vue';
import CategoryService from '@/services/category-service.js';
import Task from '@/model/task-model.js'

const categoryService = new CategoryService();

function close(event) {
    event.preventDefault();
    this.$emit('onClose');
    this.resetForm();
}

function confirmAndClose(event) {
    event.preventDefault();
    const newTask = { ...this.dataTask };

    newTask.checked = this.dataTask.checked;

    this.$emit('onClose', newTask);
    this.resetForm();
}

function validateForm() {
    return (this.dataTask.title && this.dataTask.description);
}

function whenDataChange(data) {

    if (data.task.pid) {
        this.dataTask = { ...data.task };
    }
}

function categories() {
    return categoryService.get();
}

function resetForm() {
    this.dataTask = {};
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
        'data': {
            open: Boolean,
            task: Task
        },
    },
    methods: {
        close,
        confirmAndClose,
        resetForm
    },
    computed: {
        validateForm,
        categories
    },
    watch: {
        data: whenDataChange
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

    .category-radio-group
        display flex

        .category-radio
            display flex
            align-items center

        input
            margin-right 4px

        label
            margin-right 16px

</style>