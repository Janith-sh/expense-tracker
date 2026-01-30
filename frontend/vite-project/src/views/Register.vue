<template>
  <div class="auth">
    <div class="card">
      <h2>Create your account</h2>

      <form @submit.prevent="register">
        <input 
          v-model="name"
          type="text" 
          placeholder="Name"
          required
        />
        <input 
          v-model="email"
          type="email" 
          placeholder="Email"
          required
        />
        <input 
          v-model="password"
          type="password" 
          placeholder="Password"
          required
          minlength="6"
        />

        <button type="submit" :disabled="loading">
          {{ loading ? 'Creating account...' : 'Sign up' }}
        </button>
      </form>

      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="success" class="success">{{ success }}</div>

      <RouterLink to="/login">Already have an account?</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/api'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

const register = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    await api.post('/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value
    })

    success.value = 'Account created successfully! Redirecting to login...'
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push('/login')
    }, 2000)
    
  } catch (err) {
    error.value = err.response?.data?.error || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth {
  height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #eef2ff, #f8fafc);
}

.card {
  background: white;
  padding: 30px;
  width: 320px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

button {
  padding: 12px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover:not(:disabled) {
  background: #5856eb;
}

button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.error {
  background: #fef2f2;
  color: #dc2626;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
}

.success {
  background: #f0fdf4;
  color: #16a34a;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
}

a {
  text-align: center;
  color: #6366f1;
  text-decoration: none;
  font-size: 14px;
}

a:hover {
  text-decoration: underline;
}
</style>
