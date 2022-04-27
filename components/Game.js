import WelcomeState from '../states/WelcomeState.js';
export default class Game{
  constructor(canvas){
    this.score = 0;
    this.MAX_LIVES = 3;
    this.lives = this.MAX_LIVES;
    this.level = 1;
    this.fps = 30; //game loop speed
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');
    this.lastTime;
    this.timeDelta = 0;
    this.bugs = [];
    this.missiles = [];
    this.GUTTER_HEIGHT = 50;
    this.stateStack = [];
    this.pressedKeys = {};
    this.ship = {pos:{x:canvas.width / 2, y: this.GUTTER_HEIGHT}};
    this.animate = this.animate.bind(this);
    // this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  }

  currentState(){
    return this.stateStack.length > 0 ? this.stateStack[this.stateStack.length - 1] : null;
  }

  moveToState(state){
    if(this.currentState()){
      if(this.currentState().leave){
        this.currentState.leave(this);
      }
      this.stateStack.pop();
    }

    if(state.enter){
      state.enter(this);
    }

    this.stateStack.push(state);
  }
  
  pushState(state){
    if(state.enter){
      state.enter(this);
    }
    this.stateStack.push(state);
  }

  popState(state){
    if(state.leave){
      state.leave(this);
    }
    this.stateStack.pop();
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
    }
    this.lastTime = time;
    const currentState = this.currentState();
    if(currentState){
      if(currentState.update){
        currentState.update(this, this.timeDelta);
      }
      if(currentState.draw){
        currentState.draw(this, this.ctx);
      }
    }
    // this.drawBugs();
    // this.drawShip();
    // this.drawMissiles();
    // this.drawScore();
    // this.drawLives();
    window.requestAnimationFrame(this.animate);
  }
  
  init(){
    this.score = 0;
    this.lives = 3;
    this.lastTime = undefined;
    this.timeDelta = 0;
    // this.clearListeners();
  }

  keyDown(game, keycode){
    this.pressedKeys[keycode] = true;
    if(this.currentState() && this.currentState().keyDown){
      this.currentState().keyDown(game, keycode);
    }
  }

  keyUp(game, keycode){
    delete this.pressedKeys[keycode];
    if(this.currentState() && this.currentState().keyUp){
      this.currentState().keyUp(game, keycode);
    }
  }

  start(){
    // this.activateListeners();
    this.moveToState(new WelcomeState());
    this.init();
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
