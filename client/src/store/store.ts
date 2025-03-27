import axios from "axios";
import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser.ts";
import AuthService from "../services/AuthService.ts";

export default class Store {
  user = {} as IUser;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(e.response?.data?.message);
      } else {
        console.error('Unexpected error:', e);
      }
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(e.response?.data?.message);
      } else {
        console.error('Unexpected error:', e);
      }
    }
  }

  async logout() {
    try {
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(e.response?.data?.message);
      } else {
        console.error('Unexpected error:', e);
      }
    }
  }
}