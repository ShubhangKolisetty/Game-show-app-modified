const keyboardQwerty = document.getElementById("qwerty");
const phrases = document.getElementById("phrase");
const overlay = document.querySelector("#overlay");
const btnReset = document.querySelector(".btn__reset");

let missed = 0;

btnReset.addEventListener("click", () => {
  overlay.style.display = "none";
});

const phraseArray = [
  "test",
  // "try something new",
  // "strive for greatness",
  // "ride or die",
  // "celebrate your victories",
  // "make it happen",
];

function getRandomPhraseAsArray(arr) {
  let characters = Math.floor(Math.random() * arr.length);
  return arr[characters].split("");
}

const randomPhrase = getRandomPhraseAsArray(phraseArray);

function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = arr[i];
    phrases.append(listItem);
    arr[i] === " "
      ? (listItem.className = "letter-gap")
      : (listItem.className = "letter");
  }
}

addPhraseToDisplay(randomPhrase);

function checkLetter(letterGuessed) {
  let toBeChecked = document.querySelectorAll(".letter");
  let letter;

  for (let i = 0; i < toBeChecked.length; i++) {
    if (toBeChecked[i].textContent === letterGuessed) {
      letter = letterGuessed;
      toBeChecked[i].classList.add("show");
    }
  }
  return letter;
}

window.addEventListener("keypress", (e) => {
  const letterFound = checkLetter(e.key);
  const keyPressed = e.key;
  if (!letterFound) {
    missed++;
    document.querySelectorAll(".tries img")[missed - 1].src =
      "images/lostHeart.png";
  }

  const btnPressed = document.getElementsByTagName("button");

  for (let i = 0; i < btnPressed.length; i++) {
    const btn = btnPressed[i];
    if (letterFound === btn.textContent) {
      btn.className = "correct";
    } else if (keyPressed === btn.textContent) {
      btn.className = "wrong";
    }
  }

  checkWin();
});

function checkWin() {
  let toBeChecked = document.querySelectorAll(".letter");
  let showLetter = document.querySelectorAll(".show");

  if (toBeChecked.length === showLetter.length && missed < 5) {
    document.querySelector("#overlay").classList.add("win");
    document.querySelector(".title").textContent = "You win!";
    document.querySelector("#overlay").style.display = "flex";
    document.querySelector(".btn__reset").textContent = "Play Again";
  } else if (missed === 5) {
    document.querySelector("#overlay").classList.add("lose");
    document.querySelector(".title").textContent = "You lose!";
    document.querySelector("#overlay").style.display = "flex";
    document.querySelector(".btn__reset").textContent = "Retry";
  }
}
