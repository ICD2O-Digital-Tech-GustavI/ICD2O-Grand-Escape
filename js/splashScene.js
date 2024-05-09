/*global phaser*/
//Created by Gustav I 
//This is the Splash Scene



class SplashScene extends Phaser.Scene {

  constructor() {
    super({ key: 'splashScene' })
  }

  init(data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload() {
    console.log('Splash Scene')
    this.load.image('splashSceneBackground', './images/splashSceneBackground.png')
  }

  
  create (data) {
    this.splashSceneBackgroundImage = this.add.sprite(0,0, 'splashSceneBackground')
    this.splashSceneBackgroundImage.x = 1920 / 2 
    this.splashSceneBackgroundImage.y = 1080 / 2 
  }

  update(time, delta) {
    //Extra functionality 
    this.splashSceneBackgroundImage.y -= 1;
    if (time > 5000) {
    this.scene.switch('titleScene')
    }
  }
}

export default SplashScene 

