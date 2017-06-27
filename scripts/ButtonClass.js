/* EXAMPLE BUTTON CREATION:
 * 1. Create button with: var btn = new Button(function_to_call, parameterArray_for_function);
    NOTE: When giving the button a function do not add parentheses.
    Ex. new Button(myFunction, paramAry); 
    Not. new Button(myFunction(), paramAry);
 
 * 2. Set the button source images with: btn.setSrc(srcPrimary, srcSecondary);
 
 * 3. Set the button attributes with: btn.setSpriteAttributes(xCoord, yCoord, width_of_image, height_of_image, name(optional)); 
 
 * 4. Push the button into the screen's button array with: name_of_screen.buttonArray.push(btn);
 
 * 5. Push the button to the screen itself with: 
 name_of_screen.push(btn);
 
 NOTE: This must be done during the screen's initialization period or the buttons will not show up. 
 */

/**************MOUSE INTERFACING*****************/
/*
mouseEventManager: Canvas passes the mouse event here, then this function calls the correct function according to the event. 
Params: "evt" the mouse event that is being invoked. 
Returns: None. 
*/

function mouseEventManager(evt) {
    switch(evt){
            case"mousemove":
                this.onMouseMove();
                break;
            case"mousedown": 
                this.onMouseDown();
                break;
            case"mouseup":
                this.onMouseUp();
                break;
    }
}

/*
onMouseEnter: Function that is called when the mouse enters the button's perimeter. 
Params: None.
Returns: None.
NOTE: Is only called the first time onMouseMove() is called. 
*/
function onMouseEnter() {
    this.hovered = true;
}
/*
onMouseLeave: Function that is called when the mouse leaves the button's perimeter. 
Params: None.
Returns: None.
NOTE: Not a self-sufficient function. As it is, it must be called from the canvas when it finds out that the mouse has left the button. 
*/
function onMouseLeave() {
    this.hovered = false;
    this.isPressed = false;
    //console.log("left");
    if (!this.isToggleButton) {
        this.image.src = this.onMouseUpImageSrc;
    }
    
}
/*
onMouseMove: Function that is called when the mouse is moving over the button. Called every time the mouse moves. 
BEWARE OF INPUT LAG. Consider using onMouseEnter() instead. 
Params: None
Returns: None
*/
function onMouseMove() {
    if (!this.hovered) {
        this.onMouseEnter();
    }
    //DEBUG: console.log(this.isPressed);
}

/*
onMouseDown: Function that is called when the mouse is pressed, but not released, on the button. 
Params: None.
Returns: None.
*/
function onMouseDown() {
    if (this.isToggleButton) {
        if (this.isToggled) {
            this.image.src = this.onMouseUpImageSrc;
        } else if (!this.isToggled) {
            this.image.src = this.onMouseDownImageSrc;
        }
    //For toggle functionality.
        this.toggle();
        this.callFunction();
    } 
    else {
        this.isPressed = true;
        if (this.onMouseDownImageSrc) {
            this.image.src = this.onMouseDownImageSrc;
        }
        
    }
   
    
    //DEBUG: console.log("pressed");
}

/*
onMouseUp: Function that is called when the mouse is released from being pressed on the button. 
Params: None.
Returns: None.
*/
function onMouseUp() {
    
    //If mouse has been pressed down and has not left the button.
    //And if the button is not a toggle button. 
    //And if there is a function to be called. 
        //THEN call the function. 
    if (this.isPressed && !(this.isToggleButton) && (this.func !== undefined)) {
        this.callFunction();
        this.image.src = this.onMouseUpImageSrc;
    }
    this.isPressed = false;
    
    //DEBUG: console.log("released");
}

/*toggle: changes the status of 'isToggled'. 
Params: None.
Returns: None.
*/
function toggle() {
    if (this.isToggled) {this.isToggled = false;} 
    else {this.isToggled = true;}
}

/**************UTILITIES*****************/

/*
callFunction: Executes the function that was passed to this.func. 
Params: None. This will pull the parameters from this.params.
Returns: None. Calls: this.func(this.params[0], this.params[1], this.params[2]);
*/
function callFunction() {
    //If there are parameters, call the function with the given parameters. 
    //Else, just call the function. 
    if (this.params !== undefined) {
        if (this.params.length === 3) {
            this.func(this.params[0], this.params[1], this.params[2]);
        } 
        else if (this.params.length === 2) {
             this.func(this.params[0], this.params[1]);
        }
        else if (this.params.length === 1) {
             this.func(this.params[0]);
        }
    } else {
        this.func();
    }
}

/*
setSpriteAttributes: An easy way to set the sprite attributes for the button. 
Params: 
-x: the x coordinate on the canvas. 
-y: the y coordinate on the canvas.
-width: the width of the image source.
-height: the height of the image source. 
-name: the compiler name for the button (optional).
Returns: None.
*/
function setSpriteAttributes(x, y, width, height, name) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    if (name === undefined) {
        this.name = "button";
    } else {
        this.name = name;
    }
}

/*setSrc: Sets the image source of the button for the unpressed and pressed states. 
Params: 
- srcPrimary: The image source for the button when it is NOT pressed.
- srcSecondary: Image source for the button when it is PRESSED. 
Returns: None. Automatically sets image.src to the srcPrimary.
*/
function setSrc(srcPrimary, srcSecondary, anim) {
    this.image.src = srcPrimary;
    this.onMouseUpImageSrc = srcPrimary;
    this.onMouseDownImageSrc = srcSecondary;
    if (anim !== undefined) {this.anim = anim;}
}

