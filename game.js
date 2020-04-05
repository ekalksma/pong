class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = 500;
    this.canvas.height = 300;

    this.player1 = new Paddle({ x: 30, y: 30 }, { w: 50, h: 10 });
    this.player2 = new Paddle({ x: this.canvas.width - 30, y: 30 }, { w: 50, h: 10 });
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

    this.player1.draw(this.ctx);
    this.player2.draw(this.ctx);
  }
}
