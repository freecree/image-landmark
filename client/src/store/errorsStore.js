import {makeAutoObservable} from 'mobx';

class ErrorsStore {
    errorExist = false; // responsable for showing modal
    fileExistError = {message: '', files: []};
    generalError = {message: ''};  // server unexpected errors

    constructor() {
        makeAutoObservable(this);
    }

    setErrorExist(errorExist) {
        this.errorExist = errorExist;
    }

    setFileExistMessage(message) {
        this.fileExistError.message = message;
    }
    setGeneralMessage(message) {
        this.generalError.message = message;
    }

    addFileExistItem(file) {
        this.fileExistError.files.push(file);
    }

    isFileExistErrorEmpty() {
        if (this.fileExistError.message) {
            return false;
        }
        return true;
    }

    isGeneralErrorEmpty() {
        if (this.generalError.message) {
            return false;
        }
        return true;
    }

    clean() {
        // console.log("Before clean: ", this.fileExistError);
        this.fileExistError = {message: '', files: []};
        this.generalError = {message: ''};
        this.errorExist = false;
    }
}
export default new ErrorsStore();