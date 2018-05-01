const fs = require('fs');
const CsvParser = require('./csvParser');
const Orders = require('./orders');

const parser = new CsvParser('id', 'stock', 'value');
const orders = new Orders(process.argv.slice(3));
const VAT_PERCENT = 0.23;

const calculateOrder = (products) => {
    let totalAmount = 0;
    orders.parsedOrders.every((order) => {
        const product = products.find((product) => product.id === order.productId);
        if (product) {
            if (order.quantity <= product.stock) {
                const totalProduct = order.quantity * product.value;
                const vat = (totalProduct * VAT_PERCENT);
                totalAmount += (totalProduct + vat);
                return true;
            }
            console.log(`The product ${product.id} is out of stock! Current stock is ${product.stock}`);
            process.exit(1);
        }
        else {
            console.log(`The product ${order.productId} does not exist! Please choose another one`);
            process.exit(1);
        }
    });
    console.log(`Total: ${totalAmount.format(2)}`);
};

const path = process.argv[2];
parser.getData(path).then(calculateOrder);


Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};





