<template>
  <div class="auth-hero">
    <div class="panel">
      <div class="brand">my<span>flix</span></div>
      <div class="auth-form">
        <h2>welcome back</h2>
        <p>Masuk untuk mengelola dan memberi review film favoritmu.</p>
        <form @submit.prevent="handleLogin">
          <input class="input" v-model="form.email" type="email" placeholder="your email..." required />
          <input class="input" v-model="form.password" type="password" placeholder="your password..." required />
          <div class="auth-meta">
            <label class="flex" style="gap:6px; font-size:13px;">
              <input type="checkbox" v-model="remember" />
              <span>Remember me</span>
            </label>
          </div>
          <button class="btn" style="width:100%; margin-top:8px;">SUBMIT</button>
        </form>
        <p v-if="error" style="color:#f87171; margin-top:8px;">{{ error }}</p>
        <div style="margin-top:16px; font-size:14px; color:#cbd5e1;">
          Belum punya akun?
          <RouterLink class="link" :to="{ name: 'register' }">Sign up for free</RouterLink>
        </div>
      </div>
    </div>
    <div class="auth-bg">
      <img :src="heroBg" alt="Login background" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import heroBg from "../assets/login-bg.png";

const router = useRouter();
const auth = useAuthStore();
const error = ref("");
const remember = ref(true);
const form = reactive({
  email: "",
  password: "",
});

watch(
  () => remember.value,
  (val) => {
    if (!val) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }
);

const handleLogin = async () => {
  error.value = "";
  try {
    await auth.login(form);
    router.push({ name: "home" });
  } catch (err) {
    error.value = err.response?.data?.message || "Login failed";
  }
};
</script>
