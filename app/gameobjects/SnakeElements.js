// SnakeElement in the game
var SnakeElement = function (XsnakePos, YsnakePos, context, RASTER_SIZE) {
    this.XsnakePos = XsnakePos;
    this.YsnakePos = YsnakePos;
    this.snakeWidth = RASTER_SIZE;
    this.snakeHeight = RASTER_SIZE;
    this.context = context;
};

SnakeElement.prototype.getXsnakePos = function () {
    return this.XsnakePos;
}

SnakeElement.prototype.getYsnakePos = function () {
    return this.YsnakePos;
}

SnakeElement.prototype.draw = function () {
    this.context.beginPath();
    this.context.strokeStyle = "black";
    this.context.strokeRect(this.XsnakePos, this.YsnakePos, this.snakeWidth, this.snakeHeight);
    this.context.fillStyle = "green";
    this.context.fillRect(this.XsnakePos, this.YsnakePos, this.snakeWidth, this.snakeHeight);
}
