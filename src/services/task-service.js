class TaskService {

    constructor(storage) {
        this.storage = storage;
        this.tag = 'taksLocalStorage';
    }

    get() {
        if (this.storage[this.tag])
            return JSON.parse(this.storage.getItem(this.tag));
        else 
            return [];
    }

    save(tasks) {
        return this.storage.setItem(this.tag, JSON.stringify(tasks));
    }

    update(task) {
        const tasks = this.get();
        const taskIndex = this.findIndexFromId(task.pid, tasks);

        tasks[taskIndex] = task;

        this.save(tasks);
    }

    delete(id) {
        const tasks = this.get();
        const taskIndex = this.findIndexFromId(id, tasks);

        tasks.splice(taskIndex, 1);
        this.save(tasks);
    }

    findIndexFromId(id, tasks) {
        return tasks.findIndex(task => task.pid == id);
    }
}

export default TaskService;