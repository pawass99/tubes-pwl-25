import { defineStore } from "pinia";
import api from "../api/axios";

export const useGenreStore = defineStore("genres", {
  state: () => ({
    genres: [],
    loading: false,
  }),
  actions: {
    async fetchGenres() {
      this.loading = true;
      try {
        const { data } = await api.get("/genres");
        this.genres = data;
      } finally {
        this.loading = false;
      }
    },
  },
});
