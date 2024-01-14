export default class Queue {
    constructor() {
      this.queue = [];
    }
  
    enqueue(value) {
      return this.queue.push(value);
    }
  
    dequeue() {
      return this.queue.shift();
    }
  }