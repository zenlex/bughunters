export default class Missile{
  constructor(x = 0, y = 0, length = 100, speed = 1){
    this.pos={x, y};
    this.length = length,
    this.speed = speed;
  }

  destroy(){
    console.log('destroy missile');
  }

  move(){
    console.log('move missile');
  }
}