import { Wall } from './wall';
import { Ray } from './ray';

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
      
      const ray = new Ray(p, 100, 350, p.mouseX , p.mouseY);
      const result = ray.cast(wall);
      if(result){
        ray.draw(p, 255,255,0);
      } else {
        ray.draw(p, 0,255,0);
      }
    }

    p.myCustomRedrawAccordingToNewPropsHandler = redrawProps;
}