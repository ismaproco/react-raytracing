import {Ray} from './ray';
export class Actor {
  constructor(p, x, y) {
    this.position = p.createVector(x,y);
    this.rays = [];
    this.p = p;
    for(let i = 0; i < 360; i+=1) {
      this.rays.push(new Ray(this.p, this.position.x, this.position.y, i));
    }
  }

  draw(wall) {
    this.rays.forEach(ray => {
      const intersectPosition = ray.cast(wall);
      if (intersectPosition ) {
        ray.draw(255,0,0,intersectPosition.x, intersectPosition.y);
      }
    });
  }
}