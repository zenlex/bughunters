import Game from './components/Game.js';
import AudioURL from 'url:./birdsong.mp3';
import bugSpriteImg from './img/sprite-bug.png';
import shipSpriteImg from './img/sprite-butterfly.png';

//TODO reafctor/optimize asset loading and handle mime type issues with deployment bundle

const bugSprite = new Image();
bugSprite.src = bugSpriteImg;

const shipSprite = new Image();
shipSprite.src = shipSpriteImg;
const canvas = document.querySelector('#gamecanvas');

const sprites = {bugSprite, shipSprite};
const game = new Game(canvas, null, sprites);

game.start();

//add control listeners
window.addEventListener('keydown', (e) => {
  const code = e.code;
  if(code === 'ArrowLeft' || code === 'ArrowRight' || code === 'Space'){
    e.preventDefault();
  }
  game.keyDown(game, code);
});

window.addEventListener('keyup', (e) => {
  const code = e.code;
  game.keyUp(game, code);
});

const audio = new Audio(AudioURL);
let birdsPlaying = false;
document.onclick = function() {
  birdsPlaying ? audio.pause() : audio.play();
};

audio.onplaying = () => {
  birdsPlaying = true;
};

audio.onpause = () => {
  birdsPlaying = false;
};