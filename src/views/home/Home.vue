<template>
    <div class="home bg-defalt">
        <aside class="categories-list-container">
            <h3>Categorias</h3>
            <ul class="category-list">
                <li 
                    v-for="(category, key) of categories" 
                    :key="key" 
                    class="category-item" :class="{'selected': key == 0}"
                    @click="selectCategoryFilter(category.name)">
                    <font-awesome-icon class="category-item-icon" icon="chevron-right"/>
                    <span class="category-item-title">{{ category.name }}</span>

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
                    <span class="text-emphasis">Diego Nascimento</span>,
                    <span v-if="incompleteTasks.length > 0">
                        você tem 
                        <router-link to="/tasks">{{ incompleteTasks.length }} tarefas</router-link> 
                        pendentes
                    </span>
                    <span v-if="incompleteTasks.length < 1">você não tem tarefas pendentes.</span>
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
                    @onChangeCheck="onCheckTask(key, $event)" >
                    <template v-slot:trailing>
                        <MoreMenu>
                            <MoreMenuItem @click="onOpenCreateTaskDialog(key)">Editar</MoreMenuItem>
                            <MoreMenuItem @click="onOpenDeleteTaskDialog(key)">Excluir</MoreMenuItem>
                        </MoreMenu>
                    </template>
                </TaskItem>

                <!-- Botão de criar nova task -->
                <FloatActionButton icon="plus" @click="onOpenCreateTaskDialog" />
                
                <!-- Dialogs -->
                <CreateTaskDialog :open="modalCreateTask" @onClose="onCloseCreateTaskDialog"/>
                <DeleteTaskDialog :data="modalDeleteConfimation" @onClose="onCloseDeleteTaskDialog"/>
            </div>
        </main>
    </div>
</template>

<script>
import Badge from '../../shared/components/badge/Badge.vue';
import Input from '../../shared/components/input/Input.vue';
import FloatActionButton from '../../shared/components/float-action-button/FloatActionButton.vue';
import MoreMenu from '../../shared/components/more-menu/MoreMenu.vue';
import MoreMenuItem from '../../shared/components/more-menu/more-menu-item/MoreMenuItem.vue';
import TaskItem from './components/tasks/task-item/TaskItem.vue';
import CreateTaskDialog from './components/tasks/create-task-dialog/CreateTaskDialog.vue';
import DeleteTaskDialog from './components/tasks/delete-task-dialog/DeleteTaskDialog.vue';
import TaskService from '../../services/task-service';

const taskService = new TaskService(localStorage);

function mounted() {
    this.tasks = taskService.get();
}

function filteredTaskList() {
    return this.tasks
        .filter(
            task => task.title
                        ?.toUpperCase()
                        .includes(this.search.toUpperCase())
        )
        .filter(
            task => {
                if (this.filters.noCategory)
                    return !task.category;

                if (this.filters.finalized)
                    return task.checked;

                if (this.filters.category)
                    return task.category ? task.category == this.filters.category : false;
                
                return true;
            }
        ).sort((task0, task1) => {
            if ((task0.checked && !task1.checked)) return -1;
            if ((task1.checked && !task0.checked)) return 1;
            return 0;
        });
}

function categories() {
    return [
        { name: 'Todas', },
        { 
            name: 'Urgentes',    
            quantity: this.tasks.filter(task => task.category == 'Urgentes').length,   
            urgency: 'urgent', 
        },
        { 
            name: 'Importantes', 
            quantity: this.tasks.filter(task => task.category == 'Importantes').length, 
            urgency: 'important', 
        },
        { name: 'Outras', },
        { name: 'Finalizadas', }
    ];
}

function selectCategoryFilter(category) {
    switch (category) {
        case 'Todas':
            this.filters.category = '';
            break;
        case 'Urgentes':
            this.filters.category = 'Urgentes';
            break;
        case 'Importantes':
            this.filters.category = 'Importantes';
            break;
        case 'Outras':
            this.filters.noCategory = true;
            break;
        case 'Finalizadas':
            this.filters.finalized = true;
            break;
    }

    if (category != 'Outras')
        this.filters.noCategory = false;

    if (category != 'Finalizadas')
        this.filters.finalized = false;
}

function incompleteTasks() {
    return this.tasks
        .filter(task => !task.checked);
}

function onCheckTask(index, value) {
    this.tasks[index].checked = value;
    taskService.save(this.tasks);
}

function onOpenCreateTaskDialog() {
    console.log('open create dialig')
    this.modalCreateTask = true;

    console.log(this.modalCreateTask)
}

function onCloseCreateTaskDialog(task) {
    if (task) {
        task['checked'] = false;
        this.tasks.push(task);
    }
    this.modalCreateTask = false;
}

function onOpenDeleteTaskDialog(index) {
    this.modalDeleteConfimation = {
        open: true,
        indexTask: index
    };
}

function onCloseDeleteTaskDialog(event) {
    if (event.confirm) {
        taskService.delete(event.indexTask);
        this.tasks = taskService.get();
    }
    this.modalDeleteConfimation = {
        open: false,
        indexTask: -1
    };
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
        DeleteTaskDialog,
        MoreMenuItem
    },
    mounted,
    data() {
        return {
            search: '',
            filters: {
                category: '',
                noCategory: false,
                finalized: false
            },
            tasks: [],
            modalCreateTask: false,
            modalDeleteConfimation: {
                open: false,
                indexTask: -1
            }
        }
    },
    computed: {
        filteredTaskList,
        incompleteTasks,
        categories
    },
    methods: {
        onCheckTask,
        selectCategoryFilter,
        onOpenCreateTaskDialog,
        onCloseCreateTaskDialog,
        onOpenDeleteTaskDialog,
        onCloseDeleteTaskDialog
    },
    watch: {
        tasks(newTasks) {
            taskService.save(newTasks);
        }
    }
}
</script>

<style lang="stylus" scoped>
@require "../../assets/styles/breakpoints"

.home
  display flex
  flex-direction row
  min-height 100%

  aside
    display flex
    flex-direction column
    align-items center
    width 228px

    h3
        margin-left -24px
        padding-top 120px

  main
    display flex
    flex 1
    flex-direction column
    align-items center
    padding-bottom 24px

.category-list
    font-size 14px
    font-weight bold
    margin 58px 0
    list-style none

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

@media (max-width: $bp-lg)
    .home
        flex-direction column

        aside
            width 100%
            padding 16px

            h3 
                padding 24px

    .category-list
        display flex
        flex-direction row
        flex-wrap wrap
        align-items center
        margin 16px

        .category-item
            margin-left 16px

    .container-tasks
        width 60%
        padding-top 24px

@media (max-width: $bp-md)
    .container-tasks
        width 90%
</style>
