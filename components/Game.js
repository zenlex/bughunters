import WelcomeState from '../states/WelcomeState.js';
export default class Game{
  constructor(canvas, config, sprites){
    console.log('game arg sprites', sprites);
    //state variables
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d'),
    this.lastTime;
    this.timeDelta = 0;
    this.pressedKeys = {};
    this.stateStack = [];
    this.level = 1;
    this.sprites = sprites;
    console.log('game sprites:', this.sprites);
    // game settings
    this.config = config || {
      bomRate: 0.05,
      bombMinVelocity: 50,
      bombMaxVelocity: 50,
      bugInitialVelocity: 100,
      bugAcceleration: 0,
      bugDropDistance: 20,
      missileVelocity: 120,
      missileMaxFireRate: 2,
      score: 0,
      lives: 3,
      fps : 50, //game loop speed
      bugRanks: 5,
      bugFiles: 10,
      shipSpeed: 120,
      levelDifficultyMultiplier: 0.2,
      pointsPerBug: 5,
      gameWidth: this.width,
      gameHeight: this.height,
    };

    //function binds
    this.animate = this.animate.bind(this);
  }

  currentState(){
    return this.stateStack.length > 0 ? this.stateStack[this.stateStack.length - 1] : null;
  }

  moveToState(state){
    if(this.currentState() && this.currentState.leave){
      this.currentState().leave(this);
      this.stateStack.pop();
    }

    if(state.enter){
      state.enter(this);
    }

    this.stateStack.pop();
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
      this.timeDelta = (time - this.lastTime) / 1000;
    } else this.timeDelta = 0;
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
  
  init(canvas){
    this.width = canvas.width;
    this.height = canvas.height;
    this.config.gameWidth = canvas.width;
    this.config.gameHeight = canvas.height;
    this.gameBounds = {
      top: 0,
      right: this.width,
      bottom: this.height,
      left: 0
    };
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
    this.init(this.canvas);
    this.moveToState(new WelcomeState(this.sprites));
    this.animate();
  }

}
