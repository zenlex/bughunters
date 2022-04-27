import LevelIntroState from './LevelIntroState.js';

export default class WelcomeState{
  draw(game, ctx){
    const canvas = game.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font ='30px Arial';
    ctx.fillStyle = '#000000';
    ctx.textBaseline = 'center';
    ctx.textAlign = 'center';
    ctx.fillText('Bug Hunters', game.width / 2, game.height / 2 - 50);
    ctx.font = '16px Arial';
    ctx.fillText('Press "Space" to Start', game.width / 2, game.height / 2);
  }

  keyDown(game, keycode){
    if(keycode === 'Space'){
      game.pressedKeys[keycode] = true;
      game.moveToState(new LevelIntroState(game.level));
    }
  }
}