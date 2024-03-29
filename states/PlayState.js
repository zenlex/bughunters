import Bug from '../components/Bug.js';
import Ship from '../components/Ship.js';
import Missile from '../components/Missile.js';
import LevelIntroState from './LevelIntroState.js';
import GameOverState from './GameOverState.js';

export default class PlayState {
  constructor(config, level, sprites) {
    this.config = config;
    this.level = level;

    //adjust speeds based on level
    const levelMultiplier = 1 + this.level * this.config.levelDifficultyMultiplier;
    this.shipSpeed = this.config.shipSpeed;
    this.bugInitialVelocity = this.config.bugInitialVelocity * levelMultiplier;
    this.bombRate = this.config.bombRate * levelMultiplier;
    this.bombMinVelocity = this.config.bombMinVelocity * levelMultiplier;
    this.bugVelocity = this.config.bugInitialVelocity;

    //store refs for game entities
    this.bugs = [];
    this.missiles = [];
    this.ship = null;
    this.sprites = sprites;
  }

  enter(game) {
    //init the bugs
    this.ship = new Ship(this.config.gameWidth / 2, game.gameBounds.bottom);
    const ranks = this.config.bugRanks;
    const files = this.config.bugFiles;
    const bugs = [];
    for (let rank = 0; rank < ranks; ++rank) {
      for (let file = 0; file < files; ++file) {
        bugs.push(new Bug((this.config.gameWidth / 2) + ((files / 2 - file) * 500 / files), game.gameBounds.top + 20 + rank * 40, rank, file, 'Bug'));
      }
    }
    this.bugCurrentVelocity = { x: -this.bugVelocity, y: 0 };
    this.bugNextVelocity = null;
    this.bugsAreDropping = false;
    this.bugCurrentDropDistance = 0;
    this.bugs = bugs;
  }

  update(game, dt) {
    //move ship
    if (game.pressedKeys['ArrowLeft']) {
      this.ship.x -= this.shipSpeed * dt;
    }
    if (game.pressedKeys['ArrowRight']) {
      this.ship.x += this.shipSpeed * dt;
    }
    if (game.pressedKeys['Space']) {
      this.fireMissile();
      delete game.pressedKeys['Space'];
      //debounce this
    }
    //ship boundary check
    if (this.ship.x < game.gameBounds.left) {
      this.ship.x = game.gameBounds.left;
    }
    if (this.ship.x > game.gameBounds.right) {
      this.ship.x = game.gameBounds.right;
    }

    //move bugs
    let hitLeft = false, hitRight = false, hitBottom = false;
    for (let i = 0; i < this.bugs.length; ++i) {
      const bug = this.bugs[i];
      const newx = bug.x + this.bugCurrentVelocity.x * dt;
      const newy = bug.y + this.bugCurrentVelocity.y * dt;
      if (hitLeft === false && newx - (bug.width / 2) < game.gameBounds.left) {
        hitLeft = true;
      }
      else if (hitRight === false && newx + (bug.width / 2) > game.gameBounds.right) {
        hitRight = true;
      }
      else if (hitBottom === false && newy > game.gameBounds.bottom - bug.height) {
        hitBottom = true;
      }

      if (!hitLeft && !hitRight && !hitBottom) {
        bug.x = newx;
        bug.y = newy;
      }
    }

    //update bug velocities
    if (this.bugsAreDropping) {
      this.bugCurrentDropDistance += this.bugCurrentVelocity.y * dt;
      if (this.bugCurrentDropDistance > this.config.bugDropDistance) {
        this.bugsAreDropping = false;
        this.bugCurrentVelocity = this.bugNextVelocity;
        this.bugCurrentDropDistance = 0;
      }
    }

    //if hit left edge - move down, right
    if (hitLeft) {
      this.bugVelocity += this.config.bugAcceleration;
      this.bugCurrentVelocity = { x: 0, y: this.bugVelocity };
      this.bugsAreDropping = true;
      this.bugNextVelocity = { x: this.bugVelocity, y: 0 };
    }

    //if hit right edge - move down, left
    if (hitRight) {
      this.bugVelocity += this.config.bugAcceleration;
      this.bugCurrentVelocity = { x: 0, y: this.bugVelocity };
      this.bugsAreDropping = true;
      this.bugNextVelocity = { x: -this.bugVelocity, y: 0 };
    }

    if (hitBottom) {
      game.lives = 0;
    }

    //move missiles
    for (let i = 0; i < this.missiles.length; ++i) {
      const missile = this.missiles[i];
      missile.y -= this.config.missileVelocity * dt;
      if (missile.y < 0) {
        // consider collecting indices to remove
        this.missiles.splice(i--, 1);
      }
    }



    //TODO - implement missile movement
    //TODO - collision detection between missles/bugs
    //TODO - collision detection between bugs / ship

    //TODO - implement bomb movement
    //TODO - collision detection between bombs / ship



    //failure condition
    if (game.lives <= 0) {
      game.moveToState(new GameOverState());
    }

    //victory condition
    if (this.bugs.length === 0) {
      game.score += this.level * 50;
      game.level += 1;
      game.moveToState(new LevelIntroState(game.level));
    }
  }

  fireMissile() {
    if (this.missiles.length < this.config.missileMaxFireRate) {
      console.log('Pew Pew------>');
      this.missiles.push(new Missile(this.ship.x, this.ship.y - this.ship.height, this.config.missileVelocity));
      console.log('missile array:', this.missiles);
    }
  }

  draw(game, ctx) {
    //clear canvas
    ctx.clearRect(0, 0, game.width, game.height);

    //draw ship
    ctx.fillStyle = '#999999';
    ctx.drawImage(this.sprites.shipSprite, this.ship.x - (this.ship.width / 2), this.ship.y - this.ship.height, this.ship.width, this.ship.height);

    //draw bugs
    for (let i = 0; i < this.bugs.length; ++i) {
      const bug = this.bugs[i];
      ctx.drawImage(this.sprites.bugSprite, bug.x - bug.width / 2, bug.y - bug.height / 2, bug.width, bug.height);
    }
    // draw missiles
    for (let i = 0; i < this.missiles.length; ++i) {
      const missile = this.missiles[i];
      ctx.drawImage(this.sprites.missileSprite, missile.x - missile.width / 2, missile.y - missile.height / 2);
    }

    //TODO draw bombs
  }

}