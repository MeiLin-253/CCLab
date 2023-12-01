let inputBox, inputText;
let letters = [];
let button;

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
    textSize(24);
    fill(0);
    text(letters.join(''), 100, 100); // Use join() to display the letters as a string

    // for (let i = 0; i < letters.length; i++) {
    //     letters[i].move();
    //     letters[i].display();
    // }
}

function submitText() {
    inputText = inputBox.value();
    updateArray();

    console.log("Submitted text:", letters);

    // Clear the text
    inputBox.value("");
}

function updateArray() {
    letters = inputText.split('');
}

