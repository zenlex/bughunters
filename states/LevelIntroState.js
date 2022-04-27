import PlayState from './PlayState.js';
export default class LevelIntroState{
  constructor(level){
    this.level = level;
    this.countdownmessage = 3;
  }

  draw(game, ctx){
    ctx.clearRect(0, 0, game.width, game.height);
    ctx.font = '36px Arial';
    ctx.fillStyle = '#000000';
    ctx.textBaseline = 'center';
    ctx.textAlign = 'center';
    ctx.fillText(`Level ${this.level}`, game.width / 2, game.height / 2 - 50);
    ctx.font = '24px Arial';
    ctx.fillText(`Ready in ${this.countdownmessage}`, game.width / 2, game.height / 2 );
  }

  update(game, time){
    if(!this.countdown) this.countdown = 3;
    if(!this.initTime) this.initTime = time;
    const dt = time - this.initTime;
    this.countdown -=dt ;
    console.log({dt, countdown: this.countdown});
    if(this.countdown < 2) this.countdownmessage = 2;

    if(this.countdown < 1) this.countdownmessage = 1;

    if(this.countdown <= 0) game.moveToState(new PlayState(game, this.level));

  }
}