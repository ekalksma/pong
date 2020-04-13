class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = 500;
    this.canvas.height = 300;
    this.canvasCenter = { x: this.canvas.width / 2, y: this.canvas.height / 2 };

    this.keyLeft = false;
    this.keyRight = false;
    this.keyP = false;
    this.paused = true;
    this.isNewRound = true;

    this.player = new Paddle();
    this.playerAi = new Paddle();
    this.ball = new Ball();
    this.winLimit = 3;

    this.playerScoreboard = document.getElementById('playerScore');
    this.playerScoreboard.innerHTML = this.player.score;

    this.AiScoreboard = document.getElementById('playerAiScore');
    this.AiScoreboard.innerHTML = this.playerAi.score;

    this.pauseScreen = document.getElementById('pauseScreen');
    this.pauseScreen.style.display = 'none';

    this.startScreen = document.getElementById('startScreen');
    this.startScreen.style.display = 'block';

    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
    window.addEventListener('keypress', this.onKeyPress.bind(this));

    this.startNewRound();
  }

  update() {
    if(!this.paused)
    {
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
        this.ball.velocity.y *= -1;

        this.moveEntityOutOfWall(this.ball);
      }

      if (this.boundingBoxCollision(this.player, this.ball)) {
        const bounceAngle = this.getBounceAngle(this.player, this.ball);

        this.ball.velocity.x = this.ball.speed * Math.cos(bounceAngle);
        this.ball.velocity.y = this.ball.speed * Math.sin(bounceAngle);
      }

      if (this.boundingBoxCollision(this.playerAi, this.ball)) {
        const bounceAngle = this.getBounceAngle(this.playerAi, this.ball);

        this.ball.velocity.x = this.ball.speed * -Math.cos(bounceAngle);
        this.ball.velocity.y = this.ball.speed * Math.sin(bounceAngle);
      }

      if (!this.isInBoundsX(this.ball)) {
        if (this.ball.position.x < this.canvasCenter.x && this.AiScoreboard) {
          this.playerAi.incrementScore();
          this.updateDomElement(this.AiScoreboard, this.playerAi.score);
        } else {
          this.player.incrementScore();
          this.updateDomElement(this.playerScoreboard, this.player.score);
        }

        this.startNewRound();
      }
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
    if (event.keyCode === 80) {
      if(!this.keyP) this.togglePause();
      this.keyP = true;
    }
  }

  onKeyUp(event) {
    if (event.keyCode === 65) this.keyLeft = false;
    if (event.keyCode === 68) this.keyRight = false;
    if (event.keyCode === 80) this.keyP = false;
  }

  onKeyPress() {
    if (this.isNewRound) {
      this.hideDomElement(this.startScreen);
      this.resume();

      this.isNewRound = false;
    }
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
    return box1.left < box2.right &&
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

  togglePause() {
    if (this.paused) {
      this.resume();
    } else if (!this.paused) {
      this.pause();
    }
  }

  pause() {
    this.paused = true;
    this.showDomElement(this.pauseScreen);
  }

  resume() {
    this.paused = false;
    this.hideDomElement(this.pauseScreen);
  }

  startNewRound() {
    this.player.setPosition(this.player.size.w, this.canvasCenter.y);
    this.playerAi.setPosition(this.canvas.width - this.player.size.w, this.canvasCenter.y);
    this.ball.setPosition(this.canvasCenter.x, this.canvasCenter.y);

    this.ball.setRandomVelocity();

    if (this.isWin(this.player) || this.isWin(this.playerAi)) {
      this.player.score = 0;
      this.playerAi.score = 0;

      this.updateDomElement(this.playerScoreboard, this.player.score);
      this.updateDomElement(this.AiScoreboard, this.playerAi.score);
      this.paused = true;
      this.isNewRound = true;
      this.showDomElement(this.startScreen);
    }
  }

  getBounceAngle(player, ball) {
    const distanceFromPaddleOrigin = ball.position.y - player.position.y;
    const normalizedDistance = distanceFromPaddleOrigin / (player.size.h / 2);
    const bounceAngle = normalizedDistance * (3 * (Math.PI / 12));

    return bounceAngle;
  }

  isWin(player) {
    return player.score === this.winLimit;
  }

  updateDomElement(element, text) {
    element.innerText = text;
  }

  showDomElement(element) {
    element.style.display = 'block';
  }

  hideDomElement(element) {
    element.style.display = 'none';
  }
}
