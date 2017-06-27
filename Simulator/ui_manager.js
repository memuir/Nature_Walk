/* var ui_references = {
    stylesheet: document.styleSheets[0].cssRules,
    //one: document.styleSheets[0].cssRules[0],
    //two: document.styleSheets[0].cssRules[1]
	//four: document.styleSheets[0].cssRules[6],
};

function switchInterface(interfaceLabel) {
    "use strict";
    var ui;
    console.log(document.styleSheets[0]);
    if (interfaceLabel === 1) {
        ui = ui_references.one;
        ui.style.visibility = "visible";
        ui = ui_references.two;
        ui.style.visibility = "hidden";
		ui = ui_references.four;
        ui.style.visibility = "hidden";
    } else if (interfaceLabel === 2) {
        ui = ui_references.one;
        ui.style.visibility = "hidden";
        ui = ui_references.two;
        ui.style.visibility = "visible";
		ui = ui_references.four;
        ui.style.visibility = "hidden";
    }
}
*/
/*
var uimode1 = document.getElementById('Results');
var uimode2 = document.getElementById('Parameters');

uimode1.addEventListener('mouseup', function() {switchInterface(1);});
uimode2.addEventListener('mouseup', function() {switchInterface(2);});
*/

/* Interface Setup Script */
var prioritySliders = [];
prioritySliders.push(document.getElementById("BirdPri"));
prioritySliders.push(document.getElementById("DeerPri"));
prioritySliders.push(document.getElementById("FrogPri"));
prioritySliders.push(document.getElementById("BunnPri"));

var priorityVals = [];
priorityVals.push(document.getElementById("BirdPriVal"));
priorityVals.push(document.getElementById("DeerPriVal"));
priorityVals.push(document.getElementById("FrogPriVal"));
priorityVals.push(document.getElementById("BunnPriVal"));

var activityLevel = document.getElementById("Activity");
var optimalLevel = document.getElementById("Logins");
var engageLevel = document.getElementById("Engagement");
var retentLevel = document.getElementById("Retention");

var simulate = document.getElementById("Simulate");
simulate.addEventListener('click', simulation);

prioritySliders[0].value = 0;
prioritySliders[1].value = 0;
prioritySliders[2].value = 0;
prioritySliders[3].value = 0;

var controller = new master_controller();
/////////////////////////////////////////

function update() {
    for (var i = 0; i < priorityVals.length; i++) {
        priorityVals[i].innerHTML = prioritySliders[i].value;
    }
}

