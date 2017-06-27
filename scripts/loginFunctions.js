//functions to update player stats in local storage

//////////////////////////////////////////////////
// Event history vars
var deathNum = 0;
var tripNum = 0;
var deathArr = [];
var tripArr = [];

//////////////////////////////////////////////////


//variable that holds the number of lifetime steps of the player, pulled from fitbit API after fitbitstart() is executed
var fitbitSteps;
var loggedIn = false;
var NaNReset = false;
//function that is called in loadGame() in userinterface.js
function logIn(){
    loggedIn = true;
    loginPlayer();
}

firstTimeUserFlag = false;


//initializes fitbitsteps to player's lifetime fitbit steps before stepCount is recalculated
//checks if the player is a first time user
//if yes, correct current stepCount is calculated and a first time user json is created and saved to local
//if no, correct current stepCount is calculated and a returning user json is created and saved to local
function loginPlayer(){
    fitbitSteps = stepCount;
    console.log("USERID: " + userID);
    console.log(isFirstTimeUser(userID));
    console.log(fitbitSteps);
    if(isFirstTimeUser(userID)){
        console.log("first timer");
        firstTimeUserSteps();
        createData(initPackage());
        firstTimeUserFlag = true;
        gameState.sprint = true;
        soundMan.music.play()
    } else { 
        console.log("returning player");
        returningUserSteps();
        returningUserAchieves();
        returningUserEvents();
        returningUserTracks();
        returningBaseLevels();
        console.log("NAN: " + NaNReset);
        if (NaNReset) {
            dataCorruptionApology()
            clearUser(userID); 
            location.reload();
            //firstTimeUserFlag = true;
            //loginPlayer();
        } else {
            createData(returningPackage(userID));
            if (dataObj.tutorialProgress < 36) {
                firstTimeUserFlag = true;
            }
            soundMan.music.seek(Math.floor(Math.random()*(1080-120)+120));
            soundMan.music.play()
            //soundMan.music.fade(0,.6)
            soundMan.music.volume(.6)
            console.log("Playing music.")

        }
        
        
    }
}


//takes a user id and a key and returns an int
//used to retrieve playerSteps and playerTSteps
function getJsonItem(iD, key){
    var jsonData = JSON.parse(localStorage.getItem(iD.toString()));
    //console.log(key + ": " + parseInt(jsonData[key.toString()]));
    return parseInt(jsonData[key.toString()]);
}


//takes a json and saves it in localstorage with the userID as the key
function createData(localJson){
    localStorage.setItem(userID.toString(), localJson);
}


//delete a key and its value from local storage
function clearUser(myKey){
    console.log(myKey);
	localStorage.removeItem(myKey);
}


//adjusts stepCount if a first time user has over 20000 steps
function firstTimeUserSteps(){
    dataObj.steps = 2000;
    dataObj.totalSteps = 2000;
    console.log("Fitbit Steps: " + fitbitSteps);
    if (fitbitSteps) {
        dataObj.priorSteps = fitbitSteps - 2000;
        gameState.newToFitbit = false; 
    } else {
        dataObj.priorSteps = 0;
        gameState.newToFitbit = true;
    }
    
    stepCount = dataObj.steps;
    console.log("Data Object");
    console.log(dataObj);
}
//calculates stepCount using saved data
function returningUserSteps(){
    var priorSteps = parseFloat(getJsonItem(userID, "playerPSteps"));
    var totalSteps = parseFloat(getJsonItem(userID, "playerTSteps"));
    var playerSteps = parseFloat(getJsonItem(userID, "playerSteps"));
    var stepMult = parseFloat(getJsonItem(userID, "stepMultiplier"));
    //var temp = parseFloat(stepMult);
    if (isNaN(priorSteps) || isNaN(totalSteps)|| isNaN(playerSteps) || isNaN(stepMult)) {
        NaNReset = true;
        
    }
    
    //console.log("Prior: " + priorSteps);
    //console.log("Total: " + totalSteps);
    //console.log("Player: " + playerSteps);
    //console.log(isNaN(playerSteps));
    //console.log("Mult: " + stepMult);
    //console.log(stepMult * 2);
    dataObj.priorSteps = priorSteps;
    //dataObj.totalSteps = fitbitSteps - priorSteps;
    dataObj.totalSteps = totalSteps;
    //Add the additional steps from the step multiplier to the total. 
    dataObj.multipliedSteps += ((playerSteps*stepMult) - playerSteps);
    //console.log("Multiplied Steps: " + ((playerSteps*stepMult) - playerSteps));
    dataObj.totalSteps += ((playerSteps*stepMult) - playerSteps);
    dataObj.steps = stepCount;
    
    playerSteps *= stepMult;
    stepCount =  (fitbitSteps - priorSteps) + playerSteps;
    //stepCount =  (fitbitSteps - priorSteps - totalSteps) + playerSteps;
    
    //console.log("returning steps ===== " + stepCount);
}

