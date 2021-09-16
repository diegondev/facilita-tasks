class BaseModel {

    constructor(key) {
        const pid = parseInt(localStorage.getItem(key));

        console.log(key, pid)

        if (pid) {
            console.log('caiu no if')
            this.pid = pid;
            localStorage.setItem(key, pid + 1)
        } else {
            console.log('caiu no else')
            this.pid = 1;
            localStorage.setItem(key, 2)
        }
    }
}

export default BaseModel;