//Object for manipulating sounds

var volume = 0

//Object which holds all the sound objects for the game
var soundManager = function() {
	this.muted = false
	this.music = new Howl({
	  src: ['sounds/musicV1.mp3'],
	  volume: 0.6,
	  buffer: true,
	  loop: true,
	  //onend: function() {volume = 0.1}
	})

	this.click = new Howl({
		src: ['sounds/click.wav'],
		volume: 0.5,
		buffer: true
	})

	this.up1 = new Howl({
		src: ['sounds/up1.wav'],
		volume: 0.1,
		buffer: true
	})

	this.bird = new Howl({
		src: ['sounds/addBird.wav'],
		volume: 0.5,
		buffer: true
	})

	this.frog = new Howl({
		src: ['sounds/addFrog.wav'],
		volume: 0.5,
		buffer: true
	})

	this.error = new Howl({
		src: ['sounds/error.wav'],
		volume: 0.1,
		buffer: true
	})

	this.achiev = new Howl({
		src: ['sounds/achiev.wav'],
		volume: 0.7,
		buffer: true
	})
}

soundManager.prototype.update = function() {}

soundManager.prototype.draw = function() {}

soundManager.prototype.mute_music = function() {
	if (!this.muted) {
		//this.music.fade(1,0,10)
		Howler.mute(true);
		console.log(this.music.volume())
		this.muted = true;
	}
	else {
		this.muted = false;
		Howler.mute(false);
		//this.music.fade(0,1,10)
		console.log(this.music.volume())
		
	}
}