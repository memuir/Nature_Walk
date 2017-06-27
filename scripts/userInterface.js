/* GENERAL UI NOTES:
 * There are lots of integer coordinates for the current UI, for scalability purposes, 
 they should be changed to fractions of the screen width and height. 
*/

/*JIM MEETING NOTES
 * Add Title for selected animal. (DONE)
 * Show level below animal icons. (DONE)
 * Game Title somewhere on the page. (DONE in text, need logo)
 * Better communication of events and effects of them. 
 * Multiple different animals on screen, only show animals that the player has. (DONE)
 * Player's permanent animal. 
 */

/*
 *BUTTON TEXT IS AN ARRAY NOW
 */

/* ui_values
* List of various source arrays for image resources and data objects like the attribute list. 
Most of these elements are in a SPECIFIC order to accomodate the code. 
Something more general would probably be more efficient if we intend to add more animals or animal variations. 
*/

var ui_values = {
    //Capitalized for the sake of displaying, 
    //when using these to acquire data from animal.js, 
    //make sure to use "toLowerCase()".
    animalAry: ["Bird", "Deer", "Frog", "Bunny"],
    //animalStatsAry: [dataObj.BirdStats, dataObj.DeerStats, dataObj.FrogStats, dataObj.BunnyStats],
    animalSrcAry: [("image_resources/Icon_Bird.png"),
                  ("image_resources/Icon_Deer.png"),
                  ("image_resources/Icon_Frog.png"),
                  ("image_resources/Icon_Bunny.png"),
                  ("image_resources/EventLog.png")],
    
    animalSrcHover: [("image_resources/Icon_BirdH.png"),
                     ("image_resources/Icon_DeerH.png"),
                     ("image_resources/Icon_FrogH.png"),
                     ("image_resources/Icon_BunnyH.png")],
    
    //For gif animations, though I didn't figure out how to make them do gif things. 
    /*
    animalStaticAry: [("image_resources/Static_BirdT.png"),
                      ("image_resources/Static_DeerT.png"),
                      ("image_resources/Static_FrogT.png"),
                      ("image_resources/Static_BunnyT.png"),
                      ("image_resources/EventLog.png")],
    
    animalStaticHover: 
    [("image_resources/Static_BirdT_Hover.png"),
     ("image_resources/Static_DeerT_Hover.png"),
     ("image_resources/Static_FrogT_Hover.png"),
     ("image_resources/Static_BunnyT_Hover.png")],
     */
    animalStaticAry: [("image_resources/BirdStill.png"),
                      ("image_resources/DeerStill.png"),
                      ("image_resources/FrogStill.png"),
                      ("image_resources/BunnyStill.png"),
                      ("image_resources/EventLog.png")],
    
    animalStaticHover: 
    [("image_resources/BirdStillAnim.png"),
     ("image_resources/DeerStillAnim.png"),
     ("image_resources/FrogStillAnim.png"),
     ("image_resources/BunnyStillAnim.png")],

    animalWalkAry: [("image_resources/BirdWalk.png"),
                    ("image_resources/DeerWalk100_500x400.png"),
                    ("image_resources/FrogWalk100.png"),
                    ("image_resources/BunnyWalk.png")],
    //For selecting base animal or party animal
    selected: "base",
    partyIndex: 0,
    currentAnimal: "Deer",
    //currentAnimalStats: dataObj.BirdStats,
    //attributes: ["armor", "speed", "capacity", "lifespan"],
};


/* backgroundSetup() - For setting up, non-button elements of the canvas, like the map and the pane that holds all of the attributes. 
 * Params - None. 
 * Returns - An array of panes that the interface.init will push into the screen array. 
 * Notes: There are many variables in this function that could be combined into one single variable, 
 but I've created multiple for readability's sake. 
*/
function backgroundSetup() {
    "use strict";
    var panes = [], i, j, attributesPane, subAttPane;
    
    /////////////////////////////////////////////////
    //ATTRIBUTES PANE
    /////////////////////////////////////////////////
/*    attributesPane = new Sprite();
    attributesPane.setSrc("image_resources/AttPane.png");
    attributesPane.setSpriteAttributes(46, 195, 440, 370, "attributesPane");
    panes.push(attributesPane);*/
    /////////////////////////////////////////////////
    
    
    /////////////////////////////////////////////////
    //STATS PANE
    /////////////////////////////////////////////////
    var statPane = new Sprite();
    statPane.setSrc("image_resources/EventLog.png");
    statPane.setSpriteAttributes(75, 235, 115, 133, "statPane");
    panes.push(statPane);
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //STAT VALUE PANE
    /////////////////////////////////////////////////
    var statPane = new Sprite();
    statPane.setSrc("image_resources/EventLog.png");
    statPane.setSpriteAttributes(180, 235, 70, 133, "statVals");
    panes.push(statPane);
    /////////////////////////////////////////////////
    
    return panes;
}

/* buttonSetup() - For setting up, button elements of the canvas.
 * Params - None. 
 * Returns - None. 
 * Notes: There is a small cheat here in which UI elements that have tooltips 
 (even if they are not meant to call a function) are being used as buttons. 
 * IMPORTANT: For tooltips to be updated regularly, you must manually change the button's update function to adapt the value. 
 That, or have a function elsewhere that changes 'btn.text' for the button's draw function. 
*/