function returningUserTracks(){
	var goodEvents = 0;
	var badEvents = 0;
	var totalDead = 0;
	var totalTrip = 0;
    returningUserArea();
    returningUserSeason();
    dataObj.animalTracks = parseFloat(getJsonItem(userID, "playerTracks"));
    var lastLoginTime = parseFloat(getJsonItem(userID, "time"));
    var id = userID;
    var key = "partyComp";
    var jsonData = JSON.parse(localStorage.getItem(id.toString()));
    var myarr = jsonData[key.toString()];   
    console.log("myarr: " + myarr);
    var currTime = Date.now();
    var timeDiff = currTime - lastLoginTime;
    //console.log(timeDiff);
    
    var areaMult = 2.16;
    var areaTracks = controller.area_level*areaMult;
    var offlineTracks = 0;
    var evt;
    
    //console.log(myarr.length);
    for(var i = 0; i < myarr.length; i++){
        var deadflag = false;
        var endTime = currTime - myarr[i].deathTime;
        if(endTime < 0){
            endTime = Math.floor((timeDiff/1000)/15);
        } else {
            endTime = Math.floor(((myarr[i].deathTime - lastLoginTime)/1000)/15);
        }
        console.log("End time: " + endTime);
        var spd = 1
        var eva = 1
        var str = 1
        
        //Get individual animal stats. 
        for(var k = 0; k < myarr[i].level; k++){
            spd = Math.ceil(spd * animal_data[myarr[i].type][0]);
            eva = Math.ceil(eva * animal_data[myarr[i].type][1]);
            str = Math.ceil(str * animal_data[myarr[i].type][2]);
        }
        //console.log(spd + " " + eva + " " + str);
        for(var j = 0; j < endTime; j++){
            //Give tracks equal to what you would earn until an event would occur.
            offlineTracks += Math.floor(areaTracks*2*15);
            dataObj.animalTracks += Math.floor(areaTracks*2*15);
            console.log("Added Offline Tracks: " + offlineTracks);
            evtRoll = roll(100);
            //console.log(evtRoll);
            //Good Event
            if (evtRoll > 70) {
				goodEvents++;
                evt2 = roll(100);
                if (evt2 < 26){
                    offlineTracks += dataObj.animalTracks/1000;
                    dataObj.animalTracks += (dataObj.animalTracks/1000);
                }
            } 
            //Bad Event
            else if (evtRoll < 40) {
				badEvents++;
                evt2 = roll(100);
                switch (true) {
                    case evt2 <= 31:
                        stat = controller.usableEvents[0][1];
                        evt = controller.usableEvents[0][0];
                        updateEventData(controller.evt);
                        if (offlinePopupObj.events[0] === 0) {
                            offlinePopupObj.events[0] = evt;
                        }
                        var playerRoll, gameRoll;
                        var diff = controller.getAreaLevel() * 75;
                        var diffmin = (controller.getAreaLevel() - 1) * 75;
    
                        //Set area event difficulty.
                        for(var k = 0; k < controller.getAreaLevel(); k++){
                            diff = Math.ceil(diff * 1.33)
                        }
    
                        if(controller.getAreaLevel() == 1){
                            diffmin = 1;
                        } else {
                            for(var k = 0; k < controller.getAreaLevel() - 1; k++){
                                diffmin = Math.ceil(diffmin * 1.33)
                            }
                            diffmin = (diffmin * 0.85);
                        }
                        
                        playerRoll = 0;
                        gameRoll = roll(diff, diffmin);
                        
                        //Figure out the stat being checked, then roll.
                        switch(stat){
                        case 'speed': 
                            playerRoll = roll(Math.round(spd + (25 * controller.getAreaLevel()), spd));
                            break;
                        case 'evasion': 
                            playerRoll = roll(Math.round(eva + (25 * controller.getAreaLevel()), eva));
                            break;
                        case 'strength': 
                            playerRoll = roll(Math.round(str + (25 * controller.getAreaLevel()), str));
                            break;
                        }
                        if(playerRoll < gameRoll){
                            var die = roll(100);
                            if (die < 5){
								totalDead++;
                                deadflag = true;
								deathNum++;
								deathArr.push(myarr[i].name);
                                console.log(myarr[i]);
                                offlinePopupObj.deaths.push(myarr[i].name);
                            } else if(die < 50){
                                offlineTracks -= dataObj.animalTracks/200;
								tripNum++;
								tripArr.push(myarr[i].name);
								totalTrip++;
                                dataObj.animalTracks -= (dataObj.animalTracks/200)
                            }
                        }
                        if(deadflag == true){
                            myarr[i].deathTime = lastLoginTime + (j * 15)
                        }
                        break;  
                    case evtRoll > 31 < 63:
                        stat = controller.usableEvents[1][1];
                        evt = controller.usableEvents[1][0];
                        //console.log(controller.usableEvents[1][0]);
                        updateEventData(controller.evt);
                        if (offlinePopupObj.events.includes(evt) === false) {
                            offlinePopupObj.events.push(evt);
                        } 
                        var playerRoll, gameRoll;
                        var diff = controller.getAreaLevel() * 75;
                        var diffmin = (controller.getAreaLevel() - 1) * 75;
    
                        for(var k = 0; k < controller.getAreaLevel(); k++){
                            diff = Math.ceil(diff * 1.33)
                        }
    
                        if(controller.getAreaLevel() == 1){
                            diffmin = 1;
                        } else {
                            for(var k = 0; k < controller.getAreaLevel() - 1; k++){
                                diffmin = Math.ceil(diffmin * 1.33)
                            }
                            diffmin = (diffmin * 0.85);
                        }
                        
                        playerRoll = 0;
                        gameRoll = roll(diff, diffmin);
                        
                        switch(stat){
                        case 'speed': 
                            playerRoll = roll(Math.round(spd + (25 * controller.getAreaLevel()), spd));
                            break;
                        case 'evasion': 
                            playerRoll = roll(Math.round(eva + (25 * controller.getAreaLevel()), eva));
                            break;
                        case 'strength': 
                            playerRoll = roll(Math.round(str + (25 * controller.getAreaLevel()), str));
                            break;
                        }
                        if(playerRoll < gameRoll){
                            var die = roll(100);
                            if (die < 5){
								totalDead++;
                                deadflag = true;
								deathNum++;
								deathArr.push(myarr[i].name);
                                console.log(myarr[i]);
                                offlinePopupObj.deaths.push(myarr[i].name);
                            } else if(die < 50){
                                offlineTracks -= dataObj.animalTracks/200
								totalTrip++;
								tripNum++;
								tripArr.push(myarr[i].name);
                                dataObj.animalTracks -= (dataObj.animalTracks/200)
                            }
                        }
                        if(deadflag == true){
                            myarr[i].deathTime = lastLoginTime + (j * 15)
                        }
                        break;  
                    case evtRoll >= 63 < 95:
                        stat = controller.usableEvents[2][1];
                        evt = controller.usableEvents[2][0];
                        updateEventData(controller.evt);
                        if (offlinePopupObj.events[2] === 0) {
                            offlinePopupObj.events[2] = evt;
                        }
                        var playerRoll, gameRoll;
                        var diff = controller.getAreaLevel() * 75;
                        var diffmin = (controller.getAreaLevel() - 1) * 75;
    
                        for(var k = 0; k < controller.getAreaLevel(); k++){
                            diff = Math.ceil(diff * 1.33)
                        }
    
                        if(controller.getAreaLevel() == 1){
                            diffmin = 1;
                        } else {
                            for(var k = 0; k < controller.getAreaLevel() - 1; k++){
                                diffmin = Math.ceil(diffmin * 1.33)
                            }
                            diffmin = (diffmin * 0.85);
                        }
                        
                        playerRoll = 0;
                        gameRoll = roll(diff, diffmin);
                        
                        switch(stat){
                        case 'speed': 
                            playerRoll = roll(Math.round(spd + (25 * controller.getAreaLevel()), spd));
                            break;
                        case 'evasion': 
                            playerRoll = roll(Math.round(eva + (25 * controller.getAreaLevel()), eva));
                            break;
                        case 'strength': 
                            playerRoll = roll(Math.round(str + (25 * controller.getAreaLevel()), str));
                            break;
                        }
                        if(playerRoll < gameRoll){
                            var die = roll(100);
                            if (die < 5){
								totalDead++;
                                deadflag = true;
								deathNum++;
								deathArr.push(myarr[i].name);
                                console.log(myarr[i]);
                                offlinePopupObj.deaths.push(myarr[i].name);
                            } else if(die < 50){
                                offlineTracks -= dataObj.animalTracks/200
								totalTrip++;
								tripNum++;
								tripArr.push(myarr[i].name);
                                dataObj.animalTracks -= (dataObj.animalTracks/200)
                            }
                        }
                        if(deadflag == true){
                            myarr[i].deathTime = lastLoginTime + (j * 15)
                        }
                        break;  
                    case evtRoll >= 95:
                        stat = controller.usableEvents[3][1];
                        evt = controller.usableEvents[3][0];
                        updateEventData(controller.evt);
                        if (offlinePopupObj.events[3] === 0) {
                            offlinePopupObj.events[3] = evt;
                        }
                        var playerRoll, gameRoll;
                        var diff = controller.getAreaLevel() * 75;
                        var diffmin = (controller.getAreaLevel() - 1) * 75;
    
                        for(var k = 0; k < controller.getAreaLevel(); k++){
                            diff = Math.ceil(diff * 1.33)
                        }
    
                        if(controller.getAreaLevel() == 1){
                            diffmin = 1;
                        } else {
                            for(var k = 0; k < controller.getAreaLevel() - 1; k++){
                                diffmin = Math.ceil(diffmin * 1.33)
                            }
                            diffmin = (diffmin * 0.85);
                        }
                        
                        diff = (diff*1.5);
                        diffmin = (diffmin*1.5);
                        
                        playerRoll = 0;
                        gameRoll = roll(diff, diffmin);
                        
                        switch(stat){
                        case 'speed': 
                            playerRoll = roll(Math.round(spd + (25 * controller.getAreaLevel()), spd));
                            break;
                        case 'evasion': 
                            playerRoll = roll(Math.round(eva + (25 * controller.getAreaLevel()), eva));
                            break;
                        case 'strength': 
                            playerRoll = roll(Math.round(str + (25 * controller.getAreaLevel()), str));
                            break;
                        }
                        if(playerRoll < gameRoll){
                            var die = roll(100);
                            if (die < 5){
								totalDead++;
                                deadflag = true;
								deathNum++;
								deathArr.push(myarr[i].name);

                                console.log(myarr[i].name);
                                offlinePopupObj.deaths.push(myarr[i].name);
                            } else if(die < 50){
                                offlineTracks -= dataObj.animalTracks/200
								totalTrip++;
								tripNum++;
								tripArr.push(myarr[i].name);

                                dataObj.animalTracks -= (dataObj.animalTracks/200)
                            }
                        }
                        if(deadflag == true){
                            myarr[i].deathTime = lastLoginTime + (j * 15)
                        }
                        break;  
                    
                }
            }
            if(deadflag == true){
                break;  
            }
			tripHistory();
        }
        if(deadflag == false && ((currTime - myarr[i].deathTime) < 0)){
            controller.animals.push(myarr[i]);
        }
    
    }
    //console.log("Total Offline Tracks: " + offlineTracks);
    offlinePopupObj.offlineTracks = offlineTracks;

    var history_text = "While you were gone, ";
    if (goodEvents > 0 || badEvents > 0) {
        history_text += "your animals encountered ";
        if (goodEvents > 0) {
            history_text += goodEvents + " good events";
            if (badEvents > 0) {
                history_text += " and " + badEvents + " bad events.";
            } else {
                history_text += ". "
            }
        } else if (badEvents > 0) {
            history_text += badEvents + " bad events. ";
        }
    }

	deathHistory();
}

