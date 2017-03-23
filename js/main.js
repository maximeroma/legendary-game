var game = new Phaser.Game(400, 490, Phaser.AUTO, "gameDiv");

var mainState = {
    
    preload: function () {
		
		game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe', 'assets/pipe.png');
	},

	create: function () {
		
		game.stage.backgroundColor = '#71C5CF';
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.bird = game.add.sprite(100, 245, 'Bird');
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;
        var spaceKey = game.input.keyboard.addkey(
                        Phaser.KeyBoard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
        this.pipes = game.add.group();
	},

	update: function () {
        
        if (this.bird.y < 0 || this.bird.y > 490) {            
            this.restartGame();
        } 

	},
    
    jump: function () {
        this.bird.body.velocity.y = -350;
    },
    
    restartGame: function () {
        game.state.start('main');
    },

    addOnePipe: function(x, y) {
        var pipe = game.add.sprite(x, y, 'sprite');
        this.pipes.add(pipe);
        game.physics.arcade.enable(pipe);
        pipe.body.velocity.x = -200;
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;     
    },
};



game.state.add('main', mainState);

game.state.start('main');

