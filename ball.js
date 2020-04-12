class Ball extends Entity {
  constructor() {
    super({ w: 10, h: 10 });

    this.speed = 5;
    this.velocity = { x: this.speed, y: 0 };
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  setRandomVelocity() {
    this.velocity.y = 0;

    if (Math.random() < 0.495) {
      this.velocity.x *= -1;
    }
  }
}
