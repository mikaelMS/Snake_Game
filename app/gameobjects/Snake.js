//Snake 
var Snake = function (context, RASTER_SIZE) {
    this.snakeArray = [];
    this.snakeArraySlots = 2; //Zaehlen beginnt bei 0
    this.XStartCoordinates = 50; //Zufaellig gewaehlt
    this.YStartCoordinates = 60; //Zufaellig gewaehlt
    var MoveRight = 39; //Startbewegung der snake
    this.pressedKey = MoveRight;
    this.RASTER_SIZE = RASTER_SIZE;
    this.context = context;
    this.createStartSnake();
};

//Creates starting snake with 3 blocks
Snake.prototype.createStartSnake = function () {
    for(var i = 0; i <= this.snakeArraySlots; i++) {
        this.snakeArray[i] = new SnakeElement(this.XStartCoordinates, this.YStartCoordinates, this.context, this.RASTER_SIZE)
        this.XStartCoordinates = this.XStartCoordinates + this.RASTER_SIZE;
    }
}

//Goes to draw function in SnakeElements
Snake.prototype.drawSnakeArray = function () {
    for (var i = 0; i <= this.snakeArraySlots; i++) {
        this.snakeArray[i].draw();
    }
}

//Pushes snakeArray object in the array to the left
Snake.prototype.shiftSnakeArray = function () {
    for (var i = 0; i < this.snakeArraySlots; i++) {
        this.snakeArray[i] = this.snakeArray[i + 1];
    }
}

//Saves the pressed key
Snake.prototype.initkey = function (key) {
    this.pressedKey = key;
}

Snake.prototype.safePreviousKey = function () {
    this.previousKey = this.pressedKey;
}

//Chains a SnakeElements object to the end of array, with the x and y directions
Snake.prototype.addSnakeElement = function (XSpeed, YSpeed) {
    this.shiftSnakeArray();
    this.XSpeed = XSpeed;
    this.YSpeed = YSpeed;
    this.snakeArray[this.snakeArraySlots] = new SnakeElement(this.snakeArray[this.snakeArraySlots - 1].getXsnakePos() + this.XSpeed, this.snakeArray[this.snakeArraySlots - 1].getYsnakePos() + this.YSpeed, this.context, this.RASTER_SIZE);
}

//Checks if the direction is possible and executes if true
Snake.prototype.movement = function () {
    /* key codes */
    var MOVE_UP = 38; //Arrow up
    var MOVE_RIGHT = 39; //Arrow right
    var MOVE_LEFT = 37; //Arrow left
    var MOVE_DOWN = 40; //Arrow down

    if (this.pressedKey == MOVE_UP && this.previousKey != MOVE_DOWN) {
        this.XSpeed = 0;
        this.YSpeed = -this.RASTER_SIZE;
        this.addSnakeElement(this.XSpeed, this.YSpeed);
        this.drawSnakeArray();
        this.safePreviousKey();
    }
    else if (this.pressedKey == MOVE_DOWN && this.previousKey != MOVE_UP) {
        this.XSpeed = 0;
        this.YSpeed = this.RASTER_SIZE;
        this.addSnakeElement(this.XSpeed, this.YSpeed);
        this.drawSnakeArray();
        this.safePreviousKey();
    }
    else if (this.pressedKey == MOVE_LEFT && this.previousKey != MOVE_RIGHT) {
        this.XSpeed = -this.RASTER_SIZE;
        this.YSpeed = 0;
        this.addSnakeElement(this.XSpeed, this.YSpeed);
        this.drawSnakeArray();
        this.safePreviousKey();
    }
    else if (this.pressedKey == MOVE_RIGHT && this.previousKey != MOVE_LEFT) {
        this.XSpeed = this.RASTER_SIZE;
        this.YSpeed = 0;
        this.addSnakeElement(this.XSpeed, this.YSpeed);
        this.drawSnakeArray();
        this.safePreviousKey();
    }
    else {
        this.addSnakeElement(this.XSpeed, this.YSpeed);
    }
}

//Checks for border collisions
Snake.prototype.checkBorderCollisions = function (GAME_WIDTH, GAME_HEIGHT) {
    var topBorder = this.snakeArray[this.snakeArraySlots].getYsnakePos() + this.RASTER_SIZE;
    var bottomBorder = this.snakeArray[this.snakeArraySlots].getYsnakePos();
    var leftBorder = this.snakeArray[this.snakeArraySlots].getXsnakePos() + this.RASTER_SIZE;
    var rightBorder = this.snakeArray[this.snakeArraySlots].getXsnakePos();
    if (topBorder <= 0 || bottomBorder >= GAME_HEIGHT) {
        return true;
    }
    else if (rightBorder >= GAME_WIDTH || leftBorder <= 0) {
        return true;
    }
    return false;
}

//Checks if snake ate itself
Snake.prototype.checkSnakeEatsItself = function () {
    for (var i = 0; i < this.snakeArraySlots; i++) {
        if (this.snakeArray[this.snakeArraySlots].getXsnakePos() == this.snakeArray[i].getXsnakePos() && this.snakeArray[this.snakeArraySlots].getYsnakePos() == this.snakeArray[i].getYsnakePos()) {
            this.addSnakeElement(this.XSpeed, this.YSpeed);
            return true;
        }
    }
    return false;
}

//Checks if appel was eaten
Snake.prototype.appleSnackCheck = function (XapplePos, YapplePos) {
    if (this.snakeArray[this.snakeArraySlots].getXsnakePos() == XapplePos && this.snakeArray[this.snakeArraySlots].getYsnakePos() == YapplePos){
        return true;
    }
   return false;
}

//Attaches one extra SnakeElements object to snakeArray
Snake.prototype.grow = function () {
    this.snakeArraySlots++;
    this.snakeArray[this.snakeArraySlots] = new SnakeElement(this.snakeArray[this.snakeArraySlots - 1].getXsnakePos(), this.snakeArray[this.snakeArraySlots - 1].getYsnakePos(), this.context);
}
