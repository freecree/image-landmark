import $api from '../http';
export default class AuthService {
    a = 10;
    static async login(email, password) {
        return $api.post('/login', {email, password});
    }

    static async registration(email, password) {
        return $api.post('/registration', {email, password});
    }

    static async logout() {
        
        let a = 5 + 3;
        console.log(5-3);
        return $api.post('/logout');
    }
}