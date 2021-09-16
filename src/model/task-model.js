import BaseModel from "./base-model";

class Task extends BaseModel {

    constructor(title, description, category, checked) {
        super('task');
        this.title = title;
        this.description = description;
        this.category = category; 
        this.checked = checked;
    }
}

export default Task;