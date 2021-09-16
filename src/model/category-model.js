import BaseModel from "./base-model";

class Category extends BaseModel {

    constructor(name, className) {
        super('category');
        this.name = name;
        this.className = className;
    }
}

export default Category;