//////////////////////////////////////////////////////
// Event history stuff

function deathHistory(){
	if(deathNum > 0){
		var printText = "";
		if(deathNum == 1){
			//eventLogAry.push(deadArr[0] + " unfortunately died.");
			printText = deathArr[0] + " unfortunately died.";
		}else if(deathNum == 2){
			//eventLogAry.push(deadArr[0] + "and " + dedArr[2] + " unfortunately died.");
			printText = deathArr[0] + " and " + deathArr[1] + " unfortunately died.";
		}else if(deathNum > 2){
			for(var i = 0; i < deathArr.length - 1; i++){
				printText = printText.concat(deathArr[i], ", ");
			}
			printText = printText.concat("and ", deathArr[deathArr.length-1], " unfortunately died.");
		}
		historyAry.push(printText);
	}
	deathNum = 0;
	deathArr.splice(0, deathArr.length);
}

function tripHistory(){
	if(tripNum > 0){
		var printText = "";
		if(tripNum == 1){
			//eventLogAry.push(deadArr[0] + " unfortunately died.");
			printText = tripArr[0] + " tripped and lost some tracks.";
		}else if(tripNum == 2){
			//eventLogAry.push(deadArr[0] + "and " + dedArr[2] + " unfortunately died.");
			printText = tripArr[0] + " and " + tripArr[1] + " tripped and lost some tracks.";
		}else if(tripNum > 2){
			for(var i = 0; i < tripArr.length - 1; i++){
				printText = printText.concat(tripArr[i], ", ");
			}
			printText = printText.concat("and ", tripArr[deathArr.length-1], " tripped and lost some tracks.");
		}
		historyAry.push(printText);
	}
	tripNum = 0;
	tripArr.splice(0, tripArr.length);
}



