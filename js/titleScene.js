/*global phaser*/
//Created by Gustav I 
//This is the Title Scene



class TitleScene extends Phaser.Scene {

  constructor() {
    super({ key: 'titleScene' })
    //Background Image declared for title scene
    this.titleSceneBackgroundImage = null
    this.titleSceneText = null 
    this.titleSceneTextStyle = { font: '200px Times', fill: '#fde4b9', align: 'center'}
  }

  init(data) {
    //background color
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload() {
    //Title Scene background and text
    console.log('Title Scene')
    this.load.image('titleSceneBackground', './assets/GRANDESCAPE.png')
  }


  create (data) {
    //Dimensions of the title scene background image
    this.titleSceneBackgroundImage = this.add.sprite(0,0, 'titleSceneBackground').setScale(2)

    this.titleSceneBackgroundImage.x = 1920/2
    this.titleSceneBackgroundImage.y = 1080/2

    //Title Scene text style and dimensions
    this.titleSceneText = this.add.text(1920 / 2, (1080 / 2 ) + 350, 'Grand Escape', this.titleSceneTextStyle).setOrigin(0.5)
  }

  update(time, delta) {
    //If the time is greater than 11000, switch to the menu scene
    if (time > 11000) {
    this.scene.switch('menuScene')
    }
  }
}

export default TitleScene 

