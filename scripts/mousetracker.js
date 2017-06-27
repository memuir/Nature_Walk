
function MouseManager() {
    //The constructor.
}


/*
getMousePos: Function to get the mouse position.
Params: 
-canvas: The browser's canvas. 
-event: The mouse event to get the cursor's location. 
Returns: Object containing the x and y coordinates of the cursor. 
*/

//Credit -- 
// "http://stackoverflow.com/questions/24384368/simple-button-in-html5-canvas"
MouseManager.prototype.getMousePos = function (canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
};

/*
findTarget: Function to check all of the buttons on every updating screen
            to see if the cursor is within the bounds of one of them.
Params: 
-evt: The event that called the function.  
Returns: None. 
*/
MouseManager.prototype.findTarget = function (evt) {
    var mousePos = this.getMousePos(canvas, evt);
    screens = screenMan.screens;
    for(var s = 0; s < screens.length; s++){
        if((screens[s].alwaysUpdate || screens[s] == screens[screens.length-1]) && screens[s].buttonArray != undefined){
            for (var i=0; i<screens[s].buttonArray.length; i++) {
                //DEBUG: console.log("Scanning buttonArray");
                if (this.isInside(screens[s].buttonArray[i], mousePos)) {
                    //console.log(screens[s].buttonArray[i].name);
                    screens[s].buttonArray[i].mouseEventManager(evt.type);
                } else {
                    if (screens[s].buttonArray[i].hovered){
                        screens[s].buttonArray[i].onMouseLeave();
                    }
                }
            }
        }
    }

};

/*
isInside: Checks the position of the mouse in relation to this button.
Params: 
-button: The button that is being checked. 
-mouse: The position of the mouse on the canvas. 
Returns: Boolean indicating if cursor is within this button's boundaries. 
*/

MouseManager.prototype.isInside = function(button, mouse) {
    //DEBUG: console.log("Button at: " + button.x + "x");
    return (
        (mouse.x > button.x && mouse.x < button.x+button.width) &&
        (mouse.y > button.y && mouse.y < button.y+button.height));
}
