/*global phaser*/
//Created by Gustav I 
//This is the Menu Scene



class MenuScene extends Phaser.Scene {

  constructor() {
    super({ key: 'menuScene' })
    //Background Image declared
    this.menuSceneBackgroundImage = null
    this.startButton = null 
  }

  init(data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload() {

    //menu scene background images
    console.log('Menu Scene')
    this.load.image('menuSceneBackground', './assets/menu_image.png')
    this.load.image('startButton', './assets/start.png')
    //audio for the menu 
    this.load.audio('menuAudio', '././assets/menu.mp3')
  
  }


  create (data) {
    //Menu Background Image Dimensions 
    this.menuSceneBackgroundImage = this.add.sprite(0,0,'menuSceneBackground').setScale(1.5)
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2 
    this.startButton = this.add.sprite(1920 / 2, (1080/2) + 100, 'startButton')

    //Start button
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton())
    this.menuAudio = this.sound.add('menuAudio')
    // loop
    this.menuAudio.on('complete', () => {
      this.menuAudio.play()
    })
    this.menuAudio.play()
  }

  update(time, delta) {
  }
  //Start Button
  clickButton() {
  if (this.scene.switch('gameScene')) {
    this.menuAudio.stop()
  }
  }
}

export default MenuScene 