function buttonSetup() {
	/////////////////////////////////////////////////
    //Title Login
    /////////////////////////////////////////////////
    //Replace with a function that ensures the game data is loaded before the game is pushed.
    function loadGame(str) {
        //Would also include pulling from the server.
        if (str === "fit") {
            fitbit_start();
            if(userID == undefined){
             userID = "testing21";
             stepCount = 70000;
            }

            //logs user data to local storage
            //console.log(userID);
            
        } else if (str === "not") {
            userID = "testing21";
            stepCount = 70000;
            
        }
        logIn();
        screenMan.push(game);
        screenMan.push(interface);
        console.log("What comes after this?");
        gameState.setupComplete = true;
        //gameState.setupTimer = 1; 
    }

    var loginFit = new Button(function () {
        loadGame("fit");
    });
    loginFit.setSrc("image_resources/StepPaper.png","image_resources/TracksPaper.png")
    loginFit.setSpriteAttributes(232,248,240,80, "login button")
    loginFit.hasTextValue = true;
    loginFit.setText(["Login With Fitbit"],40,20)
    //console.log(login.text);
    title.buttonArray.push(loginFit);
    
    var loginNot = new Button(function () {
        loadGame("not");
    });
    loginNot.setSrc("image_resources/StepPaper.png","image_resources/TracksPaper.png")
    loginNot.setSpriteAttributes(532,248,240,80, "login button")
    loginNot.hasTextValue = true;
    loginNot.setText(["Login Without Fitbit"],20,20)
    //console.log(login.text);
    title.buttonArray.push(loginNot);
	
	/////////////////////////////////////////////////
    //Logout Button
    /////////////////////////////////////////////////
    //Opens the menu screen
    function changeUser() {
    	//createPackage();
        //createData(lJson);
    	logout();
    }
    var logoutButton = new Button(changeUser);
    logoutButton.setSrc("image_resources/user_logout.png","image_resources/ClearSquare.png");
    logoutButton.setSpriteAttributes(40,120,30,30, "logoutButton");
    interface.buttonArray.push(logoutButton);



    /////////////////////////////////////////////////
    //Menu Button
    /////////////////////////////////////////////////
    //Opens the menu screen
    function openMenu() {
        gameState.menuPause = true;
        screenMan.push(gameMenu);
        screenMan.push(subSettings);
        soundMan.click.play();
    }

    var menuButton = new Button(openMenu);
    menuButton.setSrc("image_resources/menu.png","image_resources/ClearSquare.png");
    menuButton.setSpriteAttributes(30,70,50,50, "menuButton");
    interface.buttonArray.push(menuButton);

    /////////////////////////////////////////////////
    //Mute Button
    /////////////////////////////////////////////////
    function mB() {soundMan.mute_music()}
    //function mB() {screenMan.push(popups)}

    muteButton = new Button(mB);
    muteButton.setSrc("image_resources/Sound0.png", "image_resources/Sound.png");
    muteButton.setSpriteAttributes(40,40,30,30, "mute_music");
    muteButton.isToggleButton = true;
    interface.buttonArray.push(muteButton);

    /////////////////////////////////////////////////
    //DEV ATTRIBUTES
    /////////////////////////////////////////////////
    var devAttributes = new Button(dataTracker.openDevWindow);
    devAttributes.setSrc("image_resources/ClearSquare.png", "image_resources/ClearSquare.png");
    devAttributes.setSpriteAttributes(20, 530, 30, 30, "devWindow");
    interface.buttonArray.push(devAttributes);
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //STEP PANE
    /////////////////////////////////////////////////
    var stepPane = new Button(function() {});
    stepPane.setSrc("image_resources/StepPaper.png");
    stepPane.setSpriteAttributes(146, 35, 110, 50, "stepPane");
    stepPane.hasTextValue = true;
    stepPane.fontSize = "20px";

    var stepLogo = new Button();
    stepLogo.setSrc("image_resources/feet.png");
    stepLogo.setSpriteAttributes(stepPane.x+10, stepPane.y+10, 25, 25, "stepLogo");
    
    //Arbitrary step setup if the player does not have any steps yet. 
    stepPane.setText([stepCount], 150, stepPane.height / 4);
    
    //Changeing the button's update function to get the step count every frame. 
    stepPane.update = function() {
        this.updateText([numberConversion(stepCount)]);
        this.textOffsetX = (stepPane.width / 2) - 3.5 * numberLen(numberConversion(stepCount))
    };
    
    interface.buttonArray.push(stepPane);
    interface.buttonArray.push(stepLogo);
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //STEP MULTIPLIER PANE
    /////////////////////////////////////////////////
    var stepMultPane = new Button(function () {
        //stepMultiplier();
    });
    stepMultPane.setSrc("image_resources/StepPaper.png");
    stepMultPane.setSpriteAttributes(86, 35, 65, 50, "stepMultPane");
    stepMultPane.hasTextValue = true;
    stepMultPane.fontSize = '20px';
    //stepMultPane.color = 'blue';
    //Arbitrary step setup if the player does not have any steps yet. 
    
    
    
    stepMultPane.setText(["1.35x"], (stepMultPane.width / 2) - 5 * numberLen(1.35 + "x"), stepMultPane.height / 4);
    
    //Changeing the button's update function to get the step count every frame. 
    stepMultPane.update = function() {
        var text = [];
        var color = [];
        var mult = dataObj.stepMultiplier.toFixed(2);
        text.push([mult]);
        if (mult < 1.5) {
            color.push("rgb(50,240,0)");
        } else if (mult < 1.76) {
            color.push("rgb(245,245,0)");
        } else {
            color.push("rgb(245,50,0)");
        }
        
        text.push(["x"])
        color.push('black')
        this.updateText(text, color);
        this.textOffsetX = (stepMultPane.width / 2) - 5 * numberLen(dataObj.stepMultiplier.toFixed(2) + "x")
    };
    interface.buttonArray.push(stepMultPane);
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //TRACKS PANE
    /////////////////////////////////////////////////
    var trackPane = new Button();
    trackPane.setSrc("image_resources/TracksPaper.png");
    trackPane.setSpriteAttributes(286, 35, 170, 50, "trackPane");
    trackPane.hasTextValue = true;
    trackPane.fontSize = "20px";
    trackPane.color = 'blue';
    
    //Changing the button's update function to get the step count every frame. 
    trackPane.update = function() {
        var text = [];
        var color = [];
        text.push(numberConversion(Math.floor(dataObj.animalTracks)))
        color.push('blue');
        this.updateText(text,color);
        this.textOffsetX = (trackPane.width / 2) - 5 * numberLen(Math.floor(dataObj.animalTracks))
        this.textOffsetY = 10;
    };
    interface.buttonArray.push(trackPane);
    
    var trackLogo = new Button();
    trackLogo.setSrc("image_resources/BunnyPrint.png");
    trackLogo.setSpriteAttributes(trackPane.x+10, stepPane.y+10, 25, 25, "trackLogo");
    interface.buttonArray.push(trackLogo);
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //ANIMAL ICONS
    /////////////////////////////////////////////////
    var animalIcon, i, animalCount;
    for (i = 0; i < 4; i++) {
        animalIcon = new Button(select_base, [i]);
        
        animalIcon.setSrc(ui_values.animalSrcAry[i], ui_values.animalSrcAry[4]);
        
        animalIcon.setSpriteAttributes((89 +(100*i)), 120, 60, 60, "animal_icon" + i);
        animalIcon.hasTextValue = true;
        animalIcon.setText([ui_values.animalAry[i]], (5-ui_values.animalAry[i].length)*5, -27);
        
        (function(i) {
            animalIcon.update = function() {
                var src; 
                //var currIndex = ui_values.animalAry.indexOf(ui_values.currentAnimal);
                //console.log(i);
                if(ui_values.selected == 'base' && ui_values.animalAry[i] == ui_values.currentAnimal){
                	src = ui_values.animalSrcHover;
                } else {
                	src = ui_values.animalSrcAry;
                };
                this.setSrc(src[i], src[i], false);  
            }
        })(i);
        interface.buttonArray.push(animalIcon);
        /////////////////////////////////////////////////
        
        /////////////////////////////////////////////////
        //ANIMAL LEVEL
        /////////////////////////////////////////////////
        animalLevel = new Button(function() {})
        animalLevel.setSrc("image_resources/ClearSquare.png");
        animalLevel.setSpriteAttributes((121 +(100*i)), 175, 0, 0, "animal_level" + i);
        animalLevel.hasTextValue = true;
        animalLevel.fontSize = "16px";
        
        (function(i) {
            animalLevel.update = function() {
                var temp = ui_values.animalAry[i].toLowerCase();
                var level = controller.getAnimalBaseLevel(temp);
                var charNum = numberLen("Lvl " + level);
                //charNum += "Lvl ".length;
                this.setText(["Lvl " + level], (animalLevel.width / 2) - (4 * charNum), 5);
            }
        })(i);
        interface.buttonArray.push(animalLevel);
        /////////////////////////////////////////////////  
    }
    
    /////////////////////////////////////////////////
    //ATTRIBUTE NAMES
    /////////////////////////////////////////////////
    
    var attButton, attValue, animalImage, animalImageCost;

    for (i = 0; i < 4; i++) {

        attValue = new Button(function () {});
        attValue.setSrc("image_resources/ClearSquare.png");
        
        attValue.setSpriteAttributes(96, (245 + 27 * i), 0, 40, "attribute_value" + i);
        
        attValue.hasTextValue = true;
        attValue.fontSize = '22px';
        
        charNum = gameState.animalStats[i].length;
        attValue.setText([gameState.animalStats[i]], 0, 0);
        interface.buttonArray.push(attValue);
        
        /////////////////////////////////////////////////
        //ATTRIBUTE VALUES
        /////////////////////////////////////////////////
    	var hoveredBase = false;
    	var hoveredAnim = false;
    	
        attNum = new Button(function () {});
        attNum.setSrc("image_resources/ClearSquare.png");
        
        attNum.setSpriteAttributes(218, (245 + 27 * i), 0, 40, "attribute_value" + i);
        
        attNum.hasTextValue = true;
        attNum.fontSize = '22px';
        attNum.color = ["black"];
        
        (function(i) {
            attNum.update = function() {
                if (ui_values.selected == "base") {
                	if(hoveredBase){
                		this.color = ["green"];	
                		var testRef = controller.getBaseLevelUp(ui_values.currentAnimal.toLowerCase());
                        //console.log(testRef);
                	}else{
                		this.color = ["black"];	
                    	var stats = (ui_values.currentAnimal).toLowerCase();
                    	var testRef = controller.getBaseData(stats);
                    };
                    if(maxBaseHovered){
                    	this.color = ["green"];
                    	var testRef = controller.getBaseMaxUpgrade(ui_values.currentAnimal.toLowerCase());
                    };
                    //console.log(maxBaseHovered);
                } else {
                	if(hoveredAnim){
                		this.color = ["green"];	
                		var testRef = controller.getAnimalLevelUp()[ui_values.partyIndex];
                    	if (testRef == undefined) {
                        	ui_values.selected = "base"
                        	return;
                    	}
                    	if (testRef != undefined) {
                        	testRef.splice(0,1);
                        	testRef.splice(4,1);
                    	}
                	}else{
                		this.color = ["black"];	
                		var testRef = controller.getAnimalData()[ui_values.partyIndex];
                    	if (testRef == undefined) {
                        	ui_values.selected = "base"
                        	return;
                    	}
                    	if (testRef != undefined) {
                        	testRef.splice(0,1);
                        	testRef.splice(4,1);
                    	}
                    };
                    if(maxAnimalHovered){
                    	this.color = ["green"];
                    	
                    	var testRef = controller.getAnimalMaxUpgrade()[ui_values.partyIndex];
                    	if (testRef == undefined) {
                        	ui_values.selected = "base"
                        	return;
                    	}
                    	if (testRef != undefined) {
                        	testRef.splice(0,1);
                        	testRef.splice(4,1);
                    	}

                    };
                    //console.log(testRef)
                }
                //Workaround, some event may be more broken
                if (testRef == undefined) return;

                var charNum = numberConversion(testRef[i]).length  
                this.setText([numberConversion(testRef[i])], (attNum.width / 2) - (5 * charNum), 0);
                
            }
        })(i);
        interface.buttonArray.push(attNum);
        /////////////////////////////////////////////////
    }
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //UPGRADE BUTTON
    /////////////////////////////////////////////////
    var upgradeBtn;
 
    upgradeBtn = new Button(function() {
        if (ui_values.selected == "base") {
            //upgrade_baseAnimalMax();
            upgrade_baseAnimal();
        } else {
            //upgrade_animalMax();
            upgrade_animal();
        }
    });
    upgradeBtn.setSrc("image_resources/Button.png", "image_resources/ButtonPressed.png");
    upgradeBtn.setSpriteAttributes(65, 405, 120, 40, "UpgradeBtn");

    upgradeBtn.hasTextValue = true;
    upgradeBtn.fontSize = '16px';
    charnum = "upgrade".length;
    upgradeBtn.setText(["UPGRADE"], (upgradeBtn.width / 2) - (6.3 * charnum), 5);
    //upgradeBtn.setTooltip("This upgrades the "+ui_values.selected+" animal to the next level.");
    upgradeBtn.update = function () {
    //////////////
    if(this.hovered && ui_values.selected == "base"){
    	hoveredBase = true;
    } else if(this.hovered){
    	hoveredAnim = true;
    } else {
    	hoveredBase = false;
    	hoveredAnim = false;
    };
    
        if (ui_values.selected === "base") {
           charnum = "+1 (Base)".length;
            if (this.isPressed) {
                upgradeBtn.setText(["+1 (Base)"], (upgradeBtn.width / 2) - (2.8 * charnum) - 5, 12); 
            } else {
                upgradeBtn.setText(["+1 (Base)"], (upgradeBtn.width / 2) - (2.8 * charnum), 7); 
            }
            
        } else {
            charnum = "+1 (Selected)".length;
            if (this.isPressed) {
                upgradeBtn.setText(["+1 (Selected)"], (upgradeBtn.width / 2) - (2.8 * charnum) - 5, 12); 
            } else {
                upgradeBtn.setText(["+1 (Selected)"], (upgradeBtn.width / 2) - (2.8 * charnum), 7);
            }
            
        }
    }
    interface.buttonArray.push(upgradeBtn);    
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //UPGRADE COST
    /////////////////////////////////////////////////
    var upgradeCost;
    upgradeCost = new Button(function() {});
    upgradeCost.setSrc("image_resources/StepPaper.png");

    upgradeCost.setSpriteAttributes(186, 405, 65, 40, "upgradeCost");

    upgradeCost.hasTextValue = true;
    upgradeCost.fontSize = '20px';
    upgradeCost.color = ['blue'];


    upgradeCost.update = function() {
        if (ui_values.selected == "base") {
            var level = controller.base_levels[(ui_values.currentAnimal).toLowerCase()];  
            charnum = numberConversion(level*2.75*500).length;
            upgradeCost.setText([numberConversion(level*2.75*500)], (upgradeCost.width / 2) - (4 * charnum), 5);

        } else {
            if (controller.animals[ui_values.partyIndex] == undefined) {
                ui_values.selected = "base";
                return;
            }
            var level = controller.animals[ui_values.partyIndex].level;
            charnum = numberConversion(level*1.75*100).length;
            upgradeCost.setText([numberConversion(level*1.75*100)], (upgradeCost.width / 2) - (4 * charnum), 5);
        }

        
    };

   
    //upgradeCost.setText(level*100, 0,0);
    interface.buttonArray.push(upgradeCost); 
    console.log(upgradeCost.update);
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //ADD ANIMAL BUTTON
    /////////////////////////////////////////////////
    animalImage = new Button(add_animal);
    animalImage.setSrc(ui_values.animalStaticAry[1], "image_resources/EventLog.png");
    animalImage.setSpriteAttributes(286, 230, 170, 170, "animal_image");
    //animalImage.setTooltip("Pressing this calls the selected animal.");
    interface.buttonArray.push(animalImage);
    
    animalImage.hasTextValue = true;
    animalImage.fontSize = '38px';
    animalImage.update = function() {
        var src = "";
        var currIndex = ui_values.animalAry.indexOf(ui_values.currentAnimal);
        
        if (this.hovered) {
            src = ui_values.animalStaticHover;
            this.setSrc(src[currIndex], src[currIndex], true);
            switch (currIndex) {
                case 0:
                    this.setupAnim(27, 6, 6);
                    break;
                case 1:
                    this.setupAnim(26, 6, 6);
                    break;
                case 2:
                    this.setupAnim(26, 6, 6);
                    break;
                case 3:
                    this.setupAnim(23, 5, 5);
                    break;
            }
            
            //console.log("Hovered");
        } else {
            src = ui_values.animalStaticAry;
            this.setSrc(src[currIndex], src[currIndex], false);
        }
        
        
        if (this.anim) {
            this.tickCount++; 
            if (this.tickCount > this.ticksPerFrame) {
                this.frameIndex++;
                if (this.frameIndex > this.frameTotal) {this.frameIndex = 0;}
                this.tickCount = 0; 
            }
        }
        if (ui_values.selected == "base") {
            var name = ui_values.currentAnimal;
            var charNum = numberLen(name);  
            this.setText([name], -140 - (5 *charNum), -30);

        } else {

            if (controller.animals[ui_values.partyIndex] == undefined) {
                ui_values.selected = "base";
                return;
            }
            //This line gave me cancer
            //var type = toCapitalize(controller.animals[ui_values.partyIndex].type);
            var name = controller.animals[ui_values.partyIndex].name;
            var charNum = numberLen(name);  
            this.setText([name], -140 - (6 * charNum), -30);
        }
    }
    
    animalImageCost = new Button(add_animal);
    animalImageCost.setSrc("image_resources/Button.png", "image_resources/ButtonPressed.png");
    animalImageCost.setSpriteAttributes(286, 405, 170, 40, "animal_cost");
    
    
    animalImageCost.hasTextValue = true;
    animalImageCost.fontSize = '22px';
    animalImageCost.flashingOpacity = 0.5;
    animalImageCost.fadeIn = true;
                
    animalImageCost.update = function () {
        if (this.isPressed) {
            animalImageCost.setText([2000 + " Steps"], 31, 7);
        } else {
            animalImageCost.setText([2000 + " Steps"], 36, 2);
        }
    
        if (dataObj.tutorialProgress == 13) {
            if (this.fadeIn) {
                this.flashingOpacity += .03;
            } else {
                this.flashingOpacity -= .03;
            }

            if (this.flashingOpacity > .75) {
                this.fadeIn = false;
            } else if (this.flashingOpacity < .4) {
                this.fadeIn = true;
            }
        }
    }

    animalImageCost.draw = function () {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height); 
        if(dataObj.tutorialProgress == 13){
            ctx.globalAlpha = this.flashingOpacity;
            ctx.fillStyle="#f0f800";
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.globalAlpha = 1.0
            ctx.fillStyle="#000000"
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
    }
    interface.buttonArray.push(animalImageCost);

    /////////////////////////////////////////////////

    /////////////////////////////////////////////////
    //EVENT ANIMATIONS -- REAR
    /////////////////////////////////////////////////
    var eventAnimationRear = new Button();
    eventAnimationRear.setSrc("image_resources/ClearSquare.png");
    //eventAnimation.setSrc("image_resources/PredatorEvent1s.png", "image_resources/PredatorEvent1s.png", true);
    eventAnimationRear.setSpriteAttributes(865, 380, 150, 100, "eventAnimationRear");
    
    //eventAnimation.setupAnim(12, 4, 4);
    interface.buttonArray.push(eventAnimationRear); 
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //ANIMAL ANIMATIONS
    /////////////////////////////////////////////////
    for (i = 1; i <= 12; i++) {
        var animalAnimation = new Button();
        animalAnimation.setSrc(ui_values.animalWalkAry[i],                              ui_values.animalWalkAry[i], true);
        animalAnimation.setSpriteAttributes(707 + roll(60) - (80*((i-1)%3)), (10*Math.floor(i-1/4))+340, 100, 100, "animalAnimation");

        (function(i) {
            /*
            animalAnimation.update = function() { 
                var party_size = controller.getNumAnimals();
                //console.log("Party Size " + party_size);
                var animal_select;
                if (party_size < i || party_size === 0) {
                    this.setSrc("image_resources/ClearSquare.png", "image_resources/ClearSquare.png", false);
                } else {
                    animal_select = controller.animals[i-1];
                    //console.log(animal_select.type);
                    switch (animal_select.type) {
                        case "bird":
                            this.setSrc(ui_values.animalWalkAry[0],
                                        ui_values.animalWalkAry[0], true);
                            this.setupAnim(4, 3, 3);
                            break;
                        case "deer":
                            this.setSrc(ui_values.animalWalkAry[1],
                                        ui_values.animalWalkAry[1], true);
                            this.setupAnim(16, 4, 5);
                            break;
                        case "frog":
                            this.setSrc(ui_values.animalWalkAry[2],
                                        ui_values.animalWalkAry[2], true);
                            this.setupAnim(21, 5, 5);
                            break;
                        case "bunny":
                            this.setSrc(ui_values.animalWalkAry[3],
                                        ui_values.animalWalkAry[3], true);
                            this.setupAnim(6, 3, 3);
                            break;
                        default:
                            break;
                    }
                }
                if (this.anim) {
                    this.tickCount++; 
                    if (this.tickCount > this.ticksPerFrame) {
                        this.frameIndex++;
                        if (this.frameIndex > this.frameTotal) {this.frameIndex = 0;}
                        this.tickCount = 0; 
                    }
                }
            }
            */
            animalAnimation.update = function() { 
                var party_size = controller.getNumAnimals();
                //console.log("Party Size " + party_size);
                var animal_select;
                if (party_size < i || party_size === 0) {
                    this.setSrc("image_resources/ClearSquare.png", "image_resources/ClearSquare.png", false);
                } else {
                    animal_select = controller.animals[i-1];
                    //console.log(animal_select.type);
                    switch (animal_select.type) {
                        case "bird":
                            this.setSrc(ui_values.animalWalkAry[0],
                                        ui_values.animalWalkAry[0], true);
                            this.setupAnim(4, 3, 3);
                            break;
                        case "deer":
                            this.setSrc(ui_values.animalWalkAry[1],
                                        ui_values.animalWalkAry[1], true);
                            this.setupAnim(16, 4, 5);
                            break;
                        case "frog":
                            this.setSrc(ui_values.animalWalkAry[2],
                                        ui_values.animalWalkAry[2], true);
                            this.setupAnim(21, 5, 5);
                            break;
                        case "bunny":
                            this.setSrc(ui_values.animalWalkAry[3],
                                        ui_values.animalWalkAry[3], true);
                            this.setupAnim(6, 3, 3);
                            break;
                        default:
                            break;
                    }
                }
                if (this.anim) {
                    this.tickCount++; 
                    if (this.tickCount > this.ticksPerFrame) {
                        this.frameIndex++;
                        if (this.frameIndex > this.frameTotal) {this.frameIndex = 0;}
                        this.tickCount = 0; 
                    }
                }
            }
        })(i);
        interface.buttonArray.push(animalAnimation); 
    }
    /////////////////////////////////////////////////

    /////////////////////////////////////////////////
    //EVENT ANIMATIONS -- FRONT
    /////////////////////////////////////////////////
    var eventAnimationFront = new Button();
    eventAnimationFront.setSrc("image_resources/ClearSquare.png");
    //eventAnimation.setSrc("image_resources/PredatorEvent1s.png", "image_resources/PredatorEvent1s.png", true);
    eventAnimationFront.setSpriteAttributes(865, 380, 150, 100, "eventAnimationFront");
    
    //eventAnimation.setupAnim(12, 4, 4);
    interface.buttonArray.push(eventAnimationFront); 
    /////////////////////////////////////////////////

    /////////////////////////////////////////////////
    //WEATHER EVENT ANIMATIONS
    /////////////////////////////////////////////////
    var weatherAnimation = new Button();
    weatherAnimation.setSrc("image_resources/ClearSquare.png");
    //weatherAnimation.setSrc("image_resources/Event_Snow.png", "image_resources/Event_Snow.png", true);
    weatherAnimation.setSpriteAttributes(515, 220, 480, 330, "weatherAnimation");
    
    //weatherAnimation.setupAnim(22, 5, 5);
    interface.buttonArray.push(weatherAnimation); 
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //AREA CONTROLS
    /////////////////////////////////////////////////
    areaText = new Button(function () {});
    areaText.setSrc("image_resources/StepPaper.png");
    areaText.setSpriteAttributes(600, 235, 300, 50, "areaText");
    areaText.hasTextValue = true;
    areaText.fontSize = '20px';
    areaText.update = function() {
        var daynight;
        if (controller.getAreaLevel() % 2 == 0) {
            daynight = "Night";
        } else {
            daynight = "Day"
        }
        var text = "Area "+controller.getAreaLevel()+" " + toCapitalize(controller.areaSeason+", "+daynight);
        this.setText([text], (areaText.width / 2) - (4.1 * text.length), 10);
        //this.setText(text, (areaText.width / 2) - (5 * text.length), 10);
    }
    interface.buttonArray.push(areaText);

    areaPrev = new Button(function() {
        if(controller.getAreaLevel() > 1) {
            controller.areaLevelDown();
            soundMan.click.play();
        }
    });

    areaPrev.update = function() {
        if (controller.getAreaLevel() <= 1) {
            areaPrev.setSrc("image_resources/ClearSquare.png","image_resources/ClearSquare.png");
        } else {
            areaPrev.setSrc("image_resources/ArrowsLeft.png","image_resources/ArrowsLeftPressed.png");
        }
    }

    areaPrev.setSrc("image_resources/ArrowsLeft.png","image_resources/ArrowsLeftPressed.png");
    areaPrev.setSpriteAttributes(625, 245, 25, 25, "areaPrev");
    interface.buttonArray.push(areaPrev);

    //areaNext = new Button(controller.areaLevelUp);
    areaNext = new Button(function() {
            if (areaEligible(controller.getAreaLevel())) {soundMan.click.play();
                controller.areaLevelUp();}
        
            if(dataObj.tutorialProgress == 33){
                startTutorialPartFour();
            }
        });

    areaNext.update = function() {
        maxArea(controller.getAreaLevel());
        if (!areaEligible(controller.getAreaLevel())) {
            areaNext.setSrc("image_resources/ClearSquare.png","image_resources/ClearSquare.png");
        } else {
            areaNext.setSrc("image_resources/ArrowsRight.png","image_resources/ArrowsRightPressed.png");
        }
        if (dataObj.tutorialProgress == 33) {
            if (this.fadeIn) {
                this.flashingOpacity += .03;
            } else {
                this.flashingOpacity -= .03;
            }
            
            if (this.flashingOpacity > .75) {
                this.fadeIn = false;
            } else if (this.flashingOpacity < .4) {
                this.fadeIn = true;
            }
        }
    }

    areaNext.setSrc("image_resources/ArrowsRight.png","image_resources/ArrowsRightPressed.png");

    areaNext.setSpriteAttributes(850, 245, 25, 25, "areaNext");
    areaNext.flashingOpacity = 0.5;
    areaNext.fadeIn = true;
    areaNext.draw = function () {
        
        if(dataObj.tutorialProgress == 33){
            ctx.globalAlpha = this.flashingOpacity;
            ctx.fillStyle="#f0f800";
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.globalAlpha = 1.0
            ctx.fillStyle="#000000"
        }
       
        
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
    interface.buttonArray.push(areaNext);

    /////////////////////////////////////////////////
    //EVENT LOG
    /////////////////////////////////////////////////

    var eventLogPane = new Button();
    eventLogPane.setSrc("image_resources/EventLog.png");
    eventLogPane.setSpriteAttributes(527, 30, 452, 204, "eventLog");
    interface.buttonArray.push(eventLogPane);

        
    for (i = 0; i < 5; i++) {
        var eventLogEntry = new Button();
        eventLogEntry.setSrc("image_resources/ClearSquare.png");
        eventLogEntry.setSpriteAttributes(567, (40*i)+45, 452, 54, "eventLog");
        interface.buttonArray.push(eventLogEntry);

        eventLogEntry.hasTextValue = true;
        eventLogEntry.fontSize = '16px';

        (function(i) {
            var testRef = eventLogAry[i];
            //console.log(testRef);
            eventLogEntry.update = function() {
                if (eventLogAry[i]) {
                    this.updateText([eventLogAry[i]]);
                } else {this.updateText([""]);}
            }
        })(i);
        
        (function(i) {
            eventLogEntry.draw = function() {
                if ((this.hovered && this.text !== undefined) || this.hasTextValue){
                    if (this.text === undefined) {
                    } else {
                        drawWrappedText(this.text, this.x + this.textOffsetX, this.y + this.textOffsetY, this.fontSize, 395, 16);
                    }
                }
            }
        })(i);
    }
    /////////////////////////////////////////////////

    /////////////////////////////////////////////////
    //Selected Party Animal Indicator
    /////////////////////////////////////////////////
    var selectedAnimal = new Button(function () {
        if(dataObj.tutorialProgress == 21){
            startTutorialPartThree(); 
        }
    });
    selectedAnimal.setSrc("image_resources/ClearSquare.png","image_resources/ClearSquare.png");
    selectedAnimal.setSpriteAttributes(101,455,40,40, "selected animal")
    selectedAnimal.flashingOpacity = 0.5;
    selectedAnimal.fadeIn = true;

    selectedAnimal.update = function() {
        if (controller.animals[ui_values.partyIndex] == undefined || partyButtons[ui_values.partyIndex] == undefined) {
            ui_values.selected = "base";
            return;
        }
      
        //Reset all party buttons to their original asset sources. 
        for (var pB = 0; pB < partyButtons.length; pB++) {
           var num = aniToNum(controller.animals[pB].type);  partyButtons[pB].setSrc(ui_values.animalSrcAry[num],ui_values.animalSrcHover[num])
        }
        // Get the current animal being selected. 
      var num = aniToNum(controller.animals[ui_values.partyIndex].type);
        //Set that icon to be constantly colored in. 
        partyButtons[ui_values.partyIndex].setSrc(ui_values.animalSrcHover[num],ui_values.animalSrcHover[num]);
        //this.x = partyButtons[ui_values.partyIndex].x;
        //this.y = partyButtons[ui_values.partyIndex].y;
        
    }
    interface.buttonArray.push(selectedAnimal);
	//blank animal portraits for bottom left page + displays individual animal levels with portraits
	var blankPortrait = function(){
			var party_limit = controller.party_limit;
            var party_size = 0;
			var coordX=500;
			var coordY=500;
	};
	
	blankPortrait.update = function(){
		
	};
	blankPortrait.draw = function(){
		var party_limit = controller.party_limit;
        var party_size = 0;
        var levels = [];

		for (var i = 0; i < 2; i++){
            for (var j = 0; j < 6; j++){
                if (party_size < party_limit){
                    this.coordX = 103+(j*60);
                    this.coordY = 457+(i*50);
                    ctx.strokeRect(this.coordX, this.coordY , 37, 37);
                    party_size++
                }
            }
		}
		
	};

	interface.push(blankPortrait);
    gameState.setupComplete = true;
}

/* select_base() - For changing the spawn button image and the unlockables connected to it. . 
 * Params:
 *    animal_index - index of the animal being selected.
 * Returns - None. 
*/
function select_base(animal_index) {
    ui_values.selected = "base";
    var ani_imgRef;
    var aniSrc = ui_values.animalStaticHover;
    
    interface.buttonArray.forEach(function (elem) {
        if (elem.name === "animal_image") {
            switch (animal_index) {
                case 0:
                    //elem.setSrc(aniSrc[animal_index], aniSrc[4], false);
                    elem.setSrc(aniSrc[animal_index], aniSrc[animal_index], false);
                    break;
                case 1:
                    //elem.setSrc(aniSrc[animal_index], aniSrc[4], false);
                    elem.setSrc(aniSrc[animal_index], aniSrc[animal_index], false);
                    break;
                case 2:
                    //elem.setSrc(aniSrc[animal_index], aniSrc[4], false);
                    //elem.setupAnim(44, 7, 7);
                    elem.setSrc(aniSrc[animal_index], aniSrc[animal_index], false);
                    break;
                case 3:
                    //elem.setSrc(aniSrc[animal_index], aniSrc[4], false);
                    //elem.setupAnim(15, 4, 4);
                    elem.setSrc(aniSrc[animal_index], aniSrc[animal_index], false);
                    break;   
            }
        }   
    });
    
    //Setting current animal so we all know what we're referencing. 
    ui_values.currentAnimal = ui_values.animalAry[animal_index];
    soundMan.click.play();
    
    
}

function select_animal(animal_index) {
    ui_values.selected = "party";
    ui_values.partyIndex = animal_index;
    var aniSrc = ui_values.animalStaticHover;

    //console.log("Animal "+controller.animals[animal_index].type)
    var ani_imgRef = aniToNum(controller.animals[animal_index].type);
    //console.log("ani_imgRef "+ani_imgRef)
    //console.log(animal_index);
    interface.buttonArray.forEach(function (elem) {
        if (elem.name === "animal_image") {
            switch (ani_imgRef) {
                case 0:
                    //elem.setSrc(aniSrc[ani_imgRef], aniSrc[4], false);
                    elem.setSrc(aniSrc[ani_imgRef], aniSrc[ani_imgRef], false);
                    ui_values.currentAnimal = "Bird";
                    break;
                case 1:
                    //elem.setSrc(aniSrc[ani_imgRef], aniSrc[4], false);
                    elem.setSrc(aniSrc[ani_imgRef], aniSrc[ani_imgRef], false);
                    ui_values.currentAnimal = "Deer";
                    break;
                case 2:
                    //elem.setSrc(aniSrc[ani_imgRef], aniSrc[4], true);
                    //elem.setupAnim(44, 7, 7);
                    elem.setSrc(aniSrc[ani_imgRef], aniSrc[ani_imgRef], false);
                    ui_values.currentAnimal = "Frog";
                    break;
                case 3:
                    //elem.setSrc(aniSrc[ani_imgRef], aniSrc[4], true);
                    //elem.setupAnim(15, 4, 4); 
                    elem.setSrc(aniSrc[ani_imgRef], aniSrc[ani_imgRef], false);
                    ui_values.currentAnimal = "Bunny";
                    break;
            }
        }   
    })

    ui_values.partyIndex = animal_index;
    soundMan.click.play();
}

/* add_animal() - For adding animals to the party. 
 * Params: None
 * Returns: None. 
*/
function add_animal() {
    if (stepCount - 2000 < 0 || controller.party_limit == controller.getNumAnimals()) {
        soundMan.error.play();
        return;
    }
    var status = controller.addAnimal(ui_values.currentAnimal.toLowerCase());

    if (status === true){
        //soundMan.click.play()
        stepCount -= 2000;
        updateParty()
        dataObj.partySize = controller.getNumAnimals()
    }
    switch (ui_values.currentAnimal) {
        case 'Bird':
            //soundMan.bird.play()
            soundMan.click.play()
            break;
        case 'Deer':
            soundMan.click.play()
            break;
        case 'Frog':
            //soundMan.frog.play()
            soundMan.click.play()
            break;
        case 'Bunny':
            soundMan.click.play()
            break;
    }
    //console.log("Tutorial Progress: " + dataObj.tutorialProgress);
    if(dataObj.tutorialProgress == 13){
        controller.animals[0].canDie = false;
        startTutorialPartTwo();
    }
    //soundMan.click.play(); //@todo: different sound
}

/////////////////////////////////////////////////
//PARTY ICONS
/////////////////////////////////////////////////
/*    
for (i = 0; i < 2; i++) {
    for (j = 0; j < 6; j++) {
        subAttPane = new Sprite();
        //Sets the source of each pane to be the same as the animal icon. 
        subAttPane.setSrc(ui_values.animalSrcAry[1]);
        subAttPane.setSpriteAttributes((101 + 60 * j), (455 + 50 * i), 40, 40, "unlockable");
        panes.push(subAttPane);
    }
}*/

var partyButtons = []

/* updateParty() - Updates the party buttons. 
 * Params: None
 * Returns: None. 
*/
function updateParty() {
	//console.log("updating party")
    //Remove all of the partyButtons from the engine
    for (var b=0; b<partyButtons.length; b++) {
		interface.removeButton(partyButtons[b]);
        interface.remove(partyButtons[b]);
	}

    //Reset partyButtons and add update
	partyButtons = []

	var animals = controller.animals;
	var partyIcon = new Button();
    var levels = [];

	for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 6; j++) {
            //console.log(animals[j+(6*i)]);
            if (animals[j+(6*i)]!==undefined) {
                levels.push(controller.animals[j+(6*i)].level)

                //console.log(animals[j+(6*i)]);
                var num = aniToNum(animals[j+(6*i)].type);
                //console.log("animal number: "+num)
                partyIcon = new Button(select_animal,[j+(6*i)]);
                partyIcon.setSrc(ui_values.animalSrcAry[num],ui_values.animalSrcHover[num]);
                partyIcon.setSpriteAttributes((101 + (60*j)), (455 + 50*i), 40, 40, "party animal "+i);
                partyIcon.hasTextValue = true; 
                partyIcon.fontSize = "14px";
                partyIcon.color = ["#00ff00"];
                
                partyIcon.flashingOpacity = 0.5;
                partyIcon.fadeIn = true;
                
                (function(i, j) {
                    partyIcon.update = function () {
                        this.setText([controller.animals[j+(6*i)].level], 23 - numberLen(levels[j+(6*i)]) * 5.5, 22);
                        if (dataObj.tutorialProgress == 21) {
                            if (this.fadeIn) {
                                this.flashingOpacity += .03;
                            } else {
                                this.flashingOpacity -= .03;
                            }

                            if (this.flashingOpacity > .75) {
                                this.fadeIn = false;
                            } else if (this.flashingOpacity < .4) {
                                this.fadeIn = true;
                            }
                        }
                    }
                        
                    partyIcon.draw = function () {
                        ctx.drawImage(this.image, this.x, this.y, this.width, this.height); 
                        if(dataObj.tutorialProgress == 21){
                            ctx.globalAlpha = this.flashingOpacity;
                            ctx.fillStyle="#f0f800";
                            ctx.fillRect(this.x, this.y, this.width, this.height);
                            ctx.globalAlpha = 1.0
                            ctx.fillStyle="#000000"
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
                    }
                })(i, j);
                
                //ctx.fillText(levels[j+(6*i)], partyIcon.coordX + 27 - (numberLen(levels[j+(6*i)]) * 3), partyIcon.coordY + 19);
                //console.log("Text Filled");
                //ctx.color = "black"

                partyButtons.push(partyIcon); 
            }
        }
    }
    for (var b=0; b<partyButtons.length; b++) {
    	interface.buttonArray.push(partyButtons[b]);
        interface.push(partyButtons[b]);
    }
}

