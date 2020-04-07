class Ball {
  constructor(position, size) {
    this.position = position;
    this.size = size;
    this.color = '#FFFFFF';

    this.speed = { x: 0, y: 3 };
  }

  update() {
    this.position.y += this.speed.y;
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
      this.speed.y = -this.speed.y;
    } else if (this.position.y + this.size.h / 2 > canvas.height) {
      this.position.y = canvas.height - this.size.h / 2;
      this.speed.y = -this.speed.y;
    }
  }
}
