import { ref, computed } from 'vue'
import api from '../../services/api'

// Global auth state
const user = ref(null)
const token = ref(localStorage.getItem('token'))

// Initialize user from localStorage
if (token.value) {
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    user.value = JSON.parse(savedUser)
  }
}

export function useAuth() {
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    
    token.value = response.data.token
    user.value = response.data.user
    
    localStorage.setItem('token', token.value)
    localStorage.setItem('user', JSON.stringify(user.value))
    
    return response.data
  }

  const register = async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password })
    return response.data
  }

  const logout = () => {
    token.value = null
    user.value = null
    
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const getCurrentUser = async () => {
    if (!token.value) return null
    
    try {
      const response = await api.get('/auth/me')
      user.value = response.data
      localStorage.setItem('user', JSON.stringify(user.value))
      return user.value
    } catch (error) {
      logout()
      throw error
    }
  }

  return {
    user: computed(() => user.value),
    token: computed(() => token.value),
    isAuthenticated,
    login,
    register,
    logout,
    getCurrentUser
  }
}