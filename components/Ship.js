export default class Ship{
  constructor(x = 0, y = 0){
    this.pos={x, y};
    this.width = 32;
    this.height = 32;
  }

  destroy(){
    console.log('destroy ship');
  }

  shoot(){
    console.log('shoot missile');
  }

  move(){
    console.log('move ship');
  }
}