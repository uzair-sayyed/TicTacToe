const button = document.querySelectorAll(".btn");
let userTurnX = true;
const newBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const resetBtn = document.querySelector(".reset");
const gameContainer = document.querySelector(".game-container");
const body = document.querySelector("body");

const winningPatternArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const enableButtons = () => {
  for (let btn of button) {
    btn.disabled = false;
    btn.innerText = "";
  }
};

let count;

const resetGame = () => {
  count = 0;
  userTurnX = true;
  enableButtons();
  msgContainer.classList.add("hide");
  gameContainer.classList.remove("hide");
};

const disabledButtons = () => {
  for (let btn of button) {
    btn.disabled = true;
  }
};

button.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (userTurnX) {
      //playerO
      btn.innerText = "O";
      userTurnX = false;
    } else {
      //playerX
      btn.innerText = "X";
      userTurnX = true;
    }
    btn.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  setTimeout(() => {
    msg.innerText = `Match draw`;
    gameContainer.classList.add("hide");
    msgContainer.classList.remove("hide");
    disabledButtons();
  }, 1000);
};

const showWinner = (winner) => {
  msg.innerText = `Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disabledButtons();
};

const checkWinner = () => {
  for (let pattern of winningPatternArray) {
    let pos1Val = button[pattern[0]].innerText;
    let pos2Val = button[pattern[1]].innerText;
    let pos3Val = button[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("winner");
        setTimeout(() => {
          showWinner(pos1Val);
          gameContainer.classList.add("hide");
        }, 2000);
        return true;
      }
    }
  }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
