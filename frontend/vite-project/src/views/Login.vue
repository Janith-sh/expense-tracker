<template>
  <div class="auth">
    <div class="card">
      <h2>Sign in to SpendWise</h2>

      <input placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button>Login</button>

      <RouterLink to="/register">Create an account</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.auth {
  height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #eef2ff, #f8fafc);
}

.card {
  background: white;
  padding: 30px;
  width: 320px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
