import { defineStore } from 'pinia'
import Message from '@/models/Message.js'
import { messagesArray } from '@/data/messages.js'
import { reactive } from 'vue'

export const useMessageStore = defineStore('messageStore', () => {
  const messages = reactive([...messagesArray])

  function addMessage(username, firstName, lastName, message) {
    messages.push(new Message(username, firstName, lastName, message))
  }

  function redactMessage(i) {
    messages[i].isRedacted = true
  }

  function unredactMessage(i) {
    messages[i].isRedacted = false
  }

  function getUsers() {
    return [
      { username: 'sally', firstName: 'Sally', lastName: 'Mansour' },
      { username: 'jay', firstName: 'Jay', lastName: 'Simpson' },
    ]
  }

  return { messages, addMessage, redactMessage, unredactMessage, getUsers }
})