///////////////////////////////////////////////




function returningBaseLevels(){
    controller.base_levels['frog'] = getJsonItem(userID, "frogBaseLevel");
    controller.base_levels['bunny'] = getJsonItem(userID, "bunnyBaseLevel");
    controller.base_levels['bird'] = getJsonItem(userID, "birdBaseLevel");
    controller.base_levels['deer'] = getJsonItem(userID, "deerBaseLevel");
    if (controller.base_levels['frog'] === NaN ||
        controller.base_levels['bunny'] === NaN ||
        controller.base_levels['bird'] === NaN ||
        controller.base_levels['deer'] === NaN) {
        NaNReset = true;
    }
}

function returningUserAchieves(){
    var data;
    data = JSON.parse(localStorage.getItem(userID));
    completed = data["achievementsCompleted"]
    prereq = data["achievementsPrereq"]
}

function returningUserArea(){
    //console.log("current area is " + parseInt(getJsonItem(userID, "area")));
    controller.area_level = parseInt(getJsonItem(userID, "area"));
    dataObj.areaMax = parseInt(getJsonItem(userID, "maxArea"));
    dataObj.tutorialProgress = parseInt(getJsonItem(userID, "tutorialProgress"));
    console.log("PREVAREAMAX: " + dataObj.areaMax);
}

