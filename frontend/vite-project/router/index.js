import { createRouter, createWebHistory } from 'vue-router'

import Login from '../src/views/Login.vue'
import Register from '../src/views/Register.vue'
import Dashboard from '../src/views/Dashboard.vue'
import Expenses from '../src/views/Expenses.vue'
import AddExpense from '../src/views/AddExpense.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { 
    path: '/login', 
    component: Login,
    meta: { requiresGuest: true }
  },
  { 
    path: '/register', 
    component: Register,
    meta: { requiresGuest: true }
  },
  { 
    path: '/dashboard', 
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  { 
    path: '/expenses', 
    component: Expenses,
    meta: { requiresAuth: true }
  },
  { 
    path: '/add-expense', 
    component: AddExpense,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login if trying to access protected route without auth
    next('/login')
  } else if (to.meta.requiresGuest && isAuthenticated) {
    // Redirect to dashboard if trying to access auth pages while logged in
    next('/dashboard')
  } else {
    next()
  }
})

export default router
