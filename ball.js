class Ball {
  constructor(position, size) {
    this.position = position;
    this.size = size;
    this.color = '#FFFFFF';

    this.speed = 5; // px/s
    this.velocity = { x: this.speed, y: 0 };
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x - this.size.w / 2,
                 this.position.y - this.size.h / 2,
                 this.size.w, this.size.h);
  }

  handleOutOfBounds(canvas) {
    if (this.position.y - this.size.h / 2 < 0) {
      this.position.y = this.size.h / 2;
      this.velocity.y = -this.velocity.y;
    } else if (this.position.y + this.size.h / 2 > canvas.height) {
      this.position.y = canvas.height - this.size.h / 2;
      this.velocity.y = -this.velocity.y;
    }
  }
}
