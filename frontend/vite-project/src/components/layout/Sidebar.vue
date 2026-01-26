<template>
  <aside class="sidebar">
    <h1 class="logo">💸 SpendWise</h1>

    <nav>
      <RouterLink to="/dashboard" class="nav-item">
        📊 <span>Dashboard</span>
      </RouterLink>

      <RouterLink to="/expenses" class="nav-item">
        💳 <span>Expenses</span>
      </RouterLink>

      <RouterLink to="/add-expense" class="nav-item">
        ➕ <span>Add Expense</span>
      </RouterLink>
    </nav>

    <button class="logout">🚪 Logout</button>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 220px;
  background: var(--card);
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e7eb;
}

.logo {
  font-weight: 700;
  margin-bottom: 30px;
  color: var(--primary);
}

.nav-item {
  display: flex;
  gap: 10px;
  padding: 10px;
  color: var(--text-dark);
  text-decoration: none;
  border-radius: 8px;
}

.nav-item:hover {
  background: var(--background);
}

.logout {
  margin-top: auto;
  border: none;
  background: none;
  color: var(--danger);
  cursor: pointer;
}
</style>
