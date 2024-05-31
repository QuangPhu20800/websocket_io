<template>
  <div class="chat-container">
    <div class="chat-header">
      <h2>Real-Time Chat</h2>
    </div>
    <div class="chat-window" id="chat-window">
      <ul id="message-list"></ul>
    </div>
    <div class="chat-input">
      <input
        type="text"
        id="message-input"
        placeholder="Type a message..."
        autocomplete="off"
      />
      <button @click="sendMessage('hello')" id="send-button">Send</button>
    </div>
  </div>
</template>

<script>
import {io} from "socket.io-client";
export default {
  name: "ChatRealTime",
  data() {
    return {
      socket: null,
    };
  },
  mounted() {
    this.initSocketIO();
  },
  methods: {
    initSocketIO() {
      const socketUrl =
        "https://g9a13vfpg6.execute-api.us-east-1.amazonaws.com/production/@connections";
      this.socket = io(socketUrl);

      this.socket.on("connect", () => {
        console.log("Socket.IO kết nối thành công");
      });

      this.socket.on("message", (message) => {
        console.log("Nhận được tin nhắn từ server:", message);
      });

      this.socket.on("disconnect", () => {
        console.log("Socket.IO đã ngắt kết nối");
      });

      this.socket.on("error", (error) => {
        console.error("Có lỗi xảy ra với Socket.IO:", error);
      });
    },
    sendMessage(message) {
      if (this.socket && this.socket.connected) {
        this.socket.send(message);
      } else {
        console.error("Kết nối Socket.IO chưa mở hoặc đã đóng");
      }
    },
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
#message-input {
  flex: 1;
  padding: 10px;
  border: none;
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
#send-button:hover {
  background-color: #45a049;
}
</style>
