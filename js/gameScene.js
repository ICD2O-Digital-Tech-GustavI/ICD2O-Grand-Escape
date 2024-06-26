/*global phaser*/
// Created by Gustav I 
// This is the Game Scene

class GameScene extends Phaser.Scene {

  // create police
  createPolice() {
    const policeXLocation = Math.floor(Math.random() * (1650 - 550)) + 550
    // choose police1 or police2 randomly
    let num = Math.floor(Math.random() * 2) + 1
    let aPolice = this.physics.add.sprite(policeXLocation, -100, `police${num}`)
    aPolice.body.velocity.y = 200
    aPolice.body.setSize(60, 160)
    this.policeGroup.add(aPolice)
  }

  constructor() {
    super({ key: 'gameScene' })

    // van, missile and background declared
    this.background = null
    this.van = null
    this.fireMissile = false
    // score 
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' }
    // game over text
    this.gameOverText = null
    this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' }
    // win text
    this.winText = null
    this.winTextStyle = { font: '65px Arial', fill: '#00ff00', align: 'center' }
    // game state flag
    this.isGameOver = false
  }

  init(data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload() {
    console.log('Game Scene')

    // images
    this.load.image('highwaybackground', 'assets/backgroundlvl1.png')
    this.load.image('van', 'assets/van.png')
    this.load.image('missile', 'assets/missile.png')
    this.load.image('police1', 'assets/police1.png')
    this.load.image('police2', 'assets/police2.png')
    // sound 
    this.load.audio('laser', 'assets/laser1.wav')
    this.load.audio('explosion', 'assets/barrelExploding.wav')
  }

  create(data) {
    // background dimensions 
    this.background = this.add.image(0, 0, 'highwaybackground').setScale(2.5)
    this.background.setOrigin(0, 0)
    this.background1 = this.add.image(0, -1620, 'highwaybackground').setScale(2.5)
    this.background1.setOrigin(0, 0)

    this.scoreText = this.add.text(10, 10, 'Score:' + this.score.toString(), this.scoreTextStyle)
    // van spawn point
    this.van = this.physics.add.sprite(1920 / 2, 1080 - 100, 'van')
    // van size
    this.van.body.setSize(80, 335)

    // create a group for the missiles 
    this.missileGroup = this.physics.add.group()

    // create a group for the cops
    this.policeGroup = this.add.group()
    this.createPolice();

    // collisions between missiles and cops
    this.physics.add.collider(this.missileGroup, this.policeGroup, function(missileCollide, policeCollide) {
      policeCollide.destroy()
      missileCollide.destroy()
      this.sound.play('explosion')

      // score 
      this.score = this.score + 1
      this.scoreText.setText('Score:' + this.score.toString())

      // check if the score has reached 25
      if (this.score >= 25) {
        this.winGame()
      } else {
        // function to create a cop
        this.createPolice()
      }
    }.bind(this))

    // collisions between van and cops
    this.physics.add.collider(this.van, this.policeGroup, function(vanCollide, policeCollide) {
      this.sound.play('explosion')
      this.physics.pause()
      policeCollide.destroy()
      vanCollide.destroy()
      // game over text and dimensions on the screen
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
      this.gameOverText.setInteractive({ useHandCursor: true })
      // restarts the score if the game is over
      this.gameOverText.on('pointerdown', () => this.restartGame())
      this.isGameOver = true
    }.bind(this))
  }

  // restart game function
  restartGame() {
    this.score = 0
    this.isGameOver = false
    this.scene.start('gameScene')
  }

  // win game function
  winGame() {
    this.physics.pause()
    this.winText = this.add.text(1920 / 2, 1080 / 2, 'You win!\nClick to play again.', this.winTextStyle).setOrigin(0.5)
    this.winText.setInteractive({ useHandCursor: true })
    this.winText.on('pointerdown', () => this.restartGame())
    this.isGameOver = true
  }

  update(time, delta) {
    if (this.isGameOver) {
      return
    }

    // keys for functions
    const keyLeftObj = this.input.keyboard.addKey('LEFT')
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    const keySpaceObj = this.input.keyboard.addKey('SPACE')

    // background loops
    this.background.y += 15
    this.background1.y += 15

    if (this.background.y > 1080) {
      this.background.y = -1620
    }
    if (this.background1.y > 1080) {
      this.background1.y = -1620
    }

    // left arrow key to move
    if (keyLeftObj.isDown === true) {
      this.van.x -= 10
      // wrap around to the right edge
      if (this.van.x < 0) {
        this.van.x = 1920
      }
    }
    // right arrow key to move
    if (keyRightObj.isDown === true) {
      this.van.x += 10
      // wrap around to the left edge
      if (this.van.x > 1920) {
        this.van.x = 0
      }
    }
    // spacebar to fire missile
    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false) {
        // fire missile      
        this.fireMissile = true
        const aNewMissile = this.physics.add.sprite(this.van.x, this.van.y, 'missile')
        // fires missiles in any direction
        let cursor = this.input.activePointer
        aNewMissile.rotation =
          Phaser.Math.Angle.Between(
            aNewMissile.x,
            aNewMissile.y,
            cursor.worldX,
            cursor.worldY,
          ) + 1.57
        // plays laser sound if missile is fired
        this.missileGroup.add(aNewMissile)
        this.sound.play('laser')
      }
    }
    // limits the user from spamming missiles
    if (keySpaceObj.isUp === true) {
      this.fireMissile = false
    }
    // missile direction
    this.missileGroup.children.each(function(item) {
      item.x += Math.sin(item.rotation) * 0.3 * delta
      item.y -= Math.cos(item.rotation) * 0.3 * delta
      if (item.y < 0) {
        item.destroy()
      }
    })

    // police movement and creation of police
    this.policeGroup.children.each(function(item) {
      if (item.y > 1080) {
        this.createPolice()
        item.destroy()
      }
    }, this)
  }
}

export default GameScene
