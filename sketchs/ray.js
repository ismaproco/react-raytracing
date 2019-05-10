export class Ray {
  constructor(p, x1, y1, x2, y2) {
    this.position = p.createVector(x1, y1);
    this.direction = p.createVector(x2, y2);
  }

  draw(p, r = 255, g = 255, b = 255) {
    p.stroke(r, g, b);
    p.push();
    p.line(this.position.x, this.position.y, this.direction.x, this.direction.y);
    p.pop();
  }

  cast(wall) {
    const x1 = wall.x1;
    const x2 = wall.x2;
    const x3 = this.position.x;
    const x4 = this.direction.x;

    const y1 = wall.y1;
    const y2 = wall.y2;
    const y3 = this.position.y;
    const y4 = this.direction.y;
    
    const tnum = (x1-x3)*(y3-y4)-(y1 - y3)*(x3-x4);
    const tden = (x1-x2)*(y3-y4)-(y1- y2)*(x3-x4);
    if (tden === 0) {
      return;
    }

    const t = tnum/tden;
    const unum = (x1-x2)*(y1-y3)-(y1 - y2)*(x1-x3);

    const u = -(unum/tden);

    if ((t >= 0 && t <= 1) && u > 0 ) {
      return true;
    }
    return;
  }
}