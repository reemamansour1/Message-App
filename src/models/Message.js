export default class Message {
  constructor(username, firstName, lastName, message) {
    this.username = username
    this.firstName = firstName
    this.lastName = lastName
    this.message = message
    this.isRedacted = false
  }
}
