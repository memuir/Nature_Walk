
//----------------------Sprite Function----------------------------------
//-----------------------------------------------------------------------
//Sprite object with default x,y,width, and height.
//Has children array and functions to update across inheritence.
//Use Sprite.call(this); for a function class and = new Sprite(); for a prototype or variable.
function Sprite() {
    this.image = new Image();
    this.image.src = "image_resources/ClearSquare.png";
    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 100;
    this.name = "Unnamed";
    this.children = [];
    this.anim = false; 
    this.frameIndex = 0;
    this.frameTotal = 1;
    this.srcCols = 1;
    this.srcRows = 0;
    this.ticksPerFrame = 2;
    this.tickCount = 0;
}

//Shortcut to set an image
Sprite.prototype.setSrc = function(src, anim) {
    this.image = new Image();
    this.image.src = src;
    if (anim !== undefined) {this.anim = anim;}
    
}

Sprite.prototype.setupAnim = function (frameCount, rows, cols) {
    this.frameTotal = frameCount;
    this.srcRows = rows;
    this.srcCols = cols;
}

Sprite.prototype.setSpriteAttributes = function(x, y, width, height, name) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    if (name === undefined) {
        this.name = "sprite";
    } else {
        this.name = name;
    }
}

//Ham-fistedly puts x and y in the center
Sprite.prototype.center = function() {
    this.x = this.x-this.width/2;
    this.y = this.y-this.height/2;
}

Sprite.prototype.uncenter = function() {
    this.x = this.x+this.width/2;
    this.y = this.y+this.height/2;
}

//If you override, keep this.drawChildren();
Sprite.prototype.draw = function() {
    //console.log("drawing"+this.image.src);
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.drawChildren();
};

//If you override, keep this.updateChildren();
Sprite.prototype.update = function() {
    this.updateChildren();
}

Sprite.prototype.addChild = function(child) {
    this.children.push(child);
}

Sprite.prototype.drawChildren = function() {
    for (var i in this.children) {
        this.children[i].draw();
    }
}

Sprite.prototype.updateChildren = function() {
    for (var i in this.children) {
        this.children[i].update();
    }
}
