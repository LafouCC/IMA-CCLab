let c;
let mouseWheelPos = 0;
let p;
let soundPLay1 = false;
// let swtch = document.getElementById("switch");
// console.log(swtch);

function setup() {
    p = new Person(16);
    rectMode(CENTER);
    let cvs = createCanvas(900, 600);
    cvs.parent('p5-canvas4');
    c = new Creature("#000000", "#FFFFFF");
}
function preload() {
    aaaSound = loadSound("../assets/aaa.mp3");
}

function draw() {
    //sound
    if (mouseWheelPos > 0 && mouseWheelPos < height) {
        if (soundPLay1 == false) {
            aaaSound.play();
            soundPLay1 = true;
        }
    } else {
        soundPLay1 = false;
    }
    background(0);
    //console.log(swtch.checked);
    mouseWheelPos = map(getItem("scrollPos"), 6500, 8000, 0, height, true);
    c.update();
    c.display();
    textPopUp();
}
function textPopUp() {
    fill(255);
    textSize(25);
    push();
    rotate(-PI / 10);
    text("Don't eat me !", width * 0.3, height * 0.5);
    text("Aaaaa~", width * 0.3, height * 0.55);
    fill(0);
    rect(width * 0.35 + mouseWheelPos * 0.22, height * 0.54, 150, 25);
    pop();
    textSize(20);
    text("<scroll down to continue>", width * 0.4, height * 0.9);
}


class Creature {
    constructor(colShape, colStroke) {
        this.colShape = colShape;
        this.colStroke = colStroke;
        this.eyeX = -50;
        this.eyeY = -20;
    }
    update() {
        this.mouthY = map(mouseWheelPos, 0, height, 60, 80, true);
        this.headAngle = map(mouseWheelPos, 0, height, 0, -PI / 13, true);
        this.eyeX = map(mouseWheelPos, 0, height, -50, -36, true);
        this.eyeY = map(mouseWheelPos, 0, height, -20, -6, true);
    }
    display() {
        push();

        translate(150, 200);

        //head
        push();
        rotate(this.headAngle);
        stroke(this.colStroke);
        strokeWeight(2);
        fill(this.colShape);
        ellipse(0, 0, 260, 250);
        //eyes
        fill(255);
        ellipse(50, -20, 60, 60);
        ellipse(-50, -20, 60, 60);
        fill(0);
        push();
        translate(this.eyeX, this.eyeY);
        ellipse(0, 0, 20, 20);
        pop();
        push();
        noStroke();
        translate(50, -20);
        rotate(PI / 6);
        rect(0, 0, 10, 50);
        rotate((4 * PI) / 6);
        rect(0, 0, 10, 50);
        pop();
        //mouth
        fill(this.colStroke);
        beginShape();
        curveVertex(70, 30);
        curveVertex(70, 30);
        curveVertex(50, this.mouthY);
        curveVertex(-20, this.mouthY);
        curveVertex(-50, 50);
        curveVertex(-50, 50);
        endShape();
        //right arm
        push();
        rotate(-PI / 20);
        translate(100, 110);
        rotate(-PI / 20);
        rotate(this.headAngle * 3);
        fill(0);
        arc(0, 0, 100, 175, -PI / 2.5, PI / 1.1); //outer
        noFill();
        arc(0, 0, 30, 90, -PI / 2.2, PI * 1.3); //inner
        fill(0);
        arc(18, -55, 35, 40, -PI * 1.4, -PI / 4);
        //you
        push();
        p.update();
        p.display(20, -80);
        pop();
        pop();

        pop();
        //left arm
        push();
        stroke(this.colStroke);
        strokeWeight(2);
        noFill();
        translate(-90, 180);
        rotate(PI / 15);
        arc(0, 0, 90, 200, 0, PI * 1.4);
        pop();
        //body
        push();
        stroke(this.colStroke);
        strokeWeight(2);
        fill(0);
        translate(0, 200);
        arc(0, 0, 250, 350, -PI / 3.7, (PI * 5.1) / 4);
        pop();

        pop();
    }

}
class Person {
    constructor(size) {
        this.size = size;
        this.x = 0;
        this.y = 0;
    }
    update() {
        this.armAngle = 40 + map(sin(frameCount * 0.3), -1, 1, 1.5, 2);
        this.eyeHeight = map(sin(frameCount * 0.3), -1, 1, 0, this.size * 0.2);
    }
    display(x, y) {
        push();
        translate(x, y);
        fill(255, 0, 0);
        circle(0, 0, 10);
        stroke(0);
        fill(245, 218, 66);//yellow
        rectMode(CENTER);
        rect(0, 0, this.size, this.size);

        //left arm
        push();
        translate(-this.size * 0.75, this.size * 0.8);
        rotate(this.armAngle)
        rect(0, 0, this.size * 0.3, this.size * 0.8);
        pop();

        //right arm
        push();
        translate(this.size * 0.75, this.size * 0.8);
        rotate(-this.armAngle)
        rect(0, 0, this.size * 0.3, this.size * 0.8);
        pop();

        fill(11, 121, 224);//green
        rect(0, this.size * 1, this.size * 1.3, this.size * 1.2);
        fill(39, 133, 23);//blue
        rect(-this.size * 0.3, this.size * 1.8, this.size * 0.7, this.size * 0.7);
        rect(this.size * 0.3, this.size * 1.8, this.size * 0.7, this.size * 0.7);
        fill(0);//black
        arc(0, this.size * 2.5, this.size * 0.6, this.size * 1.3, -PI * 0.7, -PI * 0.3, CHORD);
        ellipse(this.size * 0.2, 0, this.size * 0.1, this.eyeHeight);
        ellipse(-this.size * 0.2, 0, this.size * 0.1, this.eyeHeight);
        pop();
    }

}