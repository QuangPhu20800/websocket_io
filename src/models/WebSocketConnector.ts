

export default class WebSocketConnector {
  socket: WebSocket;

  constructor(){
    this.socket = new WebSocket('wss://g9a13vfpg6.execute-api.us-east-1.amazonaws.com/production');
    this.init();
  }

  init(){ 
    this.socket.onopen = () => {
      console.log('Connected to WebSocket API');
    };
  
    this.socket.onmessage = (event) => {
      const customEvent = new CustomEvent('messageReceived', {
        detail: event.data,
      });
      window.dispatchEvent(customEvent);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  
    this.socket.onclose = () => {
      console.log('Disconnected from WebSocket API');
    };

  }

  joinChat(infoName: String) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ action: 'setName', name: infoName }))
    } else {
      console.error('WebSocket is not open. ReadyState:', this.socket.readyState)
    }
  } 

  sendMessagePublic(message: string) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ action: 'sendPublic', message: message }))
    } else {
      console.error('WebSocket is not open. ReadyState:', this.socket.readyState)
    }
  }

  sendMessagePrivate(message: string, receiver: string) {
    console.log(receiver)
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ action: 'sendPrivate', message: message, to: receiver }))
    } else {
      console.error('WebSocket is not open. ReadyState:', this.socket.readyState)
    }
  }
  
}
