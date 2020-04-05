class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = 500;
    this.canvas.height = 300;
    const playerWidth = 10;
    const playerHeight = 50;

    this.player1 = new Paddle({ x: playerWidth / 2, y: this.canvas.height / 2 }, { w: playerWidth, h: playerHeight }, this.canvas.height, 68, 65);
    this.player2 = new Paddle({ x: this.canvas.width - (playerWidth / 2), y: this.canvas.height / 2 }, { w: playerWidth, h: playerHeight },this.canvas.height, 37, 39);
  }

  run() {
    window.requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    this.update();
    this.draw(this.ctx);

    window.requestAnimationFrame(this.loop.bind(this));
  }

  update() {
    this.player1.update();
    this.player2.update();
  }

  draw(ctx) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.player1.draw(ctx);
    this.player2.draw(ctx);
  }
}
