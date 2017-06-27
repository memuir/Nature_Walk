/* Things to work on:  
 * 1. Event future sight.
 * 2. Events based on environment.
 * 3. Events appearing on screen. 
*/
//Object that can hold all of the session and player data.
/*dataObj:
 * - animalsDied: How many animals have died due to events..
 * - animalsLeft: How many animals have timed out.
 * - animalsTripped: How many animals have tripped due to events.
 * - animalsTracks: Current number of tracks the player has. 
 * - animalsTracksLost: Total number of tracks lost by events. 
 * - animalsTracksSpent: Total number of tracks spend on upgrades. 
 * - area: Current area the player is on. 
 * - areaMax: Highest area the player can go to. 
 * - partySize: Maximum size a player's party of animals can be. 
 * - priorSteps: Number of steps that the player had before starting the game. 
 * - steps: Current number of steps the player has available.
 * - totalSteps: Total number of steps the player has brought into the game since starting (TotalFitbitSteps - priorSteps).
 * - tutorialProgress: The place in the tutorial that the player has completed. 
*/
var dataObj = {
    animalsDied: 0,
    animalsLeft: 0,
    animalsTripped: 0,
    animalTracks: 0,
    animalTracksLost: 0,
    animalTracksSpend: 0,
    area: 0,
    areaMax: 0,
    //eventFailures: 0, 
    //eventSuccesses: 0,
    //eventsBad: [],
    //eventsGood: [],
    //numberOfSessions: 0,
    multipliedSteps: 0,
    partySize: 0,
    priorSteps: 0,
    steps: 0,
    stepMultiplier: 1,
    //timePlayed: 0,
    totalSteps: 0,
    tutorialProgress: 0,
};

//Object that stores the number of times an event has been rolled. 
//Organized alphabetically, by name. 
var badEventsObj = {
    drought: 0,
    epidemic: 0,
    eruption: 0,
    flashflood: 0,
    fog: 0,
    frozenlake: 0,
    heatwave: 0,
    hunter: 0,
    invasivespecies: 0,
    lightningstorm: 0,
    lowtemperatures: 0,
    meteor: 0,
    predator: 0,
    rainstorm: 0,
    river: 0,
    scarcefood: 0,
    sinkhole: 0,
    snowslide: 0,
    snowstorm: 0,
    tornado: 0,
    treefall: 0,
    wildfire: 0, 
}

var offlinePopupObj = {
    events: [],
    deaths: []
}

//Object for keeping track of the game state. Best for storing game loop data. 
var gameState = {
    animalStats: ["Level", "Speed", "Evasion", "Strength"],
    computationReady: false,
    devSignIn: false,
    eventCounter: 0,
    eventTrigger: 5,
    eventDisplayTimer: 0,
    everySecondTrig: 0,
    menuPause: false,
    newToFitbit: false,
    offlinePopup: true,
    sessionStartTime: 0,
    setupComplete: false,
    setupTimer: 1,
    sprint: false,
    timeAccelFactor: 1,
}

//Constructor function for the DataTracker Object.
var DataTracker = function() {
    sessionStart();
};
DataTracker.prototype.constructor = DataTracker;
DataTracker.prototype.sessionStart = sessionStart;
DataTracker.prototype.getTime = getTime;
DataTracker.prototype.sessionEnd = sessionEnd;
DataTracker.prototype.openDevWindow = openDevWindow;

/* sessionStart() - Function to get all of the player data upon start up. Would also be used to call the function that calculates what the player earned while they were gone.
 * Params - None. 
 * Returns - None. 
*/
function sessionStart() {
	///////////////////////////////////
	// USED FOR TESTING! DELETES ALL LOCAL DATA!
	// ONLY UNCOMMENT IF YOU WANT TO DELETE LOCAL DATA!
    //localStorage.clear();
	///////////////////////////////////
	
    //var _tempData = queryServer();
    //dataObj.steps = stepCount;
    //dataObj["totalSteps"] += dataObj.steps;
    
    dataObj["sessionStartTime"] = Date.now();
    
    //offlineCalculations(serverTime, dataObj["sessionStartTime"]);
    
    //setupPlayer(serverPlayerData);
    
    //setupParty(serverPartyComp);
}

/* getTime() - Function that calculates any time that passes. 
 * Params - None. 
 * Returns - None. 
*/
function getTime() {
    //console.log("Getting Time");
    var currentTime = Date.now() * gameState["timeAccelFactor"];
    var timeAry = readableTime(currentTime - dataObj["sessionStartTime"]);
    //console.log("Time Handler");
    timeHandler(timeAry);
    
    return (currentTime - dataObj["sessionStartTime"]);
}