/////////////////////////////////////////////////
//PARTY SIZE INDICATOR
/////////////////////////////////////////////////
var partyIndicator;

partyIndicator = new Button(function () {});
partyIndicator.setSrc("image_resources/ClearSquare.png");
//@fix: Only does one row
partyIndicator.setSpriteAttributes((161), (455), 40, 40, "party indicator");


/////////////////////////////////////////////////

/* upgrade_baseAnimal() - For increasing the level of animals. 
 * Params: None
 * Returns: None. 
*/
function upgrade_baseAnimal() {
    var level = controller.getAnimalBaseLevel((ui_values.currentAnimal).toLowerCase());
    //var upgradeFormula = (level* 2.75 * 500);
    var upgradeFormula = (Math.pow(level, 1.01) * 2.75 * 500);
    if (dataObj.animalTracks - upgradeFormula < 0) {
        soundMan.error.play();
        return;
    } else {
        dataObj.animalTracks -= upgradeFormula;
        controller.baseLevelUp(ui_values.currentAnimal.toLowerCase());
    }
    soundMan.up1.play();
}

function upgrade_animal() {
    
    var level = controller.animals[ui_values.partyIndex].level;
    //var upgradeFormula = (level* 1.75 * 100);
    var upgradeFormula = (Math.pow(level, 1.01)* 1.75 * 100);
    if (dataObj.animalTracks - upgradeFormula < 0) {
        soundMan.error.play();
        return;
    } else {
        dataObj.animalTracks -= upgradeFormula;
        controller.levelUpAnimal(ui_values.partyIndex);
    }
    soundMan.up1.play();
}

