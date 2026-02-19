<script setup>
import { useMessageStore } from '@/stores/messageStore.js'

const emit = defineEmits(['logged-in'])
const store = useMessageStore()

const users = store.getUsers()

function login(user) {
  localStorage.setItem('username', user.username)
  localStorage.setItem('firstName', user.firstName)
  localStorage.setItem('lastName', user.lastName)
  emit('logged-in')
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Messenger App</h1>

      <div class="user-list">
        <button v-for="user in users" :key="user.username" class="user-btn" @click="login(user)">
          <div class="user-info">
            <span class="full-name">{{ user.firstName }} {{ user.lastName }}</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-card {
  border: 4px solid #e99f9f;
  border-radius: 30px;
  background: white;
  border-radius: 16px;
  padding: 50px;
  width: 500px;
  height: 350px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-card h1 {
  font-size: 30px;
  font-family: 'Times New Roman', Times, serif;
  margin-bottom: 35px;
  color: #1a1a2e;
  font-weight: bold;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border: 3px solid #ffc0c0;
  border-radius: 20px;
  background: white;
  transition: all 0.2s;
  text-align: left;
}

.user-btn:hover {
  border-color: #4a90e2;
  background: #f0f6ff;
  transform: translateY(-1px);
}
.user-info {
  display: flex;
  flex-direction: column;
}
</style>