function returningUserSeason(){
    var key = 'season';
    var jsonData = JSON.parse(localStorage.getItem(userID.toString()));
    console.log(jsonData);
    controller.areaSeason = jsonData[key].toString();
    switch(controller.areaSeason){
                case 'spring':
                    if(controller.area_level % 2 == 0){
                        controller.usableEvents = badEventsSpringNight.slice();
                    } else {
                        controller.usableEvents = badEventsSpringDay.slice();
                    }
                    break;
                case 'summer':
                    if(controller.area_level % 2 == 0){
                        controller.usableEvents = badEventsSummerNight.slice();
                    } else {
                        controller.usableEvents = badEventsSummerDay.slice();
                    }
                    break;
                case 'fall':
                    if(controller.area_level % 2 == 0){
                        controller.usableEvents = badEventsFallNight.slice();
                    } else {
                        controller.usableEvents = badEventsFallDay.slice();
                    }
                    break;
                case 'winter': 
                    if(controller.area_level % 2 == 0){
                        controller.usableEvents = badEventsWinterNight.slice();
                    } else {
                        controller.usableEvents = badEventsWinterDay.slice();
                    }
                    break;
    var cata = roll(2,0);
    controller.usableEvents.push(badEventsCatastrophe[cata]);
    }
}

// Deprecated
function returningUserParty(){
console.log("returning user party");
    var id = userID;
    var key = "partyComp";
    var jsonData = JSON.parse(localStorage.getItem(id.toString()));
    var myarr = jsonData[key.toString()];   
    //console.log(myarr[0].deathTime);
    
    //console.log(myarr[0]);
    //controller.animals.push(myarr[0]);
    if(myarr.length == 0){
    //console.log("no animals in party");
    }
    for (var i = 0; i < myarr.length; i++) {
        if(myarr[i].deathTime > Date.now()){
            //console.log("animal added");
            controller.animals.push(myarr[i]);
        } else {
            //console.log("animal removed");
        }
    }
}

