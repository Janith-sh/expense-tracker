<template>
  <header class="topbar">
    <button class="hamburger-menu" @click="$emit('toggle-sidebar')">
      <span></span>
      <span></span>
      <span></span>
    </button>
    
    <div class="topbar-left">
      <div class="greeting-section">
        <h2 class="greeting">{{ greeting }}</h2>
        <div class="date-info">
          <span class="date-icon">📅</span>
          <span class="date-text">{{ formattedDate }}</span>
        </div>
      </div>
    </div>

    <div class="topbar-right">
      <!-- Search Bar -->
      <div class="search-container">
        <span class="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Search expenses..." 
          class="search-input"
          v-model="searchQuery"
        />
      </div>

      <!-- Quick Stats -->
      <div class="quick-stat">
        <span class="stat-label">Today's Total</span>
        <span class="stat-value">Rs. {{ todayTotal.toLocaleString() }}</span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'

defineEmits(['toggle-sidebar'])

const searchQuery = ref('')
const todayTotal = ref(850)

const currentHour = new Date().getHours()
const greeting = computed(() => {
  if (currentHour < 12) return 'Good Morning'
  if (currentHour < 18) return 'Good Afternoon'
  return 'Good Evening'
})

const formattedDate = computed(() => {
  const date = new Date()
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric',
    month: 'long', 
    day: 'numeric' 
  })
})
</script>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 16px 0;
  gap: 24px;
  flex-wrap: wrap;
}

/* Left Section */
.topbar-left {
  flex: 1;
  min-width: 250px;
}

.greeting-section {
  display: flex;
  align-items: center;
  gap: 24px;
}

.greeting {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0;
}

.date-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-light);
  font-size: 14px;
  font-weight: 500;
}

.date-icon {
  font-size: 14px;
}

.date-text {
  font-weight: 600;
  color: var(--text-dark);
}

/* Right Section */
.topbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Search */
.search-container {
  position: relative;
  width: 280px;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 10px 16px 10px 42px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.search-input::placeholder {
  color: var(--text-light);
}

/* Quick Stat */
.quick-stat {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 8px 16px;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  border-radius: 10px;
  color: white;
}

.stat-label {
  font-size: 11px;
  opacity: 0.9;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
}

@media (max-width: 768px) {
  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .topbar-right {
    width: 100%;
    flex-wrap: wrap;
  }

  .search-container {
    flex: 1;
    min-width: 200px;
  }

  .quick-stat {
    width: 100%;
  }

  .greeting-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .greeting {
    font-size: 24px;
  }

  .date-info {
    font-size: 13px;
  }
}

@media (max-width: 1024px) {
  .greeting-section {
    gap: 16px;
  }

  .greeting {
    font-size: 26px;
  }
}
</style>
