import Bug from '../components/Bug.js';
import Ship from '../components/Ship.js';
import LevelIntroState from './LevelIntroState.js';
import GameOverState from './GameOverState.js';

export default class PlayState{
  constructor(config, level){
    console.log(config);
    this.level = level;
    this.config = config;
        

    //adjust speeds based on level
    const levelMultiplier = 1 + this.level * this.config.levelDifficultyMultiplier;
    this.shipSpeed = this.config.shipSpeed;
    this.bugInitialVelocity = this.config.invaderInitialVelocity * levelMultiplier;
    this.bombRate = this.config.bombRate * levelMultiplier;
    this.bombMinVelocity = this.config.bombMinVelocity * levelMultiplier;

    //store refs for game entities
    this.bombs = [];
    this.missiles = [];
    this.bugs = [];
    this.ship = null;

  }

  enter(game){
    //init the bugs
    this.ship = new Ship(this.config.gameWidth / 2, game.gameBounds.bottom);
    const ranks = this.config.bugRanks;
    const files = this.config.bugFiles;
    const bugs = [];
    for(let rank = 0; rank < ranks; ++rank){
      for(let file = 0; file < files; ++file){
        this.bugs.push(new Bug((this.config.gameWidth / 2) + ((files / 2 - file) * 200 / files), game.gameBounds.top + rank * 20, rank, file, 'Bug'));
      }
    }
    this.bugCurrentVelocity = this.invaderInitialVelocity;
    this.bugVelocity = {x: -this.invaderVelocity, y: 0};
    this.bugNextVelocity = null;
    this.bugsAreDropping = false;
    console.log(bugs); 
    this.bugs = bugs; 
  }

  update(game, dt){
    //move ship
    if(game.pressedKeys['ArrowLeft']){
      this.ship.x -= this.shipSpeed * dt;
    }
    if(game.pressedKeys['ArrowRight']){
      this.ship.x += this.shipSpeed * dt;
    }
    if(game.pressedKeys['Space']){
      this.fireMissile();
    }
    //ship boundary check
    if(this.ship.x < game.gameBounds.left) {
      this.ship.x = game.gameBounds.left;
    }
    if(this.ship.x > game.gameBounds.right) {
      this.ship.x = game.gameBounds.right;
    }
    
    //move bugs
    let hitLeft = false, hitRight = false, hitBottom = false;
    for(let i = 0; i < this.bugs.length; ++i){
      const bug = this.bugs[i];
      const newx = bug.x + this.bugVelocity.x * dt;
      const newy = bug.y + this.bugVelocity.y * dt;
      if(hitLeft === false && newx < game.gameBounds.left){
        hitLeft = true;
      }
      else if(hitRight === false && newx > game.gameBounds.right) {
        hitRight = true;
      }
      else if(hitBottom === false && newy > game.gameBounds.bottom) {
        hitBottom = true;
      }

      if(!hitLeft && !hitRight && !hitBottom){
        bug.x = newx;
        bug.y = newy;
      }
    }
    
    //update bug velocities
    if (this.bugsAreDropping) {
      this.bugCurrentDropDistance += this.bugVelocity.y * dt;
      if(this.bugCurrentDropDistance > this.config.bugDropDistance){
        this.bugsAreDropping = false;
        this.bugVelocity = this.bugNextVelocity;
        this.bugCurrentDropDistance = 0;
      }
    }
    
    //if hit left edge - move down, right
    if(hitLeft) {
      this.bugCurrentVelocity += this.config.bugAcceleration;
      this.bugVelocity = {x: 0, y: this.bugCurrentVelocity};
      this.bugsAreDropping = true;
      this.bugNextVelocity = {x: this.bugCurrentVelocity, y: 0};
    }

    //if hit right edge - move down, left
    if(hitRight) {
      this.bugCurrentVelocity += this.config.bugAcceleration;
      this.bugVelocity = {x: 0, y: this.bugCurrentVelocity};
      this.bugsAreDropping = true;
      this.bugNextVelocity = {x: -this.bugCurrentVelocity, y: 0};
    }

    if(hitBottom){
      this.lives = 0;
    }

    //TODO - implement bomb movement

    //TODO - implement missile movement

    //TODO - collision detection between missles/bugs
    //TODO - collision detection between bugs / ship
    //TODO - collision detection between bombs / ship

    //failure condition
    if(game.lives <= 0){
      game.moveToState(new GameOverState());
    }

    //victory condition
    if(this.bugs.length === 0) {
      game.score += this.level * 50;
      game.level += 1;
      game.moveToState(new LevelIntroState(game.level));
    }
  }

  fireMissile(){
    //TODO - implement fireMissile;
    console.log('Pew Pew------>');
  }

  draw(game, ctx){
    //clear canvas
    ctx.clearRect(0, 0, game.width, game.height);
    
    //draw ship
    ctx.fillStyle = '#999999';
    ctx.fillRect(this.ship.x - (this.ship.width / 2), this.ship.y - (this.ship.height / 2), this.ship.width, this.ship.height);

    //draw bugs
    ctx.fillStyle = '#006600';
    for(let i = 0; i < this.bugs.length; ++i){
      const bug = this.bugs[i];
      ctx.fillRect(bug.x - bug.width / 2, bug.y - bug.height / 2, bug.width, bug.height);
    }
    //draw bumbs

    //draw missiles
  }
  
}