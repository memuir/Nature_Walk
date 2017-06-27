/**
 * @author Duunko
 */


function p_queue(){
	
	this.data = [];
	this.length = 0;
	
	this.push = function(data1, data2){
		this.data.push([data1, data2]);
		this.length++;
	}
	
	this.pop = function(){
		if(this.data[0] != undefined){
			var anim = this.data[0][1];
			this.data.shift();
			this.length--;
			return anim;
		} else {
			return null;
		}
	}
	
	this.popNext = function(item){
		for(var i = 0; i < this.data.length; i++){
			if(this.data[i][1] == item){
				var anim = this.data.splice(i,1);
				this.length--;
				return anim;
			}
		}
		return null;
	}
	
	
	this.head = function(){
		if(this.data[0] != undefined){
			return this.data[0][0];
		} else {
			return null;
		}
	}
	
	this.reduce = function(place, amount){
		this.data[place][0] -= amount;
	}
	
}
