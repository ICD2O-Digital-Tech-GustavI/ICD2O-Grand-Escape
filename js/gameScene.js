/*global phaser*/
//Created by Gustav I 
//This is the Game Scene



class GameScene extends Phaser.Scene {

  constructor() {
    super({ key: 'gameScene' })

    this.background = null
    this.van = null 
    this.fireMissile = false 
  }

  init(data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload() {
    console.log('Game Scene')

    //images
    this.load.image('highwaybackground', 'assets/backgroundlvl1.png')
    this.load.image('van', 'assets/van.png')
    this.load.image('missile', 'assets/missile.png')
  }


  create (data) {
    this.background = this.add.image(0,0, 'highwaybackground').setScale(2.5)
    this.background.setOrigin(0,0)

    this.van = this.physics.add.sprite(1920 / 2, 1080 - 100, 'van')

    //create a group for the missiles 
    this.missileGroup = this.physics.add.group()
  }

  update(time, delta) {
    const keyLeftObj = this.input.keyboard.addKey('LEFT')
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    const keySpaceObj = this.input.keyboard.addKey('SPACE')

    if (keyLeftObj.isDown === true) {
      this.van.x -= 10
      if (this.van.x < 0) {
        this.van.x = 0
      }
    }

    if (keyRightObj.isDown === true) {
      this.van.x += 10
    if (this.van.x > 1920) {
      this.van.x = 1920
    }
    }
    if (keySpaceObj.isDown === true) {
    if (this.fireMissile === false) {
    //fire missile 
    this.fireMissile = true 
    const aNewMissile = this.physics.add.sprite(this.van.x, this.van.y, 'missile')
    this.missileGroup.add(aNewMissile)
    }
    }
    if (keySpaceObj.isUp === true) {
      this.fireMissile = false 
    }
  }
}

export default GameScene 

