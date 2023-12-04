let inputBox, inputText;
let letters = [];
let button;
let particles = []

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
}

function draw() {
    background(220);

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.display();
    }
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
        let p = new TextParticle(random(width), random(height), word);
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
    }
    display() {
        push();
        translate(this.x, this.y);
        circle(0, 0, this.dia);
        textAlign(CENTER, CENTER);
        textSize(15);
        text(this.letter, 0, 0);
        pop();
    }
}