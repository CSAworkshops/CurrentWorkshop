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
var onGround = false;
function preload() {
  this.load.image("player", "/assets/p3_front.png");
  this.load.image("metalCenter", "/assets/metalCenter.png");
}

function create() {
  player = this.physics.add.image(100, 100, "player");

  // let platforms = this.physics.add.staticGroup();
  // let platform = platforms.create(100, 200, "metalCenter");
  let platform = createPlatform.bind(this)(300, 100, 200, "metalCenter");
  let platform2 = createPlatform.bind(this)(300, 500, 300, "metalCenter");

  this.physics.add.collider(player, platform, platformCollide.bind(this));
  this.physics.add.collider(player, platform2, platformCollide.bind(this));
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

function createPlatform(width, x, y, key) {
  let platforms = this.physics.add.staticGroup();
  let platform = createPlatformFromGroup(platforms, 0.5, x, y, key);

  for (let i = x + platform.width; i < width; i += platform.width) {
    createPlatformFromGroup(platforms, 0.5, i, y, key);
  }

  return platforms;
}

function createPlatformFromGroup(platforms, scale, x, y, key) {
  // let platform = platforms.create(x, y, key).setScale(scale);
  // return platform.setSize(platform.width * scale, platform.height * scale);
  return platforms.create(x, y, key);
}

function update() {}

function platformCollide(playerObject, platformObject) {
  onGround = true;
}

function setUp(event) {
  if (onGround) {
    player.setVelocityY(-50);
    onGround = false;
  }
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
  if (onGround) {
    player.setVelocityY(0);
  }
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
