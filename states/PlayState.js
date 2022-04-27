import Ship from '../components/Ship';

export default class PlayState{
  constructor(config, level){
    this.level = level;
    this.config = config;
    this.ship = new Ship(config.gameWidth / 2, config.gameBounds.bottom);

    const levelMultiplier = 1 + this.level * this.config.levelDifficultyMultiplier;
    this.shipSpeed = this.config.shipSpeed;
    this.invaderInitialVelocity = this.config.invaderInitialVelocity * levelMultiplier;
    this.bombRate = this.config.bombRate * levelMultiplier;
    this.bombMinVelocity = this.config.bombMinVelocity * levelMultiplier;
  }

  draw(){
    console.log('playstate.draw()');
  }

  update(){
    console.log('playstate.update()');
  }
}