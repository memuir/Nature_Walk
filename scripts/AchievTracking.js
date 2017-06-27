//player info
var player = {
	playerLevel: 1,
	playerXP: 0,
	lvlrewards : [true, false, false ,false, false, false, false ,false, false, false, false]
};

var pageNumber = 1;

var achievements = [
	"Mile High Club:", "Animal Pack:", "Upgrade Galore:", "Novice Explorer:",
	"Intermediate Explorer:", "Expert Explorer:" , "Unlucky Year:", "Young Hiker:",
	"Trail Blazer:", "Mountain Climber:", "","","",""
];

var achievText = [
	"Gain 10000 tracks",
    "Call 5 of the same animal to your party",
	"Upgrade the base level of an animal 10 times",
	"Get to area 10",
	"Get to area 30",
	"Get to area 70",
	"Lose 10 animals in one session",
	"Gain 20000 steps",
	"Gain 50000 steps",
	"Gain 100000 steps",
	"",
	"",
	"",
	"",
];

var rewardText = [
	"+2500 Tracks",
	"+2000 Tracks",
	"+5000 Tracks",
	"+2500 Tracks",
	"+10000 Tracks",
	"+30000 Tracks",
	"+5000 Tracks",
	"+2500 Tracks",
	"+5000 Tracks",
	"+10000 Tracks",
	"",
	"",
	"",
	"",
];
//achievement list, prereq is when the pre-req for achievement is done, completed is when the achievement is done implementing
var prereq = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
prereq['milehigh'] = false;
prereq['animalpack'] = false;
prereq['upgradegalore'] = false;
prereq['novice'] = false;
prereq['intermediate'] = false;
prereq['expert'] = false;
prereq['unlucky'] = false;
prereq['hiker'] = false;
prereq['blazer'] = false;
prereq['climber'] = false;

var completed = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
completed['milehigh'] = false;
completed['animalpack'] = false;
completed['upgradegalore'] = false;
completed['novice'] = false;
completed['intermediate'] = false;
completed['expert'] = false;
completed['unlucky'] = false;
completed['hiker'] = false;
completed['blazer'] = false;
completed['climber'] = false;

//tracks the prereqs of the achievments
function achievTracker(){

	var animalcount = [controller.getAnimalCount('frog'), controller.getAnimalCount('bunny'), controller.getAnimalCount('deer'),
	controller.getAnimalCount('bird')];
	
	var animallevel = [controller.getAnimalBaseLevel('frog'), controller.getAnimalBaseLevel('bunny'),controller.getAnimalBaseLevel('deer'),
	controller.getAnimalBaseLevel('bird')];
	
	
	//mile high : when player reaches over 10000 tracks
	//if(dataObj.animalTracks >= 10000) achievements.milehigh[0] = true;
	if(dataObj.animalTracks >= 10000) prereq[0] = 1;
	
	//animalpack: when player makes a 5 party of the same animal
	for(var i = 0 ; i < animalcount.length; i++){

		if(animalcount[i] >= 5) prereq[1] = 1;
	}
	
	//upgradegalore: when player upgrades the same animal's base level 10 times
	for(var j = 0; j < animallevel.length; j++){
		if(animallevel[j] >= 10) prereq[2] = 1;
	}
	
	//novice explorer: when player reaches area 10
	if(controller.area_level >= 10) prereq[3] = 1;
	
	//intermediate explorer: when player reaches area 30
	if(controller.area_level >= 30) prereq[4] = 1;
	
	//expert explorer: when player reaches area 70
	if(controller.area_level >= 70) prereq[5] = 1;
	
	//unlucky year: player loses a total of 10 or more animals
	if(dataObj.animalsDied >= 10) prereq[6] = 1;
	
	// young hiker: get 20000 step total
	if(dataObj.steps >= 20000) prereq[7] = 1;
	
	// trail blazer: get 50000 step total
	if(dataObj.steps >= 50000) prereq[8] = 1;
	
	// mountain climber get 100000 step total
	if(dataObj.steps >= 100000) prereq[9] = 1;
}

