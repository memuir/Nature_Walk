    	var maxBaseHovered = false;
    	var maxAnimalHovered = false;
//Creates a popup with default background.
function addPopup(text,x,y,cutout,name="popup") {
    interface.buttonArray.forEach(function (elem) {
        if (elem.name === "animal_image") {
            var currIndex = ui_values.animalAry.indexOf(ui_values.currentAnimal);
            var src = ui_values.animalStaticAry;
            elem.setSrc(src[currIndex], src[currIndex], false);
        }
    });
	var button = new Button(function() {
	    switch(true){
	       case(dataObj.tutorialProgress == 0):
	           addPopup("It's your first time here,\nso I'm going to show\nyou around the place!",100, 40);
	           interface.draw();
	           break;
	       case(dataObj.tutorialProgress == 1):
	           addPopup("This is your Nature\nJournal.",150, 90);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 2):
               addPopup("Here on the left\npage, you can\ncall animals to explore\nthe world.",150, 90,[20,10,494,580]);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 3):
               addPopup("On the right\npage, you can\nsee your animals as\nthey explore.",700, 90,[514,10,494,580]);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 4):
               addPopup("Your Nature Journal\nuses two currencies,\nsteps and tracks.",150, 90,[71,25,410,60]);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 5):
               addPopup("These are your Steps.\nYou get these by walking\naround with your Fitbit\nand are used to call animals.",71, 90, [143,25,113,60]);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 6):
               addPopup("These are your Tracks.\nYour animals make these\nas they explore. You will\nuse tracks to upgrade\nyour animals.",240, 90, [282,27,175,55]);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 7):
               addPopup("There are four different\nanimal types you can\ncall to travel the world.",150, 200, [79,95,385,105]);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 8):
               addPopup("Each has their own\nstrengths and\nweaknesses.",150, 200, [79,95,385,105]);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 9):
               addPopup("You can add an animal\nby selecting its icon\nabove, then clicking\nthe button to the right.",60, 250, [283,399,175,47]);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 10):
               addPopup("Let's send out\na new animal so we\ncan continue!",60, 250, [283,400,175,47]);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 11):
               addPopup("Choose wisely! This animal\nwill be with you for your\nentire nature walk.",60, 250, [283,400,175,47]);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 13):
               addPopup("Your animals will face\na number of harrowing\nchallenges. Those events\nwill be shown here.",300, 200, [533,25,445,207]);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 14):
               addPopup("Your animal has three\nstatistics that it will\nuse to overcome these\nchallenges.",260, 220,[72,239,185,127]);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 15):
               addPopup("Speed, Evasion, and\nStrength.",260, 215,[73,239,185,127]);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 16):
               addPopup("You can increase your \nanimal's statistics with \ntracks via the\nupgrade button.",250, 300, [63,400,124,50]);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 17):
               addPopup("Failing these challenges \ncould slow down, or even \nkill your animals, so level\nthem up when you can.",250, 300);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 18):
               addPopup("You can select your\nanimals by clicking on \ntheir icons down \nhere.",150, 300, [83,450,375,100]);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 19):
               addPopup("Try selecting your\nfirst animal.",250, 400, [83,450,375,100]);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 21):
               addPopup("You can upgrade animals\nin two ways.",250, 300);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 22):
               addPopup("You can upgrade\nindividual animals or the\nbase level of animals.",250, 300);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 23):
               addPopup("Upgrading individuals\nis cheaper, but if they\nleave or die you will have\nto level them up again\nfrom the base.",250, 300, [94,450,52,52]);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 24):
               addPopup("Upgrading the base\nlevel changes what level\nyour animals start at,\neven through death.",250, 150,[84,114,71,71]);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 25):
               addPopup("Keeping a healthy balance\nof the two will keep your\nanimals collecting as long\nas possible.",250, 300);
               //dataObj.tutorialProgress++;
               break;
           
           case(dataObj.tutorialProgress == 26):
               addPopup("Right now you can have\na maximum of five\nanimals, and each animal\nwill only walk with you\nfor 24 hours before leaving",250, 300, [83,450,320,55]);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 27):
               addPopup("But keep exploring and\nyou will be able to\nhave more than five!",300, 250);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 28):
               addPopup("Speaking of exploring,\nyour animals are walking\nthrough what's called\nan area.",700, 300,[600,233,301,52]);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 29):
               addPopup("If you keep collecting \nsteps with your Fitbit\nyou'll unlock more areas.",700, 300, [600,233,301,52]);
               //dataObj.tutorialProgress++;
               break;
           //Here are 4000 more steps to get you there. You can call more animals with these. 
           //When you get to a certain number of steps, this arrow will advance you to the next area. Click it!
           case(dataObj.tutorialProgress == 30):
               addPopup("We will give you\n4000 more steps\nto get you there.",700, 300);
               dataObj.steps += 4000;
               stepCount += 4000
               dataObj.totalSteps += 4000;
               dataObj.priorSteps -= 4000;

               //dataObj.tutorialProgress++;
               areaNext.update();
               break;
           case(dataObj.tutorialProgress == 31):
               addPopup("When a new area is\navailable, click this\narrow to move there\nwith your animals.",700, 300, [843,238,42,38]);
               //dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 33):
               addPopup("But never fear! If an\narea proves too hard for\nyour animals you can go\nback to an easier one.",700, 300, [618,238,42,38]);
               //dataObj.tutorialProgress++;
               break;
            case(dataObj.tutorialProgress == 34):
               addPopup("That's all you need\nto know!",500, 250);
               //dataObj.tutorialProgress++;
               break;  
            case(dataObj.tutorialProgress == 35):
               addPopup("Now get out there,\njournal in hand, and\nget to nature walking!",500, 250);
               //tutorialProgress++;
               //console.log(dataObj.tutorialProgress);
               break; 
        }
        dataObj.tutorialProgress++;
		removePopup(this);
	});
	button.setSrc("image_resources/Tooltip.png");
	button.setSpriteAttributes(x,y,228,150, name)
    if (dataObj.tutorialProgress === 22) {
        button.setSpriteAttributes(x,y,228,170, name)
    }
	button.hasTextValue = true;
	button.fontSize = '20px';
	charnum = text.length;
    //console.log("Button Created: " + button.x + " " + button.onMouseUpImageSrc);
	button.setText([text], (button.width / 2) - (6.3 * charnum), 5);
    if (dataObj.tutorialProgress === 11) {
        console.log("Check Progress: " + dataObj.tutorialProgress);
        button.updateText([text], ['red'])
    }
    button.cutout = function (ary) {
        //console.log(ary);
        ctx.globalAlpha = 0.3
        ctx.fillStyle="#f0c840";
        ctx.fillRect(ary[0], ary[1], ary[2], ary[3]);
        ctx.globalAlpha = 1.0
        ctx.fillStyle="black"
    }
    button.draw = function(){
	    ctx.globalAlpha = 0.3;
	    ctx.fillRect(0, 0, canvas.width, canvas.height, 'black');
	    ctx.globalAlpha = 1.0;
        //console.log(this.cutoutParams);
        if (cutout) {
            this.cutout(cutout);
        }
	    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	    if ((this.hovered && this.text !== undefined) || this.hasTextValue || this.hasTooltip){
            if (this.text === undefined) {
                //console.log(this.name);
            } else {
                var strArray = this.text[0].split(/\n/);
                //var clrIndex = this.text[0].indexOf(/\f/);
                //console.log(this.text[0].indexOf('*'));
                for(var s = 0; s < strArray.length; s++){
                    //Highlighting code here.
                    drawText([strArray[s]], this.x + 3, this.y + this.textOffsetY + (28*s), this.fontSize, this.color);
                }
            }
            if (this.tooltip != undefined && cursor.x != undefined && cursor.y != undefined && this.hovered) {
                drawText(this.tooltip,cursor.x+5,cursor.y+5)
            }
        }
	}
	pushPopup(button);
}