/* readableTime() - Converts milliseconds to various higher times (seconds, minutes, hours and days).
 * Params: - milliseconds: number of milliseconds that are given via Date.now(). 
 * Returns - timeArray: An array of various time measurements. 
*/
function readableTime(milliseconds) {
    var timeArray = [0, 0, 0, 0, 0];
    var timeRemainder = milliseconds;
    //Milliseconds
    timeArray[0] = timeRemainder % 1000;
    timeRemainder = Math.floor(timeRemainder/1000);
    //Seconds
    timeArray[1] = timeRemainder % 60;
    timeRemainder = Math.floor(timeRemainder/60);
    //Minutes
    timeArray[2] = timeRemainder % 60
    timeRemainder = Math.floor(timeRemainder/60);
    //Hours
    timeArray[3] = timeRemainder % 24
    timeRemainder = Math.floor(timeRemainder/24);
    //Days
    timeArray[4] = timeRemainder;
    return timeArray;
}

/* eventHandler() - Uses the array from readableTime() to calculate the timings of events. Currently divided into:
 * - Events that happen every second (everySecond(seconds)).
 * - Events that happen every 30 seconds (everyThirty(seconds)).
 * - Events that happen every minute (everyMinute(minutes)).
 * - Events that happen every hour (everyHour(hours)).
 * Params: - timeAry: Array of various time measurements from readableTime(). 
 * Returns - None. 
*/
function timeHandler(timeAry) {
    if (timeAry[1] === gameState.everySecondTrig) {
       
        if (!gameState.menuPause) {
            
             everySecond(timeAry[1]);
        }
        if (timeAry[1] === 59) {
            gameState.everySecondTrig = 0;
        } else {
            gameState.everySecondTrig++; 
        }
    } else if (Math.abs(timeAry[1] - gameState.everySecondTrig) >= 2) {
        gameState.everySecondTrig = timeAry[1] + 1;
    }
    
    //everyMinute(timeAry[2]);
    
    if (timeAry[1] % 30 === 0) {
        if (gameState.computationReady) {
            everyThirty(timeAry[1]);
            gameState.computationReady = false;
        } else {
            //console.log("Already computered.");
        }
    } else {
        if (gameState.computationReady === false) {
            gameState.computationReady = true;
        }
    }
}

//Function that will be called every second. 
function everySecond(seconds) {
    //Track generation code.
    //console.log("NaN: " + NaNReset);
	if (NaNReset) {
        dataCorruptionApology();
    }
    if (!gameState.setupComplete) {
        console.log(gameState.setupComplete);
        if (gameState.setupTimer > 0) {
            gameState.setupTimer--; 
            return;
        }
        //return;
    }
	updateLog();
    var areaMult = 2.16;
    var areaTracks = controller.area_level*areaMult;
    var animTracks = 2*controller.getNumAnimals();

    //DEBUG: console.log("Tracks: " + dataObj.animalTracks);
    //DEBUG: console.log(Math.floor(areaTracks*animTracks));
    dataObj.animalTracks += (areaTracks*animTracks);
    
    if (--gameState.eventDisplayTimer === 0) {
        displayEvent();
    }
    
    dataObj.areaMax = maxArea();
    //console.log("Max Area: " + dataObj.areaMax);
    var partySizeLimit = Math.floor(dataObj.areaMax / 25);
    if (partySizeLimit > 7) {
        partySizeLimit = 7 
    }
    for (var i = 0; i < partySizeLimit; i++) {
        if (controller.party_limit <= 12) {
            controller.partySizeUp();
        }
    }
    //DEBUG: console.log(seconds);
    //Decrement the event trigger timer. 
    //When it hits 0, roll an event. 
    
    if (gameState.eventTrigger > 0) {
        if (dataObj.tutorialProgress > 35) {
            gameState.eventTrigger--;
            if (gameState.sprint) {
                callSprint(gameState.newToFitbit);
                gameState.sprint = false;
                gameState.offlinePopup = false;
            }
            if (gameState.offlinePopup) {
                callOfflinePopup();
                gameState.offlinePopup = false;
            }
        } else {
            
        }
    } else {
        var evtRoll = roll(100);
        ++gameState.eventCounter;
        //DEBUG: console.log("Event "+dataObj.eventCounter);
        eventChooser(evtRoll);
        gameState.eventTrigger = roll(5) + 12;
    }
    if (controller.animals.length != dataObj.partySize) {
        updateParty();
        dataObj.partySize = controller.animals.length;
    } 
    
    if(firstTimeUserFlag == true){
        firstTimeUserFlag = false;
        if (dataObj.tutorialProgress <= 13) {
            dataObj.tutorialProgress = 0;
            startTutorial();
        } else if (dataObj.tutorialProgress <= 21) {
            dataObj.tutorialProgress = 12;
            startTutorialPartTwo();
        } else if (dataObj.tutorialProgress <= 33) {
            dataObj.tutorialProgress = 20;
            startTutorialPartThree();
        } else if (dataObj.tutorialProgress <= 36) {
            dataObj.tutorialProgress = 32;
            startTutorialPartFour();
        }
    }
    if(loggedIn == true){
        createPackage();
        createData(lJson);
    };
}

