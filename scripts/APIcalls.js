var fitbitAccessToken;
var userName;
var userID;
var stepCount;


function fitbit_start(){
    authorize();
    getUserInfo();
    getNewSteps();
	
}


//logs the user out of fitbit and redirects to fitbit login
function logout(){
    window.location.replace('https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=2287VH&redirect_uri=http%3A%2F%2FNatureWalk.github.io&prompt=login&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight');
}


//redirects to fitbit login for authentication if needed
function authorize(){
  if (!window.location.hash) {
  	window.location.replace('https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=2287VH&redirect_uri=http%3A%2F%2FNatureWalk.github.io&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight');
  } else {
    	var fragmentQueryParameters = {};
    	window.location.hash.slice(1).replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function($0, $1, $2, $3) { fragmentQueryParameters[$1] = $3; }
    	);
    	fitbitAccessToken = fragmentQueryParameters.access_token;
  }
}
	
	
//AJAX call to get user data and set values for userName and userID
 function getUserInfo(){ 
  $.ajax({
  	type: 'GET',
  	url: 'https://api.fitbit.com/1/user/-/profile.json',
  	headers: {
        	'Authorization':'Bearer ' +  fitbitAccessToken,
        	'Content-Type':'application/json'
  	},
  	async: false,
  
  	beforeSend: function (xhr) {
    		if (xhr && xhr.overrideMimeType) {
      			xhr.overrideMimeType('application/json;charset=utf-8');
    		}
  	},
  	dataType: 'json',
  	success: function (data) {
  		var arr = JSON.stringify(data);
      		var text = arr;
      		var obj = JSON.parse(text);
      		userName = obj.user.displayName;
      		userID = obj.user.encodedId;
      		//displayWelcome();
  	}
  });
}


//AJAX call to get user lifetime step count and set value of stepCount
function getNewSteps(){ 
   $.ajax({
  	type: 'GET',
  	url: 'https://api.fitbit.com/1/user/-/activities.json',
  	headers: {
        	'Authorization':'Bearer ' +  fitbitAccessToken,
        	'Content-Type':'application/json'
  	},
  	async: false,
  
  	beforeSend: function (xhr) {
    		if (xhr && xhr.overrideMimeType) {
      			xhr.overrideMimeType('application/json;charset=utf-8');
    		}
  	},
  	dataType: 'json',
  	success: function (data) {
  		var arr = JSON.stringify(data);
      		var text = arr;
      		var obj = JSON.parse(text);
      		stepCount = obj.lifetime.total.steps;
      	}
  });
}
