class Ball {
  constructor(position, size) {
    this.position = position;
    this.size = size;
    this.color = '#FF0000';
  }

  update() {
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x - this.size.w / 2,
                 this.position.y - this.size.h / 2,
                 this.size.w, this.size.h);
  }

  handleOutOfBounds(canvas) {
    if (this.position.y + this.radius > canvas.height) {
      this.position.y = canvas.height - this.radius;
    } else if (this.position.y - this.size.h / 2 < 0) {
      this.position.y = this.size.h / 2;
    }
  }
}
