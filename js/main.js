"use strict";

const area = document.querySelector(".game-area");

const CELLSNUM = 9;
// рендер поля
const generateCells = () => {
  for (let cell = 1; cell <= CELLSNUM; cell++) {
    area.innerHTML += `<div class='cell' data-pos=${cell}></div>`;
  }
};
generateCells();
// логика игры

const cells = document.querySelectorAll(".cell");

let currentPlayer = document.querySelector("#current-player-text");

let player = "x";
let winIndex = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

let stat = {
  x: 0,
  o: 0,
  d: 0,
};

const checkWin = (data) => {
  for (let i in winIndex) {
    let win = true;
    for (let j in winIndex[i]) {
      let id = winIndex[i][j];
      let ind = data.indexOf(id);

      if (ind == -1) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
  return false;
};

const cellClick = (target) => {
  let data = [];

  if (!target.innerHTML) {
    target.innerHTML = player;
  } else {
    alert("Ячейка занята");
    return;
  }

  for (let i in cells) {
    if (cells[i].innerHTML == player) {
      data.push(parseInt(cells[i].getAttribute("data-pos")));
      console.log(data);
    }
  }

  if (checkWin(data)) {
    stat[player]++;
    restart("Выйграл " + player);
  } else {
    let draw = true;
    for (let i in cells) {
      if (cells[i].innerHTML == "") draw = false;
    }

    if (draw) {
      stat.d++;
      restart("Ничья");
    }
  }

  player = player == "x" ? "o" : "x";
  currentPlayer.innerHTML = player.toUpperCase();
};

function updateStat() {
  document.getElementById("sX").innerHTML = stat.x;
  document.getElementById("sO").innerHTML = stat.o;
  document.getElementById("sD").innerHTML = stat.d;
}
function restart(text) {
  alert(text);

  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
  }
  updateStat();
}

cells.forEach((cell) => {
  cell.addEventListener(
    "click",
    (e) => {
      let target = e.target;
      cellClick(target);
    },
    false
  );
});
