let inputBox, inputText;
let letters = [];
let button;
let particles = [];
let clr;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("canvas-container");

    inputBox = createInput();
    inputBox.parent("interface-container");
    inputBox.id("text-box");

    button = createButton('Submit');
    button.parent("interface-container");
    button.id("submit-button");
    button.mousePressed(submitText);
    // clr = color(0, random(255), random(255));
}

function draw() {
    background(220);

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.display();
        p.move();
    }
    // if (monusePressed == true) {
    //     for (let i = 0; i < particles.length; i++) {
    //         let p = particles[i];
    //         p.move();
    //     }
    // }
}

function keyPressed() {
    if (keyCode === ENTER) {
        submitText();
    }
}

function submitText() {
    inputText = inputBox.value();
    let words = inputText.split(' ');
    console.log("Submitted text:", words);

    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        let p = new TextParticle(random(width), random(height - 100), word);
        particles.push(p);
    }

    // Clear the text
    inputBox.value("");
}

class TextParticle {
    constructor(x, y, word) {
        this.x = x;
        this.y = y;
        this.dia = 100;
        this.letter = word;
        this.xSpeed = random(-3, 3);
        this.ySpeed = random(-3, 3);
        //
        // this.isClicked = false;
    }
    display() {
        push();
        translate(this.x, this.y);
        noStroke();
        fill(0, 100);
        circle(0, 0, this.dia);
        textAlign(CENTER, CENTER);
        textSize(40);
        text(this.letter, 0, 0);
        pop();
    }
    checkMouse() {
        // check the distance
        // if statement
        // true
        // this.isClicked = true
        // get the example code "Circle Button"
    }
    move() {
        //if (this.isClicked == true) {
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
        // }
    }
}