//Function that is called every thirty seconds. 
function everyThirty(seconds) {
    
}

function everyMinute(minutes) {
    
}

function everyHour(hours) {
    
}


/* createPackage() - Function that will save the current state of the game into local storage. .
 * Params: None. 
 * Returns: None. 
*/
var lJson;
function createPackage() {    
    var package, jsonFile; 
    //Package object that will be stored in local storage at the end of the function. 
    /*
     * - animalsDied: How many animals have died due to events..
     * - animalsLeft: How many animals have timed out.
     * - animalsTripped: How many animals have tripped due to events.
     * - animalsTracksLost: Total number of tracks lost by events. 
     * - animalsTracksSpent: Total number of tracks spend on upgrades. 
     * - area: Current area the player is on. 
     * - baseLevel<animalname>: The current level of the base animal.
     * - eventsGood: Object that accounts for all of the good events. Organized alphabetically, by name. 
     * - eventsBad: Object that accounts for all of the bad events. Organized alphabetically, by name. 
     * - partyComp: Current layout of the player's assortement of animals including level, name and the animal's leave timer. 
     * - priorSteps: Number of steps that the player had before starting the game.
     * - partySize: Maximum size of the player's party. 
     * - playerSteps: Current available steps for the player.
     * - playerPSteps: Player's steps from before they started the game.
     * - playerTSteps: Player's total steps that they've brought into the game (totalFitbitSteps - priorSteps).
     * - playerTracks: Player's current available animal tracks. 
     * - season: Player's current season. 
     * - time: The time, in milliseconds of the save. 
     * - tutorialProgress: The place in the tutorial that the player has completed.
     */
    //console.log("In game completed: " + completed); 
    //console.log("In game prereq: " + prereq);
    package = { 
        achievementsCompleted: completed,
        achievementsPrereq: prereq,
        animalsDied: 0,
        animalsLeft: 0,
        animalsTripped: 0,
        area: controller.getAreaLevel(),
        baseLevelBird: 1,
        baseLevelBunny: 1,
        baseLevelDeer: 1,
        baseLevelFrog: 1,
        eventsGood: [],
        eventsBad: badEventsObj,
        //eventSuccesses: 0,
        //eventFailures: 0, 
        partyComp: [],
        partySize: controller.party_limit,
        playerSteps: stepCount,
        playerMSteps: dataObj.multipliedSteps,
        playerPSteps: dataObj.priorSteps,
        playerTSteps: dataObj.totalSteps,
        playerTracks: dataObj.animalTracks,
        season: controller.areaSeason,
        stepMultiplier: dataObj.stepMultiplier,
        time: Date.now(),
        tutorialProgress: dataObj.tutorialProgress,
    };

    //Saving the player's party composition. 
    for (var i = 0; i < controller.animals.length; i++) {
        package.partyComp.push(controller.animals[i]);
    }
    
    //Saving the player's base levels. 
    var anim = "frog";
    package.frogBaseLevel = controller.getAnimalBaseLevel(anim);
    var anim = "bunny";
    package.bunnyBaseLevel = controller.getAnimalBaseLevel(anim);
    var anim = "bird";
    package.birdBaseLevel = controller.getAnimalBaseLevel(anim);
    var anim = "deer";
    package.deerBaseLevel = controller.getAnimalBaseLevel(anim);
    
    //Creating the json string for storage. 
    jsonFile = JSON.stringify(package);
    //console.log(jsonFile);
    //Copying the string to a global variable. 
    lJson = jsonFile;
}
//Roll what kind of event is rolled. Good, Bad, Neutral.
function eventChooser(evtRoll) {
    for (var i = eventLogAry.length-1; i >= 0; i--) {
        //Clear the event log so a new event can take it's place. 
        eventLogAry.pop();
    }
    //Limit the number of lines the event log can display to 5 (6-1).
    if (eventLogAry.length === 6) {
        eventLogAry.shift();
    }
    //Good Event
    if (evtRoll > 70) {
        goodEventHandler(roll(100));
    } 
    //Bad Event
    else if (evtRoll < 40) {
        badEventHandler(roll(100));
    }
    //No Event/Neutral Event
    else {
        noEventHandler(roll(100));
    }
}

