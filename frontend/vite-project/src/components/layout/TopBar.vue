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

      <!-- User Menu -->
      <div class="user-menu" @click="toggleUserMenu">
        <div class="user-avatar">
          {{ userInitials }}
        </div>
        <span class="user-name">{{ userName }}</span>
        <span class="dropdown-arrow">▼</span>
        
        <div v-if="showUserMenu" class="user-dropdown">
          <div class="user-info">
            <strong>{{ userName }}</strong>
            <span class="user-email">{{ userEmail }}</span>
          </div>
          <hr>
          <button @click="handleLogout" class="logout-btn">
            <span>🚪</span> Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'

defineEmits(['toggle-sidebar'])

const router = useRouter()
const { user, logout } = useAuth()

const searchQuery = ref('')
const todayTotal = ref(850)
const showUserMenu = ref(false)

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

const userName = computed(() => user.value?.name || 'User')
const userEmail = computed(() => user.value?.email || '')
const userInitials = computed(() => {
  const name = userName.value
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
})

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const handleLogout = () => {
  logout()
  router.push('/login')
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  const userMenu = event.target.closest('.user-menu')
  if (!userMenu) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
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

/* User Menu */
.user-menu {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 150px;
}

.user-menu:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.user-name {
  font-weight: 500;
  color: var(--text-dark);
  flex: 1;
  font-size: 14px;
}

.dropdown-arrow {
  font-size: 10px;
  color: var(--text-light);
  transition: transform 0.2s;
}

.user-menu:hover .dropdown-arrow {
  transform: rotate(180deg);
}

.user-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 1000;
  overflow: hidden;
}

.user-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.user-info strong {
  color: var(--text-dark);
  font-size: 14px;
}

.user-email {
  color: var(--text-light);
  font-size: 12px;
}

.user-dropdown hr {
  margin: 0;
  border: none;
  border-top: 1px solid #f3f4f6;
}

.logout-btn {
  width: 100%;
  padding: 12px 16px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #dc2626;
  cursor: pointer;
  transition: background 0.2s;
}

.logout-btn:hover {
  background: #fef2f2;
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

  .user-menu {
    width: 100%;
    justify-content: space-between;
  }

  .user-dropdown {
    right: auto;
    left: 0;
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
