export default class Bug{
  constructor(x = 0, y = 0){
    this.pos = {x, y};
  }

  destroy(){
    console.log('destroy bug');
  }

  move(){
    console.log('move bug');
  }
}