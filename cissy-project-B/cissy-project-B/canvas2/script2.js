let mouseWheelPos = 0;
let p;
let posX = 450;
let posY = 300;

function setup() {
    let cvs = createCanvas(900, 600);
    cvs.parent('p5-canvas2');
    p = new Person(60);
}

function draw() {
    background(0);
    guide();
    p.update();
    p.display(posX, posY);
    constrainPerson();
    textPopUp();
    movePerson();
}

function constrainPerson() {
    if (posX > width * 0.9) {
        posX = width * 0.9;
    } else if (posX <= width * 0.1) {
        posX = width * 0.1;
    }
    if (posY > height * 0.8) {
        posY = height * 0.8;
    } else if (posY <= height * 0.1) {
        posY = height * 0.1;
    }
}
function textPopUp() {
    fill(255);
    textSize(20);
    if (getItem("display1") && getItem("display2") && getItem("display3")) {
        text("<scroll down to continue>", width * 0.4, height * 0.9);
    } else { text("use your mouse to guide Steve to explore around", 250, 30); }

    if (posX >= width * 0.6) {
        text("Anyone there?", posX, posY * 0.9);
        storeItem("display2", true);
    } else if (posX <= width * 0.4) {
        text("Hello, anyone?", posX, posY * 0.9);
        storeItem("display3", true);
    } else {
        text("where am I ?", posX, posY * 0.9);
        storeItem("display1", true);
    }
}
function movePerson() {
    let dx = mouseX - posX;
    let dy = mouseY - posY;
    if (dx >= 10) {
        posX += 2;
    } else if (dx <= -10) {
        posX -= 2;
    } else {
        posX += 0;
    }
    if (dy >= 10) {
        posY += 2;
    } else if (dy <= -10) {
        posY -= 2;
    } else {
        posY += 0;
    }
}
function guide() {
    colorMode(HSB, 100);
    noStroke();
    for (let i = 0; i < 50; i++) {
        fill(31, 0, i * 2);
        circle(mouseX, mouseY, 50 - i);
    }
    colorMode(RGB, 255);
    stroke(0);
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
        fill(11, 121, 224); //green
        rect(0, this.size * 1, this.size * 1.3, this.size * 1.2);
        fill(39, 133, 23); //blue
        rect(-this.size * 0.3, this.size * 1.8, this.size * 0.7, this.size * 0.7);
        rect(this.size * 0.3, this.size * 1.8, this.size * 0.7, this.size * 0.7);
        fill(0); //black
        arc(0, this.size * 2.5, this.size * 0.6, this.size * 1.3, -PI * 0.7, -PI * 0.3, CHORD);
        ellipse(this.size * 0.2, 0, this.size * 0.1, this.eyeHeight);
        ellipse(-this.size * 0.2, 0, this.size * 0.1, this.eyeHeight);
        pop();
    }
}
