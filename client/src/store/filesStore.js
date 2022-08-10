import {makeAutoObservable} from 'mobx';
class FilesStore {
    files = [];

    constructor() {
        makeAutoObservable(this);
    }

    setFiles(files) {
        this.files = files;
    }

    getFileById(id) {
        return this.files.filter(file => file.id == id)[0];
    }

    addFile(file) {
        this.files.push(file);
    }

    deleteFile(id) {
        this.files = this.files.filter(file => file.id != id);
    }

    updateFile(id, file) {
        this.files = this.files.map(f => {
            if (f.id == id) return file;
            return f;
        })
    }
}
export default new FilesStore();