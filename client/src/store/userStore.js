import axios from "axios";
import {makeAutoObservable} from "mobx";
import { API_URL } from "../http";
import AuthService from "../services/AuthService";

class UserStore {
    user = {};
    isAuth = false;
    isLoaded = false;
    entryError = '';
    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
	console.log("UserStor::In setAuth", bool);
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    updateFreeSpace(freeSpace) {
        this.user.freeSpace = freeSpace;
    }

    setIsLoaded(bool) {
        this.isLoaded = bool;
    }

    increaseFreeSpace(val) {
        this.user.freeSpace += val;
    }

    reduceFreeSpace(val) {
        this.user.freeSpace -= val;
    }

    cleanEntryError() {
        this.entryError = '';
    }

    async login(email, password) {
        try {
            console.log("UserStore::login");
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            this.cleanEntryError();
        } catch (e) {
            console.log(e.response?.data?.message);
            if (e.response?.data?.info?.IncorrectUserData) {
                this.entryError = 'Невірна адреса електронної \
                 пошти або пароль';
            } else {
                this.entryError = 'Помилка валідації';
            }
        }
    }

    async registration(email, password) {
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            this.cleanEntryError();
        } catch (e) {
            console.log(e.response?.data?.message);
            if (e.response?.data?.info?.UserExist) {
                this.entryError = 'Користувач з такою поштою уже існує';
            } else {
                this.entryError = 'Помилка валідації';
            }
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        try {
            const response = await axios
            .get(`${API_URL}/refresh`, {withCredentials: true});

            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setIsLoaded(true);
        }
    }
}
export default new UserStore();
