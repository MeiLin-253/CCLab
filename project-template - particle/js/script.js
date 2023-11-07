// CCLab Mini Project - 9.R Particles Template

let NUM_OF_PARTICLES = 900; // Decide the initial number of particles.

let particles = [];
let moveParticles = [];
let raD = 150;
let angle = 0;
function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent("canvasWrapper");
    background(200);
    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
        let angle = (TWO_PI / 500) * i;
        let x = 300 + random(-100, 100) + raD * cos(angle);
        let y = 150 + random(-100, 100) + raD * sin(angle);
        noStroke();
        fill(255, 235, 235);
        particles[i] = new Particle(x, y, random(8, 15));
    }
    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
        noStroke();
        moveParticles.push(new moveParticle(random(0, width), 0, random(8, 10)));
        // moveParticles[i] = new moveParticles(, y, random(10, 20));
    }
}

function draw() {
    background(200);
    push();
    stroke(50, 0, 0, 100); // Brown color
    strokeWeight(75);
    line(300, 150, 300, 600);
    pop();
    // update and display
    // particles.push(new moveParticles(random(0, width), 0, random(10, 20)));
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.update();
        p.display();
        p.move();
    }

    for (let i = 0; i < particles.length; i++) {
        let p = moveParticles[i];
        p.update();
        p.display();
        p.move();
        p.reappear();
    }
}

class Particle {
    // constructor function
    constructor(startX, startY, startDia) {
        // properties: particle's characteristics
        this.x = startX;
        this.y = startY;
        this.dia = startDia;
    }
    // methods (functions): particle's behaviors
    update() {
        // (add)
    }
    display() {
        // particle's appearance
        push();
        translate(this.x, this.y);
        circle(0, 0, this.dia);
        pop();
    }
    move() {
        this.x += random(-0.5, 0.5);
    }
}

class moveParticle {
    // constructor function
    constructor(startX1, startY1, startDia1) {
        // properties: particle's characteristics
        this.x1 = startX1;
        this.y1 = startY1;
        this.dia1 = startDia1;
        this.ySpd1 = random(-1, 1);
        this.color1 = color(255, 235, 235);
        this.color2 = color(87, 66, 1);
        this.xSpd = random(-0.5, 0.5);
    }
    // methods (functions): particle's behaviors
    update() {
        // (add)
        // this.r = map(h, 0, height, 255, 0);
    }
    display() {
        // particle's appearance
        push();
        translate(this.x1, this.y1);
        const interColor = lerpColor(this.color1, this.color2, map(this.y1, 0, height, 0, 1) * 0.4);
        noStroke();
        fill(interColor);
        circle(0, 0, this.dia1);
        pop();
    }
    move() {
        this.y1 += this.ySpd1;
        this.x1 += random(-0.5, 0.5);
    }
    reappear() {
        if (this.y1 > height) {
            this.y1 = 0;
        }
    }
}
