const game = new Phaser.Game(375, 667, Phaser.AUTO)

const helloState = {
  preload() {
    game.stage.backgroundColor = '#a8d4bf'
    game.load.image('logo', './assets/images/logo.png')
  },
  create() {
    const text = game.add.text(game.world.centerX, 25, 'Hello World', {
      fill: '#fff',
    })
    text.anchor.set(0.5)

    const logo = game.add.image(game.world.centerX, game.world.centerY, 'logo')
    logo.anchor.set(0.5)
  },
}

game.state.add('helloState', helloState)
game.state.start('helloState')
