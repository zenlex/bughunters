import Game from './components/Game.js';
import AudioURL from './birdsong.mp3';

const canvas = document.querySelector('#gamecanvas');

const game = new Game(canvas);

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