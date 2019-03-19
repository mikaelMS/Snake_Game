// The Counter in the game
var Counter = function (context, GAME_WIDTH, GAME_HEIGHT) {
    this.GAME_WIDTH = GAME_WIDTH;
    this.GAME_HEIGHT = GAME_HEIGHT;
    this.currentScore = 0;
    this.pointsPerApple = 9;
    this.context = context;
};

Counter.prototype.drawCounter = function () {
    this.context.font = "20px Arial";
    this.context.fillStyle = "white";
    this.context.textAlign = "center";
    this.context.fillText("Score: " + this.currentScore, this.GAME_WIDTH / 4, this.GAME_HEIGHT / 10);
}

//Increments score
Counter.prototype.addScore = function () {
    this.currentScore = this.currentScore + this.pointsPerApple;
}
