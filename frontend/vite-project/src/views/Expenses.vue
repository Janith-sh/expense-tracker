<template>
  <div class="expenses-layout">
    <div class="overlay" :class="{ active: sidebarOpen }" @click="toggleSidebar"></div>
    <Sidebar ref="sidebarRef" />
    <main class="content">
      <TopBar @toggle-sidebar="toggleSidebar" />
      
      <!-- Header Section -->
      <div class="page-header">
        <div class="header-info">
          <h2>All Expenses</h2>
          <p class="subtitle">{{ filteredExpenses.length }} transactions</p>
        </div>
        <RouterLink to="/add-expense" class="btn-primary">
          ➕ Add Expense
        </RouterLink>
      </div>

      <!-- Filters and Search -->
      <div class="filters-section">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search expenses..."
            class="search-input"
          />
        </div>

        <div class="filter-group">
          <select v-model="selectedCategory" class="filter-select">
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>

          <select v-model="sortBy" class="filter-select">
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="summary-cards">
        <div class="summary-card">
          <span class="summary-label">Total Spent</span>
          <span class="summary-value">Rs. {{ totalAmount.toLocaleString() }}</span>
        </div>
        <div class="summary-card">
          <span class="summary-label">Average</span>
          <span class="summary-value">Rs. {{ averageAmount.toLocaleString() }}</span>
        </div>
        <div class="summary-card">
          <span class="summary-label">Highest</span>
          <span class="summary-value">Rs. {{ highestAmount.toLocaleString() }}</span>
        </div>
      </div>

      <!-- Expenses Table -->
      <div class="card table-card">
        <div class="table-container">
          <table class="expenses-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="expense in filteredExpenses" 
                :key="expense.id"
                class="expense-row"
              >
                <td class="title-cell">
                  <span class="expense-title">{{ expense.title }}</span>
                </td>
                <td>
                  <span class="category-badge" :class="getCategoryClass(expense.category)">
                    {{ expense.category }}
                  </span>
                </td>
                <td class="amount-cell">
                  Rs. {{ expense.amount.toLocaleString() }}
                </td>
                <td class="date-cell">
                  {{ formatDate(expense.date) }}
                </td>
                <td class="actions-cell">
                  <button class="action-btn edit" title="Edit">✏️</button>
                  <button class="action-btn delete" title="Delete">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Empty State -->
          <div v-if="filteredExpenses.length === 0" class="empty-state">
            <span class="empty-icon">📭</span>
            <p>No expenses found</p>
            <p class="empty-subtitle">Try adjusting your filters</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Sidebar from '../components/layout/Sidebar.vue'
import TopBar from '../components/layout/TopBar.vue'
import { mockExpenses } from '../data/mockData.js'

const sidebarRef = ref(null)
const sidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
  if (sidebarRef.value) {
    sidebarRef.value.isOpen = sidebarOpen.value
  }
}

const expenses = ref(mockExpenses)
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('date-desc')

const filteredExpenses = computed(() => {
  let filtered = [...expenses.value]

  // Search filter
  if (searchQuery.value) {
    filtered = filtered.filter(expense => 
      expense.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Category filter
  if (selectedCategory.value) {
    filtered = filtered.filter(expense => expense.category === selectedCategory.value)
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'date-desc':
        return new Date(b.date) - new Date(a.date)
      case 'date-asc':
        return new Date(a.date) - new Date(b.date)
      case 'amount-desc':
        return b.amount - a.amount
      case 'amount-asc':
        return a.amount - b.amount
      default:
        return 0
    }
  })

  return filtered
})

const totalAmount = computed(() => {
  return filteredExpenses.value.reduce((sum, expense) => sum + expense.amount, 0)
})

const averageAmount = computed(() => {
  return filteredExpenses.value.length > 0 
    ? Math.round(totalAmount.value / filteredExpenses.value.length)
    : 0
})

const highestAmount = computed(() => {
  return filteredExpenses.value.length > 0
    ? Math.max(...filteredExpenses.value.map(e => e.amount))
    : 0
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'short', 
    day: 'numeric' 
  })
}

const getCategoryClass = (category) => {
  const categoryClasses = {
    'Food': 'category-food',
    'Travel': 'category-travel',
    'Bills': 'category-bills',
    'Entertainment': 'category-entertainment',
    'Health': 'category-health',
    'Education': 'category-education'
  }
  return categoryClasses[category] || 'category-default'
}
</script>

<style scoped>
.expenses-layout {
  display: flex;
  min-height: 100vh;
  background: var(--background);
  position: relative;
}

.content {
  flex: 1;
  padding: 30px;
  width: 100%;
  margin-left: 260px;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header-info h2 {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 4px;
}

.subtitle {
  color: var(--text-light);
  font-size: 14px;
}

.btn-primary {
  background: var(--primary);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.2s;
}

.btn-primary:hover {
  opacity: 0.9;
}

/* Filters Section */
.filters-section {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 250px;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  background: white;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
}

.filter-group {
  display: flex;
  gap: 12px;
}

.filter-select {
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 160px;
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary);
}

/* Summary Cards */
.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.summary-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.summary-label {
  font-size: 13px;
  color: var(--text-light);
  font-weight: 500;
}

.summary-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-dark);
}

/* Table */
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-card {
  overflow: hidden;
}

.table-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: var(--primary) #f1f5f9;
}

.table-container::-webkit-scrollbar {
  height: 8px;
}

.table-container::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.table-container::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 10px;
}

.expenses-table {
  width: 100%;
  border-collapse: collapse;
}

.expenses-table thead {
  background: var(--background);
}

.expenses-table th {
  padding: 16px;
  text-align: left;
  font-weight: 600;
  font-size: 13px;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.expense-row {
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.2s;
}

.expense-row:hover {
  background: #f8fafc;
}

.expenses-table td {
  padding: 16px;
  color: var(--text-dark);
}

.title-cell {
  font-weight: 500;
}

.category-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.category-food { background: #fef3c7; color: #92400e; }
.category-travel { background: #d1fae5; color: #065f46; }
.category-bills { background: #fee2e2; color: #991b1b; }
.category-entertainment { background: #fed7aa; color: #9a3412; }
.category-health { background: #e9d5ff; color: #6b21a8; }
.category-education { background: #dbeafe; color: #1e40af; }
.category-default { background: #e5e7eb; color: #374151; }

.amount-cell {
  font-weight: 600;
  font-size: 15px;
}

.date-cell {
  color: var(--text-light);
  font-size: 14px;
}

.actions-cell {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.2s;
  min-width: 36px;
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background: #f1f5f9;
}

.action-btn.delete:hover {
  background: #fee2e2;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 64px;
  display: block;
  margin-bottom: 16px;
}

.empty-state p {
  color: var(--text-dark);
  font-weight: 500;
  margin-bottom: 8px;
}

.empty-subtitle {
  color: var(--text-light);
  font-size: 14px;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .content {
    padding: 20px;
    width: 100%;
    max-width: 100%;
    margin-left: 0;
  }

  .filters-section {
    flex-direction: column;
    gap: 12px;
  }

  .search-box,
  .filter-group {
    width: 100%;
  }

  .filter-group {
    flex-direction: column;
    gap: 12px;
  }

  .filter-select {
    width: 100%;
  }

  .summary-cards {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .filters-section {
    flex-direction: column;
  }

  .filter-group {
    flex-direction: column;
  }

  .filter-select {
    width: 100%;
  }

  .expenses-table {
    font-size: 14px;
  }

  .expenses-table th,
  .expenses-table td {
    padding: 12px;
  }
}
</style>
