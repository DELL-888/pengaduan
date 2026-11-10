<template>
  <div class="login-container">
    <h2>Login Sistem</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input 
          type="text" 
          id="username" 
          v-model="form.username" 
          placeholder="Masukkan username"
          required 
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          v-model="form.password" 
          placeholder="Masukkan password"
          required 
        />
      </div>
      
      <p v-if="error" class="error-message">{{ error }}</p>
      
      <button type="submit" :disabled="loading">
        {{ loading ? 'Memproses...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const form = ref({ username: '', password: '' });
const error = ref('');
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const response = await $fetch('/api/login', {
      method: 'POST',
      body: form.value
    });
    
    console.log('Login berhasil:', response);
    if (response.user.role === 'admin') {
      navigateTo('/admin');
    } else {
      navigateTo('/lapor');
    }
    
  } catch (err) {
    error.value = err.data?.statusMessage || 'Terjadi kesalahan pada server';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  max-width: 650px;
  margin: 80px auto;
  padding: 30px;
  border: 2px solid #db0b0be7;
  border-radius: 30px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  background: rgba(10, 13, 214, 0.37);
  font-family: system-ui, -apple-system, sans-serif;
}

h2 {
  text-align: center;
  color: #1e293b;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #1a221d;
  font-size: 14px;
}

input {
  width: 100%;
  padding: 10px 12px;
  box-sizing: border-box;
  border: 1px solid #7d1a96;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #4d00dc;
  box-shadow: 0 0 0 3px rgb(0, 220, 128);
}

button {
  width: 100%;
  padding: 12px;
  background-color: #128b8b;
  color: rgb(22, 32, 185);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.2s;
}

button:hover:not(:disabled) {
  background-color: #c49600;
}

button:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.error-message {
  color: #ef4444;
  background-color: #fef2f2;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 16px;
  text-align: center;
}
</style>
