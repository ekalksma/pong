class Paddle {
  constructor(position, size) {
    this.position = position;
    this.size = size;
    this.color = '#FFFFFF';
    this.speed = 3;
    this.score = 0;
  }

  update() {
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x - this.size.w / 2,
                 this.position.y - this.size.h / 2,
                 this.size.w, this.size.h);
  }

  moveUp() {
    this.position.y -= this.speed;
  }

  moveDown() {
    this.position.y += this.speed;
  }

  incrementScore() {
    this.score++;
    console.log(this.score);
  }
}