/* upgrade_baseAnimalMax() - For increasing the level of animals will all tracks. 
 * Params: None
 * Returns: None. 
*/
function upgrade_baseAnimalMax() {
    var level = controller.getAnimalBaseLevel((ui_values.currentAnimal).toLowerCase());
    var upgradeFormula = (Math.pow(level, 1.01) * 2.75 * 500);
    while (dataObj.animalTracks - upgradeFormula > 0) {
        dataObj.animalTracks -= upgradeFormula;
        controller.baseLevelUp(ui_values.currentAnimal.toLowerCase());
        controller.getAnimalBaseLevel((ui_values.currentAnimal).toLowerCase());
        level = controller.getAnimalBaseLevel((ui_values.currentAnimal).toLowerCase());
        
    }
    soundMan.up1.play();
}

function upgrade_animalMax() {
    var level = controller.animals[ui_values.partyIndex].level;
    var upgradeFormula = (Math.pow(level, 1.01)* 1.75 * 100);
    while (dataObj.animalTracks - upgradeFormula > 0) {
        dataObj.animalTracks -= upgradeFormula;
        controller.levelUpAnimal(ui_values.partyIndex);
        level = controller.animals[ui_values.partyIndex].level;
        //soundMan.up1.play();
    }
    soundMan.up1.play();
}

