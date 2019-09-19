/**
 *  handleShipAnimation moves the ship based on its direction and
 *    keyboard control
 *
 */
var highscore = 0;
var scoreMult = 1;

function handleShipAnimation() {
  if (CONTROLS.ship.forward) {
    var radians = (Math.PI / 180) * SPACE_SHIP.rotation,
        cos = Math.cos(radians),
        sin = Math.sin(radians);
    SPACE_SHIP.x += SPACE_SHIP.speed * sin;
    SPACE_SHIP.y +=  SPACE_SHIP.speed * cos;
  }
  if (CONTROLS.ship.backward) {
    var radians = (Math.PI / 180) * SPACE_SHIP.rotation,
        cos = Math.cos(radians),
        sin = Math.sin(radians);
    SPACE_SHIP.x -= SPACE_SHIP.speed * sin;
    SPACE_SHIP.y -=  SPACE_SHIP.speed * cos;
  }
  if (CONTROLS.ship.rotateClockwise) {
    SPACE_SHIP.rotation -= 4;
  }
  if (CONTROLS.ship.rotateCounterClockwise) {
    SPACE_SHIP.rotation += 4;
  }

  // Check if ship is leaving the boundary, if so, switch sides
  if (SPACE_SHIP.x > GAME.canvas.width) {
    SPACE_SHIP.x = 0;
  } else if (SPACE_SHIP.x < 0) {
    SPACE_SHIP.x = 600;
  } else if (SPACE_SHIP.y > GAME.canvas.height) {
    SPACE_SHIP.y = 0;
  } else if (SPACE_SHIP.y < 0) {
    SPACE_SHIP.y = 300;
  }
}

function RenderNewObject(context) {
  context.fillRect(NEW_OBJECT.x, NEW_OBJECT.y, 25, 25);
}

function HandleNewObjectMovement() {

  if (NEW_OBJECT.x > GAME.canvas.width-25) {
    NEW_OBJECT.i *= -1.05;
    NEW_OBJECT.j *= 1.05;
    scoreMult += 1;
  } else if (NEW_OBJECT.x < 0) {
    NEW_OBJECT.i *=-1.05;
    NEW_OBJECT.j *= 1.05;
    scoreMult +=1;
  } else if (NEW_OBJECT.y > GAME.canvas.height-25) {
    NEW_OBJECT.i *=1.05;
    NEW_OBJECT.j *= -1.05;
    scoreMult +=1;
  } else if (NEW_OBJECT.y < 0) {
    NEW_OBJECT.i *=1.05;
    NEW_OBJECT.j *= -1.05;
    scoreMult +=1;
  }
  NEW_OBJECT.x += (1  *NEW_OBJECT.i);
  NEW_OBJECT.y += (1*NEW_OBJECT.j);
  if (NEW_OBJECT.i > 600){
    GAME.started = false;
  }

//if the spaceship is touching the object, increase the score
  if (NEW_OBJECT.x <= SPACE_SHIP.x && NEW_OBJECT.x + 25 >= SPACE_SHIP.x && NEW_OBJECT.y <= SPACE_SHIP.y && NEW_OBJECT.y + 25>= SPACE_SHIP.y){
    highscore += (1* scoreMult);
  }
}

function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');

  if (GAME.started) {

    // 1 - Reposition the objects
    handleShipAnimation();
    HandleNewObjectMovement();

    // 2 - Clear the CANVAS
    context.clearRect(0, 0, 600, 300);
    context.fillText("Score: " + highscore, 530, 20)
    // 3 - Draw new items
    RenderSpaceship(context);
    RenderNewObject(context);

  } else {
    context.font = "30px Arial";
    context.fillText("Game Over", 220, 150);
  }
  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(runGame);
