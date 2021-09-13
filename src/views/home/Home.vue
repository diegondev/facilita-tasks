<template>
    <div class="home bg-defalt">
        <aside class="categories-list-container">
            <h3>Categorias</h3>
            <ul class="category-list">
                <li 
                    v-for="(category, key) of categories" 
                    :key="key" 
                    class="category-item" :class="{'selected': key == 0}">
                    <font-awesome-icon class="category-item-icon" icon="chevron-right"/>
                    {{ category.name }}
                    <Badge v-if="category.quantity"
                        :urgency="category.urgency"
                        :value="category.quantity">
                    </Badge>
                </li>
            </ul>
        </aside>
        <main>
            <div class="container-tasks">
                <h2>Minhas Tarefas</h2>
                <span>Olá 
                    <span class="text-emphasis">Diego Nascimento</span>
                    , você tem 
                    <router-link to="/tasks">4 tarefas</router-link> 
                    pendentes
                </span>
                <Input class="input-search"
                    icon="search" 
                    placeholder="Buscar tarefa"
                    v-model="search" />

                <TaskItem 
                    v-for="(task, key) of filteredTaskList" 
                    :key="key"
                    :title="task.title"
                    :category="task.category"
                    :checked="task.checked"
                    @onChangeCheck="task.checked = $event" >
                    <template v-slot:trailing>
                        <MoreMenu :menus="taskItemMenus"/>
                    </template>
                </TaskItem>

                <FloatActionButton icon="plus" @click="onOpenCreateTaskDialog" />
                
                <CreateTaskDialog :open="modalCreateTask" @onClose="onCloseCreateTaskDialog"/>
                <DeleteTaskDialog :open="modalDeleteConfimation" @onClose="onCloseDeleteTaskDialog"/>
                
            </div>
        </main>
    </div>
</template>

<script>
import Badge from '../../shared/components/badge/Badge.vue';
import Input from '../../shared/components/input/Input.vue';
import FloatActionButton from '../../shared/components/float-action-button/FloatActionButton.vue';
import MoreMenu from '../../shared/components/more-menu/MoreMenu.vue';
import TaskItem from './components/tasks/task-item/TaskItem.vue';
import CreateTaskDialog from './components/tasks/create-task-dialog/CreateTaskDialog.vue';
import DeleteTaskDialog from './components/tasks/delete-task-dialog/DeleteTaskDialog.vue';

function filteredTaskList() {
    return this.tasks
        .filter(
            task => task.title
                        ?.toUpperCase()
                        .includes(this.search.toUpperCase())
        ).sort((task0, task1) => {
            if (task0.checked && !task1.checked) return -1;
            if (task1.checked && !task0.checked) return 1;
            return 0;
        });
}

function onOpenCreateTaskDialog() {
    this.modalCreateTask = true
}

function onCloseCreateTaskDialog() {
    this.modalCreateTask = false
}

function onOpenDeleteTaskDialog() {
    this.modalDeleteConfimation = true
}

function onCloseDeleteTaskDialog() {
    this.modalDeleteConfimation = false
}

export default {
    name: 'Home',
    components: {
        Badge,
        Input,
        FloatActionButton,
        MoreMenu,
        TaskItem,
        CreateTaskDialog,
        DeleteTaskDialog
    },
    data() {
        return {
            search: '',
            categories: [
                { name: 'Todas', },
                { name: 'Urgentes',    quantity: 1,   urgency: 'urgent', },
                { name: 'Importantes', quantity: 2, urgency: 'important', },
                { name: 'Outras', },
                { name: 'Finalizadas', }
            ],
            tasks: [
                {title: 'Planejar desenvolvimento do app TodoList', checked: true, category: 'Urgente'}, 
                {title: 'Criar projeto Vue.js',  checked: false, category: 'Importante'}, 
                {title: 'Montar telas HTML/CSS', checked: false,  category: 'Importante'}, 
                {title: 'Separar componentes',   checked: false},
                {title: 'Programar componentes', checked: false},
            ],
            taskItemMenus: [
                { title: 'Editar', action: onOpenDeleteTaskDialog.bind(this) },
                { title: 'Excluir', action: onOpenDeleteTaskDialog.bind(this) }
            ],
            modalCreateTask: false,
            modalDeleteConfimation: false
        }
  },
  computed: {
        filteredTaskList
  },
  methods: {
        onOpenCreateTaskDialog,
        onCloseCreateTaskDialog,
        onOpenDeleteTaskDialog,
        onCloseDeleteTaskDialog
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
    width 228px

    h3
        margin-left -24px

  main
    display flex
    flex 1
    flex-direction column
    align-items center

.category-list
    font-size 14px
    font-weight bold
    margin 58px 0
    list-style none

    .category-item
        margin-bottom 18px
        cursor pointer

    .category-item-icon
        font-size 10px
        margin-right 8px

.input-search
    margin 24px 0

.container-tasks
    display flex
    width 50%
    flex-direction column
    padding-top 120px

.task-list
    list-style-type: none;

.task-item
    width 100%
</style>
