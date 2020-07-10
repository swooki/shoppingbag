
let game = {};

game.init = function () {
    setMode();
    setSquare();
    resetGame(numSquares);
}
let numSquares = 6;
let colors = [];
let bgColor = "#232323";
let squares = document.querySelectorAll(".square");
let pickedColor = pickColor();
let ColorDisplay = document.querySelector("#colorDisplay");
let messageDisplay = document.querySelector("#message");
let header = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");
let modeButtonSelected = document.querySelectorAll(".selected");

game.init();

// adds event handler for mode buttons ("EASY", "HARD", "SUPER HARD")
function setMode() {
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
      // reset selected button
      for (let j = 0; j < modeButtons.length; j++) {
        modeButtons[j].classList.remove("selected");
      }
      this.classList.add("selected");

      // figure out
      if (this.textContent === "EASY") {
        numSquares = 3;
      } else if (this.textContent === "HARD") {
        numSquares = 6;
      } else {
        numSquares = 9;
      } // figure out
      resetGame(numSquares);
    });
  }
}

function setSquare() {
    for (let i = 0; i<squares.length; i++) {
      squares[i].addEventListener("click", function () {
        let clickedColor = this.style.backgroundColor;
        if (clickedColor === pickedColor) {
          messageDisplay.textContent = "Correct!";
          resetButton.textContent = "Play Again?";
          changeColor(pickedColor);
          header.style.backgroundColor = pickedColor;
        } else {
          this.style.backgroundColor = bgColor;
          messageDisplay.textContent = "Try Again!";
        }
      });
    }
}

resetButton.addEventListener("click", function(){
    resetGame(numSquares);}
);

function resetGame(num) {
  colors = generateRandomColor(num);
  pickedColor = pickColor();
  ColorDisplay.textContent = pickedColor;
  header.style.backgroundColor = "steelblue";
  messageDisplay.textContent = "";
  resetButton.textContent = "New Color";

  for (let i = 0; i<squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    if (colors[i]) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].style.display = "block";
    } else {
        squares[i].style.display = "none";
    }
  }
}

function changeColor(color) {
  for (let i = 0; i < colors.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColor(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(getRandomRGB());
  }
  return arr;
}

function getRandomRGB() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
