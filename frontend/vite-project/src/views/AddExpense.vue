<template>
  <div class="add-expense-layout">
    <div class="overlay" :class="{ active: sidebarOpen }" @click="toggleSidebar"></div>
    <Sidebar ref="sidebarRef" />
    <main class="content">
      <TopBar @toggle-sidebar="toggleSidebar" />
      <div class="card form">
        <h2>Add Expense</h2>

        <input placeholder="Title" />
        <input type="number" placeholder="Amount" />

        <select>
          <option value="">Select Category</option>
          <option value="Food">🍔 Food & Dining</option>
          <option value="Travel">🚗 Travel & Transport</option>
          <option value="Bills">💡 Bills & Utilities</option>
          <option value="Entertainment">🎮 Entertainment</option>
          <option value="Health">🏥 Health & Fitness</option>
          <option value="Education">📚 Education</option>
          <option value="Shopping">🛍️ Shopping</option>
          <option value="Groceries">🛒 Groceries</option>
          <option value="Rent">🏠 Rent & Housing</option>
          <option value="Insurance">🛡️ Insurance</option>
          <option value="Investment">💰 Investment & Savings</option>
          <option value="Personal">👤 Personal Care</option>
          <option value="Gifts">🎁 Gifts & Donations</option>
          <option value="Other">📦 Other</option>
        </select>

        <input type="date" />

        <button>Add Expense</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '../components/layout/Sidebar.vue'
import TopBar from '../components/layout/TopBar.vue'

const sidebarRef = ref(null)
const sidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
  if (sidebarRef.value) {
    sidebarRef.value.isOpen = sidebarOpen.value
  }
}
</script>

<style scoped>
.add-expense-layout {
  display: flex;
  min-height: 100vh;
  position: relative;
}

.content {
  flex: 1;
  padding: 30px;
  margin-left: 260px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 12px;
}

.form {
  max-width: 400px;
}

/* Overlay for mobile */
.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.overlay.active {
  display: block;
  opacity: 1;
  pointer-events: all;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .content {
    padding: 20px;
    margin-left: 0;
  }
}

@media (max-width: 768px) {
  .content {
    padding: 16px;
  }

  .form {
    max-width: 100%;
  }

  .card h2 {
    font-size: 20px;
  }
}

@media (max-width: 640px) {
  .content {
    padding: 12px;
  }

  .card {
    padding: 16px;
  }

  input, select, button {
    font-size: 14px;
    padding: 12px;
  }
  
  button {
    min-height: 48px;
    font-size: 16px;
  }
}
</style>
