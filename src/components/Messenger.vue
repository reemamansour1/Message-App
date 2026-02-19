<script setup>
import { ref } from 'vue'
import { useMessageStore } from '@/stores/messageStore.js'

const emit = defineEmits(['logged-out'])
const store = useMessageStore()

//localStorage.getItem(key) returns the value
// no need to have ref, users they won't change/switch during the same session.
const loggedInUsername = localStorage.getItem('username') || ''
const loggedInFirstName = localStorage.getItem('firstName') || ''
const loggedInLastName = localStorage.getItem('lastName') || ''

// needs ref because v-model requires reactive data and the value changes as the user types
const newMessage = ref('')

// here if the new msg is empty, do not add it, otherwise, add it, then reset
function send() {
  const text = newMessage.value.trim()
  if (!text) return
  store.addMessage(loggedInUsername, loggedInFirstName, loggedInLastName, text)
  newMessage.value = ''
}

// if i click redact, i will make the isRedacted to true and if it is true, this will make it say sth like it is hidden
function redact(i) {
  store.redactMessage(i)
}

// here if i click unredact, it will go back to the store and then change from true to false. and it will show the msg
function unredact(i) {
  store.unredactMessage(i)
}

// in the logout, after clicking log out, we remove the username, so if i want to change the user it will change and this also switches the isloggedIn to false, so it will take us back to the login page
function logout() {
  localStorage.removeItem('username')
  localStorage.removeItem('firstName')
  localStorage.removeItem('lastName')
  emit('logged-out')
}
</script>

<template>
  <div class="wrapper">
    <div class="header">
      <span>Messenger</span>
      <span>{{ loggedInFirstName }} {{ loggedInLastName }} is logged in</span>
      <button class="logout-btn" @click="logout">Logout</button>
    </div>

    <div class="messages">
      <div
        v-for="(msg, i) in store.messages"
        :key="i"
        class="row"
        :class="msg.username === loggedInUsername ? 'align-right' : 'align-left'"
      >
        <div class="bubble-wrap">
          <span class="name">{{ msg.firstName }}</span>
          <div
            class="bubble"
            :class="msg.username === loggedInUsername ? 'bubble-mine' : 'bubble-theirs'"
          >
            <span v-if="msg.isRedacted" style="font-style: italic; opacity: 0.6"
              >Message redacted</span
            >
            <span v-else>{{ msg.message }}</span>
          </div>
          <div v-if="msg.username === loggedInUsername">
            <button v-if="!msg.isRedacted" class="btn-redact" @click="redact(i)">Redact</button>
            <button v-else class="btn-unredact" @click="unredact(i)">Unredact</button>
          </div>
        </div>
      </div>
    </div>

    <div class="bar">
      <input v-model="newMessage" type="text" placeholder="Type a message..." />
      <button @click="send">Send</button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f0f2f5;
  font-family: sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
}

.logout-btn {
  background: none;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 6px 14px;
  cursor: pointer;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.row {
  display: flex;
}

.align-right {
  justify-content: flex-end;
}

.align-left {
  justify-content: flex-start;
}

.bubble-wrap {
  display: flex;
  flex-direction: column;
  max-width: 60%;
}

.align-right .bubble-wrap {
  align-items: flex-end;
}

.align-left .bubble-wrap {
  align-items: flex-start;
}

.name {
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 3px;
}

.bubble {
  padding: 10px 14px;
  border-radius: 18px;
  font-size: 0.95rem;
  line-height: 1.4;
  word-break: break-word;
}

.bubble-mine {
  background: #4a90e2;
  color: white;
}

.bubble-theirs {
  background: white;
  color: #1a1a2e;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.bar {
  display: flex;
  gap: 10px;
  padding: 14px 16px;
  background: white;
  border-top: 1px solid #e0e0e0;
}

.btn-redact {
  font-size: 0.75rem;
  padding: 3px 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background: #ffcccc;
  color: #c62828;
}

.btn-unredact {
  font-size: 0.75rem;
  padding: 3px 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background: #c8e6c9;
  color: #2e7d32;
}

.bar input {
  flex: 1;
  padding: 10px 16px;
  border: 1px solid #ddd;
  border-radius: 24px;
  outline: none;
  font-size: 0.95rem;
}

.bar button {
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 24px;
  padding: 10px 22px;
  font-size: 0.95rem;
  cursor: pointer;
}
</style>
