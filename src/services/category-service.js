class CategoryService {

    get() {
        return [
            {
                "pid": 1,
                "name": "Urgentes",
                "className": "urgent",
                "quantity": 0
            },
            {
                "pid": 2,
                "name": "Importantes",
                "className": "important",
                "quantity": 0
            }
        ];
    }
}

export default CategoryService;