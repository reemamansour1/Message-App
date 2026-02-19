<script setup>
import { ref } from 'vue'
import Login from './components/Login.vue'
import Messenger from './components/Messenger.vue'
const isLoggedIn = ref(false)
</script>
<template>
  <Login v-if="!isLoggedIn" @logged-in="isLoggedIn = true" />
  <Messenger v-else @logged-out="isLoggedIn = false" />
</template>
