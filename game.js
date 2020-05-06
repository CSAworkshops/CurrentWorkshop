//Spiel konfigurieren
let config = {
  //Technischer Typ AUTO = Wählt Automatisch, WEBGL = Nutzt WebGL, CANVAS = Nutzt ein Canvas
  type: Phaser.AUTO,
  //Breite des Spiels
  width: 800,
  //Höhe des Spiels
  height: 600,
  //Physic zum spiel hinzufügen
  physics: {
    //Typ der Physic
    default: "arcade",
    //Eigenschaften der Physic
    arcade: {
      //Schwerkraft im spiel, wohin Fallen Objekte
      gravity: {
        y: 200, //Y Sagt das objekte mit 200 nach "unten" fallen
      },
      debug: false, //Wenn debug: true dann wird ein Kasten und die Schwerkraft mit einem grünen strich angezeigt
    },
  },
  //Definiert die Szene die wir sehen
  scene: {
    //Welche Funktion wird zum Laden verwendet
    preload: preload,
    //Welche Funktion wird zum erstellen verwendet
    create: create,
    //Welche Funktion wird zum regelmäßigen Update verwendet == GameLoop
    update: update,
  },
  scale: {
    mode: Phaser.Scale.FIT,
  }
};

//Neues Spiel erzeugen
let game = new Phaser.Game(config);
let player;
let cursors;
let points;
let highScore;
const velocity = 108;

//Lädt zu anfang des Spiels
function preload() {
  highScore = 0;
  this.load.image("rabbit", "rabbit.png");
}

//Beim erstellen des Spiels
function create() {
  sky = new Phaser.Display.Color(100, 149, 237); //#6495ED Cornflowerblue
  this.cameras.main.setBackgroundColor(sky);

  player = this.physics.add.sprite(300, 300, "rabbit").setScale(0.3);
  player.setCollideWorldBounds(true);
  cursors = this.input.keyboard.createCursorKeys();

  var text2 = this.add.text(10, 10, 'HighScore:', { font: '30px Arial' });
  //pink | gelb | blau | rot
  text2.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
  points = this.add.text(160, 10, '', { font: '30px Arial' });
  //pink | gelb | blau | rot
  points.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
}

//Wiederholt aufgerufen -> Spielschleife / Spiellogik
function update() {
  let left = cursors.left.isDown;
  let right = cursors.right.isDown;
  let up = cursors.up.isDown;
  let down = cursors.down.isDown;
  
  if (left) {
    player.setVelocityX(-velocity);
  }

  if (right) {
    player.setVelocityX(velocity);
  }

  if (up) {
    player.setVelocityY(-velocity);
    highScore += 10;
  }

  if (!right && !left) player.setVelocityX(0);

  points.text = highScore;
}
