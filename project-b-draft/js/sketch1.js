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

// function mouth(x, y) {
//   push();
//   translate(this.x, this.y);
//   beginShape();
//   curveVertex(-this.dia/2, ypos * 3); // control point
//   curveVertex(-this.dia/2, ypos);
//   curveVertex( 0, 0);
//   curveVertex( this.dia/2, ypos);
//   curveVertex( this.dia/2, ypos * 3); // control point
//   endShape();
//   pop();
// }

class Circle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    vol = mic.getLevel();
    this.dia = map(vol, 0, 1, 30, 1000);
    this.clr = color(255, 0, 0);
    this.targetClr = color(255, 0, 0);
    // this.r = 255;
    // this.g = 0;
    // this.b = 0;
    this.xSpd = random(-0.5, 0.5);
    this.ySpd = random(-0.6, -0.8);
    // this.startArc = PI + QUARTER_PI;
    // this.endArc =  QUARTER_PI;
    // this.centerX = 0;
    // this.centerY = 0;
    this.ypos = 0;
    this.distance = 0;
  }
  update() {
    this.centerX = this.x - this.dia / 4;
    this.centerY = this.y + this.dia / 4;
    this.ypos = -this.dia / 8;
    this.distance = dist(mouseX, mouseY, this.x, this.y);
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
    strokeWeight(1);
    curveVertex(-this.dia / 4, -this.ypos); // control point
    curveVertex(-this.dia / 4, -this.ypos);
    curveVertex(0, this.dia / 20);
    curveVertex(this.dia / 4, -this.ypos);
    curveVertex(this.dia / 4, -this.ypos); // control point
    endShape();
    pop();
    // stroke(0);
    // noFill();
    // arc(
    //   this.centerX,
    //   this.centerY,
    //   this.dia * 0.6,
    //   this.dia * 0.5,
    //   this.startArc, this.endArc
    // );
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  changeColor() {
    this.clr = lerpColor(this.clr, this.targetClr, 0.05);
  }
  checkMouse() {
    //let ypos = map(dist, 0, this.dia, -50, 50);
    if (this.distance < this.dia && mouseIsPressed) {
      //circles.splice(0, 1);
    } else if (this.distance < this.dia + 100) {
      this.targetClr = color(0, 255, 0);
      this.ypos = map(this.distance, 0, this.dia + 100, this.dia / 10, -this.dia / 10);
    }
  }
}
