let mic;
let circles = [];
let number = 5;
let vol;
let myCircle;

function setup() {
  createCanvas(400, 400);

  mic = new p5.AudioIn();
  mic.start();

  // myCircle = new Circle();
}

function draw() {
  if (random(1) < 0.05) {
    circles[circles.length] = new Circle();
  }
  if (circles.length > number) {
    circles.splice(0, 1);
  }
  background(100, 10);
  vol = mic.getLevel();
  console.log(vol);
  fill(0, 255, 0);
  text(vol.toFixed(2), 100, 100);
  for (let i = 0; i < circles.length; i++) {
    // Circles[i].move();
    circles[i].display();
    circles[i].checkMouse();
  }
  // myCircle.display();

}

class Circle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    vol = mic.getLevel();
    this.dia = map(vol, 0, 1, 10, 1000);
    this.r = 255;
    this.g = 0;
    this.b = 0;
  }
  display() {
    noStroke();
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.dia);
  }
  checkMouse() {
    let distance = dist(mouseX, mouseY, this.x, this.y);
    if (distance < this.dia) {
      // in the area
      this.r = 0;
      this.g = 255;
      this.b = 255;
      // this.xSpd = random(-10, 10);
      // this.ySpd = random(-10, 10);
      //   if (mouseIsPressed) {
      //     this.isDone = true;
      //   }
      // } else {
      //   // out of the area
      //   //this.r = 255;
      //   //this.g = 255;
      //   //this.b = 255;
      // }
    }
  }
}
