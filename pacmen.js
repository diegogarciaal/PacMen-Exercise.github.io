var pos = 0;
const pacArray = [
  ['Images/PacMan1.png', 'Images/PacMan2.png'],
  ['Images/PacMan3.png', 'Images/PacMan4.png']
];
var direction = 0;
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);

  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = pacArray[Math.floor(Math.random()*2)][Math.floor(Math.random()*2)];
  newimg.width = 100;

  // Set position using the 'px' unit
  newimg.style.left = position.x + 'px';
  newimg.style.top = position.y + 'px';

  game.appendChild(newimg);

  return {
    position,
    velocity,
    newimg
  };
}

function update() {
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    // Set left and top positions with the 'px' unit
    item.newimg.style.left = item.position.x + 'px';
    item.newimg.style.top = item.position.y + 'px';
  });

  setTimeout(update, 20);
}

function checkCollisions(item) {
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  ) {
    item.velocity.x = -item.velocity.x;
  }

  if (
    item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
    item.position.y + item.velocity.y < 0
  ) {
    item.velocity.y = -item.velocity.y;
  }
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}
