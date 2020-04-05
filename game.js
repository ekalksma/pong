class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = 500;
    this.canvas.height = 300;

    this.paddle = new Paddle();
  }

  run() {
    window.requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    this.draw();

    window.requestAnimationFrame(this.loop.bind(this));
  }

  draw () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(200, 100);
    this.ctx.stroke();
  }
}
