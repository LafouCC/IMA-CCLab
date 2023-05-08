let p;
let posX = 460;
let posY = 350;
let mouseWheelPos = 0;
function setup() {
    let cvs = createCanvas(900, 600);
    cvs.parent('p5-canvas3');
    p = new Person(60);
}
function preload() {
    humSound = loadSound("../assets/hum.wav");
    screamSound = loadSound("../assets/scream.wav");
}

function draw() {
    //sound
    if (mouseWheelPos > 0 && mouseWheelPos < height * 0.5) {
        if (humSound.isPlaying() == false && frameCount % 50 == 0) {
            humSound.play();
        }
    } else if (mouseWheelPos > height * 0.5 && mouseWheelPos < height) {
        if (screamSound.isPlaying() == false && frameCount % 50 == 0) {
            screamSound.play();
        }
    }

    background(0);
    mouseWheelPos = map(getItem("scrollPos"), 3500, 6000, 0, height);
    fill(255);
    stroke(0);
    textSize(20);
    text("<scroll down to continue>", width * 0.4, height * 0.1);
    stroke(255);
    push();
    translate(100, 600);
    scale(6);
    rotate(map(mouseWheelPos, height * 0.2, height, PI / 2, 0, true));
    //rotate(this.headAngle * 3);
    fill(0);
    arc(0, 0, 100, 175, -PI / 2.75, PI * 0.5); //outer
    noFill();
    arc(0, 0, 30, 90, -PI / 2.2, PI * 0.5); //inner
    fill(0);
    arc(18, -55, 35, 40, -PI * 1.4, -PI / 4);
    pop();
    push();
    translate(100, 600);
    rotate(map(mouseWheelPos, height * 0.45, height, 0, -PI / 4, true));
    translate(-100, -600);
    p.update();
    p.display(posX, posY);
    fill(255);
    stroke(0);
    if (mouseWheelPos > height * 0.5) {
        translate(100, 600);
        rotate(PI / 20);
        translate(-100, -600);
        text("Wait~ Put Me Down !", posX - 100, posY - 100);
    } else {
        text("Hmmm.. Nothing's here", posX + 30, posY - 50);
    }
    pop();
}

class Person {
    constructor(size) {
        this.size = size;
        this.x = 0;
        this.y = 0;
    }
    update() {
        this.armAngle = 40 + map(sin(frameCount * 0.1), -1, 1, 1.5, 1.9);
        this.eyeHeight = map(sin(frameCount * 0.05), -1, 1, 0, this.size * 0.2);
    }
    display(x, y) {
        push();
        translate(x, y);
        stroke(0);
        fill(245, 218, 66); //yellow
        rectMode(CENTER);
        rect(0, 0, this.size, this.size);
        //left arm
        push();
        translate(-this.size * 0.75, this.size * 0.8);
        rotate(this.armAngle);
        rect(0, 0, this.size * 0.3, this.size * 0.8);
        pop();
        //right arm
        push();
        translate(this.size * 0.75, this.size * 0.8);
        rotate(-this.armAngle);
        rect(0, 0, this.size * 0.3, this.size * 0.8);
        pop();
        fill(11, 121, 224); //blue
        rect(0, this.size * 1, this.size * 1.3, this.size * 1.2);
        fill(39, 133, 23); //green
        rect(-this.size * 0.3, this.size * 1.8, this.size * 0.7, this.size * 0.7);
        rect(this.size * 0.3, this.size * 1.8, this.size * 0.7, this.size * 0.7);
        fill(0); //black
        arc(0, this.size * 2.5, this.size * 0.6, this.size * 1.3, -PI * 0.7, -PI * 0.3, CHORD);
        ellipse(this.size * 0.2, 0, this.size * 0.1, this.eyeHeight);
        ellipse(-this.size * 0.2, 0, this.size * 0.1, this.eyeHeight);
        pop();
    }
}
