let eyeHeight;
let mouseWheelPos = 0;
let img;
function setup() {
    let cvs = createCanvas(900, 600);
    cvs.parent('p5-canvas1');
}
function preload() {
    img = loadImage("../assets/brain.png");
    lullaby = loadSound("../assets/sleep.mp3");
}

function draw() {
    //play sound
    if (mouseWheelPos <= height) {
        if (lullaby.isPlaying() == false) {
            lullaby.play();
        }
    } else {
        lullaby.stop();
    }

    background(0);
    mouseWheelPos = map(getItem("scrollPos"), 0, 2000, 0, height);
    if (mouseWheelPos >= height * 0.8) {
        translate(width / 2, height / 4);
        scale(map(mouseWheelPos, height * 0.8, height, 1, 3, true));
        translate(-width / 2, -height / 4);
    }
    if (mouseWheelPos <= height * 0.1) {
        eyeHeight = map(sin(frameCount * 0.06), -1, 1, 0, 70);
    } else if (mouseWheelPos > height * 0.1 && mouseWheelPos <= height * 0.3) {
        eyeHeight = map(sin(frameCount * 0.06), -1, 1, 0, 50);
    } else if (mouseWheelPos > height * 0.3 && mouseWheelPos < height * 0.5) {
        eyeHeight = map(sin(frameCount * 0.06), -1, 1, 0, 20);
    } else if (mouseWheelPos >= height * 0.5) {
        eyeHeight = map(sin(frameCount * 0.06), -1, 1, 0, 1);
    }
    //face
    fill(245, 218, 66);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 20, 440, 420);
    //body
    fill(11, 121, 224);
    rect(width / 2, height / 2 + 300, 520, 150);
    //eyes
    fill(0);
    ellipse(width / 2 - 80, height / 2 + 20, 50, eyeHeight);
    ellipse(width / 2 + 80, height / 2 + 20, 50, eyeHeight);

    if (mouseWheelPos >= height * 0.3) {
        fill(255);
        push();
        translate(650, 200);
        rotate(-PI / 7);
        textSize(50);
        text("Z Z Z Z", 0, 0);
        fill(0);
        rect(mouseWheelPos * 0.6 + 35, -15, 200, 60);
        pop();
    }
    if (mouseWheelPos >= height * 0.7) {
        fill(0);
        ellipse(width / 2, height / 2 - 100, 300, 100);
        image(img, 370, 120, 180, 150);
    }
}
