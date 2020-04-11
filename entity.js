class Entity {
  constructor(size) {
    this.size = size;
    this.position = { x: 0, y: 0 };
    this.color = '#FFFFFF';
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x - this.size.w / 2,
                 this.position.y - this.size.h / 2,
                 this.size.w, this.size.h);
  }

  get left() {
    return this.position.x - this.size.w / 2;
  }

  get right() {
    return this.position.x + this.size.w / 2;
  }

  get top() {
    return this.position.y + this.size.h / 2;
  }

  get bottom() {
    return this.position.y - this.size.h / 2;
  }

  setPosition(x, y) {
    this.position = { x, y };
  }
}
