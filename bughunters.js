import Game from './components/Game.js';
// import Ship from './components/Ship.js';
// import Missile from './components/Missile.js';
// import Bug from './components/Bug.js';

// const NUM_BUGS = 10;
// const BUG_SIZE = 32;
const canvas = document.querySelector('#gamecanvas');

// const seedBugs = Array(NUM_BUGS)
//   .fill().map((_, index) => new Bug(index * BUG_SIZE, index * BUG_SIZE));

// seedBugs.forEach(bug => game.spawn('bug', bug.pos.x, bug.pos.y, bug));

const game = new Game(canvas, gameLoop);
const ctx = game.canvas.getContext('2d');

function gameLoop(){
  let currentState = game.currentState();
  if(currentState){
    if(currentState.update){
      currentState.update(game);
    }
    if(currentState.draw){
      currentState.draw(game, ctx);
    }
  }
}

game.start();

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