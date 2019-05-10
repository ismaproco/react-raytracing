import React, { Component } from 'react';
import { render } from 'react-dom';
import * as p5 from 'p5';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketchs/sketch.js'
import Hello from './Hello';
import './style.css';

class App extends Component {
  constructor(){
    super();
    this.state = {color:[Math.random()*255, Math.random()*255, Math.random()*255]};
    this.randomColor = this.randomColor.bind(this);
  }

  randomColor(){
    this.setState({color:[Math.random()*255, Math.random()*255, Math.random()*255]}
    )
  }

  render() {
    return (
      <div className="p5-wrapper">
        <P5Wrapper sketch={sketch} color={this.state.color}></P5Wrapper>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
