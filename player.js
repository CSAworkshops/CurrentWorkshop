class Player {
  gameObject;
  animation;

  playerSpeed;
  onGround;

  constructor(obj, anim) {
    this.gameObject = obj;
    this.animation = anim;
    this.playerSpeed = 70;
    this.onGround = false;
  }

  startWalkLeft = () => {
    this.gameObject.setVelocityX(-this.playerSpeed);
    this.gameObject.anims.play("walk");
  };

  startWalkRight = () => {
    this.gameObject.setVelocityX(this.playerSpeed);
    this.gameObject.anims.play("walk");
  };

  stopWalkLeft = () => {
    this.gameObject.setVelocityX(0);
    this.gameObject.anims.stopOnFrame(this.animation.getFrameAt(0));
  };

  stopWalkRight = () => {
    this.gameObject.setVelocityX(0);
    this.gameObject.anims.stopOnFrame(this.animation.getFrameAt(0));
  };

  startJump = () => {
    if (this.onGround) {
      this.gameObject.setVelocityY(-this.playerSpeed);
      this.onGround = false;
    }
  };

  stopJump = () => {
    if (this.onGround) {
      this.gameObject.setVelocityY(0);
    }
  };
}