function returningUserEvents(){
console.log("returning user Events");
    var id = userID;
    var key = "eventsBad";
    var jsonData = JSON.parse(localStorage.getItem(id.toString()));
    var myarr = jsonData[key.toString()];   
    //console.log(myarr);
    var eventNames = ["drought", "epidemic", "eruption",
                      "flash flood", "fog", "frozen lake",
                      "heat wave", "hunter", "invasive species",
                      "lightning storm", "low temperatures", "meteor",
                      "predator", "rain storm", "river", 
                      "scarce food", "sinkhole", "snowslide",
                      "snow storm", "tornado", "treefall",
                      "wildfire"]
    //console.log(myarr[0]);
    //controller.animals.push(myarr[0]);
    for (var i = 0; i < eventNames.length; i++) {
        var evt = eventNames[i];
        if(myarr.evt > 0){
            //console.log("Event Added");
            badEventsObj.evt = myarr.evt;
        }
    }
}

//creates an login package for a first time user
function initPackage() {
    var package, jsonFile; 
    package = { 
        area: controller.getAreaLevel(),
        //areaMax: dataObj.maxArea,
        partySize: controller.party_limit,
        season: controller.areaSeason,
        partyComp: [],
        birdBaseLevel: controller.getAnimalBaseLevel('bird'),
        bunnyBaseLevel: controller.getAnimalBaseLevel('bunny'),
        deerBaseLevel: controller.getAnimalBaseLevel('deer'),
        frogBaseLevel: controller.getAnimalBaseLevel('frog'),
        playerSteps: dataObj.steps,
        playerPSteps: dataObj.priorSteps,
        playerTSteps: dataObj.totalSteps,
        playerTracks: dataObj.animalTracks,
        //eventsGood: [evt1, evt2,...,evtn],
        //eventsBad: [speedEvts, evasionEvts, strengthEvts],
        //eventSuccesses: 0,
        //eventFailures: 0,
        //animalsTripped: 0,
        //animalsDied: 0,
        //animalsLeft: 0,
        time: Date.now(),
    };
    
    for (var i = 0; i < controller.animals.length; i++) {
        package.partyComp.push(controller.animals[i]);
    }
    
    jsonFile = JSON.stringify(package);
    console.log(jsonFile);
    return jsonFile;
}


