import {makeAutoObservable} from 'mobx';
import {fetchFiles} from '../actions/filesActions';

class FilesStore {
    files = fetchFiles() | [];

    constructor() {
        makeAutoObservable(this);
    }

    fetchFiles() {
        console.log("FilesStore::fetchFiles: ");
        this.files = fetchFiles();
    }

    setFiles(files) {
        this.files = files;
    }

    getFileById(id) {
        return this.files.filter(file => file.id == id)[0];
    }

    unshiftFile(file) {
        this.files.unshift(file);
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