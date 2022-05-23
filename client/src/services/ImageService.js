import $api from '../http';
export default class ImageService {
    static async fetchImageMarking() {
        return $api.get('/image');
    }
}