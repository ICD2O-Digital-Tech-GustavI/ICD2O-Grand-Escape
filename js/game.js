/* global Phaser */
//MADE BY : GUSTAV I
//CLASS : ICD2O
//This is the Phaser3 configuration file

import SplashScene from './splashScene.js'
import TitleScene from './titleScene.js'

//Our Game Scenes
const splashScene = new SplashScene()
const titleScene = new TitleScene()

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
  backgroundColor : 0xffffff,
  scale: {
    mode: Phaser.Scale.FIT,
  //we place it in the middle of the page
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

console.log ("testing game scene")

const game = new Phaser.Game(config)

//load scenes
//NOTE : remember any "key" is global and CAN NOT be reused!"
game.scene.add('splashScene', splashScene)
game.scene.add('titleScene', titleScene)

//start title 
game.scene.start('splashScene')