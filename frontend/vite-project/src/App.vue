<template>
  <RouterView />
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Sidebar from './components/layout/Sidebar.vue'
import TopBar from './components/layout/TopBar.vue'

const route = useRoute()
const isAuthPage = computed(() => route.path === '/login' || route.path === '/register')
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background: var(--background);
}

.app {
  display: flex;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 30px;
}

input, select, button {
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
}

button {
  background: var(--primary);
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

button:hover {
  opacity: 0.9;
}

a {
  color: var(--primary);
  text-decoration: none;
}
</style>