function getMaxAnimalLevel() {
    var level = controller.getAnimalBaseLevel((ui_values.currentAnimal).toLowerCase());
    var upgradeFormula = (Math.pow(level, 1.01) * 2.75 * 500);
    //console.log("level " + level);
    var tracks = dataObj.animalTracks;
    //console.log("tracks " + tracks);
    while (tracks - upgradeFormula > 0) {
        tracks -= upgradeFormula;
        level++;  
    }
    return level;
}

function getMaxAnimalCost() {
	var prevTracks = dataObj.animalTracks;
    var level = controller.getAnimalBaseLevel((ui_values.currentAnimal).toLowerCase());
    var upgradeFormula = (Math.pow(level, 1.01) * 2.75 * 500);
    var tracks = prevTracks;
    while (tracks - upgradeFormula > 0) {
        tracks -= upgradeFormula;
        level++;  
    }
    return prevTracks - tracks;
}

function getSelectedMaxLevel() {
    var level = controller.animals[ui_values.partyIndex].level;
    var tracks = dataObj.animalTracks;
    var upgradeFormula = (Math.pow(level, 1.01)* 1.75 * 100);
    while (tracks - upgradeFormula > 0) {
        tracks -= upgradeFormula;
        //controller.levelUpAnimal(ui_values.partyIndex);
        level++;
        //soundMan.up1.play();
    }
    return level;
}

