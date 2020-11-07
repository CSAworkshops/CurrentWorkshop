var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 30,
      },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

var player;
var spaceKey;
function preload() {
  this.load.image("player", "/assets/p3_front.png");
  this.load.image("metalCenter", "/assets/metalCenter.png");
}

function create() {
  player = this.physics.add.image(100, 100, "player");

  let platforms = this.physics.add.staticGroup();
  let platform = platforms.create(100, 200, "metalCenter");

  this.physics.add.collider(player, platforms);
  spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  this.input.keyboard.on("keydown-W", setUp.bind(this));
  this.input.keyboard.on("keydown-A", setLeft.bind(this));
  this.input.keyboard.on("keydown-S", setDown.bind(this));
  this.input.keyboard.on("keydown-D", setRight.bind(this));

  this.input.keyboard.on("keyup-W", unsetUp.bind(this));
  this.input.keyboard.on("keyup-A", unsetLeft.bind(this));
  this.input.keyboard.on("keyup-S", unsetDown.bind(this));
  this.input.keyboard.on("keyup-D", unsetRight.bind(this));
}

function update() {
  if (spaceKey.isDown) {
    // player.x += 3;
  }
}

function setUp(event) {
  player.setVelocityY(-50);
}
function setLeft(event) {
  player.setVelocityX(-50);
}
function setDown(event) {
  player.setVelocityY(50);
}
function setRight(event) {
  player.setVelocityX(50);
}

function unsetUp(event) {
    player.setVelocityY(0);
  }
  function unsetLeft(event) {
    player.setVelocityX(0);
  }
  function unsetDown(event) {
    player.setVelocityY(0);
  }
  function unsetRight(event) {
    player.setVelocityX(0);
  }
