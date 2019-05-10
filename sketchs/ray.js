export class Ray {
  constructor(p, x1, y1, angle) {
    this.position = p.createVector(x1, y1);
    const angleRad = angle*Math.PI/180;
    this.direction = p.createVector(x1 + Math.cos(angleRad)*100, y1 + Math.sin(angleRad)*100);
    this.p = p;
  }

  draw(r = 255, g = 255, b = 255, ix, iy) {
    this.p.stroke(r, g, b);
    this.p.push();
    this.p.line(this.position.x, this.position.y, ix || this.direction.x, iy || this.direction.y);
    this.p.pop();
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
      const px = x1+t*(x2-x1);
      const py = y1 + t*(y2-y1)
      return this.p.createVector(px, py);
    }
    return;
  }
}