function getSelectedMaxCost() {
	var cost = 0;
    var level = controller.animals[ui_values.partyIndex].level;
    var tracks = dataObj.animalTracks;
    var upgradeFormula = (Math.pow(level, 1.01)* 1.75 * 100);
    while (tracks - upgradeFormula > 0) {
        tracks -= upgradeFormula;
        cost += upgradeFormula;
        //controller.levelUpAnimal(ui_values.partyIndex);
        level++;
        //soundMan.up1.play();
    }
    return cost;
}



//Get the animal number from the animal type
function aniToNum(animal) {
	for(i=0;i<4;i++){
		if (animal == ui_values.animalAry[i].toLowerCase()) return i;
	}
	return "Not a valid animal";
}

//Small utility function that converts a number to a string and returns the length. 
//Good for text alignment, but not perfect. 
function numberLen(num) {
    return num.toString().length;
}

function numberConversion(num) {
    var suffixes = ['', 'k', 'm', 'b', 't', 'q', 'Q', 's', 'S']
    num = Math.floor(num);
    var conNum = num.toString();
    var len = conNum.length;
    var i = Math.floor(len/3);
    var j = len%3;
    //console.log();
    if (j === 0) {
        return conNum.slice(0, 3) + " " + suffixes[i-1];
    } else if (j === 1 && i > 0) {
        return conNum.slice(0, 1) + "." + conNum.slice(1, 3) + " " +  suffixes[i];
    } else if (j === 2 && i > 0) {
        return conNum.slice(0, 2) + "." + conNum.slice(2, 3) + " " + suffixes[i];
    }
    else {
        return conNum.slice(0, j) + " " + suffixes[i];
    }
}