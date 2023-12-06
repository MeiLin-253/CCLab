let mic;
let circles = [];
let number = 12;
let vol;
let ypos;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-container");
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  if (random(1) < 0.08) {
    circles[circles.length] = new Circle();
  }
  // if (circles.length > number) {
  // circles.splice(0, 1);
  // }
  background(255, 80);
  vol = mic.getLevel();
  console.log(vol);
  fill(0, 255, 0);
  text(vol.toFixed(2), 10, 20);
  for (let i = 0; i < circles.length; i++) {
    circles[i].move();
    circles[i].display();
    circles[i].update();
    circles[i].changeColor();
    circles[i].checkMouse();
  }
}

class Circle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    vol = mic.getLevel();
    this.dia = map(vol, 0, 1, 50, 500);
    this.clr = color(255, 0, 0);
    this.targetClr = color(255, 0, 0);
    this.xSpd = random(-0.5, 0.5);
    this.ySpd = random(-0.6, -0.8);
    this.ypos = 0;
    this.distance = 0;
    this.stroke = 0;
  }
  update() {
    this.centerX = this.x - this.dia / 4;
    this.centerY = this.y + this.dia / 4;
    this.ypos = -this.dia / 8;
    this.distance = dist(mouseX, mouseY, this.x, this.y);
    this.stroke = map(this.dia, 50, 500, 3, 20);
  }
  display() {
    noStroke();
    fill(this.clr);
    circle(this.x, this.y, this.dia);
    noStroke();
    fill(0);
    circle(this.x - this.dia / 5, this.y - this.dia / 6, this.dia / 6);
    circle(this.x + this.dia / 5, this.y - this.dia / 6, this.dia / 6);
    push();
    translate(this.x, this.y + this.dia / 30);
    beginShape();
    noFill();
    stroke(0);
    strokeWeight(this.stroke);
    curveVertex(-this.dia / 4, -this.ypos); // control point
    curveVertex(-this.dia / 4, -this.ypos);
    curveVertex(0, this.dia / 20);
    curveVertex(this.dia / 4, -this.ypos);
    curveVertex(this.dia / 4, -this.ypos); // control point
    endShape();
    pop();
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  changeColor() {
    this.clr = lerpColor(this.clr, this.targetClr, 0.05);
  }
  checkMouse() {
    if (this.distance < this.dia + 30) {
      this.targetClr = color(0, 255, 0);
    }
    if (this.distance < this.dia + 100) {
      this.ypos = map(this.distance, 0, this.dia + 100, this.dia / 10, -this.dia / 10);
    }
  }
}
