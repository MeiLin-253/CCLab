let angles = [];
let amp = [];
let lengths = [];
let speeds = [];
let colors = [];
let circles = [];
let clr = [];
let txt = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("canvas-container");

    for (let i = 0; i < 8; i++) {
        angles[i] = 0;
        amp[i] = random(20, 80);
        lengths[i] = 200;
        speeds[i] = random(0.01, 0.03);
        colors[i] = color(255, random(220), random(255), 150);
    }

    // Initialize circles with unique colors and texts
    clr = [
        color(251, 164, 74),
        color(233, 31, 31),
        color(125, 119, 119),
        color(113, 58, 255),
        color(17, 5, 55),
        color(37, 82, 123),
        color(34, 0, 120),
        color(255, 226, 141),
        color(144, 193, 122),
        color(234, 153, 153),
    ];
    txt = [
        "joy",
        "anger",
        "boredom",
        "anxiety",
        "fear",
        "sadness",
        "regret",
        "chill",
        "calm",
        "surprise",
    ];

    for (let i = 0; i < 10; i++) {
        circles.push(new Circle(clr[i], txt[i]));
    }
}

function draw() {
    background(255, 242, 204);

    // Draw multiple waves
    for (let i = 0; i < angles.length; i++) {
        drawWave(angles[i], amp[i], lengths[i], speeds[i], colors[i]);
        angles[i] += speeds[i];
    }

    // Update and display circles
    for (let i = 0; i < circles.length; i++) {
        circles[i].update();
        circles[i].display();
    }
}

function drawWave(angle, amp, length, speed, waveColor) {
    noFill();
    stroke(waveColor);

    beginShape();
    for (let x = 0; x < width; x += 8) {
        let y = sin(angle + x / length) * amp + height / 2;
        strokeWeight(random(3, 8));
        vertex(x, y);
    }
    endShape();
}

class Circle {
    constructor(circleColor, circleText) {
        this.x = random(width);
        this.y = random(height);
        this.radius = random(40, 80);
        this.xSpeed = random(-1.5, 1.5);
        this.ySpeed = random(-1.5, 1.5);
        this.color = circleColor;
        this.text = circleText;
    }

    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        // Bounce
        if (this.x < 0 || this.x > width) {
            this.xSpeed *= -1;
        }
        if (this.y < 0 || this.y > height) {
            this.ySpeed *= -1;
        }
    }

    display() {
        fill(red(this.color), green(this.color), blue(this.color), 180);
        noStroke();
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);

        fill(255);
        strokeWeight(10);
        textAlign(CENTER);
        text(this.text, this.x, this.y);
    }
}
