class Paddle extends Entity {
  constructor() {
    super({ w: 10, h: 50 });

    this.speed = 3;
    this.score = 0;
  }

  moveUp() {
    this.position.y -= this.speed;
  }

  moveDown() {
    this.position.y += this.speed;
  }

  incrementScore() {
    this.score++;
  }
}