/* areaEligible(area) - Function that determines if a player can advance to the next area.
 * Params:
 * - area: The current area that the player is on. 
 * Returns: 
 * - Boolean: True if the player is allowed to progress. . 
*/
function areaEligible(area) {
    //;
    var areaReq = 5000;
    for (var i = 1; i < area; i++) {
       areaReq = (areaReq+5000) * 1.01; 
    }
    //console.log("Steps: " + dataObj.totalSteps + ". Required: " + areaReq);
    if (dataObj.totalSteps >= areaReq) return true;
    return false;
}

/* maxArea() - Function that determines the highest area a player can possibly progress to.
 * Params: None. 
 * Returns: 
 * - tempArea: The integer value that is the highest area a player can possibly progress to. 
*/
function maxArea() {
    var tempArea = 1;
    while (areaEligible(tempArea)) {
        tempArea++;
    }
    return tempArea;
}

//Rolls an integer between 1 and a number parameter. 
function roll(num, basenum) {
	if(basenum != null){
		return Math.floor(Math.random()*num) + basenum;
	}else {
    	return Math.floor(Math.random()*num);
	}
}
/* sessonEnd() - Called when the window is closed (unfinished). Used to take data from dataObj{} and store it on server/local storage.
 * Params: None. 
 * Returns: None.
*/
function sessionEnd() {
    this.timePlayed += getTime();
    //return "Are you sure?";
    createPackage();
}


/* OpenDevWindow() - Developers window to use cheat codes, for testing purposes of course. ;)
 * Sign in with your name in the Slack. 
 * Params: None. 
 * Returns: None.
*/
function openDevWindow() {
    //updateData(playerID, "timePlayed", dataObj["timePlayed"]);
    //var devWindow = new Screen(true, true); 
    var background = new Sprite();
    var devAuth = devAuthentication;
  
    console.log(userID);
    background.setSrc("https://naturewalk.slack.com/files/hesi/F41C74HQC/ranimalsnw.jpg");
    background.setSpriteAttributes(25, 25, 150, 350, "devWindow");
    
    if (gameState.devSignIn === false) {
        var devName = prompt("Enter dev name: ");
        if (devAuth(devName)) {
            console.log("Authentication successful.");
            gameState["devSignIn"] = true;
        } else {
            //console.log("Authentication failed.")
            alert("Authentication failed.")
            return;
        }
        commandManager();
    } else {
        commandManager();
    }
}

/* devAuthentication() - Validates developers to use cheats.  
 * Params - name: Value entered into the prompt. Will be a name from our Slack group. 
 * Returns - a boolean that validates if the given name is in the array of registered devs. 
*/
function devAuthentication(name){
    var AuthorizedDevelopers = ["anhouzi", "dan", "duunko", "eshi", "memuir", "theoren"];
    return AuthorizedDevelopers.includes(name);
}

/* commandManager() - Function to handle all of the cheat commands.  
 * Params: None. 
 * Returns: None. 
*/
function commandManager() {
    var cmd = prompt("Enter command or type 'list' to see the commands.");
    
    switch (cmd.toLowerCase()) {
        case "list":
            console.log("'stepoff' - adds steps");
            console.log("'trackerdown' - adds tracks");
            break;
        //Give steps to the player.
        case "stepoff":
            console.log(cmd);
            //console.log(stepCount);
            var stepCheat = Number(prompt("Enter number of steps to add."));
            if (typeof stepCheat === "number") {
                stepCount += stepCheat;
                dataObj.steps += stepCheat;
                dataObj.totalSteps += stepCheat;
            } else { alert("Not a number."); }
            
            break;
        //Give tracks to the player.
        case "trackerdown":
            var trackCheat = Number(prompt("Enter number of steps to add."));
            if (typeof trackCheat === "number") {
                dataObj.animalTracks += trackCheat;
            } else { alert("Not a number."); }
            
            break;
        //Increase the speed at which the game sees time passing.
        //Can go up to 3 times faster in frames speed. Cannot slow down even after speeding up. 
        case "gottagofast":
            console.log(cmd);
            var gameSpeed = Number(prompt("Enter number milliseconds per frame."));
            if (typeof gameSpeed === "number") {
                game_loop_interval = gameSpeed;
                game_loop(screenMan);
                console.log(game_loop_interval);
            } else { alert("Not a number."); }
            break;
        //Warp ahead in time. 
        case "justaminutedeer":
            console.log(cmd);
            break;
        //Remove all animals from the map. 
        case "pidgeyohno":
            console.log(cmd);
            for (var i = game.objects.length - 1; i > 0; i--) {
                if (game.objects[i].name === "frog" ||
                    game.objects[i].name === "bunny" ||
                    game.objects[i].name === "deer" ||
                    game.objects[i].name === "bird") {
                        game.objects.splice(i, 1);
                    }
            }
            break;
        //Unkillable animals. 
        case "toadallyfit":
            console.log(cmd);
            break;
        //Hard reset of all data. 
        case "badhareday":
            console.log(cmd);
            break;
            
    }
}