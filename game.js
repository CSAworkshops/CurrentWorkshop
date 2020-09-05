var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);
var hlf;
var fKey;
var fireText;

function preload() {
  this.load.image("firecar", "firecar.png");
}

function create() {
  hlf = this.add.image(200, 60, "firecar");

  fireText = this.add.text(400, 200, "");
  fireText.setScale(3,3);

  fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
  this.input.keyboard.on("keydown-SPACE", callFireFighters.bind(this));
}

function update() {
  if (fKey.isDown && hlf.x < config.width - 150) {
    hlf.x += 3;
  }
}

function callFireFighters(event) {
  alert("My house is burning, i need help 🔥");
  fireText.text = "🔥🔥🔥"
}