//For buttons you don't want to halt gameplay
function pushInterface(popup) {
	interface.push(popup);
	interface.pushButton(popup);
}

function removeInterface(popup) {
	interface.remove(popup);
	interface.removeButton(popup);
}


//For buttons that will halt gameplay
function pushPopup(popup) {
	popups.push(popup);
	popups.pushButton(popup);
}

function removePopup(popup) {
	popups.remove(popup);
	popups.removeButton(popup);
  soundMan.click.play();
}


function startTutorial() {
    //console.log("Tutorial Start");
    addPopup("Welcome to Nature Walk!\n\nClick on these notecards\nto move on.",100, 40);
    //dataObj.tutorialProgress++;
	screenMan.push(popups);
}

function startTutorialPartTwo(){
    dataObj.tutorialProgress++;
    addPopup("Great job!\nThat animal will now\nstart collecting tracks\nfor you.",150, 200);
    //dataObj.tutorialProgress++;
    screenMan.push(popups);
}

function startTutorialPartThree(){
    dataObj.tutorialProgress++;
    addPopup("There you go!\n\nNow you can see your\nanimal's name and its\nindividual statistics.", 286, 230);
    screenMan.push(popups);
}

function startTutorialPartFour(){
    addPopup("When your area goes up\nyour animals get more\ntracks, but the challenge\nwill also increase.",680, 300, [719,238,12,38]);
    dataObj.tutorialProgress++;
    areaPrev.update();
    screenMan.push(popups);
}

