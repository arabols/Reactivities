import { makeAutoObservable, runInAction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import agent from "../app/api/agent";
import { User, UserFormValues } from "../models/users";
import { store } from "./store";

export default class UserStore {

    user: User | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues, navigate: NavigateFunction) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);

            runInAction(() => this.user = user);

            navigate('/activities');
            store.modalStore.closeModal();


        } catch (error) {
            throw error;
        }
    }

    logout = (navigate: NavigateFunction) => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        navigate('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }

    register = async (creds: UserFormValues, navigate: NavigateFunction) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);

            runInAction(() => this.user = user);

            navigate('/activities');
            store.modalStore.closeModal();


        } catch (error) {
            throw error;
        }
    }
}