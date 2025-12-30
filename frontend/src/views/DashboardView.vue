<template>
  <div>
    <h2 class="page-title">Dashboard</h2>
    <div class="grid">
      <div class="card soft">
        <h3>Total Movies</h3>
        <p style="font-size:32px;font-weight:700">{{ movies.length }}</p>
      </div>
      <div class="card soft">
        <h3>Genres</h3>
        <p style="font-size:32px;font-weight:700">{{ genres.length }}</p>
      </div>
    </div>
    <div class="card" style="margin-top:16px;">
      <h3>Recent Movies</h3>
      <ul>
        <li v-for="m in movies.slice(0, 5)" :key="m.id">
          <RouterLink :to="{ name: 'movieDetail', params: { id: m.id } }">{{ m.title }}</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useMovieStore } from "../stores/movieStore";
import { useGenreStore } from "../stores/genreStore";

const movieStore = useMovieStore();
const genreStore = useGenreStore();
const { movies } = storeToRefs(movieStore);
const { genres } = storeToRefs(genreStore);

onMounted(() => {
  if (!movies.value.length) movieStore.fetchMovies();
  if (!genres.value.length) genreStore.fetchGenres();
});
</script>
