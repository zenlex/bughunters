import PlayState from './PlayState.js';
export default class LevelIntroState {
  constructor(level, sprites) {
    this.level = level;
    this.countdownmessage = 3;

    this.sprites = sprites;
    // console.log('introstate sprites', this.sprites);
  }

  draw(game, ctx) {
    ctx.clearRect(0, 0, game.width, game.height);
    ctx.font = '48px Brush Script MT';
    ctx.fillStyle = 'brown';
    ctx.textBaseline = 'center';
    ctx.textAlign = 'center';
    ctx.fillText(`Level ${this.level}`, game.width / 2, game.height / 2 - 200);
    ctx.font = '36px Brush Script MT';
    ctx.fillText(`Ready in ${this.countdownmessage}`, game.width / 2, game.height / 2 - 150);
  }

  update(game, dt) {
    if (!this.countdown) this.countdown = 3;
    this.countdown -= dt;
    if (this.countdown < 2) this.countdownmessage = 2;

    if (this.countdown < 1) this.countdownmessage = 1;

    if (this.countdown <= 0) game.moveToState(new PlayState(game.config, this.level, this.sprites));

  }
}