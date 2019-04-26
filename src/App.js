import React from 'react';
import Button from '@material-ui/core/Button';

import logo from './logo.svg';
import './App.css';

var Tesseract = window.Tesseract;

class App extends React.Component {
  componentDidMount() {
    this._renderCanvas();
  }

  _renderCanvas() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

    var painting = document.getElementById('paint');
    var paint_style = getComputedStyle(painting);
    canvas.width = parseInt(paint_style.getPropertyValue('width'));
    canvas.height = parseInt(paint_style.getPropertyValue('height'));

    var mouse = { x: 0, y: 0 };

    canvas.addEventListener(
      'mousemove',
      function(e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#00CC99';

    canvas.addEventListener(
      'mousedown',
      function(e) {
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);

        canvas.addEventListener('mousemove', onPaint, false);
      },
      false
    );

    canvas.addEventListener(
      'mouseup',
      function() {
        canvas.removeEventListener('mousemove', onPaint, false);
      },
      false
    );

    var onPaint = function() {
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    };
  }

  _checkResult = data => {
    Tesseract.recognize(data, {
      tessedit_char_whitelist: '0123456789'
    }).then(function(result) {
      console.log(result.text);
    });
  };

  _processResult = () => {
    var canvas = document.getElementById('myCanvas');
    var dataURL = canvas.getContext('2d');
    console.log(dataURL);
    this._checkResult(dataURL);
  };

  render() {
    return (
      <div className="app">
        <header className="app-header" />
        <section>
          <div id="paint">
            <canvas id="myCanvas" />
          </div>
        </section>
        <footer className="app-header">
          <Button onClick={this._processResult}>Check</Button>
        </footer>
      </div>
    );
  }
}

export default App;
