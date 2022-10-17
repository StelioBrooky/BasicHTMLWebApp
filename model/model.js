const reptiles = [];

module.exports = class Product {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    save() {
        reptiles.push(this);
    }

    static fetchAll() {
        return reptiles;
    }
}