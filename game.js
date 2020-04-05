class Game {
  constructor() {
    this.paddle = new Paddle();
  }

  run() {
    window.requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    window.requestAnimationFrame(this.loop.bind(this));
  }
}
