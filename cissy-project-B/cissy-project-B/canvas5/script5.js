let p;
let posX = 450;
let posY = 0;
let mouseWheelPos = 0;
let angle;
let angleAdd;
let xoff = 0;
let t = 0;
let soundPLay2 = false;

function setup() {
    let cvs = createCanvas(900, 600);
    cvs.parent("p5-canvas5");
    p = new Person(60);
    angle = -PI * 0.2;
    angleAdd = -PI / 400;
}

function preload() {
    fallSound = loadSound("../assets/fall.mp3");
}

function draw() {
    //sound
    if (mouseWheelPos > 0 && mouseWheelPos < height) {
        if (soundPLay2 == false) {
            fallSound.play();
            soundPLay2 = true;
        }
    } else {
        soundPLay2 = false;
    }
    background(0);
    mouseWheelPos = map(getItem("scrollPos"), 8500, 9500, 0, height, true);
    push();
    translate(posX, posY);
    posX = width / 2;
    if (mouseWheelPos < height * 0.5 && mouseWheelPos > 0) {
        t += 1;
        posY = constrain(t * t * 0.1, 0, height / 2);
        if (angle > -PI * 0.45) {
            angle += angleAdd;
        } else {
            //
        }
    } else {
        t = 0;
        posY = map(mouseWheelPos, height * 0.5, height, height / 2, height);
    }
    rotate(angle + map(noise(xoff), 0, 1, -PI / 20, PI / 5));
    xoff += 0.02;
    p.update();
    p.display(0, 0);
    pop();

    //text
    push();
    noStroke();
    fill(255);
    textSize(20);
    if (posY >= height * 0.5) {
        textSize(15);
        text("<scroll down to continue>", 350, 50);
    }
    translate(posX, posY);
    rotate(-PI / 6);
    textSize(20);
    text("Aaaaa~~", -10, -60);
    pop();
    //the line
    stroke(255);
    strokeWeight(2);
    line(250, 0, 250, height);
    line(650, 0, 650, height);

}

class Person {
    constructor(size) {
        this.size = size;
        this.x = 0;
        this.y = 0;
    }
    update() {
        this.armAngle = 40 + map(sin(frameCount * 0.2), -1, 1, 1.5, 1.9);
        this.eyeHeight = map(sin(frameCount * 0.1), -1, 1, 0, this.size * 0.2);
    }
    display(x, y) {
        push();
        strokeWeight(1);
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
        arc(
            0,
            this.size * 2.5,
            this.size * 0.6,
            this.size * 1.3,
            -PI * 0.7,
            -PI * 0.3,
            CHORD
        );
        ellipse(this.size * 0.2, 0, this.size * 0.1, this.eyeHeight);
        ellipse(-this.size * 0.2, 0, this.size * 0.1, this.eyeHeight);
        pop();
    }
}


