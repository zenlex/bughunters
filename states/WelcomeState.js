import LevelIntroState from './LevelIntroState.js';

export default class WelcomeState{
  draw(game, ctx){
    const canvas = game.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font ='64px Brush Script MT';
    ctx.fillStyle = '#000000';
    ctx.textBaseline = 'center';
    ctx.textAlign = 'center';
    ctx.fillText('Bug Hunters', game.width / 2, game.height / 2 - 200);
    ctx.font = '32px Brush Script MT';
    ctx.fillText('Press "Space" to Start', game.width / 2, game.height / 2 - 160);
    ctx.fillText('Use <- and -> to Move and "Space" to Shoot', game.width / 2, game.height / 2 - 120);
  }

  keyDown(game, keycode){
    if(keycode === 'Space'){
      game.pressedKeys[keycode] = true;
      game.moveToState(new LevelIntroState(game.level));
    }
  }
}