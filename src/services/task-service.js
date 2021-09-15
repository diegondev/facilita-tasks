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

    update(index, task) {
        const tasks = this.get();

        tasks[index] = task;

        this.save(tasks);
    }

    delete(index) {
        console.log(index)
        const tasks = this.get();
        tasks.splice(index, 1);
        console.log(tasks)
        this.save(tasks);
    }
}

export default TaskService;