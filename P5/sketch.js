const PLAY = 1;
const END = 2;
var gamestate = 1;
var ship;
var asteroids = [];
var lasers = [];
var points = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (var i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  if(gamestate === 1){
  background(0);
 
  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
     //console.log("hit") 
     gamestate = 2;
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (var j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].r > 10) {
            var newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
            points+=1
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);

          break;
        }
      }
    }
  }
    push()
  fill(255);
  text(points,100,100)
  pop()

  console.log(lasers.length);

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
  }
  if(gamestate === 2){
    background(0);
    fill(255)
    textSize(96);
    text("HIT BY ASTEROID",200,410);
    
  }
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() {
  if (key == ' ') {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(true);
  }
}
