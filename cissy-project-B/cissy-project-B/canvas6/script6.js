let person;
let ripples = [];
let mouseWheelPos = 0;
let posX;
let posY;
let rotateAngle = 0;
let radius = 250;
let soundPLay3 = false;

function setup() {
    let cvs = createCanvas(900, 600);
    cvs.parent("p5-canvas6");
    angleMode(DEGREES);
    person = new Person(50);
}

function preload() {
    fall2Sound = loadSound("../assets/fall2.wav");
}

function draw() {
    //sound
    if (mouseWheelPos > 0 && mouseWheelPos < height) {
        if (soundPLay3 == false) {
            fall2Sound.play();
            soundPLay3 = true;
        }
    } else {
        soundPLay3 = false;
    }

    mouseWheelPos = map(getItem("scrollPos"), 9800, 12000, 0, height, true);
    stroke(255);
    if (frameCount % 15 == 0) {
        ripples.push(new Ripple(20));
    }
    background(0);

    for (let i = 0; i < ripples.length; i++) {
        ripples[i].update();
        ripples[i].display();
    }
    while (ripples.length > 10) {
        ripples.splice(0, 1);
    }
    //person falling down
    if (mouseWheelPos > height * 0.1) {
        personFall();
    } else {
        rotateAngle = 0;
        radius = 250;
    }

    //text
    fill(0);
    noStroke();
    rect(0, 0, 900, 30);
    rect(0, 570, 900, 30);
    fill(255);
    textSize(15);
    text("<scroll down to continue>", 350, 15);
}
function personFall() {
    rotateAngle += PI * 0.6;
    radius -= 0.8;
    posX = sin(frameCount * 3) * constrain(radius, 0, 250);
    posY = cos(frameCount * 3) * constrain(radius, 0, 250);
    push();
    translate(posX + width / 2, posY + height / 2);
    rotate(rotateAngle);
    person.update(map(radius, 250, 0, 50, 6, true));
    person.display(0, 0);
    pop();
}
class Ripple {
    constructor(size) {
        this.radius = size;
        this.xoff = 0;
        this.a = 0;
        this.strokeW = 0.05;
    }
    update() {
        this.radius += this.a;
        this.a += 0.08;
        this.strokeW += 0.05;
    }
    display() {
        beginShape();
        noFill();
        strokeWeight(this.strokeW);
        for (let angle = 0; angle < 361; angle += 5) {
            this.xoff += 0.8;
            this.Xnoise = noise(this.xoff) * map(mouseWheelPos, 0, height, 0, 40, true);
            vertex(
                width / 2 + sin(angle) * this.radius,
                height / 2 + cos(angle) * this.radius + this.Xnoise
            );
        }
        endShape();
    }
}
class Person {
    constructor(size) {
        this.size = size;
        this.x = 0;
        this.y = 0;
    }
    update(sizeUpdate) {
        this.armAngle = 40 + map(sin(frameCount * 0.2), -1, 1, 1.5, 1.9);
        this.eyeHeight = map(sin(frameCount * 0.1), -1, 1, 0, this.size * 0.2);
        this.size = sizeUpdate;
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