/*setText: Sets text for the button that will appear always.  
Params: 
- textArray: Array of strings to be displayed on the button.
- textOffsetX: x position from button origin
- textOffsetY: y position from button origin
Returns: None.
*/
function setText(textArray, offsetX, offsetY) {
    this.text = textArray;
    this.textOffsetX = offsetX;
    this.textOffsetY = offsetY;
}

/*updateText: Sets text for the button that will appear always.  
Params: 
- textArray: Array of strings to be displayed on the button.
- colorArray: Color to be displayed on text on button.
Returns: None.
*/
function updateText(textArray, colorArray=['black']) {
    this.text = textArray;
    this.color = colorArray;
}

/*setTooltip: Sets text for the button that will appear when hovered.  
Params: 
- textString: String to be displayed next to the mouse.
Returns: None.
*/
function setTooltip(textString) {
    this.tooltip = [textString];
}

/* 
Constructor function. 
Params: _function: Takes in a function that will be called when the button is released. 
        _params:   Takes in an array of up to three parameters that must be passed into the function.  
Returns: None.
*/
function Button(_function, _params) {
    //Directly calls the Sprite class to inherit Sprite's attributes. 
    Sprite.call(this);
    this.text = [];
    this.tooltip = [];
    this.fontSize;
    this.color = [];
    this.textSrc;
    this.textOffsetX = 0;
    this.textOffsetY = 0;
    this.onMouseUpImageSrc;
    this.onMouseDownImageSrc;
    
    //Inherits all the Sprite prototype functions. 
    Button.prototype = Object.create(Button.prototype);
    
    //Button attributes. 
    this.hovered = false;
    this.isPressed = false;
    this.func = _function;
    this.params = _params;
    this.isToggleButton = false;
    this.hasTextValue = false;
    this.hasTooltip = false;
    
    //ONLY USE THIS IF this.isToggleButton IS TRUE
    this.isToggled = false;
}
Button.prototype.changeFunc = function(_function, _params) {
    this.func = _function;
    this.params = _params;
}
Button.prototype.constructor = Button;
Button.prototype.setSpriteAttributes = setSpriteAttributes;
/*Button.prototype.setSrc = function(srcPrimary, srcSecondary) {
    this.image = new Image();
    this.image.src = srcPrimary;
    this.onMouseUpImageSrc = srcPrimary;
    this.onMouseDownImageSrc = srcSecondary;
}*/
Button.prototype.update = function () {
    //Vertical frame advancement (wrapping)
    //Stopping and repeating
    if (this.randomFrameStart) {
        this.frameIndex = roll(this.frameTotal);
        this.randomFrameStart = false;
    }
    if (this.anim) {
        this.tickCount++; 
        if (this.tickCount > this.ticksPerFrame) {
            this.frameIndex++;
            if (this.frameIndex > this.frameTotal) {this.frameIndex = 0;}
            this.tickCount = 0; 
        }
    }
    //console.log(this.name + " " + this.frameIndex);
}
Button.prototype.draw = function () {
    if (!this.anim) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);       
    } else {
        //console.log("Animating " + this.name);
        ctx.drawImage(
            this.image, 
            //(this.frameIndex % 7) * this.width, 
            //Math.floor(this.frameIndex/7) * this.height, 
            (this.frameIndex % this.srcCols) * this.width, 
            Math.floor(this.frameIndex/this.srcCols) * this.height,
            this.width, 
            this.height, 
            this.x,
            this.y,
            this.width,
            this.height);
        
    }
    if ((this.hovered && this.text !== undefined) || this.hasTextValue || this.hasTooltip){
        if (this.text === undefined) {
            //console.log(this.name);
        } else {
        drawText(this.text, this.x + this.textOffsetX, this.y + this.textOffsetY, this.fontSize, this.color);
        }
        if (this.tooltip != undefined && cursor.x != undefined && cursor.y != undefined && this.hovered) {
    drawText(this.tooltip,cursor.x+5,cursor.y+5)
        }
    }
    //this.drawChildren();
}

Button.prototype.drawChildren = function() {
    //for (var i in this.children) {
        //this.children[i].draw();
    //}
}
Button.prototype.addChild = function(child) {
    this.children.push(child);
    game.buttonArray.push(child);
}
Button.prototype.setSpriteAttributes = setSpriteAttributes;
Button.prototype.setSrc = setSrc;
Button.prototype.setupAnim = function (frameCount, rows, cols) {
    this.frameTotal = frameCount;
    this.srcRows = rows;
    this.srcCols = cols;
    //this.randomFrameStart = true;
}
Button.prototype.setText = setText;
Button.prototype.updateText = updateText;
Button.prototype.setTooltip = setTooltip;
Button.prototype.toggle = toggle;
Button.prototype.mouseEventManager = mouseEventManager;
Button.prototype.onMouseMove = onMouseMove;
Button.prototype.onMouseEnter = onMouseEnter;
Button.prototype.onMouseLeave = onMouseLeave;
Button.prototype.onMouseDown = onMouseDown;
Button.prototype.onMouseUp = onMouseUp;
Button.prototype.callFunction = callFunction;