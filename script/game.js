//オセロのゲーム自体のルールなど
function calCenter(x,y){
  var centerCircle = {
    x: x/60,
    y: y/60
  };
  return centerCircle;
};

function calScore(){
  var whiteScore = 0;
  var blackScore = 0;
  for (var i = 0; i < board.length; i++) {
    for(var j = 0; j < board[i].length; j++) {
      if(board[i][j] == "white") {
        whiteScore++;
      } else if (board[i][j] == "black") {
        blackScore++;
      }
    }
  }
  document.getElementById("score").innerHTML
  = "White Score : " + whiteScore + "<br>" + " Black Score : " + blackScore;
}

function changeTurn(){
  document.getElementById("turn").innerHTML = "Next turn : " + rivalColor;
  var tmpColor = myColor;
  myColor = rivalColor;
  rivalColor = tmpColor;
}

function updateBoard(data, color, boardCurrent) {
  if (data != [Array(0)]){
    for (var i = 0; i < data.length; i++){
      var x = data[i][0];
      var y = data[i][1];
      boardCurrent[x][y] = color;
    }
  } else {
    console.log("cannot update board");
  }
}

function initDirection(){
  up.data.length = 0;
  down.data.length = 0;
  right.data.length = 0;
  left.data.length = 0;
  ur.data.length = 0;
  dr.data.length = 0;
  dl.data.length = 0;
  ul.data.length = 0;
}

function checkAllDirection(pos, boardCheck) {
  initDirection();

  checkDirection(pos, up, boardCheck);
  checkDirection(pos, down, boardCheck);
  checkDirection(pos, right, boardCheck);
  checkDirection(pos, left, boardCheck);
  checkDirection(pos, ur, boardCheck);
  checkDirection(pos, dr, boardCheck);
  checkDirection(pos, dl, boardCheck);
  checkDirection(pos, ul, boardCheck);
}

function checkRule(pos,boardCurrent){
  var tmpPos = up.data.concat(down.data, right.data, left.data, ur.data, dr.data, dl.data, ul.data);

  if ((tmpPos.length > 0) && (boardCurrent[pos[0]][pos[1]] == "no")){
    return true;
  } else {
    return false;
  }
}

// directionの方向にある敵の座標を格納していく
function checkDirection(pos, direction, boardCheck){
  var data = direction.data;
  var deltaX = direction.deltaX;
  var deltaY = direction.deltaY;

  var newPos = [pos[0] + deltaX, pos[1] + deltaY];
  if(newPos[0] >= 0 && newPos[0] < 8 && newPos[1] >= 0 && newPos[1] < 8) {
    var color = boardCheck[newPos[0]][newPos[1]];

    if(color == rivalColor){
      data.push(newPos);
      checkDirection(newPos,direction, boardCheck);
    } else if (color == myColor) {
      if (data.length > 0) {
      }
    } else {
      data.length = 0;
    }
  } else {
    data.length = 0;
  }
}

function checkCandidate(color, boardCurrent){
  var candidate = [];
  if (color == myColor){
    for (var i = 0; i < boardCurrent.length; i++) {
      for (var j = 0; j < boardCurrent[i].length; j++) {
        if (board[i][j] == "no"){
          checkAllDirection([i,j], boardCurrent);
          if (checkRule([i,j], boardCurrent)) {
            candidate.push([i,j]);
          }
        }
      }
    }
  } else if (color == rivalColor) {
    changeTurn();
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j] == "no"){
          checkAllDirection([i,j], board);
          if (checkRule([i,j], board)) {
            candidate.push([i,j]);
          }
        }
      }
    }
    changeTurn();
  }
  console.log(candidate);
  return candidate;
}
