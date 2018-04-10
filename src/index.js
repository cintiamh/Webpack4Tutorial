import _ from 'lodash';
import printMe from './print';
import './style.css';
import logo from './download.png';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  var myIcon = new Image();
  myIcon.src = logo;

  element.appendChild(myIcon);

  btn.innerHTML = 'Click me and check the console';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
