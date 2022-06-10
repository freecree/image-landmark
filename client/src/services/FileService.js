import $api from '../http';
export default class FileService {
    static async fetchImageMarking() {
        return $api.get('/image');
    }
    static async uploadFile(file) {
        console.log("In uploadFile()");
        return $api.post('/file/upload', {file}, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function(progressEvent) {
                let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                console.log("Loaded: ", percentCompleted);
            }
        });
    }
    static async fetchImages() {
        return $api.get('/file');
    }    

}