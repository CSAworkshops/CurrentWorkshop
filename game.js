var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        x: 0,
        y: 0,
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
var collectedFish = 0;
var fishTextValue = "Collected: ";
var penguin;
var keyW;
var keyA;
var keyS;
var keyD;
var fishGroup;
var fishText;
var spawnArea;

function preload() {
  this.load.image("penguin", "penguin.png");
  this.load.image("fish", "fish_barrel.png");
}

function create() {
  penguin = this.physics.add.image(200, 60, "penguin");
  penguin.setScale(0.4, 0.4);
  penguin.setCollideWorldBounds(true);

  fishGroup = this.physics.add.group({
    key: "fish",
    quantity: 10,
  });

  this.physics.add.overlap(penguin, fishGroup, fishCollect.bind(this));

  fishText = this.add.text(20, 20, fishTextValue + collectedFish);

  spawnArea = new Phaser.Geom.Rectangle(
    5,
    100,
    config.width - 10,
    config.height - 200
  );

  fishGroup.getChildren().forEach((fish) => placeInSpawnArea(fish, spawnArea));

  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
}

function update() {
  if (keyW.isDown) {
    penguin.y -= 3;
  }
  if (keyA.isDown) {
    penguin.x -= 3;
  }
  if (keyS.isDown) {
    penguin.y += 3;
  }
  if (keyD.isDown) {
    penguin.x += 3;
  }
}

function fishCollect(penguin, fish) {
  fish.disableBody(true, true);
  // placeInSpawnArea(fish, spawnArea);
  collectedFish += 10;
  fishText.text = fishTextValue + collectedFish;

  this.time.addEvent({
    delay: Phaser.Math.Between(1000, 3000),
    callback: (event) => {
      placeInSpawnArea(fish, spawnArea);
      fish.enableBody(false, 0, 0, true, true);
    },
  });
}

function placeInSpawnArea(gameObj, area) {
  let children = fishGroup.getChildren();
  do {
    gameObj.x = Phaser.Math.Between(area.x, area.x + area.width);
    gameObj.y = Phaser.Math.Between(area.y, area.y + area.height);
  } while (inersectsWithObjects(gameObj, children));
}

function getRectangleFromObj(gameObj) {
  return new Phaser.Geom.Rectangle(
    gameObj.x,
    gameObj.y,
    gameObj.width,
    gameObj.height
  );
}

function inersectsWithObjects(gameObj, gameObjects) {
  let rectangleA = getRectangleFromObj(gameObj);
  for (let index = 0; index < gameObjects.length; index++) {
    const childElement = gameObjects[index];

    if (childElement == gameObj) {
      continue;
    }

    let rectangleB = getRectangleFromObj(childElement);
    if (Phaser.Geom.Intersects.RectangleToRectangle(rectangleA, rectangleB)) {
      return true;
    }
  }

  return false;
}
