export default class Bug{
  constructor(x, y, rank, file, type){
    this.x = x;
    this.y = y;
    this.rank = rank;
    this.file = file;
    this.type = type;
    this.width = 32;
    this.height = 24;
  }
}