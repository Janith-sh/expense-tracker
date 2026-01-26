<template>
  <div class="dashboard-layout">
    <div class="overlay" :class="{ active: sidebarOpen }" @click="toggleSidebar"></div>
    <Sidebar ref="sidebarRef" />
    <main class="content">
      <TopBar @toggle-sidebar="toggleSidebar" />
      
      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card highlight">
          <div class="stat-icon">💰</div>
          <div class="stat-info">
            <h3>Total Expenses</h3>
            <p class="stat-value">Rs. {{ stats.totalExpenses.toLocaleString() }}</p>
            <span class="stat-label">This month</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-info">
            <h3>Daily Average</h3>
            <p class="stat-value">Rs. {{ stats.avgDaily.toLocaleString() }}</p>
            <span class="stat-label">Per day</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">🏆</div>
          <div class="stat-info">
            <h3>Top Category</h3>
            <p class="stat-value">{{ stats.topCategory.name }}</p>
            <span class="stat-label">Rs. {{ stats.topCategory.amount.toLocaleString() }}</span>
          </div>
        </div>
      </div>

      <!-- Charts Grid -->
      <div class="charts-grid">
        <ChartCard 
          title="Weekly Spending Trend" 
          type="line" 
          :data="weeklyData"
          class="chart-wide"
        />
        
        <ChartCard 
          title="Expenses by Category" 
          type="doughnut" 
          :data="categoryData"
        />
        
        <ChartCard 
          title="Monthly Comparison" 
          type="bar" 
          :data="monthlyComparison"
        />
      </div>

      <!-- Recent Expenses -->
      <div class="recent-section">
        <div class="card">
          <div class="section-header">
            <h3>Recent Expenses</h3>
            <RouterLink to="/expenses" class="view-all">View All →</RouterLink>
          </div>
          <div class="expense-list">
            <div 
              v-for="expense in stats.recentExpenses" 
              :key="expense.id" 
              class="expense-item"
            >
              <div class="expense-info">
                <span class="expense-title">{{ expense.title }}</span>
                <span class="expense-category">{{ expense.category }}</span>
              </div>
              <div class="expense-details">
                <span class="expense-amount">Rs. {{ expense.amount }}</span>
                <span class="expense-date">{{ formatDate(expense.date) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '../components/layout/Sidebar.vue'
import TopBar from '../components/layout/TopBar.vue'
import ChartCard from '../components/ChartCard.vue'
import { weeklyData, categoryData, monthlyComparison, summaryStats } from '../data/mockData.js'

const sidebarRef = ref(null)
const sidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
  if (sidebarRef.value) {
    sidebarRef.value.isOpen = sidebarOpen.value
  }
}

const stats = ref(summaryStats)

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>

<style scoped>
.dashboard-layout {
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

/* Stats Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-card.highlight {
  background: linear-gradient(135deg, var(--primary) 0%, #6366f1 100%);
  color: white;
}

.stat-icon {
  font-size: 32px;
  line-height: 1;
}

.stat-info {
  flex: 1;
}

.stat-info h3 {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  opacity: 0.9;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 4px;
  line-height: 1;
}

.stat-label {
  font-size: 13px;
  opacity: 0.7;
}

/* Charts Grid */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.chart-wide {
  grid-column: 1 / -1;
}

/* Recent Expenses */
.recent-section {
  margin-top: 30px;
}

.card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-dark);
}

.view-all {
  color: var(--primary);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.2s;
}

.view-all:hover {
  opacity: 0.8;
}

.expense-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.expense-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  transition: background 0.2s;
}

.expense-item:hover {
  background: var(--background);
}

.expense-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.expense-title {
  font-weight: 500;
  color: var(--text-dark);
}

.expense-category {
  font-size: 13px;
  color: var(--text-light);
}

.expense-details {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.expense-amount {
  font-weight: 600;
  color: var(--text-dark);
}

.expense-date {
  font-size: 13px;
  color: var(--text-light);
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
    width: 100%;
    max-width: 100%;
    margin-left: 0;
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }

  .chart-wide {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .content {
    padding: 16px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .stat-card {
    padding: 20px;
  }

  .stat-value {
    font-size: 22px;
  }

  .recent-list {
    gap: 12px;
  }

  .expense-item {
    padding: 14px;
  }
  
  .expense-title {
    font-size: 14px;
  }
  
  .expense-category,
  .expense-amount {
    font-size: 13px;
  }
  
  .expense-date {
    font-size: 12px;
  }
}

@media (max-width: 640px) {
  .content {
    padding: 12px;
  }

  .stat-icon {
    font-size: 28px;
  }

  .stat-info h3 {
    font-size: 13px;
  }

  .stat-value {
    font-size: 20px;
  }

  .recent-expenses h3 {
    font-size: 18px;
  }
}
</style>
