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
var gemText;
var collectedGems = 0;

const gemTextLabel = "Gems: ";

function preload() {
  // this.load.image("player", "/assets/p3_front.png");
  this.load.spritesheet("player", "/assets/p3_spritesheet.png", {
    frameWidth: 72.5,
    frameHeight: 96,
  });
  this.load.image("metalCenter", "/assets/metalCenter.png");
  this.load.image("gem", "/assets/gemBlue.png");
}

function create() {
  let playerSprite = this.physics.add.sprite(100, 100, "player");
  let walkanimation = this.anims.create({
    key: "walk",
    frames: this.anims.generateFrameNumbers("player", {
      start: 0,
      end: 4,
    }),
    frameRate: 6,
    repeat: -1,
  });

  player = new Player(playerSprite, walkanimation);

  // player.anims.play("walk", true, 0);
  // let platforms = this.physics.add.staticGroup();
  // let platform = platforms.create(100, 200, "metalCenter");
  let platform = createPlatform.bind(this)(300, 100, 200, "metalCenter");
  let platform2 = createPlatform.bind(this)(300, 500, 300, "metalCenter");

  this.physics.add.collider(playerSprite, platform, platformCollide.bind(this));
  this.physics.add.collider(playerSprite, platform2, platformCollide.bind(this));

  let gems = this.physics.add.group({
    key: "gem",
    repeat: 1,
    setXY: { x: 250, y: 100, stepX: 250 },
  });

  this.physics.add.collider(gems, platform);
  this.physics.add.collider(gems, platform2);

  this.physics.add.overlap(playerSprite, gems, collect.bind(this));

  spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  this.input.keyboard.on("keydown-W", player.startJump);
  this.input.keyboard.on("keydown-A", player.startWalkLeft);
  this.input.keyboard.on("keydown-D", player.startWalkRight);

  this.input.keyboard.on("keyup-W", player.stopJump);
  this.input.keyboard.on("keyup-A", player.stopWalkLeft);
  this.input.keyboard.on("keyup-D", player.stopWalkRight);

  gemText = this.add.text(10, 10, gemTextLabel + collectedGems, {
    fontSize: "15px",
    fill: "#00f5f1",
  });
}

function update() {}

function collect(player, gem) {
  gem.disableBody(true, true);
  collectedGems++;
  gemText.text = gemTextLabel + collectedGems;
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
  //platforms.create(x, y, key).setScale(scale).refreshBody();
  return platforms.create(x, y, key);
}

function platformCollide(playerObject, platformObject) {
  player.onGround = true;
}

