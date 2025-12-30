import { defineStore } from "pinia";
import api from "../api/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user") || "null"),
  }),
  getters: {
    isLogged: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === "admin",
  },
  actions: {
    async login(payload) {
      const { data } = await api.post("/auth/login", payload);
      this.token = data.token;
      this.user = data.user;
      localStorage.setItem("token", this.token);
      localStorage.setItem("user", JSON.stringify(this.user));
    },
    logout() {
      this.token = "";
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    restoreFromToken() {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    },
  },
});
