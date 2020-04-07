class Paddle {
  constructor(position, size) {
    this.position = position;
    this.size = size;
    this.color = '#FFFFFF';
    this.speed = 3;
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
    if (this.position.y + this.size.h / 2 > canvas.height) this.position.y = canvas.height - this.size.h / 2;
    else if (this.position.y - this.size.h / 2 < 0) this.position.y = this.size.h / 2;
  }

  moveUp() {
    this.position.y -= this.speed;
  }

  moveDown() {
    this.position.y += this.speed;
  }
}
