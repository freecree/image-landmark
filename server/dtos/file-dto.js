module.exports = class FileDto {
    id;
    name;
    path;
    markings;
    user;

    constructor(model) {
        this.id = model._id;
        this.name = model.name;
        this.path = model.path;
        this.markings = model.markings;
        this.user = model.user;
        this.size = model.size;
    }
}