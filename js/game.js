//MADE BY : GUSTAV I
//CLASS : ICD2O
//This is the Phaser3 configuration file

/* global Phaser */

//*Game scene*/
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  //sets background color
  backgroundColor : 0x5f6e7a,
  scale: {
    mode: Phaser.Scale.FIT,
  //we place it in the middle of the page
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}


const game = new Phaser.Game(config)
console.log(game)