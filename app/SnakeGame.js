var game = (function () {
    var privateContext;
    var privateCanvas;

    var snakeTheme = new Audio("sound/street_fighter.mp3");
    var appleSoundEffect = new Audio("sound/intervention.mp3");

    // Constants
    var GAME_WIDTH;
    var GAME_HEIGHT;
    var RASTER_SIZE = 10; // i.e. size of snake elements and apples

    /* true = game is on(no collision happend) | false = game is off(collision happend) */
    this.gameStatus = false;
    this.gameStatusCounter = 0; // Counter to check if game was already started once
    var snake;
    var apple;
    var counter;

    //Variables for controlling the framerate
    var FPS = 10; //Framerate
    var now;
    var then = Date.now();
    var interval = 1000 / FPS;
    var delta;
    // Draws the canvas
    function privateDraw() {
        if (gameStatus == true) {
            window.requestAnimationFrame(privateDraw);
        }

        now = Date.now();
        delta = now - then;
        if (delta > interval) {
            then = now - (delta % interval);
            //Draw and check collisions here
            snakeTheme.play();

            clearFullCanvas();
            apple.createApple();
            captureKeystrokesSnake();
            snake.movement();
            snake.drawSnakeArray();

            if (snake.checkBorderCollisions(GAME_WIDTH, GAME_HEIGHT) == true) {
                setGameStatusFalse();
            }

            if (snake.checkSnakeEatsItself() == true) {
                setGameStatusFalse();
            }

            snackCheck();
            counter.drawCounter();
        }
    }

    //Changing by collision gameStatus on false & makes game rdy
    function setGameStatusFalse() {
        gameStatusCounter++;
        snakeTheme.pause();
        snakeTheme.load();
        startGameScreen();
    }

    function startGameScreen() {
        clearFullCanvas();
        if(gameStatusCounter > 0) {
            drawOverlayGameOver();
        }
        drawOverlayStart();
        captureKeystrokesForNewGame();
    }

    //Checks constantly if apple was snacked
    function snackCheck() {
        if (snake.appleSnackCheck(apple.getXapplePos(), apple.getYapplePos()) == true) {
            counter.addScore();
            //appleSoundEffect.play(); //Comment out if sound effect is wanted
            snake.grow();
            apple.drawNewApple();
        }
    }

    //Cleans canvas
    function clearFullCanvas() {
        privateContext.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }

    //Creates overlay at the beginning
    function drawOverlayStart() {
        privateContext.font = "18px Courier New";
        privateContext.fillStyle = "white";
        privateContext.textAlign = "center";
        privateContext.fillText("Press esc to start snake", GAME_WIDTH / 2, GAME_HEIGHT / 2);
    }

    //Overlay for gameStatus == false
    function drawOverlayGameOver() {
        privateContext.font = "35px Arial Black";
        privateContext.fillStyle = "white";
        privateContext.textAlign = "center";
        privateContext.fillText("Game Over.", GAME_WIDTH / 2, GAME_HEIGHT * 0.35);
    }

    //Catches which button was pressed for the movement
    function captureKeystrokesSnake() {
        //bring canvas into focus to capture key strokes
        canvas.focus();
        addEventListener("keydown", function (keyEvent) {
            snake.initkey(keyEvent.keyCode);
        });
    }

    //Catches esc button to restart game
    function captureKeystrokesForNewGame() {
        var ESC = 27; //Esc Taste

        canvas.focus();
        gameStatus = false;
        addEventListener("keydown", function (keyevent) {
            var pressedkey = keyevent.keyCode;
            if (pressedkey == ESC) {
                gameStatus = true;
                privateStartGame();
            }
        });
    }

    //Sets canvas and context as varibles
    function privateSetContext(canvas) {
        privateCanvas = canvas;
        privateContext = canvas.getContext("2d");
    }

    /* Todo: Call this function only after player has pressed the start key */
    function privateStartGame() {
        /* Todo: initialize objects (i.e. apple, snake, counter) here */
        apple = new Apple(privateContext, GAME_WIDTH, GAME_HEIGHT, RASTER_SIZE);
        snake = new Snake(privateContext, RASTER_SIZE);
        counter = new Counter(privateContext, GAME_WIDTH, GAME_HEIGHT);
        window.requestAnimationFrame(privateDraw);
    }

    function publicInit(canvas) {
        GAME_HEIGHT = canvas.height;
        GAME_WIDTH = canvas.width;
        privateSetContext(canvas);
        startGameScreen();
    }
    return {
        init: publicInit
    };
})();
