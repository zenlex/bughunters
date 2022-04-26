import Game from './components/Game.js';
import Ship from './components/Ship.js';
import Missile from './components/Missile.js';
import Bug from './components/Bug.js';

const NUM_BUGS = 10;
const BUG_SIZE = 32;
const canvas = document.querySelector('#gamecanvas');

const game = new Game(canvas);
const seedBugs = Array(NUM_BUGS)
  .fill().map((_, index) => new Bug(index * BUG_SIZE, index * BUG_SIZE));

seedBugs.forEach(bug => game.spawn('bug', bug.pos.x, bug.pos.y, bug));

const ship = new Ship();

game.spawn('ship', 0, 0, ship);

game.start();