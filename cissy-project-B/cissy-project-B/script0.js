let p;
function setup() {
    let cvs = createCanvas(200, 200);
    cvs.parent("p5-canvas0");
    p = new Person(30);
}
function preload() {
    hiSound = loadSound("assets/hey.mp3");
}

function draw() {
    //sound play
    if (frameCount % 200 == 0 || frameCount == 20) {
        hiSound.play();
    }

    background(0);
    p.update();
    p.display(width / 2, height / 2);
    fill(255);
    noStroke();
    textSize(20);
    text("Hey, I'm Steve.", 40, 60);
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
        ellipse(0, this.size * 2.5, this.size * 0.6, this.size * 1.3);
        ellipse(this.size * 0.2, 0, this.size * 0.1, this.eyeHeight);
        ellipse(-this.size * 0.2, 0, this.size * 0.1, this.eyeHeight);
        pop();
    }
}
