//Updated by Dan to be more object oriented, 1/31/17

//Helper Function
function randomNum (min, max) {
	var num = Math.random() * (max - min) + min;
	return Math.floor(num);	
}


function Spawner() {
    this.powerups = [];
    this.spawnCount = 0;
    this.spawnRate = 1500;
    this.lastSpawn = -1;
    this.startTime = Date.now();
}

Spawner.prototype.spawnRandomObject = function() {
    // create the new object
    var object = new powerup();
    object.multiplier = randomNum(2,10);
    object.setSrc("images_resources/Coin.png");
    object.button.setSrc("images_resources/Coin.png","images_resources/Coin.png")
    object.x = object.button.x = Math.random() * (canvas.width/2) + (canvas.width/2)
    object.y = object.button.y = Math.random() * (canvas.height - 30) + 15
    object.width = object.button.width = 20;
    object.height = object.button.height = 20;
    // add the new object to the objects[] array
	// can later be changed to use the full engine
    var mult = object.multiplier;
    object.button.changeFunc(function() {console.log("Multiplier x"+mult)})
    game.buttonArray.push(object.button);
    game.push(object.button);
    this.powerups.push(object);
	this.spawnCount += 1;
}

/*function removeObject() {
	if(collision code) {
		// splice attempts to add in a new element, but you can use it to remove if you leave out parameters.
		objects.splice(0, the one that was clicked);
	}
}*/

Spawner.prototype.update = function() {

    // get the elapsed time
    var time = Date.now();

    // see if its time to spawn a new object
    if ((time > (this.lastSpawn + this.spawnRate)) && this.spawnCount < 5) {
        this.lastSpawn = time;
        this.spawnRandomObject();
    }
}

Spawner.prototype.draw = function() {

}


