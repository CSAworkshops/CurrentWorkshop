const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade", 
        arcade: {
          gravity: {
            y: 200 
          },
          debug: false 
        }
      },
    scene:{
        //Lade funktion
        preload: preload,
        //Erstellen des Spiels
        create: create,
        //Regelmäßiges spiel update
        update: update
    }
};

const game = new Phaser.Game(config);
const stoneY = config.height - 30;

function preload(){
    this.load.image("robot", "assets/robot.png");
    this.load.image("barrel", "assets/barrel.png");
    this.load.image("stone", "assets/stone.png");
}

var stones = [];
var groundGroup;
var spacebar;
var isJumpActive = false;
var fuel = 100;
var player;
function create(){
   player = this.physics.add.sprite(80, config.height - 200, "robot");
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    groundGroup = this.physics.add.staticGroup();
        
    let y = stoneY;
    let widht = 0;
    for (let x = 0; x < config.width + 30; x += widht) {
        let stone = createStone(x, y, groundGroup);
        widht = stone.width;
        stones.push(stone);
    }

    this.physics.add.collider(player, groundGroup);
}

function createStone(x, y, group){
 return group.create(x, y, 'stone').refreshBody();
}

function update(){
  stones = updateStones(stones, groundGroup);

  isJumpActive = spacebar.isDown && fuel > 0;

  if(isJumpActive){
    player.setVelocityY(-50);
  }
}

function updateStones(stones, group){
  moveStones(stones);
  stones = sliceStones(stones);
  stones = rndCreateStone(stones, group);
  return stones
}

function moveStones(stones){
  let stoneVelocity = 10;

  for (let index = 0; index < stones.length; index++) {
    const stone = stones[index];

    if(!stone) continue;

    stone.x -= stoneVelocity;
    stone.refreshBody();
  }
}

function sliceStones(stones){
  let oldStone = stones[0];

  if(!oldStone || (oldStone.x + oldStone.width > 0))
    return stones;

  oldStone?.destroy();

  return stones.slice(1);  
}

function rndCreateStone(stones, group){
  let lastStone = getLastStone(stones);

  let x = config.width + lastStone.width;
  let shouldCreateStone = Phaser.Math.RND.between(0,100) < 10;

  if(shouldCreateStone){
    let stone = createStone(x, stoneY, group);
    stones.push(stone);
  }
  
  return stones;
}

function getLastStone(stones){
  for (let index = stones.length - 1; index > 0; index--) {
    const element = stones[index];

    if(element) return element;
    
  }
}