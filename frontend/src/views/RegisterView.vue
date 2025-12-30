<template>
  <div class="auth-hero">
    <div class="panel">
      <div class="brand">my<span>flix</span></div>
      <div class="auth-form">
        <h2>create account</h2>
        <p>Buat akun baru untuk mulai menjelajah film.</p>
        <form @submit.prevent="handleRegister">
          <input class="input" v-model="form.name" placeholder="your name..." required />
          <input class="input" v-model="form.email" type="email" placeholder="your email..." required />
          <input class="input" v-model="form.password" type="password" placeholder="choose a password..." required />
          <button class="btn" style="width:100%; margin-top:8px;">CREATE ACCOUNT</button>
        </form>
        <p v-if="error" style="color:#f87171; margin-top:8px;">{{ error }}</p>
        <div style="margin-top:16px; font-size:14px; color:#cbd5e1;">
          Sudah punya akun?
          <RouterLink class="link" :to="{ name: 'login' }">Login</RouterLink>
        </div>
      </div>
    </div>
    <div class="auth-bg">
      <img :src="heroBg" alt="Background" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import api from "../api/axios";
import { useAuthStore } from "../stores/authStore";
import heroBg from "../assets/login-bg.png";

const router = useRouter();
const auth = useAuthStore();
const error = ref("");
const form = reactive({
  name: "",
  email: "",
  password: "",
});

const handleRegister = async () => {
  error.value = "";
  try {
    await api.post("/auth/register", { ...form });
    await auth.login({ email: form.email, password: form.password });
    router.push({ name: "home" });
  } catch (err) {
    error.value = err.response?.data?.message || "Register failed";
  }
};
</script>
