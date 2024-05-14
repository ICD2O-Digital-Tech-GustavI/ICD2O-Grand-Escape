/*global phaser*/
//Created by Gustav I 
//This is the Splash Scene



class SplashScene extends Phaser.Scene {

  constructor() {
    super({ key: 'splashScene' })
    this.policeAudio = null
  }

  init(data) {
    this.cameras.main.setBackgroundColor('#000000')
  }

  preload() {
    console.log('Splash Scene')
    this.load.image('splashSceneBackground', './images/splashSceneBackground.png')
    this.load.image('flash', './assets/flashing.jpg')
    this.load.audio('policeAudio', '././assets/police.mp3')
  }

  
  
  create (data) {
    this.flashingLights = this.add.sprite(1920 / 2 ,1080 / 2 , 'flash').setScale(6);
    this.splashSceneBackgroundImage = this.add.sprite(0,0, 'splashSceneBackground')
    this.splashSceneBackgroundImage.x = 1920 / 2 
    this.splashSceneBackgroundImage.y = 1080 / 2 
    this.policeAudio = this.sound.add('policeAudio')
    this.policeAudio.play()
  }

  update(time, delta) {
    //Extra functionality 
    this.splashSceneBackgroundImage.y -= 1;
    if (Math.floor(time/100) % 2 == 1) {
      this.flashingLights.flipX = false;
    } else {
       this.flashingLights.flipX = true;
    }
   
    if (time > 7000) {
    this.scene.switch('titleScene')
    this.policeAudio.stop()
    }
  }
}

export default SplashScene 

