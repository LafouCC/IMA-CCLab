let eyeHeight;
let mouseWheelPos = 0;
let img;
function setup() {
    let cvs = createCanvas(900, 600);
    cvs.parent("p5-canvas7");
}

function draw() {
    mouseWheelPos = map(getItem("scrollPos"), 12000, 13500, 0, height, true);
    background(0);
    noStroke();
    fill(255);
    textSize(15);
    text("<scroll down to continue>", 350, 30);
    if (mouseWheelPos <= height * 0.1) {
        eyeHeight = map(sin(frameCount * 0.1), -1, 1, 0, 1);
    } else if (mouseWheelPos > height * 0.1 && mouseWheelPos <= height * 0.3) {
        eyeHeight = map(sin(frameCount * 0.1), -1, 1, 0, 20);
    } else if (mouseWheelPos > height * 0.3 && mouseWheelPos < height * 0.5) {
        eyeHeight = map(sin(frameCount * 0.1), -1, 1, 0, 50);
    } else if (mouseWheelPos >= height * 0.5) {
        eyeHeight = map(sin(frameCount * 0.1), -1, 1, 0, 70);
    }

    //face
    stroke(0);
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

    //text 
    if (mouseWheelPos >= height * 0.6) {
        textPopUp();
    }
}

function textPopUp() {
    push();
    translate(500, 100);
    rotate(PI / 30);
    noStroke();
    fill(255);
    textSize(25);
    text("Phew~ It's just a dream", 0, 0);
    pop();
}



