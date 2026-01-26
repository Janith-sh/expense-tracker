<template>
  <div class="auth">
    <div class="card">
      <h2>Create your account</h2>

      <input placeholder="Name" />
      <input placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button>Sign up</button>

      <RouterLink to="/login">Already have an account?</RouterLink>
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
