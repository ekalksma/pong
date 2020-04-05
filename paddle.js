class Paddle {
  constructor(position, size) {
    this.position = position;
    this.size = size;
    this.color = '#FF0000';
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x - this.size.w / 2,
                 this.position.y - this.size.h / 2,
                 this.size.w, this.size.h);
  }
}