function callSprint(newFitbit) {
    var text;
    var sprintPopup = new Button(function() {
        removeInterface(this);
    });
    newFitBit = true;
    if (userID === "testing21") {
        text = "Thank you for completing our tutorial! " +
               " Unfortunately, without a Fitbit your nature" +
               " walk will not go very far. You can continue" +
               " to play without one, but we at team Nature Walk" + 
               " encourage you to get a Fitbit and begin" + 
               " your nature walk for real!"
    } else {
        if (newFitbit) {
            text = "This is a brand new Fitbit that has never been" +
                   " used before, let's give you a cool multiplier" +
                   " so you can get a lot of steps!"
            dataObj.stepMultiplier = 2;
        } 
        else {
            text = "You seem to already have some steps on your" +
                   " Fitbit from before, let's pull some of those" +
                   " steps in so you can use them right away!"
            //console.log(fitbitSteps);
            stepCount += Math.floor(fitbitSteps/10);
            //console.log(stepCount);
            dataObj.totalSteps += Math.floor(fitbitSteps/10);
            dataObj.priorSteps -= Math.floor(fitbitSteps/10);
            dataObj.steps += Math.floor(fitbitSteps/10);
        } 
    }
    sprintPopup.setSrc("image_resources/Tooltip.png");
	sprintPopup.setSpriteAttributes(285,225,450,150, "sprintPopup");
    
	sprintPopup.hasTextValue = true;
	sprintPopup.fontSize = '20px';
	charnum = text.length;
    
	sprintPopup.setText([text], 5, 5);
    //console.log(sprintPopup.text);
    sprintPopup.draw = function() {
        ctx.globalAlpha = 0.3;
	    ctx.fillRect(0, 0, canvas.width, canvas.height, 'black');
	    ctx.globalAlpha = 1.0;
        
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        drawWrappedText(this.text, this.x + this.textOffsetX, this.y + this.textOffsetY, this.fontSize, 450, 25);
    }
    pushInterface(sprintPopup)
    gameState.newToFitbit = false;
    gameState.sprint = false; 
    //dataObj.stepMultiplier = 2;
}

function callOfflinePopup() {
    var text;
    var offlineDistance = dataObj.totalSteps*0.000568182;
    var offlinePopup = new Button(function() {

        removePopup(this);
    });
    text = "Welcome back! You have walked a total of " + offlineDistance.toFixed(3) + " miles since starting your nature walk. Your animals collected " + Math.floor(offlinePopupObj.offlineTracks) + " tracks" 
    if (offlinePopupObj.events.length > 0) {
        text += " while facing ";
    } else {
        text += ".";
    }
    
    for (var i = 0; i < offlinePopupObj.events.length; i++) {
        if (offlinePopupObj.events[i] !== 0) {
            text += offlinePopupObj.events[i]
            if (i === offlinePopupObj.events.length - 2) {
                text += " and ";
            } else if (i < offlinePopupObj.events.length - 2) {
                text += "s, ";
            } else {
                text += "s! ";
            }   
        }
        
    }
    
    console.log(text);
    offlinePopup.setSrc("image_resources/Tooltip.png");
	offlinePopup.setSpriteAttributes(325,225,450,150, "sprintPopup");
    
	offlinePopup.hasTextValue = true;
	offlinePopup.fontSize = '20px';
	charnum = text.length;
    
	offlinePopup.setText([text], 5, 5);

    offlinePopup.draw = function() {
        ctx.globalAlpha = 0.3;
	    ctx.fillRect(0, 0, canvas.width, canvas.height, 'black');
	    ctx.globalAlpha = 1.0;
        
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        drawWrappedText(this.text, this.x + this.textOffsetX, this.y + this.textOffsetY, this.fontSize, 450, 25);
    }
    pushPopup(offlinePopup);
    screenMan.push(popups);
    //pushInterface(offlinePopup)
    //dataObj.stepMultiplier = 2;
}

