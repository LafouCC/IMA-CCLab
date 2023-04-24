let i = 0;
let col = "#f0f0f0";
let xoff = 0.0;
let yoff = 10000.0;
let myColor = ["#000000", "#474747", "#303030", "#1c1a1a"];
let theColor = "#FFFFFF";
let num;
let ball_x;
let ball_y;
let dx1; // distance between buunyLeftEye and ball
let dx2; // distance between buunyRightEye and ball
let x1 = 245; //left eyeball x
let x2 = 352; //left eyeball x

function setup() {
    let cvs = createCanvas(600, 600);
    cvs.parent("p5-canvas");
    angleMode(DEGREES);
    num = floor(random(myColor.length));
    theColor = myColor[num];
}

function draw() {
    background(col);
    ball_x = map(noise(xoff * 0.05), 0, 1, 0, width);
    ball_y = map(noise(yoff * 0.05), 0, 1, 0, height * 0.55);
    drawCreatureBall(ball_x, ball_y);
    drawCreatureBunny(width / 2, height / 2);
    xoff += 0.25;
    yoff += 0.15;
}

function lightup() {
    if (i % 2 == 0) {
        col = "#f0f0f0";
    } else {
        col = "#000000"
    }
    i++;
}

function drawCreatureBall(x, y) {
    push();
    translate(x, y);
    ball_body(0, 0);
    ball_eyes(9, -2); //right eye
    ball_eyes(-9, -2); //left eye
    pop();
}

function ball_body(x, y) {
    push();
    translate(x, y);
    stroke(theColor);
    for (let i = 0; i < 360; i += 4) {
        strokeWeight(random(1.2, 1.3));
        let amp = random(28, 30);
        let a = sin(i) * amp;
        let b = cos(i) * amp;
        line(0, 0, a, b);
    }
    pop();
}

function ball_eyes(x, y) {
    push();
    translate(x, y);
    fill(255);
    ellipse(0, 0, random(16, 17), 18);
    fill(0);
    circle(map(noise(xoff), 0, 1, -5, 5), map(noise(yoff), 0, 1, -2, 2), 6);
    pop();
}

function drawCreatureBunny(x, y) {
    push();
    translate(x, y);
    bunny_ear(35, -7, 15, 3, map(ball_y, 0, height * 0.55, 50, 0));
    bunny_ear(-35, -7, 165, -3, map(ball_y, 0, height * 0.55, 50, 0));//rotation center + starting angle + speed + range
    bunny_body(0, 0);
    pop();

    bunny_eyes();
    bunny_eyes();
}

function bunny_body(x, y) {
    push();
    translate(x, y);

    //body
    fill(0);
    ellipse(0, 480, 600, 800);

    //head
    push();
    rotate(35);
    ellipse(-10, 80, 100, 150);
    fill(240);
    ellipse(-10, 80, 43, 50); //left eye socket
    rotate(-70);
    fill(0);
    ellipse(10, 80, 100, 150);
    fill(240);
    ellipse(10, 80, 43, 50); //right eye socket
    pop();
    ellipse(0, 60, 40, 40);

    //teeth
    fill(240);
    for (let i = 0; i < 3; i++) {
        arc(-20 + i * 20, 120, 20, 40, 0, 180);
    }
    pop();
}

function bunny_ear(x, y, a, s, range) {
    let rotaAngle = a + sin(frameCount * s) * range;
    push();
    translate(x, y);
    fill(0);
    rotate(rotaAngle);
    ellipse(125, 0, 250, 50);
    pop();

}

function bunny_eyes() {
    fill(0);
    dx = ball_x - x1;
    if (x1 <= 260 && x1 >= 235) {
        x1 += dx * 0.005;
    } else if (x1 < 235) {
        x1 = 235;
    } else if (x1 > 260) {
        x1 = 260;
    }
    circle(x1, 350, 15);

    dx2 = ball_x - x2;
    if (x2 <= 364 && x2 >= 340) {
        x2 += dx * 0.005;
    } else if (x2 < 340) {
        x2 = 340;
    } else if (x2 > 364) {
        x2 = 364;
    }
    circle(x2, 350, 15);
}
