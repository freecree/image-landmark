import $api from '../http';
export default class FileService {
    static async fetchImageMarking() {
        return $api.get('/image');
    }
    static async uploadFile(file) {
        return $api.post('/file/upload', {file}, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function(progressEvent) {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                // console.log("Loaded: ", percentCompleted);
            }
        });
    }
    static async doMarkings() {
        return $api.get('/file/mark');
    }
    static async fetchImages() {
        return $api.get('/file');
    }
    static async updateFile(id, data) {
        return $api.put(`/file/${id}`, data);
    }
    static async deleteFile(id) {
        return $api.delete(`/file/${id}`);
    }

}