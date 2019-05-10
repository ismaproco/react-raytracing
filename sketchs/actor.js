import { Ray } from './ray';
export class Actor {
  constructor(p, x = 0, y = 0) {
    this.rays = [];
    this.p = p;
    this.position = p.createVector(x, y);
    for (let i = 0; i < 360; i += 0.4) {
      this.rays.push(new Ray(this.p, this.position.x, this.position.y, i));
    }
  }

  updatePosition(x, y) {
    this.position = this.p.createVector(x, y);
    this.rays.forEach(ray => ray.update(this.position.x, this.position.y));
  }

  draw(walls) {
    this.rays.forEach(ray => {
      const intersectPosition = this.calculatePointMinimalDistance(ray, walls);
      if (intersectPosition) {
        ray.draw(10, 10, 235, intersectPosition.x, intersectPosition.y);
      } else {
        ray.draw(255, 255, 255);
      }
    });
  }


  calculatePointMinimalDistance(ray, walls) {
    let record = Infinity;
    let recordPosition;
    for (let i = 0; i < walls.length; i++) {
      const intersectPosition = ray.cast(walls[i]);
      if (intersectPosition) {
        const delta = Math.sqrt(Math.pow(intersectPosition.x - ray.position.x, 2)
          + Math.pow(intersectPosition.y - ray.position.y, 2));

        if (delta < record) {
          record = delta;
          recordPosition = intersectPosition;
        }
      }
    }

    return recordPosition;
  }
}