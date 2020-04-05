class Paddle {
  constructor(position, size, canvasHeight, keyCodeLeft, keyCodeRight) {
    this.position = position;
    this.size = size;
    const maxBoundary = canvasHeight;
    this.color = '#FF0000';
    this.speed = 3;
    this.boundary = {min: 0, max: maxBoundary}
    this.keyCodeLeft = keyCodeLeft;
    this.keyCodeRight = keyCodeRight;
    this.keyLeft = false;
    this.keyRight = false;

    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x - this.size.w / 2,
                 this.position.y - this.size.h / 2,
                 this.size.w, this.size.h);
  }

  update() {
    this.calcPosition();
  }

  calcPosition() {
    if(this.keyLeft){
      this.position.y += this.speed;
      if(this.position.y + this.size.h / 2 > this.boundary.max) this.position.y = this.boundary.max - this.size.h / 2;
    }
    if(this.keyRight){
      this.position.y -= this.speed;
      if(this.position.y - this.size.h / 2 < this.boundary.min) this.position.y = this.boundary.min + this.size.h / 2;
    }
  }

  onKeyDown(event) {
    if (event.keyCode === this.keyCodeLeft) this.keyLeft = true;
        else if (event.keyCode === this.keyCodeRight) this.keyRight = true;
  }

  onKeyUp(event) {
    if (event.keyCode === this.keyCodeLeft) this.keyLeft = false;
        else if (event.keyCode === this.keyCodeRight) this.keyRight = false;
  }
}
