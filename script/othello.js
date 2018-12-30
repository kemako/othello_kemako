var cs       = document.getElementById('othelloCanvas'),
    ctx      = cs.getContext('2d'),
    csWidth  = cs.width,
    csHeight = cs.height,
    center   = {
      x: csWidth / 2,
      y: csHeight / 2
    };

var board = [];
for (var i = 0; i <= 7 ; i++) {
	board[i] = ["no","no","no","no","no","no","no","no"];
}

var up = {data: [], deltaX: 0, deltaY: -1};
var down = {data: [], deltaX: 0, deltaY: 1};
var right = {data: [], deltaX: 1, deltaY: 0};
var left = {data: [], deltaX: -1, deltaY: 0};
var ur = {data: [], deltaX: 1, deltaY: -1};
var dr = {data: [], deltaX: 1, deltaY: 1};
var dl = {data: [], deltaX: -1, deltaY: 1};
var ul = {data: [], deltaX: -1, deltaY: -1};

var myColor = "black";
var rivalColor = "white";

function drawLine(xStart,yStart,xEnd,yEnd) {
  ctx.beginPath();
  ctx.moveTo(xStart, yStart);
  ctx.lineTo(xEnd, yEnd);
  ctx.closePath();
  ctx.stroke();
};

function drawCircle(pos,color) {
  var x = pos[0];
  var y = pos[1];
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(60*x + 30 , 60*y + 30, 20, 0, Math.PI*2, true);
  ctx.fill();
  ctx.stroke();
}

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

function evaluateBoard(boardCurrent){
  var whiteScore = 0;
  var blackScore = 0;
  for (var i = 0; i < boardCurrent.length; i++) {
    for(var j = 0; j < boardCurrent[i].length; j++) {
      if ( [i,j] == [0,0] || [i,j] == [0,7] || [i,j] == [7,0] || [i,j] == [7,7]) {
        point = 5;
      } else {
        point = 1;
      }
      if(boardCurrent[i][j] == "white") {
        whiteScore = whiteScore + point;
      } else if (boardCurrent[i][j] == "black") {
        blackScore = blackScore + point;
      }
    }
  }
  var rivalCandidateLen = checkCandidate(rivalColor, boardCurrent).length;
  var score = whiteScore - rivalCandidateLen*0.5;
  return score;
}

function changeTurn(){
  document.getElementById("turn").innerHTML = "Next turn : " + rivalColor;
  tmpColor = myColor;
  myColor = rivalColor;
  rivalColor = tmpColor;
}

function updateBoard(data, color, boardCurrent) {
  for (var i = 0; i < data.length; i++){
    x = data[i][0];
    y = data[i][1];
    boardCurrent[x][y] = color;
  }
}

function drawBoard(boardCurrent) {
  for (var i = 0; i < boardCurrent.length; i++) {
    for (var j = 0; j < boardCurrent[i].length; j++) {
      if (boardCurrent[i][j] != "no") {
        drawCircle([i,j], boardCurrent[i][j]);
      }
    }
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
  return candidate;
}

function initOthello(){
  ctx.lineWidth = 2;
  ctx.fillStyle = "seagreen";
  ctx.fillRect(0, 0, 480, 480);
  for (var i = 0; i <= 8; i++) {
    drawLine(60*i,0,60*i,csHeight);
    drawLine(0,60*i,csWidth,60*i);
  }
  white = [[4,4],[3,3]];
  black = [[3,4],[4,3]];
  updateBoard(white, "white", board);
  updateBoard(black, "black", board);
  drawBoard(board);
};

function autoWhite(){
  if(myColor == "white"){
   if (checkCandidate("white",board).length > 0) {
     document.getElementById("comment").innerHTML = " ";

     var maxWhite = {score: -100, pos: []};

     for (var i = 0; i < board.length; i++) {
       for (var j = 0; j < board[i].length; j++) {
         if (board[i][j] == "no"){
           var newBoard = [];
           for (var n = 0; n <= 7 ; n++) {
            	newBoard[n] = ["no","no","no","no","no","no","no","no"];
            }
           for (var l = 0; l < board.length; l++){
             for (var m = 0; m < board[l].length; m++){
               newBoard[l][m] = board[l][m];
             }
           }
           checkAllDirection([i,j], newBoard);

           if (checkRule([i,j], newBoard)) {
             var changePoints;
             changePoints = up.data.concat(down.data, right.data, left.data, ur.data, dr.data, dl.data, ul.data);
             changePoints.push([i,j]);
             console.log(changePoints);
             var corner = changePoints.some( function( value ) {
               return value == [0,0] || value == [0,7] || value == [7,0] || value == [7,7];
             });
             updateBoard(changePoints, myColor, newBoard);
             // if ( [i,j] == [0,0] || [i,j] == [0,7] || [i,j] == [7,0] || [i,j] == [7,7]) {
             //   score = score + 5;
             // }
             var score = evaluateBoard(newBoard);
             if (maxWhite.score < score) {
               maxWhite.score = score;
               maxWhite.pos = [i,j];
             }
           }
         }
       }
     }

     checkAllDirection(maxWhite.pos, board);

     var changeWhite;
     changeWhite = up.data.concat(down.data, right.data, left.data, ur.data, dr.data, dl.data, ul.data);
     changeWhite.push(maxWhite.pos);

     updateBoard(changeWhite, myColor, board);
     drawBoard(board);
   } else {
     document.getElementById("comment").innerHTML = "No Place for White";
   }
   changeTurn();
   console.log("changed");
   calScore();
  }
}

initOthello();

document.getElementById("othelloCanvas").addEventListener("click", function(event) {
  var status = "start";
  if (myColor == "black"){
    if (checkCandidate(myColor,board).length > 0){
      document.getElementById("comment").innerHTML = " ";
    	var clickX = event.pageX ;
    	var clickY = event.pageY ;

    	// 要素の位置を取得
    	var clientRect = this.getBoundingClientRect() ;
    	var positionX = clientRect.left + window.pageXOffset ;
    	var positionY = clientRect.top + window.pageYOffset ;

    	// 要素内におけるクリック位置を計算
    	var x = clickX - positionX ;
    	var y = clickY - positionY ;

      if(x && y){
        centerCircle = calCenter(x,y);
        centerX = Math.floor(centerCircle.x);
        centerY = Math.floor(centerCircle.y);
        currentPos = [centerX,centerY]

        checkAllDirection(currentPos, board);
        console.log("hh");

        if (checkRule(currentPos,board)) {
          var changePos = up.data.concat(down.data, right.data, left.data, ur.data, dr.data, dl.data, ul.data);
          changePos.push(currentPos);

          updateBoard(changePos, myColor, board);
          drawBoard(board);
          changeTurn();
          calScore();
        } else {
          document.getElementById("comment").innerHTML = "Another place!";
        }
      }
    } else {
      document.getElementById("comment").innerHTML = "No Place for Black";
      changeTurn();
      console.log("changed");
      calScore();
    }

   autoWhite();

   } else {
     document.getElementById("comment").innerHTML = "No Place for White";
   }
});
