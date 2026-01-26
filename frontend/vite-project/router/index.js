import { createRouter, createWebHistory } from 'vue-router'

import Login from '../src/views/Login.vue'
import Register from '../src/views/Register.vue'
import Dashboard from '../src/views/Dashboard.vue'
import Expenses from '../src/views/Expenses.vue'
import AddExpense from '../src/views/AddExpense.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard },
  { path: '/expenses', component: Expenses },
  { path: '/add-expense', component: AddExpense }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
