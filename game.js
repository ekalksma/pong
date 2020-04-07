class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = 500;
    this.canvas.height = 300;

    this.keyLeft = false;
    this.keyRight = false;

    const playerWidth = 10;
    const playerHeight = 50;

    this.player = new Paddle({ x: playerWidth / 2, y: this.canvas.height / 2 }, { w: playerWidth, h: playerHeight });
    this.playerAi = new Paddle({ x: this.canvas.width - playerWidth / 2, y: this.canvas.height / 2 }, { w: playerWidth, h: playerHeight });

    this.ball = new Ball({ x: 250,  y: 150 }, { w: 10, h: 10 });

    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
  }


  update() {
    if (this.keyLeft) this.player.moveUp();
    if (this.keyRight) this.player.moveDown();

    if (this.ball.position.y < this.playerAi.position.y - this.playerAi.size.h / 4) {
      this.playerAi.moveUp();
    } else if (this.ball.position.y > this.playerAi.position.y + this.playerAi.size.h / 4) {
      this.playerAi.moveDown();
    }

    this.ball.update();

    if (!this.isInBounds(this.player)) {
      this.player.handleOutOfBounds(this.canvas);
    }

    if (!this.isInBounds(this.playerAi)) {
      this.playerAi.handleOutOfBounds(this.canvas);
    }

    if (!this.isInBounds(this.ball)) {
      this.ball.handleOutOfBounds(this.canvas);
    }
  }

  draw(ctx) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.player.draw(ctx);
    this.playerAi.draw(ctx);
    this.ball.draw(ctx);
  }

  run() {
    window.requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    this.update();
    this.draw(this.ctx);

    window.requestAnimationFrame(this.loop.bind(this));
  }

  onKeyDown(event) {
    if (event.keyCode === 65) this.keyLeft = true;
    if (event.keyCode === 68) this.keyRight = true;
  }

  onKeyUp(event) {
    if (event.keyCode === 65) this.keyLeft = false;
    if (event.keyCode === 68) this.keyRight = false;
  }

  isInBounds(entity) {
    const pos = entity.position;
    const size = entity.size;

    return pos.y - size.h / 2 > 0 && pos.y + size.h / 2 < this.canvas.height;
  }
}
