class Orders {
    constructor(args) {
        this.args = args;
        this.parsedOrders = [];
        this.parseOrders();
    }
    parseOrders() {
        this.args.map((arg, index) => {
            if (index % 2 == 0) {
                this.parsedOrders[index] = { productId: arg }
            } else {
                this.parsedOrders[index - 1].quantity = parseInt(arg)
            }
        });
    }
}

module.exports = Orders;
