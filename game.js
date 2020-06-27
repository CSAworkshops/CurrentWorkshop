var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {},
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

var hlf;
var cursors;
var speed;
var step;

function preload() {
  this.load.image("firecar", "firecar.png");
}

function create() {
  hlf = this.physics.add.image(200, 200, "firecar");
  cursors = this.input.keyboard.createCursorKeys();
  speed = 0;
  step = 20;
}

function update() {
  if (cursors.right.isDown) {
    speed += step;
  } else if (cursors.left.isDown) {
    speed -= step;
  }

  if (cursors.space.isDown) {
    speed = 0;
  }

  if (cursors.down.isDown) {
    hlf.setAngle(90);
  } else if (cursors.up.isDown) {
    hlf.setAngle(270);
  }

  if (speed > 150) {
    speed = 150;
  } else if (speed < -30) {
    speed = -30;
  }

  hlf.setVelocityX(speed);
}
