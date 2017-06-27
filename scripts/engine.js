//Game loop. The main function passes a renderer to this and it creates a game loop. 
//Written this way for data abstraction purposes.
var game_loop_interval = 30;
function game_loop(renderer) {
    //console.log(game_loop_interval);
    setInterval(function() {renderer.update(); renderer.draw();}, game_loop_interval);
}

var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};