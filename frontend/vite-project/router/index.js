import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Expenses from '../views/Expenses.vue'
import AddExpense from '../views/AddExpense.vue'

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
