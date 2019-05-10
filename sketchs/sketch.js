import { Wall } from './wall';
import { Ray } from './ray';
import {Actor} from './actor'

export default function sketch(p){
    let canvas;
    let props;

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
    }

    p.draw = () => {
      p.background('black');
      const wall = new Wall(350, 230, 350 , 530);
      wall.draw(p);
      const angle = 360;
      //const ray = new Ray(p, 100, 350, 359);
      const actor = new Actor(p, 100, 350);
      actor.draw(wall);
    }

    p.myCustomRedrawAccordingToNewPropsHandler = redrawProps;
}