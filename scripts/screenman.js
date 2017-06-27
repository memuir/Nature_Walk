//----------------------Menu System Functions---------------------------
//----------------------------------------------------------------------
//A viewed game state
//Contains all updated and displayed game objects in a screen
//alwaysUpdate is for screens you want running in the background
//--Pop-up Menu--
//alwaysDraw is for screens drawn in the background
//--Pause Menu--
function Screen(alwaysUpdate, alwaysDraw){
    this.objects = [];
    this.buttonArray = [];

    //Boolean
    this.alwaysUpdate = alwaysUpdate;
    this.alwaysDraw = alwaysDraw;

    this.initialized = false;
}

//What runs when the screen is initially loaded
//Often is where you add objects
Screen.prototype.init = function() {
}

Screen.prototype.isEmpty = function() {
    if (this.objects.length == 0 || this.buttonArray.length == 0) {
        return true;
    } else {
        return false;
    }
}

Screen.prototype.push = function(object) {
    this.objects.push(object);
}

Screen.prototype.pushButton = function(button) {
    this.buttonArray.push(button);
}

Screen.prototype.remove = function(object) {
    for (var i in this.objects) {
        if (this.objects[i] == object) {
            this.objects.splice(i,1);
        }
    }
}

Screen.prototype.removeButton = function(button) {
    for (var i in this.buttonArray) {
        if (this.buttonArray[i] == button) {
            this.buttonArray.splice(i,1);
        }
    }
}

//Pushes all of the buttonArray so they will be drawn on screen.
Screen.prototype.displayButtons = function() {
    for (var i in this.buttonArray) {
        this.push(this.buttonArray[i]);
    }
}

Screen.prototype.contains = function(object) {
    for (var i in this.objects) {
        if (this.objects[i] == object) {
            return true;
        }
    }
    for (var i in this.buttonArray) {
        if (this.buttonArray[i] == object) {
            return true;
        }
    }
    return false;
}

Screen.prototype.draw = function() {
    for (var i in this.objects) {
        this.objects[i].draw();
    }
}

Screen.prototype.update = function() {
	//console.log(this.objects);
    for (var i in this.objects) {
        //console.log(this.objects[i])
        this.objects[i].update();
    }
    
    getTime();
}

//Object holding Screens
function ScreenManager(){
    this.screens = [];
}

ScreenManager.prototype.push = function(screen){
    for (var i in this.screens) {
        if (this.screens[i] == screen) {
            this.screens[i].initialized = false;
            this.screens[i].children = [];
            this.screens.splice(i,1);
        }
    }
    this.screens.push(screen);
}

ScreenManager.prototype.pop = function(){
    return this.screens.pop();
}

ScreenManager.prototype.remove = function(screen){
    for (var i in this.screens) {
        if (this.screens[i] == screen) {
            this.screens[i].initialized = false;
            this.screens[i].children = [];
            this.screens.splice(i,1);
        }
    }
}

ScreenManager.prototype.update = function(){
    var screens = this.screens;

    for(var i in screens){

        if(screens[i].alwaysUpdate || screens[i] == screens[screens.length-1]){
            if(!screens[i].initialized){
                screens[i].init();
                screens[i].initialized = true;
            }
            screens[i].update();
        }
    }
    /*quad.clear();
    for(var i = 0; i < collidableObjects.length; i++){
    	quad.insert(collidableObjects[i]); 
    	
    } */
}

ScreenManager.prototype.draw = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var screens = this.screens;
    for(var i in screens){

        if(screens[i].alwaysDraw || screens[i] == screens[screens.length-1]){
            screens[i].draw();
        }
    }
}
