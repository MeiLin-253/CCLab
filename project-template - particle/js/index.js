let seq = 0;
let dia;
let diaSpeed;
let flodia1 = 0;
let flodia2 = 0;
let flodia3 = 0;
let x = [];
let y = [];
let xSpd = [];
let ySpd = [];
let cirdia = [];
let cirdiaSpd = [];
let cirW = [];
let cirA = [];
let total;
let clr;
let targetClr;

function setup() {
    createCanvas(450, 450);
    noStroke(0);
    fill(0, 3);
    dia = 10;
    circle(width / 2, height / 2, dia);
    diaSpeed = 0.5;
    total = 300;
    clr = color(255, 255, 255);
    targetClr = color(255, 244, 224);

    resetParticles(10000);

}

function mousePressed() {
    let distance = dist(mouseX, mouseY, width / 2, height / 2);
    resetParticles(distance);
}

function resetParticles(distance) {
    for (let i = 0; i < total; i++) {
        let angle = map(i, 0, total - 1, 0, PI * 2);

        x[i] = width / 2 + cos(angle) * distance;
        y[i] = height / 2 + sin(angle) * distance;

        let mag = random(-0.1, 0.5);

        let spdX = cos(angle) * mag;
        let spdY = sin(angle) * mag;

        xSpd[i] = spdX;
        ySpd[i] = spdY;
        cirdia[i] = random(1, 8);
        cirW[i] = random(255);
        cirA[i] = 255;
    }
}

function draw() {
    background(230);

    clr = lerpColor(clr, targetClr, 0.010); // ***

    noStroke(0);
    fill(0, 170);
    circle(width / 2, height / 2, dia);

    dia = dia + diaSpeed;
    if (dia >= width || dia < 0) {
        diaSpeed = diaSpeed * -1;
        seq++;
    }
    flodia1 = map(sin(frameCount * 0.01) * 5, -1, 1, 3, 14);
    flodia2 = map(sin(frameCount * 0.01) * 5, -1, 1, 13, 23);
    flodia3 = map(sin(frameCount * 0.01) * 5, -1, 1, 23, 33);

    push();
    if (seq == 0) {
        targetClr = color(255, 207, 120);
        fill(clr);
        flower1(width / 2, height / 2, 40, 16, flodia1);
        fill(red(clr) - 10, green(clr) - 10, blue(clr));
        flower1(width / 2, height / 2, 80, 15, flodia2);
        fill(red(clr) - 20, green(clr) - 20, blue(clr));
        flower1(width / 2, height / 2, 140, 15, flodia3);
    } else if (seq == 1) {
        targetClr = color(153, 0, 0);
        fill(clr);
        flower2(width / 2, height / 2, 40, 16, flodia1);
        fill(red(clr) - 10, green(clr), blue(clr));
        flower2(width / 2, height / 2, 80, 15, flodia2);
        fill(red(clr) - 20, green(clr), blue(clr));
        flower2(width / 2, height / 2, 140, 15, flodia3);
    } else if (seq == 2) {
        targetClr = color(234, 153, 153);
        flower3(width / 2, height / 2, 40, 16, flodia1);
        flower3(width / 2, height / 2, 80, 15, flodia2);
        flower3(width / 2, height / 2, 140, 15, flodia3);
    } else if (seq == 3) {
        targetClr = color(51, 1, 184);
        flower4(width / 2, height / 2, 40, 16, flodia1);
        flower4(width / 2, height / 2, 80, 15, flodia2);
        flower4(width / 2, height / 2, 140, 15, flodia3);
    } else if (seq >= 4) {
        flower(width / 2, height / 2, 40, 16, flodia1);
        flower(width / 2, height / 2, 80, 15, flodia2);
        flower(width / 2, height / 2, 140, 15, flodia3);
    }
    pop();

    // update and draw particles
    for (let i = 0; i < total; i++) {
        x[i] += xSpd[i];
        y[i] += ySpd[i];
        noStroke();
        fill(cirW[i], cirA[i]);
        circle(x[i], y[i], cirdia[i]);

        cirA[i] -= 0.5;
        if (cirA[i] < 0) {
            cirA[i] = 0;
        }
    }

}

function flower(x, y, radius, petals, flowerdia) {
    push();
    noStroke();
    for (let i = 0; i <= petals; i++) {
        let angle = ((PI * 2) / petals) * i;
        let petalX = x + cos(angle) * radius;
        let petalY = y + sin(angle) * radius;
        noStroke();
        fill(0);
        circle(petalX, petalY, flowerdia);
        strokeWeight(3);
        stroke(255, 200);
        noFill();
        circle(petalX, petalY, flowerdia * 1.5);
    }
    pop();
}

function flower1(x, y, radius, petals, flowerdia) {
    push();
    noStroke();
    translate(x, y);
    for (let i = 0; i <= petals; i++) {
        let angle = ((PI * 2) / petals) * i;
        push();
        rotate(angle);
        let petalX = radius;
        let petalY = 0;

        fill(clr);
        rectMode(CENTER);
        rect(petalX, petalY, flowerdia * 0.1, flowerdia * 2.8, 10);
        circle(petalX, petalY, flowerdia - 10);
        pop();
    }
    pop();
}

function flower2(x, y, radius, petals, flowerdia) {
    push();
    noStroke();
    translate(x, y);
    for (let i = 0; i <= petals; i++) {
        let angle = ((PI * 2) / petals) * i;
        push();
        rotate(angle);
        let petalX = radius;
        let petalY = 0;

        fill(clr);
        rectMode(CENTER);
        rect(petalX, petalY, flowerdia * 0.3, flowerdia * 2, 10);
        quad(
            petalX,
            petalY - flowerdia / 2,
            petalX + 18,
            petalY,
            petalX,
            petalY + flowerdia / 2,
            petalX - 18,
            petalY
        );
        pop();
    }
    pop();
}

function flower3(x, y, radius, petals, flowerdia) {
    push();
    noStroke();
    translate(x, y);
    for (let i = 0; i <= petals; i++) {
        let angle = ((PI * 2) / petals) * i;
        let petalX = radius;
        let petalY = 0;
        push();

        rotate(angle);
        ellipseMode(CENTER);
        noStroke();
        fill(clr);
        ellipse(petalX, petalY, flowerdia * 1.2, flowerdia * 0.8);

        stroke(red(clr) - 10, green(clr), blue(clr), 180);
        strokeWeight(4);
        noFill();
        ellipse(petalX - 4, petalY, flowerdia * 1.4, flowerdia * 0.9);

        pop();
    }
    pop();
}

function flower4(x, y, radius, petals, flowerdia) {
    push();
    noStroke();
    translate(x, y);
    for (let i = 0; i <= petals; i++) {
        let angle = ((PI * 2) / petals) * i;
        let petalX = radius;
        let petalY = 0;
        push();
        rotate(angle);
        noStroke();
        fill(clr);
        quad(
            petalX,
            petalY - flowerdia * 1.1,
            petalX + 15,
            petalY,
            petalX,
            petalY + flowerdia * 1.1,
            petalX - 15,
            petalY
        );
        pop();
    }
    pop();
}
