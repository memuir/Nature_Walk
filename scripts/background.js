//Parallax scrolling background layers
var landscape = function() {
	this.layer1 = new Sprite()
    this.layer2 = new Sprite()
	this.layer3 = new Sprite()
	this.layer4 = new Sprite()

	this.layer1.setSrc("image_resources/ClearSquare.png")
    this.layer2.setSrc("image_resources/mountain.png")
	this.layer3.setSrc("image_resources/layer2_spring.png")
	this.layer4.setSrc("image_resources/layer3_spring.png")

	//Size of native image
	this.layer1.width = 510;
    this.layer2.width = this.layer3.width = this.layer4.width = 1280;
	this.layer1.height = 316;
    this.layer2.height = this.layer3.height = this.layer4.height = 200;

	//Change for vertical position
	this.layer1.y = 200
    this.layer2.y = 200
	this.layer3.y = 230
	this.layer4.y = 250

	//Rectangle for ctx.clip
	ctx.rect(517, 0, 475, 578);

	//Draw each layer 3 times to fill whole space
	this.draw = function() {
        //console.log("Star Layer: " + this.layer1.image.src);
		tempx = this.layer1.x
        this.layer1.x = 514;
        this.layer1.y = 0;
        //ctx.globalAlpha = .7;
		this.layer1.draw() 
        //ctx.globalAlpha = 1; 
        ctx.save()
		ctx.clip()
        /*
		this.layer1.x = tempx - 1280
		this.layer1.draw()
		this.layer1.x = tempx + 1280
		this.layer1.draw()
		this.layer1.x = tempx
        */

		var tempx = this.layer2.x
		this.layer2.draw()
		this.layer2.x = tempx - 1280
		this.layer2.draw()
		this.layer2.x = tempx + 1280
		this.layer2.draw()
		this.layer2.x = tempx

		tempx = this.layer3.x
		this.layer3.draw()
		this.layer3.x = tempx - 1280
		this.layer3.draw()
		this.layer3.x = tempx + 1280
		this.layer3.draw()
		this.layer3.x = tempx
        
        tempx = this.layer4.x
		this.layer4.draw()
		this.layer4.x = tempx - 1280
		this.layer4.draw()
		this.layer4.x = tempx + 1280
		this.layer4.draw()
		this.layer4.x = tempx

		ctx.restore()
        
	}

	//Moves layers by hardcoded speed
	this.update = function() {
		if (this.layer1.x <= 512-this.layer1.width)
			this.layer1.x = 512;
		else if (this.layer1.x >= 512+this.layer1.width)
			this.layer1.x = 512;
        
        this.layer2.x = this.layer2.x-.1;
		if (this.layer2.x <= 512-this.layer2.width)
			this.layer2.x = 512;
		else if (this.layer2.x >= 512+this.layer2.width)
			this.layer2.x = 512;

		this.layer3.x = this.layer3.x-.35;
		if (this.layer3.x <= 512-this.layer3.width)
			this.layer3.x = 512;
		else if (this.layer3.x >= 512+this.layer3.width)
			this.layer3.x = 512;
		
		this.layer4.x = this.layer4.x-.7;
		if (this.layer4.x <= 512-this.layer4.width)
			this.layer4.x = 512;
		else if (this.layer4.x >= 512+this.layer4.width)
			this.layer4.x = 512;
	}
}
