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
}
