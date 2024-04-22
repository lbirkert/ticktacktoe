/* Lucas Birkert - TickTackToe */

/*  _______ _      _ _______         _ _______          */
/* |__   __(_)    | |__   __|       | |__   __|         */
/*    | |   _  ___| | _| | __ _  ___| | _| | ___   ___  */
/*    | |  | |/ __| |/ / |/ _` |/ __| |/ / |/ _ \ / _ \ */
/*    | |  | | (__|   <| | (_| | (__|   <| | (_) |  __/ */
/*    |_|  |_|\___|_|\_\_|\__,_|\___|_|\_\_|\___/ \___| */

/* https://github.com/lbirkert/ticktacktoe/tree/main/LICENSE */

/* (c) Copyright 2024 Lucas Birkert, all rights reserved */


const btns = [];
const field = [];

let player = 1;

// handles button click
function onBtnClick(id) {
  return () => {
    if (field[id] != 0) return;

    btns[id].className = player == 1 ? "x" : "o";
    btns[id].disabled = "true";
    field[id] = player;
    player *= -1;

    const win = checkWin();
    if (win == 0) {
      if (!checkTie()) return;
      document.body.className = "gameover";
      splash.className = "tie";
      return;
    }

    winner.className = win == 1 ? "x" : "o";
    document.body.className = "gameover";
    splash.className = "win";
  };
}

// resets the playing field
function reset() {
  document.body.className = "";

  for (id in btns) {
    btns[id].className = "";
    btns[id].disabled = "";
    field[id] = 0;
  }
}

// checks whether current state is win and returns winner
function checkWin() {
  for (let i = 0; i < 3; i++) {
    if (Math.abs(field[i] + field[i + 3] + field[i + 6]) == 3) return field[i];
    if (Math.abs(field[i * 3] + field[i * 3 + 1] + field[i * 3 + 2]) == 3) return field[i * 3];
  }
  if (Math.abs(field[0] + field[4] + field[8]) == 3) return field[0];
  if (Math.abs(field[2] + field[4] + field[6]) == 3) return field[2];

  return 0;
}

// checks whether current state is tie
function checkTie() {
  return field.every((e) => e != 0);
}

// initialize field and btn array
for (row of game.childNodes) {
  if (row.nodeType != Node.ELEMENT_NODE) continue;

  for (btn of row.childNodes) {
    if (btn.nodeType != Node.ELEMENT_NODE) continue;

    btn.addEventListener("click", onBtnClick(btns.length));

    btns.push(btn);
    field.push(0);
  }
}