//creates a login package for a returning player
function returningPackage(iD) {
    //console.log("previous display = " + prevDispSteps);
    var prevArea = parseInt(getJsonItem(iD, "area"));
    //console.log("previous pSteps = " + prevArea);
    var prevAreaMax = getJsonItem(iD, "areaMax");
    var prevEventsBad = getJsonItem(iD, "eventsBad");
    var prevTutProg = parseInt(getJsonItem(iD, "tutorialProgress"));
    
    var prevPartySize = parseInt(getJsonItem(iD, "partySize"));
    
    var prevBirdBase = parseInt(getJsonItem(iD, "birdBaseLevel"));
    var prevBunnBase = parseInt(getJsonItem(iD, "bunnyBaseLevel"));
    var prevDeerBase = parseInt(getJsonItem(iD, "deerBaseLevel"));
    var prevFrogBase = parseInt(getJsonItem(iD, "frogBaseLevel"));
    
    var prevSteps = parseFloat(getJsonItem(iD, "playerSteps"));
    var prevPSteps = parseFloat(getJsonItem(iD, "playerPSteps"));
    var prevTSteps = parseFloat(getJsonItem(iD, "playerTSteps"));
    var prevTracks = parseFloat(getJsonItem(iD, "playerTracks"));
    var prevTime = parseFloat(getJsonItem(iD, "time"));
    //var package, jsonFile; 
    //jsonFix(jsonFixAry);
    package = {  
        animalsDied: 0,
        animalsLeft: 0,
        animalsTripped: 0,
        area: controller.getAreaLevel(),
        areaMax: dataObj.areaMax,
        baseLevelBird: prevBirdBase,
        baseLevelBunny: prevBunnBase,
        baseLevelDeer: prevDeerBase,
        baseLevelFrog: prevFrogBase,
        eventsGood: [],
        eventsBad: [],
        eventSuccesses: 0,
        eventFailures: 0,
        partyComp: [],
        partySize: controller.party_limit,
        playerSteps: prevSteps,
        playerPSteps: prevPSteps,
        playerTSteps: prevTSteps,
        playerTracks: prevTracks,
        season: controller.areaSeason,
        time: prevTime,
        tutorialProgress: prevTutProg,
    };

    console.log(prevPartySize);
    for (var i = 0; i < controller.animals.length; i++) {
        controller.animals[i].setLevel = function(lv){
          this.level = lv;
        }
        controller.animals[i].levelUp = function(){
          this.level += 1;
        }
        package.partyComp.push(controller.animals[i]);
        console.log(controller.animals[i].name + ": " +
                   controller.animals[i].levelUp);
    }
    
    if (prevEventsBad !== undefined) {
        console.log("Prev Events: " + prevEventsBad);
    } else if (prevEventsBad === NaN) {
        console.log("What can't I just get the string?");
    }
    
    jsonFile = JSON.stringify(package);
    //console.log(jsonFile);
    return jsonFile;
}

function isFirstTimeUser(myID){
    if(storageIsSupported()){
        if(localStorage.getItem(myID.toString()) == null){
            return true;
        } else {
            return false;
            }
    } else {
        console.log("Browser does not support HTML5 local storage");
    }
}
/*
function jsonFix(ary) {
    var i;
    for (i = 0; i < (ary.length - 1); i++) {
        if (ary[i] > 0) {
            
        }
    }
}
*/
//checks if browser supports local storage. 
//returns true if localstorage is supported, false if it is not
function storageIsSupported(){
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        return true;
    }else{
        return false;
    };
}