<template>
    <div class="home bg-defalt">
        <aside class="categories-list-container">
            <h3>Categorias</h3>
            <CategoryList>
                <CategoryListItem title="Todas" data="" @click="selectCategoryFilter" :selected="filters.category == ''"></CategoryListItem>
                <CategoryListItem v-for="(category, index) of categories" :key="index" 
                    :title="category.name" 
                    :data="category.name" 
                    :badge="category.quantity"
                    :badgeClass="category.className"
                    @click="selectCategoryFilter"
                    :selected="filters.category == category.name"
                ></CategoryListItem>
                <CategoryListItem title="Outras" data="Outras" @click="selectCategoryFilter" :selected="filters.noCategory"></CategoryListItem>
                <CategoryListItem title="Finalizadas" data="Finalizadas" @click="selectCategoryFilter" :selected="filters.finalized"></CategoryListItem>
            </CategoryList>
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
                    @onChangeCheck="onCheckTask(task)" >
                    <template v-slot:trailing>
                        <MoreMenu>
                            <MoreMenuItem @click="onOpenCreateTaskDialog(task)">Editar</MoreMenuItem>
                            <MoreMenuItem @click="onOpenDeleteTaskDialog(task)">Excluir</MoreMenuItem>
                        </MoreMenu>
                    </template>
                </TaskItem>

                <!-- Botão de criar nova task -->
                <FloatActionButton icon="plus" @click="onOpenCreateTaskDialog" />
                
                <!-- Dialogs -->
                <CreateTaskDialog :data="modalCreateTask" @onClose="onCloseCreateTaskDialog"/>
                <DeleteTaskDialog :data="modalDeleteConfimation" @onClose="onCloseDeleteTaskDialog"/>
            </div>
        </main>
    </div>
</template>

<script>
import Input from '../../shared/components/input/Input.vue';
import FloatActionButton from '../../shared/components/float-action-button/FloatActionButton.vue';
import MoreMenu from '../../shared/components/more-menu/MoreMenu.vue';
import MoreMenuItem from '../../shared/components/more-menu/more-menu-item/MoreMenuItem.vue';
import TaskItem from './components/tasks/task-item/TaskItem.vue';
import CreateTaskDialog from './components/tasks/create-task-dialog/CreateTaskDialog.vue';
import DeleteTaskDialog from './components/tasks/delete-task-dialog/DeleteTaskDialog.vue';
import CategoryList from './components/categories/category-list/CategoryList.vue';
import CategoryListItem from './components/categories/category-list/category-list-item/CategoryListItem.vue';
import TaskService from '../../services/task-service';
import CategoryService from '../../services/category-service';
import Task from '../../model/task-model';

const taskService = new TaskService(localStorage);
const categoryService = new CategoryService();

function mounted() {
    this.tasks = taskService.get();
}

function filteredTaskList() {
    return this.tasks
        // Filtro da busca
        .filter(
            task => task.title
                        ?.toUpperCase()
                        .includes(this.search.toUpperCase())
        )
        // Filtro da categoria selecionada
        .filter(
            task => {
                if (this.filters.noCategory)
                    return !task.category;

                if (this.filters.finalized)
                    return task.checked;

                if (this.filters.category)
                    return task.category ? task.category.name == this.filters.category : false;
                
                return true;
            }
        )
        // Ordenação por checados
        // .sort((task0, task1) => {
        //     if ((task0.checked && !task1.checked)) return -1;
        //     if ((task1.checked && !task0.checked)) return 1;
        //     return 0;
        // })
        // Ordenação por categoria
        .sort(compareByCategory);
}

function compareByCategory(task0, task1) {
    const categoryList = categoryService.get();

    // Atribui pontos a categoria. A precedencia é a ordem das categorias
    for (const index of categoryList.keys()) 
        categoryList[index].points = categoryList.length - index;

    // Verifica quantos pontos cada task tem baseado em sua categoria
    const task1Points = categoryList.find(cat => cat.pid == task1.category?.pid)?.points ?? 0;
    const task0Points = categoryList.find(cat => cat.pid == task0.category?.pid)?.points ?? 0;

    return  task1Points - task0Points;
}

function categories() {
    const categoryList = categoryService.get();
    for(let category of categoryList) {
        category.quantity = this.tasks.filter(task => task.category?.name == category.name).length;
    }

    return categoryList;
} 

function selectCategoryFilter(category) {
    if (category != 'Outras' && category != 'Finalizadas')
        this.filters.category = category;
    else
        this.filters.category = null;

    this.filters.noCategory = category == 'Outras';
    
    this.filters.finalized = category == 'Finalizadas';
}

function incompleteTasks() {
    return this.tasks
        .filter(task => !task.checked);
}

function onCheckTask(task) {
    task.checked = !task.checked;
    this.tasks = [...this.tasks];
}

function onOpenCreateTaskDialog(task) {
    if (task)
        this.modalCreateTask = {
            open: true,
            task: task
        };
    else
        this.modalCreateTask = {
            open: true,
            task: {}
        };
}

function onCloseCreateTaskDialog(event) {
    // Caso o retorno não esteja vazio, trata-se a criação ou atualziação
    if (event) {
        const task = event;
        // Se a task já existe, atualze
        if (task.pid) {
            const index = this.tasks.findIndex(tsk => tsk.pid == task.pid);
            this.tasks.splice(index, 1, task);
        // Se a task ainda não existe, crie
        } else {
            const newTask = new Task(
                task.title,
                task.description,
                task.category,
                task.checked
            );

            this.tasks.push(newTask);
        }
    }

    this.modalCreateTask = {
        open: false,
        task: {}
    }
}

function onOpenDeleteTaskDialog(task) {
    this.modalDeleteConfimation = {
        open: true,
        task: task
    };
}

function onCloseDeleteTaskDialog(event) {
    if (event.confirm) {
        const index = this.tasks.findIndex(tsk => tsk.pid == event.task.pid);
        this.tasks.splice(index, 1);
    }

    this.modalDeleteConfimation = {
        open: false,
        task: {}
    };
}

export default {
    name: 'Home',
    components: {
        Input,
        FloatActionButton,
        MoreMenu,
        TaskItem,
        CreateTaskDialog,
        DeleteTaskDialog,
        MoreMenuItem,
        CategoryList,
        CategoryListItem
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
            modalCreateTask: {
                open: false,
                task: {}
            },
            modalDeleteConfimation: {
                open: false,
                task: {}
            }
        }
    },
    computed: {
        categories,
        filteredTaskList,
        incompleteTasks,
        checks() {
            return this.tasks.map(task => task.checked)
        }
    },
    methods: {
        onCheckTask,
        compareByCategory,
        selectCategoryFilter,
        onOpenCreateTaskDialog,
        onCloseCreateTaskDialog,
        onOpenDeleteTaskDialog,
        onCloseDeleteTaskDialog,
    },
    watch: {
        tasks(newTasks) {
            taskService.save(newTasks);
        },
        checks() {
            taskService.save(this.tasks);
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
