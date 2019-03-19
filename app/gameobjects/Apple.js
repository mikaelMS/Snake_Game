//Apple in the game
var Apple = function (context, GAME_WIDTH, GAME_HEIGHT, RASTER_SIZE) {
    this.GAME_WIDTH = GAME_WIDTH;
    this.GAME_HEIGHT = GAME_HEIGHT;
    this.appleWidth = RASTER_SIZE;
    this.appleHeight = RASTER_SIZE;
    this.RASTER_SIZE = RASTER_SIZE;
    this.XapplePos = this.determinRandomPositionX();
    this.YapplePos = this.determinRandomPositionY();
    this.context = context;
};

Apple.prototype.getXapplePos = function () {
    return this.XapplePos;
}

Apple.prototype.getYapplePos = function () {
    return this.YapplePos;
}

Apple.prototype.determinRandomPositionX = function () {
    //X-Koordinaten
    return (Math.floor(Math.random() * (this.GAME_WIDTH / this.RASTER_SIZE)) * this.RASTER_SIZE);
}

Apple.prototype.determinRandomPositionY = function () {
    //Y-Koordinaten
    return (Math.floor(Math.random() * (this.GAME_HEIGHT / this.RASTER_SIZE)) * this.RASTER_SIZE);
}

//Creates apple (recktangle)
Apple.prototype.createApple = function () {
    this.context.beginPath();
    this.context.strokeStyle = "#FF0000";
    this.context.fillStyle = "red";
    this.context.fillRect(this.XapplePos, this.YapplePos, this.appleWidth, this.appleHeight);
}

//Determins new postion after apple is eaten
Apple.prototype.drawNewApple = function () {
    var newXapplePos = this.determinRandomPositionX();
    var newYapplePos = this.determinRandomPositionY();
    this.XapplePos = newXapplePos;
    this.YapplePos = newYapplePos;

    this.createApple();
}
