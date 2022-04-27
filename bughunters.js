import Game from './components/Game.js';

const canvas = document.querySelector('#gamecanvas');

const game = new Game(canvas);

game.start();

//add control listeners
window.addEventListener('keydown', (e) => {
  const keycode = e.code;
  if(keycode === 'ArrowLeft' || keycode === 'ArrowRight' || keycode === 'Space'){
    e.preventDefault();
  }
  game.keyDown(game, keycode);
});

window.addEventListener('keyup', (e) => {
  const keycode = e.code;
  game.keyUp(game, keycode);
});