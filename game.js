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

    if (!this.isInBoundsY(this.player)) {
      this.moveEntityOutOfWall(this.player);
    }

    if (!this.isInBoundsY(this.playerAi)) {
      this.moveEntityOutOfWall(this.playerAi);
    }

    if (!this.isInBoundsY(this.ball)) {
      this.ball.speed.y *= -1;
    }

    if (this.boundingBoxCollision(this.player, this.ball) ||
        this.boundingBoxCollision(this.playerAi, this.ball)) {
      this.ball.speed.x *= -1;
    }

    if (!this.isInBoundsX(this.ball)) {
      if (this.ball.position.x < this.canvas.width / 2) {
        this.playerAi.incrementScore();
      } else {
        this.player.incrementScore();
      }

      this.startNewRound();
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

  isInBoundsX(entity) {
    const pos = entity.position;
    const size = entity.size;

    return pos.x - size.w / 2 > 0 && pos.x + size.w / 2 < this.canvas.width;
  }

  isInBoundsY(entity) {
    const pos = entity.position;
    const size = entity.size;

    return pos.y - size.h / 2 > 0 && pos.y + size.h / 2 < this.canvas.height;
  }

  boundingBoxCollision(box1, box2) {
    return box1.position.x - box1.size.w / 2 < box2.position.x + box2.size.w / 2 &&
           box1.position.x + box1.size.w / 2 > box2.position.x - box2.size.w / 2 &&
           box1.position.y - box1.size.h / 2 < box2.position.y + box2.size.h / 2 &&
           box1.position.y + box1.size.h / 2 > box2.position.y - box2.size.h / 2;
  }

  moveEntityOutOfWall(entity) {
    if (entity.position.y - entity.size.h / 2 < 0) {
      entity.position.y = entity.size.h / 2;
    } else if (entity.position.y + entity.size.h / 2 > canvas.height) {
      entity.position.y = canvas.height - entity.size.h / 2;
    }
  }

  startNewRound() {
    this.player.position.y = this.canvas.height / 2;
    this.playerAi.position.y = this.canvas.height / 2;

    this.ball.position.x = this.canvas.width / 2;
    this.ball.position.y = this.canvas.height / 2;
  }
}
