
let canvas = document.getElementById("gameScreen");
let context = canvas.getContext("2d");

context.font = 'bold 30px sans-serif';

let scrollCounter, cameraY, current, mode, xSpeed;
let ySpeed = 5;
let height = 50;
let boxes = [];
boxes[0] = {
    x: 300,
    y: 300,
    width: 200
};
let debris = {
    x: 0,
    width: 0
};
var highscore = 0;


alert("OBJECTIVE: Stack as many rectangles as you can!" + "  " +
       "To drop the rectangle, click the mouse");

       function newBox() {
       boxes[current] = {
        x: 0,
        y: (current + 10) * height,
        width: boxes[current - 1].width
    };
}

function animate() {
    if (mode != 'gameOver') {
        context.clearRect(0, 0, canvas.width, canvas.height);

        
        for (let n = 0; n < boxes.length; n++) {
            let box = boxes[n];
            
            context.fillStyle = 'rgb(' + n * 08 + ',' + n * 08 + ',' + n * 08 + ')';
            context.fillRect(box.x, 600 - box.y + cameraY, box.width, height);
        }
        context.fillStyle = '#999999';
        context.fillRect(debris.x, 600 - debris.y + cameraY, debris.width, height);

        if (mode == 'bounce') {
            boxes[current].x = boxes[current].x + xSpeed;
            if (xSpeed > 0 && boxes[current].x + boxes[current].width > canvas.width)
                xSpeed = -xSpeed;
            if (xSpeed < 0 && boxes[current].x < 0)
                xSpeed = -xSpeed;    
        }
        if (mode == 'fall') {
            boxes[current].y = boxes[current].y - ySpeed;
            if (boxes[current].y == boxes[current - 1].y + height) {
                mode = 'bounce';
                let difference = boxes[current].x - boxes[current - 1].x;
                if (Math.abs(difference) >= boxes[current].width) {
                    gameOver();
                }
                debris = {
                    y: boxes[current].y,
                    width: difference
                };
                if (boxes[current].x > boxes[current - 1].x) {
                    boxes[current].width = boxes[current].width - difference;
                    debris.x = boxes[current].x + boxes[current].width;
                } 
                else {
                    debris.x = boxes[current].x - difference;
                    boxes[current].width = boxes[current].width + difference;
                    boxes[current].x = boxes[current - 1].x;
                }
                if (xSpeed > 0)
                   xSpeed += 0.2;
                else
                   xSpeed -= 0.2;
                current++;
                scrollCounter = height;
                newBox();      
            }
        }
        debris.y = debris.y - ySpeed;
        if (scrollCounter) {
            cameraY++;
            scrollCounter--;
        }
    }
    
var score = current - 1;
    
if (score > highscore) {
    highscore = score;
}

    context.fillStyle = '#000000';
    context.fillText('SCORE:' + score, 80, 540);
    context.fillText('HIGHSCORE:' + highscore, 520, 540);

function gameOver() {
       mode = 'gameOver';
       context.fillStyle = '#000000';
       context.fillText('Game Over!! Click to play again!', 170, 50);
}

    window.requestAnimationFrame(animate);
}
    

function restart() {
    boxes.splice(1, boxes.length - 1);
    mode = 'bounce';
    cameraY = 0;
    scrollCounter = 0;
    xSpeed = 2;
    current = 1;
    newBox();
    debris.y = 0;
}

canvas.onpointerdown = function() {
    if (mode == 'gameOver')
       restart();
    else{
        if (mode == 'bounce')
        mode = 'fall';
    }
};

restart();
animate();