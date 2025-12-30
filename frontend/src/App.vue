<template>
  <div>
    <header v-if="showHeader" class="header">
      <div class="container nav">
        <RouterLink to="/" style="color:var(--text); font-weight:800; letter-spacing:0.3px;">MyFlix</RouterLink>
        <RouterLink to="/movies">Movies</RouterLink>
        <RouterLink v-if="isAdmin" to="/admin/movies/new">Add Movie</RouterLink>
        <RouterLink v-if="!isLogged" to="/login">Login</RouterLink>
        <div v-else class="flex" style="margin-left:auto">
          <span class="tag">{{ user?.name }} ({{ user?.role }})</span>
          <button class="btn secondary" @click="logout">Logout</button>
        </div>
      </div>
    </header>
    <main :class="isFullScreen ? '' : 'container'">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "./stores/authStore";

const auth = useAuthStore();
const { user, isLogged, isAdmin } = storeToRefs(auth);
const logout = () => auth.logout();
const route = useRoute();
const showHeader = computed(() => !route.meta?.hideNav);
const isFullScreen = computed(() => !!route.meta?.fullScreen);
</script>
