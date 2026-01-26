<template>
  <div class="expenses-layout">
    <Sidebar />
    <main class="content">
      <TopBar />
      <div class="card">
        <h2>Expenses</h2>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lunch</td>
              <td>450</td>
              <td>2026-01-25</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '../components/layout/Sidebar.vue'
import TopBar from '../components/layout/TopBar.vue'
</script>

<style scoped>
.expenses-layout {
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

table {
  width: 100%;
  border-collapse: collapse;
}

td, th {
  padding: 10px;
  border-bottom: 1px solid #e5e7eb;
}
</style>
