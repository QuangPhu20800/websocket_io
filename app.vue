<template>
  <div style="display: flex; justify-content: center;">
    <ChatRealTime :wsConnector="wsConnector"/>
  </div>
</template>

<script>
  import ChatRealTime from "./src/components/Chat.vue"
  import WebSocketConnector from "./src/models/WebSocketConnector"
  export default {
    name: "Index",
    components: {
      ChatRealTime,
    },
    data() {
      return {
        wsConnector: null,
      };
    },

    mounted() {
      this.wsConnector = new WebSocketConnector();
    },
  }
</script>