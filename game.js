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
};

//Neues Spiel erzeugen
let game = new Phaser.Game(config);
let image;
//Lädt zu anfang des Spiels
function preload() {
  this.load.image("rabbit", "rabbit.png");
}

//Beim erstellen des Spiels
function create() {
  image = this.add.image(300, 300, "rabbit");
}

//Widerholt aufgerufen -> Spielschleife / Spiellogik
function update() {}
