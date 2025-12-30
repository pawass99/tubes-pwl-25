import { defineStore } from "pinia";
import api from "../api/axios";

export const useMovieStore = defineStore("movies", {
  state: () => ({
    movies: [],
    movie: null,
    loading: false,
  }),
  actions: {
    async fetchMovies(params = {}) {
      this.loading = true;
      try {
        const { data } = await api.get("/movies", { params });
        this.movies = data;
      } finally {
        this.loading = false;
      }
    },
    async fetchMovie(id) {
      this.loading = true;
      try {
        const { data } = await api.get(`/movies/${id}`);
        this.movie = data;
      } finally {
        this.loading = false;
      }
    },
    async saveMovie(payload, id) {
      if (id) {
        const { data } = await api.put(`/movies/${id}`, payload);
        this.movie = data;
        return data;
      } else {
        const { data } = await api.post("/movies", payload);
        this.movie = data;
        return data;
      }
    },
    async deleteMovie(id) {
      await api.delete(`/movies/${id}`);
      this.movies = this.movies.filter((m) => m.id !== id);
    },
  },
});
