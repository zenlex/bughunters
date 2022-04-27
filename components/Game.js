import WelcomeState from '../states/WelcomeState.js';
export default class Game{
  constructor(canvas, config){
    //status variables
    this.ctx = canvas.getContext('2d'),
    this.canvas = canvas,
    this.width = canvas.width,
    this.height = canvas.height,
    this.gameBounds = {
      top: 0,
      right: this.width,
      bottom: this.height,
      left: 0
    };
    this.lastTime;
    this.timeDelta = 0;
    this.pressedKeys = {};
    this.stateStack = [];
    
    // game settings
    this.config = config || {
      bomRate: 0.05,
      bombMinVelocity: 50,
      bombMaxVelocity: 50,
      invaderInitialVelocity: 25,
      invaderAcceleration: 0,
      invaderDropDistance: 20,
      missileVelocity: 120,
      missileMaxFireRate: 2,
      score: 0,
      lives: 3,
      level: 1,
      fps : 50, //game loop speed
      invaderRanks: 5,
      invaderFiles: 10,
      shipSpeed: 120,
      levelDifficultyMultiplier: 0.2,
      pointsPerInvader: 5,
      gameWidth: this.width,
      gameHeight: this.height,
      gameBounds: this.gameBounds
    };

    //function binds
    this.animate = this.animate.bind(this);
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
