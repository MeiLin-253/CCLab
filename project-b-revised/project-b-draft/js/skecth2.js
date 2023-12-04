let circles = [];

function setup() {
    createCanvas(600, 400);
}

function draw() {
    background(220);

    // Display all the circles
    for (let i = 0; i < circles.length; i++) {
        circles[i].move();
        circles[i].display();
    }
}

function mousePressed() {
    // Create a new circle at the mouse position
    let newCircle = new Circle(mouseX, mouseY);
    circles.push(newCircle);
}

class Circle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 20;
        this.xSpeed = random(-5, 5);
        this.ySpeed = random(-5, 5);
    }

    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        this.ySpeed += 0.2;

        // Bounce
        if (this.x < 0 || this.x > width) {
            this.xSpeed *= -1;
        }

        if (this.y > height) {
            this.y = height;
            this.ySpeed *= -0.8;
        }
    }

    // Display the circle
    display() {
        fill(0, 150, 255);
        noStroke();
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    }
}
