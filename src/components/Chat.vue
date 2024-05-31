<template>
  <div class="chat-container">
    <div class="chat-header">
      <h2>Real-Time Chat</h2>
    </div>
    <div class="chat-window" id="chat-window">
      <ul id="message-list"></ul>
    </div>
    <div class="join-input">
      <input
        v-model="name"
        type="text"
        id="name-input"
        placeholder="Name"
        autocomplete="off"
      />
      <button @click="joinChat" id="join-button">Join Chat</button>
    </div>
    <div style="display: flex">
      <input
        v-model="message"
        type="text"
        id="message-input"
        placeholder="Type a message..."
        autocomplete="off"
      />
      <input
        v-model="receiver"
        type="text"
        id="message-input"
        placeholder="receiver"
        autocomplete="off"
      />
      
    </div>
    <button @click="sendMessagePublic" id="send-button">Send Public</button>
    <button @click="sendMessagePrivate" id="send-button">Send Private</button>
  </div>
</template>

<script>
export default {
  name: "ChatRealTime",
  data() {
    return {
      name: "",
      receiver: "",
      message: "",
    };
  },

  props: {
    wsConnector: {
      type: Object,
      default: null,
    },
  },

  methods: {
    joinChat() {
      this.wsConnector.joinChat(this.name);
    },

    sendMessagePublic() {
      this.wsConnector.sendMessagePublic(this.message);
    },

    sendMessagePrivate() {
      this.wsConnector.sendMessagePrivate(this.message, this.receiver);
    },

    appendMessage(message) {
      const messageList = document.getElementById("message-list");
      const messageElement = document.createElement("li");
      messageElement.textContent = message;
      messageList.appendChild(messageElement);
    },
  },

  mounted() {
    window.addEventListener('messageReceived', (event) => {
      const parseData = JSON.parse(event.detail);
      if (parseData.systemMessage) {
        console.log(parseData.systemMessage);
        this.appendMessage(parseData.systemMessage);
      } else if (parseData.publicMessage) {
        console.log(parseData.publicMessage);
        this.appendMessage(parseData.publicMessage);
      } else if (parseData.privateMessage) {
        console.log(parseData.privateMessage);
        this.appendMessage(parseData.privateMessage);
      }
    });
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.chat-container {
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.chat-header {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  text-align: center;
}
.chat-window {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  border-bottom: 1px solid #ccc;
}
.message {
  margin: 5px 0;
}
.message.sent {
  text-align: right;
}
.message.received {
  text-align: left;
}
.chat-input {
  display: flex;
  border-top: 1px solid #ccc;
}

.join-input {
  display: flex;
  border-top: 1px solid #ccc;
}
#message-input {
  flex: 1;
  padding: 10px;

  border-radius: 0;
  outline: none;
}
#name-input {
  flex: 1;
  padding: 10px;
  border-radius: 0;
  outline: none;
}
#send-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

#join-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
#send-button:hover {
  background-color: #45a049;
}

#join-button:hover {
  background-color: #45a049;
}
</style>
