<template>
  <aside class="sidebar" :class="{ 'mobile-open': isOpen }">
    <button class="mobile-close" @click="closeSidebar">✕</button>
    
    <!-- Logo -->
    <div class="logo-section">
      <h1 class="logo">💸 SpendWise</h1>
      <p class="tagline">Track. Save. Succeed.</p>
    </div>

    <!-- Navigation -->
    <nav class="nav-menu">
      <RouterLink to="/dashboard" class="nav-item" active-class="active" @click="closeSidebar">
        <span class="nav-icon">📊</span>
        <span class="nav-text">Dashboard</span>
      </RouterLink>

      <RouterLink to="/expenses" class="nav-item" active-class="active" @click="closeSidebar">
        <span class="nav-icon">💳</span>
        <span class="nav-text">Expenses</span>
      </RouterLink>

      <RouterLink to="/add-expense" class="nav-item" active-class="active" @click="closeSidebar">
        <span class="nav-icon">➕</span>
        <span class="nav-text">Add Expense</span>
      </RouterLink>
    </nav>

    <!-- User Profile -->
    <div class="user-section">
      <div class="user-profile">
        <div class="user-avatar">👤</div>
        <div class="user-info">
          <div class="user-name">John Doe</div>
          <div class="user-email">john@example.com</div>
        </div>
      </div>
      <button class="logout-btn" title="Logout">
        <span class="logout-icon">🚪</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const closeSidebar = () => {
  isOpen.value = false
}

// Expose method for parent to open sidebar
defineExpose({ isOpen })
</script>

<style scoped>
.sidebar {
  width: 260px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e7eb;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.04);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  flex-shrink: 0;
}

/* Logo Section */
.logo-section {
  margin-bottom: 32px;
  padding: 0 8px;
}

.logo {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
  color: var(--primary);
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tagline {
  font-size: 12px;
  color: var(--text-light);
  font-weight: 500;
  letter-spacing: 0.3px;
}

/* Navigation */
.nav-menu {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: var(--text-dark);
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.2s ease;
  position: relative;
  font-weight: 500;
  font-size: 14px;
}

.nav-icon {
  font-size: 18px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-text {
  flex: 1;
}

.nav-item:hover {
  background: var(--background);
  transform: translateX(2px);
}

.nav-item.active {
  background: var(--primary);
  color: white;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 60%;
  background: white;
  border-radius: 0 4px 4px 0;
}

.nav-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 12px 8px;
}

/* User Section */
.user-section {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s;
}

.user-profile:hover {
  background: var(--background);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email {
  font-size: 11px;
  color: var(--text-light);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logout-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: #fee2e2;
  color: var(--danger);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.logout-btn:hover {
  background: var(--danger);
  transform: scale(1.05);
}

.logout-btn:hover .logout-icon {
  filter: brightness(0) invert(1);
}

.logout-icon {
  font-size: 16px;
}

/* Mobile Close Button */
.mobile-close {
  display: none;
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--text-dark);
  z-index: 1001;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .sidebar {
    position: fixed;
    left: -280px;
    top: 0;
    height: 100vh;
    z-index: 1000;
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: 260px;
    will-change: transform;
  }

  .sidebar.mobile-open {
    left: 0;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.2);
  }

  .mobile-close {
    display: block;
  }
}

@media (min-width: 1025px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1000;
  }
}

@media (max-width: 640px) {
  .sidebar {
    width: 240px;
    left: -260px;
  }
  
  .nav-item {
    padding: 10px 14px;
    font-size: 13px;
  }
  
  .logo {
    font-size: 20px;
  }
}
</style>
