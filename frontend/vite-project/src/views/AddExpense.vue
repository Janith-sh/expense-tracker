<template>
  <div class="add-expense-layout">
    <Sidebar />
    <main class="content">
      <TopBar />
      <div class="card form">
        <h2>Add Expense</h2>

        <input placeholder="Title" />
        <input type="number" placeholder="Amount" />

        <select>
          <option>Food</option>
          <option>Travel</option>
          <option>Bills</option>
        </select>

        <input type="date" />

        <button>Add Expense</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '../components/layout/Sidebar.vue'
import TopBar from '../components/layout/TopBar.vue'
</script>

<style scoped>
.add-expense-layout {
  display: flex;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 30px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 12px;
}

.form {
  max-width: 400px;
}
</style>
