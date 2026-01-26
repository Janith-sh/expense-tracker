<template>
  <header class="topbar">
    <h2>Welcome back 👋</h2>
    <span>{{ today }}</span>
  </header>
</template>

<script setup>
const today = new Date().toDateString()
</script>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
