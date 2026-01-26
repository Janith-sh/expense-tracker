<template>
  <div class="dashboard-layout">
    <Sidebar />
    <main class="content">
      <TopBar />
      <div class="grid">
        <div class="card highlight">
          <h3>This Month</h3>
          <p>Rs. 24,500</p>
        </div>

        <div class="card">
          <h3>Top Category</h3>
          <p>Food 🍔</p>
        </div>

        <div class="card wide">
          <h3>Recent Expenses</h3>
          <ul>
            <li>Lunch – Rs. 450</li>
            <li>Bus – Rs. 120</li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '../components/layout/Sidebar.vue'
import TopBar from '../components/layout/TopBar.vue'
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 30px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 12px;
}

.highlight {
  background: var(--primary);
  color: white;
}

.wide {
  grid-column: span 3;
}
</style>
