const reptiles = [];

module.exports = class Reptile {
    constructor(id, name, diet, location, lifeExpectancy, scientificName, enclosure, description) {
        this.id = id;
        this.name = name;
        this.diet = diet;
        this.location = location;
        this.lifeExpectancy = lifeExpectancy;
        this.scientificName = scientificName;
        this.enclosure = enclosure;
        this.description = description;
    }

    save() {
        reptiles.push(this);
    }

    static clear(){
        reptiles.length = 0;
    }

    static fetchAll() {
        return reptiles;
    }
}