//Tracks player Level and player level rewards
/* function playerTracker(){
	player.playerLevel = ((player.playerXP / 100) + 1);
	
	if (player.playerLevel >= 2 && player.lvlrewards[2] == false){
		dataObj.animalTracks += 2500;
		player.lvlrewards[2] = true;
		console.log("Player reached lvl 2! Gained 2500 bonus tracks!");
	}
	
	if(player.playerLevel >= 3 && player.lvlrewards[3] == false){
		dataObj.animalTracks += 5500;
		player.lvlrewards[3] = true;
		console.log("Player reached lvl 3! Gained 3000 bonus tracks!");
	}
	
} */

// implements achievements and updates console for player and acheivement progression
function updateLog(){
    var text, success = false;
	achievTracker();
	//playerTracker();
	//console.log("area is : " + dataObj.animalsDied);
		if(prereq[0] == 1 &&  completed[0] == 0){
			completed[0] = 1;
			dataObj.animalTracks += 2500;
            success = true;
			text = "Mile High Club achievement completed! Gained +2500 Tracks!";
		}
		
		if(prereq[1] == 1 &&  completed[1] == 0){
			completed[1] = 1;
			dataObj.animalTracks += 2000;
            success = true;
			text = "Animal Pack achievement completed! Gained +2000 Tracks!";
		}
		
		if( prereq[2] == 1 && completed[2] == 0){
			dataObj.animalTracks += 5000;
            success = true;
			completed[2] = 1;
			text = "Upgrade Galore achievement completed! Gained +5000 Tracks!";
		}
		if( prereq[3] == 1 && completed[3] == 0){
			completed[3] = 1;
			dataObj.animalTracks += 2500;
            success = true;
			text = "Novice Explorer achievement completed! Gained +2500 Tracks!";
		}
		
		if( prereq[4] == 1 && completed[4] == 0){
			completed[4] = 1;
			dataObj.animalTracks += 10000;
            success = true;
			text = "Intermediate Explorer achievement completed! Gained +10000 Tracks!";
		}
		
		if( prereq[5] == 1 && completed[5] == 0){
			completed[5] = 1;
			dataObj.animalTracks += 30000;
            success = true;
			text = "Expert Explorer achievement completed! Gained +30000 Tracks!";
		}
		
		if( prereq[6] == 1 && completed[6] == 0){
			completed[6] = 1;
			dataObj.animalTracks += 5000;
            success = true;
			text = "Unlucky Year achievement completed! Gained +5000 Tracks!";
		}
		
		if( prereq[7] == 1 && completed[7] == 0){
			completed[7] = 1;
			dataObj.animalTracks += 2500;
            success = true;
			text = "Young Hiker achievement completed! Gained +2500 Tracks!";
		}

		if( prereq[8] == 1 && completed[8] == 0){
			completed[8] = 1;
			dataObj.animalTracks += 5000;
            success = true;
			text = "Trail Blazer achievement completed! Gained +5000 Tracks!";
		}

		if( prereq[9] == 1 && completed[9] == 0){
			completed[9] = 1;
			dataObj.animalTracks += 10000;
            success = true;
			text = "Mountain Climber achievement completed! Gained +10000 Tracks!";
		}
    //text = "Hello World";
    if (success) {
    	soundMan.achiev.play();
        var achievementPopup = new Button(function() {
            removeInterface(this);
        });
        achievementPopup.setSrc("image_resources/Tooltip.png");
        achievementPopup.setSpriteAttributes(385,275,250,100, "sprintPopup");

        achievementPopup.hasTextValue = true;
        achievementPopup.fontSize = '20px';
        charnum = text.length;

        achievementPopup.setText([text], 5, 5);
        //console.log(sprintPopup.text);
        achievementPopup.draw = function() {
            ctx.globalAlpha = 0.3;
            ctx.fillRect(0, 0, canvas.width, canvas.height, 'black');
            ctx.globalAlpha = 1.0;

            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            drawWrappedText(this.text, this.x + this.textOffsetX, this.y + this.textOffsetY, this.fontSize, 245, 25);
        }
        pushInterface(achievementPopup)
    }
    success = false;
}