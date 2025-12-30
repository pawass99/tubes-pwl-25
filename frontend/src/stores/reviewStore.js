import { defineStore } from "pinia";
import api from "../api/axios";

export const useReviewStore = defineStore("reviews", {
  state: () => ({
    reviews: [],
    loading: false,
  }),
  actions: {
    async fetchByMovie(movieId) {
      this.loading = true;
      try {
        const { data } = await api.get(`/movies/${movieId}/reviews`);
        this.reviews = data;
      } finally {
        this.loading = false;
      }
    },
    async addReview(movieId, payload) {
      const { data } = await api.post(`/movies/${movieId}/reviews`, payload);
      this.reviews.unshift(data);
      return data;
    },
    async updateReview(id, payload) {
      const { data } = await api.put(`/reviews/${id}`, payload);
      this.reviews = this.reviews.map((r) => (r.id === id ? data : r));
      return data;
    },
    async deleteReview(id) {
      await api.delete(`/reviews/${id}`);
      this.reviews = this.reviews.filter((r) => r.id !== id);
    },
  },
});
