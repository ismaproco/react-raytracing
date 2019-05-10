import { Wall } from './wall';
import { Ray } from './ray';
import { Actor } from './actor'

export default function sketch(p) {
  let canvas;
  let props;
  const walls = [];
  const actor;

  const redrawProps = (newProps) => {
    props = newProps;
    if (canvas) {
      p.fill(newProps.color);
    }
  }

  const onResize = () => {
    const canvasDom = canvas.canvas;
    canvasDom.height = window.innerHeight;
    canvasDom.width = window.innerWidth;
    canvasDom.style.width = `${window.innerWidth}px`;
    canvasDom.style.height = `${window.innerHeight}px`;
    p.setup();
    redrawProps(props);
  }

  window.onresize = onResize;

  p.setup = () => {
    canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    walls = []
    for (let i = 0; i < 2; i++) {
      walls.push(new Wall(Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight))
    }
    actor = new Actor(p);
  }

  p.draw = () => {
    p.background('black');
    walls.forEach(wall => wall.draw(p))
    actor.updatePosition(p.mouseX, p.mouseY);
    actor.draw(walls);
  }

  p.myCustomRedrawAccordingToNewPropsHandler = redrawProps;
}