function dataCorruptionApology() {
    var apologyPopup = new Button(function() {
        removePopup(this);
    });
    
    text = "We are sorry to say that your previous data was corrupted and we have restarted your nature walk to fix the problem. Please accept these steps as an apology from us at Team Nature Walk." 
    
    //console.log(text);
    dataObj.steps += 8000;
    stepCount += 8000
    
    apologyPopup.setSrc("image_resources/Tooltip.png");
	apologyPopup.setSpriteAttributes(275,225,450,150, "sprintPopup");
    
	apologyPopup.hasTextValue = true;
	apologyPopup.fontSize = '20px';
	charnum = text.length;
    
	apologyPopup.setText([text], 5, 5);
    //console.log(offlinePopup.text);
    apologyPopup.draw = function() {
        ctx.globalAlpha = 0.3;
	    ctx.fillRect(0, 0, canvas.width, canvas.height, 'black');
	    ctx.globalAlpha = 1.0;
        
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        drawWrappedText(this.text, this.x + this.textOffsetX, this.y + this.textOffsetY, this.fontSize, 450, 25);
    }
    pushPopup(apologyPopup);
}

/////////////////
function popupController() {
	this.popups = [];
};

//Contains controls when popups appear
popupController.prototype.update = function() {
}

popupController.prototype.draw = function() {}

popupController.prototype.contains = function(popup) {
	for (var i in this.popups) {
        if (this.popups[i] == popup) {
            return true;
        }
    }
}
	/////////////////////////////////////////////////////////////////////////////////////
	//MAX BUTTON
	////////////Button that appears when player has enough tracks to do multiple upgrades
var fullUpgrade = new Button(function() {
    console.log("pushed");
    if (ui_values.selected == "base") {
        upgrade_baseAnimalMax();
        //upgrade_baseAnimal();
    } else {
        upgrade_animalMax();
        //upgrade_animal();
    }
    removePopup(this);
});

fullUpgrade.setSrc("image_resources/Button.png", "image_resources/ButtonPressed.png");
fullUpgrade.setSpriteAttributes(65,360,120,40, "fullUpgrade");
fullUpgrade.hasTextValue = true;
fullUpgrade.fontSize = '20px';
charnum = "MAX".length;
fullUpgrade.setText(["MAX"], (fullUpgrade.width / 2) - (6.3 * charnum), 5);
fullUpgrade.update = function(){
	//console.log("max available");
	if(this.hovered && ui_values.selected == "base"){
    	maxBaseHovered = true;
    } else if(this.hovered){
    	maxAnimalHovered = true;
    } else {
    	maxBaseHovered = false;
    	maxAnimalHovered = false;
    };
};
	/////////////////////////////////////////////////////////////////////////////////////
	
	
    //////////////////////////////////////////////////////////////////////////////////////
    //MAX COST
    //////////////////////////////////////////////////////////////////////////////////////
    var maxCost;
    maxCost = new Button(function() {});
    maxCost.setSrc("image_resources/StepPaper.png");

    maxCost.setSpriteAttributes(186, 360, 65, 40, "upgradeCost");

    maxCost.hasTextValue = true;
    maxCost.fontSize = '20px';
    maxCost.color = ['blue'];

    maxCost.update = function() {
        if (ui_values.selected == "base") {
        	var displayNum = numberConversion(getMaxAnimalCost());
            maxCost.setText([displayNum], (maxCost.width / 2) - (4 * displayNum.length), 5);

        } else {
            if (controller.animals[ui_values.partyIndex] == undefined) {
                ui_values.selected = "base";
                return;
            }
            //console.log(getSelectedMaxLevel());
            var displayNum = numberConversion(getSelectedMaxCost());
            maxCost.setText([displayNum], (maxCost.width / 2) - (4 * displayNum.length), 5);
        }

        
    };
	/////////////////////////////////////////////////////////////////////////////////////
	
	
function p_maxUpgrade() {
	var threshold;
	if (ui_values.selected == "base") {
		var level = controller.getAnimalBaseLevel((ui_values.currentAnimal).toLowerCase());
		threshold = 1.75*1000;
	} else{
		var level = controller.animals[ui_values.partyIndex].level;
		threshold = 1.75*100;
	}	
	if (dataObj.animalTracks - ((level * threshold) + (level+1)*threshold) > 0) {
		if (interface.contains(fullUpgrade)) return;
		pushInterface(fullUpgrade);
		pushInterface(maxCost);
	} else {
		removeInterface(fullUpgrade);
		removeInterface(maxCost);
		maxBaseHovered = false;
    	maxAnimalHovered = false;
	}
}

