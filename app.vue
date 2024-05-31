<template>
  <div style="display: flex; justify-content: center;">
    <ChatRealTime />
  </div>
</template>

<script>
  import ChatRealTime from "./src/components/Chat.vue"
  export default {
    name: "Index",
    components: {
      ChatRealTime,
    }
  }
</script>