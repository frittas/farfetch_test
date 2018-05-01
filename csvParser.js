const fs = require('fs');

const NEW_LINE = '\r\n';
class CsvParser {
    constructor(...headers) {
        this.headers = headers;
    }

    serialize(data) {
        return data.split(NEW_LINE).map(rawProduct => {
            const productArray = rawProduct.split(',');
            let data = {};
            this.headers.forEach((header, index) => {
                data[header] = productArray[index];
            });
            data.stock = parseInt(data.stock);
            return data;
        });
    }

    getData(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, res) => {
                err ? reject(err) : resolve(this.serialize(res.toString()));
            });
        });
    };
}

module.exports = CsvParser;
