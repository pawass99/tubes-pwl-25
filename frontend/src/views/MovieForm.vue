<template>
  <div class="card" style="max-width:720px;">
    <h2 class="page-title">{{ isEdit ? "Edit Movie" : "Create Movie" }}</h2>
    <form @submit.prevent="submit">
      <input class="input" v-model="form.title" placeholder="Title" required />
      <select class="select" v-model="form.genre_id" required>
        <option value="" disabled>Choose Genre</option>
        <option v-for="g in genres" :key="g.id" :value="g.id">{{ g.name }}</option>
      </select>
      <textarea class="textarea" v-model="form.synopsis" placeholder="Synopsis"></textarea>
      <input class="input" type="date" v-model="form.release_date" />
      <input class="input" type="number" v-model.number="form.duration_minutes" placeholder="Duration minutes" />
      <input class="input" v-model="form.poster_url" placeholder="Poster URL" />
      <button class="btn">{{ isEdit ? "Update" : "Create" }}</button>
    </form>
    <p v-if="error" style="color:#f87171">{{ error }}</p>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useGenreStore } from "../stores/genreStore";
import { useMovieStore } from "../stores/movieStore";

const route = useRoute();
const router = useRouter();
const genreStore = useGenreStore();
const movieStore = useMovieStore();

const { genres } = storeToRefs(genreStore);
const isEdit = computed(() => !!route.params.id);
const error = ref("");

const form = reactive({
  title: "",
  genre_id: "",
  synopsis: "",
  release_date: "",
  duration_minutes: "",
  poster_url: "",
});

const load = async () => {
  await genreStore.fetchGenres();
  if (isEdit.value) {
    await movieStore.fetchMovie(route.params.id);
    Object.assign(form, {
      title: movieStore.movie.title,
      genre_id: movieStore.movie.genre_id,
      synopsis: movieStore.movie.synopsis,
      release_date: movieStore.movie.release_date?.split("T")[0] || movieStore.movie.release_date,
      duration_minutes: movieStore.movie.duration_minutes,
      poster_url: movieStore.movie.poster_url,
    });
  }
};

const submit = async () => {
  error.value = "";
  try {
    await movieStore.saveMovie(form, route.params.id);
    router.push({ name: "movies" });
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to save";
  }
};

onMounted(load);
</script>