function simulation() {
    var i, j, k, temp;
    var priorities = [];
    var activity = activityLevel.value;
    var logins = optimalLevel.value;
    var sessionTime = engageLevel.value*60;
    var seconds = retentLevel.value * 24 * 3600;
    var steps = 0, totalSteps = 0, tracks = 0, 
        totalTracks = 0, areaCount = 1, areaReq = 5000, 
        animalCalls = [0, 0, 0, 0], dailySeconds = 86400; 
    var flags = {
        online: true,
        onlineTimer: sessionTime,
        eventTimer: 12,
        dailyLogins: logins,
        dayCount: retentLevel.value,
        dayCountdown: dailySeconds
    }
    //Collect given priorities. 
    var obj;
    for (i = 0; i < priorityVals.length; i++) {
        obj = {
            id: parseInt(prioritySliders[i].value),
            value: animal_types[i]
        };
     priorities.push(obj);
    }
    
    //Sort priorities.
    for (i = 1; i < priorities.length; i++) {
        j = i;
        //console.log(priorities[i].id);
        while (j > 0 && priorities[j-1].id > priorities[j].id) {
            temp = priorities[j];
            priorities[j] = priorities[j-1];
            priorities[j-1] = temp;
            j--;
        }
    }
    
    //Shift out all of the zeroes. 
    while(priorities[0].id === 0) {
        priorities.shift();
    }
    
    //Starting number of steps. 
    steps = parseInt(activityLevel.value);
    totalSteps = parseInt(activityLevel.value);
    
    //Continue simulation until the player's interest expires.

    /*Things to add:
     *Event tracker
     *Days between area advancement
     *Finish offline calculator
     *
    */
    while (flags.dayCount > 0) {
        //If player is online
        console.log("Steps: " + steps);
        console.log("DayCount: " + flags.dayCount);
        console.log("DailyLogins: " + flags.dailyLogins);
        if (flags.online === true) {
            //Simulate being online
            steps += parseInt((activityLevel.value / logins));
            totalSteps += parseInt(activityLevel.value / logins);
            //For the duration of their session
            
            for (i = 0; i < flags.onlineTimer; i++) {
                //Parse through the priorities
                if (totalSteps >= areaReq) {
                    areaCount++;
                    areaReq = Math.floor((areaReq+5000) * 1.01); //UI_ELEM_2
                    console.log("Total Steps: " + totalSteps);
                    console.log("Area Req: " + areaReq);
                }
                for (j = 0; j < priorities.length; j++) {
                    if (steps >= 2000 + (2000*animalCalls[j])) {
                        steps -= 2000 + (2000*animalCalls[j]); //UI_ELEM_2
                        controller.addAnimal(priorities[j].value);
                        animalCalls[j]++;
                        break;
                    }
                }
                
                tracks += Math.floor((2*controller.getNumAnimals()) + (areaCount*1.35));
                totalTracks += Math.floor((2*controller.getNumAnimals()) + (areaCount*1.35));
                
                //Start the animal upgrading process. 
                //console.log("Start Upgrading");
                for (j = 0; j < priorities.length; j++) {
                    var baseLevel = controller.getAnimalBaseLevel(priorities[j].value);
                    //Upgrade cost = 10*baseLevel
                    /* 
                    Multiply upgrade cost by priority ranking to increase likeliness to upgrade higher priority animals
                    */
                    //console.log(priorities.length);
                    //console.log(tracks);
                    if(tracks >= 10*baseLevel*(j+1)) {
                        tracks -= 10*baseLevel;
                        //console.log(tracks);
                        controller.baseLevelUp(priorities[j].value);
                        //console.log("Upgraded: " + priorities[i].value);
                        //console.log("For cost: " + 10*baseLevel);
                        break;
                    }
                }
                //console.log("Done Upgrading");
                //Roll event.
                if (flags.eventTimer === 0) {
                    console.log("roll event");
                    flags.eventTimer = 12;
                }
                flags.eventTimer--;
            }
            //When not online, go offline, reduce daily logins, restart sessionTimer.
            flags.online = false;
            flags.dailyLogins--;
            flags.onlineTimer = sessionTime;
            var calcTime = (1440/logins) - (sessionTime/60);
            //console.log("CalcTime: " + calcTime);
            //offlineCalculation(calcTime);
            if (flags.dailyLogins > 0) {
                flags.online = true;
            } else {
                //Reduce day countdown.
                //reset the daily logins.
                flags.dayCount--;
                console.log("Reduce dayCount");

                if (flags.dayCount > 0) {
                   flags.dailyLogins = logins; 
                }
                flags.online = true;
            }
        } 
    }
    console.log(areaCount);
    resetValues();
    var results = {
        control: controller,
        totalSteps: totalSteps,
        totalTracks: totalTracks,
    }
    displayResults(results);
}

function offlineCalculation(calcTime) {
    var offlineTime = calcTime*60;
    var eventCount = offlineTime/12;
    
}

function displayResults(results){
    console.log(results.control.getAnimalData());
}

function resetValues() {
    var controller = new master_controller();
}

function purchase(priorities) {
    var selection;
    if (controller.getNumAnimals < controller.party_limit){
        if (steps - 100 >= 0) {
            steps -= 100;
            selection = identifyPriority(priorities);
        }
    }
}

setInterval(update, 15);

