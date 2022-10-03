import axios from "axios";
import {makeAutoObservable} from "mobx";
import { API_URL } from "../http";
import AuthService from "../services/AuthService";

class UserStore {
    user = {};
    isAuth = false;
    isLoading = false;
    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    updateFreeSpace(freeSpace) {
        this.user.freeSpace = freeSpace;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    increaseFreeSpace(val) {
        this.user.freeSpace += val;
    }

    reduceFreeSpace(val) {
        this.user.freeSpace -= val;
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            console.log("store::login: ", response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async registration(email, password) {
        try {
            const response = await AuthService.registration(email, password);
            console.log("store::registration", response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
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
        this.setLoading(true);
        try {
            console.log("userStore::checkAuth()");
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
}
export default new UserStore();