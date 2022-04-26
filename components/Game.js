
export default class Game{
  constructor(canvas, score = 0, lives = 3, speed = 1, worldWidth = 640, worldHeight = 680 ){
    this.score = score;
    this.lives = lives;
    this.speed = speed;
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.lastTime;
    this.timeDelta = 0;
    this.bugs = [];
    this.missiles = [];
    this.GUTTER_HEIGHT = 50;
    this.leftPressed = false;
    this.rightPressed = false;
    this.animate = this.animate.bind(this);
    this.drawShip = this.drawShip.bind(this);
    this.keyPressHandler = this.keyPressHandler.bind(this);
    // this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  }

  drawBugs(){
    // console.log('draw bugs');
  }

  drawShip(){
    this.ctx.beginPath();
    this.ctx.rect(this.ship.pos.x, this.ship.pos.y, this.ship.width, this.ship.height);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
    this.ctx.closePath();
    console.log(this.leftPressed);
    if(this.leftPressed) console.log('moving left');
    if(this.rightPressed) console.log('moving right');
    console.log('new ship position: ', JSON.stringify(this.ship));
  }

  drawMissiles(){
    // console.log('draw missiles');
  }
  
  drawScore(){
    // console.log('draw score');
  }

  drawLives(){
    // console.log('draw lives');
  }

  animate(time){
    if(this.lastTime){
      this.timeDelta = time - this.lastTime;
      this.lastTime = time;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBugs();
    this.drawShip();
    this.drawMissiles();
    this.drawScore();
    this.drawLives();
    window.requestAnimationFrame(this.animate);
  }
  
  init(){
    this.score = 0;
    this.lives = 3;
    this.lastTime = undefined;
    this.timeDelta = 0;
    this.clearListeners();
  }

  keyPressHandler(e){
    console.log('KEY PRESSED');
    switch(e.code){
    case 'ArrowLeft':
      e.preventDefault();
      this.leftPressed = true;
      this.rightPressed = false;
      console.log({left: this.leftPressed, right: this.rightPressed});
      break;
    case 'ArrowRight':
      e.preventDefault();
      this.rightPressed = true;
      this.leftPressed = false;
      console.log({left: this.leftPressed, right: this.rightPressed});
      break;
    }
  }

  activateListeners(){
    document.addEventListener('keydown', this.keyPressHandler);
    document.addEventListener('mousemove', this.mouseMoveHandler);
  }

  clearListeners(){
    document.removeEventListener('keypress', this.keyPressHandler);
    document.removeEventListener('mousemove', this.mouseMoveHandler);
  }

  start(){
    console.log('start game');
    this.init();
    this.activateListeners();
    this.animate();
  }

  spawn(type, x = 0, y = 0, ref){
    switch(type){
    case 'bug':
      this.bugs.push(ref);
      break;
    case 'ship':
      console.log('ship ref: ', ref);
      this.ship = ref;
      break;
    default:
      throw new Error(`Unhandled Spawn Type: ${type}`);
    }
    console.log(`Spawn ${type}, pos: ${{x,y}}`);
  }

  destroy(element){
    console.log(`destroy element ${element}`);
  }

  collisionDetection(elem1, elem2, ...rest){
    console.log(`collision detection ${elem1}, ${elem2}, ${rest}`);
  }
}
