/*global phaser*/
//Created by Gustav I 
//This is the Title Scene



class TitleScene extends Phaser.Scene {

  constructor() {
    super({ key: 'titleScene' })

    this.titleSceneBackgroundImage = null
    this.titleSceneText = null 
    this.titleSceneTextStyle = { font: '200px Times', fill: '#fde4b9', align: 'center'}
  }

  init(data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload() {
    console.log('Title Scene')
    this.load.image('titleSceneBackground', './assets/GRANDESCAPE.png')
    this.load.image('titleSceneText', './assets/START (2).png')
  }


  create (data) {
    this.titleSceneBackgroundImage = this.add.sprite(0,0, 'titleSceneBackground').setScale(2)

    this.titleSceneBackgroundImage.x = 1920/2
    this.titleSceneBackgroundImage.y = 1080/2

    this.titleSceneText = this.add.text(1920 / 2, (1080 / 2 ) + 350, 'Grand Escape', this.titleSceneTextStyle).setOrigin(0.5)
  }

  update(time, delta) {
    if (time > 11000) {
    this.scene.switch('menuScene')
    }
  }
}

export default TitleScene 

