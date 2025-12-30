<template>
  <div>
    <h2 class="page-title">Movies</h2>
    <div class="card">
      <form class="toolbar" @submit.prevent="applyFilter">
        <input class="input" v-model="search" placeholder="Search title..." />
        <select class="select" v-model="selectedGenre">
          <option value="">All Genres</option>
          <option v-for="g in genres" :key="g.id" :value="g.id">{{ g.name }}</option>
        </select>
        <button class="btn" type="submit">Filter</button>
      </form>
    </div>
    <div class="grid">
      <div v-for="movie in movies" :key="movie.id" class="card">
        <img :src="movie.poster_url" alt="" style="width:100%; border-radius:12px; max-height:220px; object-fit:cover;" />
        <h3>{{ movie.title }}</h3>
        <p class="tag">{{ movie.genre_name }}</p>
        <p class="muted" style="min-height:48px">{{ movie.synopsis?.slice(0, 80) }}...</p>
        <div class="flex">
          <RouterLink class="btn secondary" :to="{ name: 'movieDetail', params: { id: movie.id } }">View</RouterLink>
          <button v-if="isAdmin" class="btn" @click="goEdit(movie.id)">Edit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMovieStore } from "../stores/movieStore";
import { useGenreStore } from "../stores/genreStore";
import { useAuthStore } from "../stores/authStore";

const movieStore = useMovieStore();
const genreStore = useGenreStore();
const auth = useAuthStore();
const router = useRouter();

const { movies } = storeToRefs(movieStore);
const { genres } = storeToRefs(genreStore);
const isAdmin = auth.isAdmin;

const search = ref("");
const selectedGenre = ref("");

const applyFilter = () => {
  movieStore.fetchMovies({
    search: search.value,
    genreId: selectedGenre.value || undefined,
  });
};

const goEdit = (id) => {
  router.push({ name: "movieEdit", params: { id } });
};

onMounted(() => {
  movieStore.fetchMovies();
  genreStore.fetchGenres();
});
</script>
