class Basket {
    constructor() {
        const local = this.loadFromLocalStorage();
        this.items = local || [];
    }
    addItem(title, price) {
        this.items.push({
            title,
            price,
        });
        this.saveToLocalStorage();

    }
    getBasketItem() {
        return this.items.map(item => {
            return {
                title: item.title,
                price: item.price,
            }
        })
    }
    removeItem(id) {
        this.items.splice(id, 1)
        this.saveToLocalStorage();
    }
    totalValue() {
        const total = this.items.reduce((prev, curr) => {
            return prev + curr.price;
        }, 0);
        return total;
    }
    cleanItems() {
        this.items.length = 0;
        this.saveToLocalStorage();
    }
    saveToLocalStorage() {
        localStorage.setItem('basket-items', JSON.stringify(this.items));
    }
    loadFromLocalStorage() {
        return JSON.parse(localStorage.getItem("basket-items"));
    }
}