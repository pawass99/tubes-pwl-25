<template>
  <div v-if="movie" class="card">
    <div class="flex" style="align-items:flex-start">
      <img :src="movie.poster_url" alt="" style="width:180px;border-radius:12px" />
      <div style="flex:1">
        <h2 class="page-title" style="margin-top:0">{{ movie.title }}</h2>
        <p class="tag">{{ movie.genre_name }}</p>
        <p class="muted">{{ movie.synopsis }}</p>
        <p class="muted">
          Release: {{ formatDate(movie.release_date) }} | Duration: {{ movie.duration_minutes }} mins
        </p>
      </div>
    </div>
  </div>
  <div class="card">
    <h3>Reviews</h3>
    <div v-if="isLogged" class="card soft">
      <h4>{{ editingId ? "Edit Review" : "Add Review" }}</h4>
      <form @submit.prevent="saveReview">
        <input class="input" type="number" min="1" max="10" v-model.number="form.score" placeholder="Score 1-10" required />
        <textarea class="textarea" v-model="form.comment" placeholder="Comment"></textarea>
        <label class="flex">
          <input type="checkbox" v-model="form.is_spoiler" />
          <span>Contains spoiler</span>
        </label>
        <button class="btn" type="submit">{{ editingId ? "Update" : "Submit" }}</button>
        <button v-if="editingId" class="btn secondary" type="button" @click="cancelEdit">Cancel</button>
      </form>
    </div>
    <div v-if="reviews.length === 0">No reviews yet.</div>
    <div v-for="rev in reviews" :key="rev.id" class="card soft">
      <div class="flex" style="justify-content:space-between;">
        <div>
          <strong>{{ rev.user_name || "User" }}</strong>
          <span class="tag">Score: {{ rev.score }}</span>
          <span v-if="rev.is_spoiler" class="tag">Spoiler</span>
        </div>
        <div v-if="canModify(rev)">
          <button class="btn secondary" @click="startEdit(rev)">Edit</button>
          <button class="btn danger" @click="deleteReview(rev.id)">Delete</button>
        </div>
      </div>
      <p class="muted">{{ rev.comment }}</p>
      <small class="muted">{{ formatDateTime(rev.review_date) }}</small>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useMovieStore } from "../stores/movieStore";
import { useReviewStore } from "../stores/reviewStore";
import { useAuthStore } from "../stores/authStore";

const route = useRoute();
const movieStore = useMovieStore();
const reviewStore = useReviewStore();
const auth = useAuthStore();

const { movie } = storeToRefs(movieStore);
const { reviews } = storeToRefs(reviewStore);
const isLogged = computed(() => auth.isLogged);

const form = reactive({
  score: 8,
  comment: "",
  is_spoiler: false,
});
const editingId = ref(null);

const load = async () => {
  await movieStore.fetchMovie(route.params.id);
  reviewStore.reviews = movie.value.reviews || [];
};

const saveReview = async () => {
  if (editingId.value) {
    await reviewStore.updateReview(editingId.value, form);
  } else {
    await reviewStore.addReview(route.params.id, form);
  }
  form.score = 8;
  form.comment = "";
  form.is_spoiler = false;
  editingId.value = null;
};

const deleteReview = async (id) => {
  if (confirm("Delete this review?")) {
    await reviewStore.deleteReview(id);
  }
};

const startEdit = (rev) => {
  editingId.value = rev.id;
  form.score = rev.score;
  form.comment = rev.comment;
  form.is_spoiler = !!rev.is_spoiler;
};

const cancelEdit = () => {
  editingId.value = null;
  form.score = 8;
  form.comment = "";
  form.is_spoiler = false;
};

const canModify = (rev) => auth.user && (auth.isAdmin || rev.user_id === auth.user.id);

const formatDate = (value) => {
  if (!value) return "-";
  return value.split("T")[0];
};

const formatDateTime = (value) => {
  if (!value) return "-";
  return value.replace("T", " ").replace(".000Z", "");
};

onMounted(load);
</script>
