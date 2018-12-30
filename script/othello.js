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

var placeable = "false";


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
  return [whiteScore, blackScore];
};

function changeTurn(){
  document.getElementById("turn").innerHTML = "Next turn : " + rivalColor;
  tmpColor = myColor;
  myColor = rivalColor;
  rivalColor = tmpColor;
}

// function placeCircle(pos){
//   var x = pos[0];
//   var y = pos[1];
//   // board[x][y] = myColor;
//   drawCircle(pos,myColor);
//   board[x][y] = myColor;
//   changeTurn();
//   scores = calScore();
//   whiteScore = scores[0];
//   blackScore = scores[1];
//   var score = document.getElementById("score").innerHTML
//     = "White Score : " + whiteScore + "<br>" + " Black Score : " + blackScore;
// }

function updateBoard(data, color) {
  for (var i = 0; i < data.length; i++){
    board[data[i][0]][data[i][1]] = color;
  }
}

function drawBoard() {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] != "no") {
        drawCircle([i,j], board[i][j]);
      }
    }
  }
}

// function changeColor(arr) {
//   for (var i = 0; i < arr.length; i++){
//     var x = arr[i][0];
//     var y = arr[i][1];
//     console.log(x,y);
//
//     drawCircle(arr[i],myColor);
//     board[x][y] = myColor;
//   }
// }

function initDirection(){
  up.data.length = 0;
  down.data.length = 0;
  right.data.length = 0;
  left.data.length = 0;
  ur.data.length = 0;
  dr.data.length = 0;
  dl.data.length = 0;
  ul.data.length = 0;
  placeable = "false";
}

function checkAllDirection(pos) {
  initDirection();

  checkDirection(pos, up);
  checkDirection(pos, down);
  checkDirection(pos, right);
  checkDirection(pos, left);
  checkDirection(pos, ur);
  checkDirection(pos, dr);
  checkDirection(pos, dl);
  checkDirection(pos, ul);

}

function checkRule(pos){
  var changePos = up.data.concat(down.data, right.data, left.data, ur.data, dr.data, dl.data, ul.data);

  if ((changePos.length > 0) && (board[pos[0]][pos[1]] == "no")){
    return true;
  } else {
    return false;
  }
}

// directionの方向にある敵の座標を格納していく
function checkDirection(pos, direction){
  var data = direction.data;
  var deltaX = direction.deltaX;
  var deltaY = direction.deltaY;

  var newPos = [pos[0] + deltaX, pos[1] + deltaY];
  if(newPos[0] >= 0 && newPos[0] < 8 && newPos[1] >= 0 && newPos[1] < 8) {
    var color = board[newPos[0]][newPos[1]];
    console.log(color);

    if(color == rivalColor){
      data.push(newPos);
      checkDirection(newPos,direction);
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

// function checkCandidate(){
//   var candidate = [];
//   for (var i = 0; i < board.length; i++) {
//     for (var j = 0; j < board[i].length; j++) {
//       if (board[i][j] == "no"){
//         checkAllDirection([i,j]);
//         if (placeable == "true") {
//           candidate.push([i,j]);
//         }
//       }
//     }
//   }
//   return candidate;
// }

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
  updateBoard(white, "white");
  updateBoard(black, "black");
  drawBoard();
};

initOthello();

document.getElementById("othelloCanvas").addEventListener("click", function(event) {
  var status = "start";
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

    checkAllDirection(currentPos);
    console.log("hh");
    console.log(placeable);

    if (checkRule(currentPos)) {
      console.log("true");
      changePos = up.data.concat(down.data, right.data, left.data, ur.data, dr.data, dl.data, ul.data);
      changePos.push(currentPos);
      console.log(currentPos);
      console.log(changePos);

      updateBoard(changePos, myColor);
      drawBoard();
      changeTurn();
    }
  }

  // var alertmsg = function(){
  //   console.log("3秒経過");
  //   status = "end";
  //   autoWhite();
  // }
  //
  // setTimeout(alertmsg, 2000);
  //
  // function autoWhite(){
  //   if (checkCandidate().length > 0 && status == "end" && myColor == "white") {
  //     initDirection();
  //     var maxWhite = {score: 0, pos: []};
  //     for (var i = 0; i < board.length; i++) {
  //       for (var j = 0; j < board[i].length; j++) {
  //         if (board[i][j] == "no"){
  //           checkAllDirection([i,j]);
  //           if (placeable == "true") {
  //             scores = calScore();
  //             whiteScore = scores[0];
  //             if (maxWhite.score < whiteScore) {
  //               maxWhite.score = whiteScore;
  //               maxWhite.pos = [i,j];
  //             }
  //           }
  //         }
  //       }
  //     }
  //     checkAllDirection(maxWhite.pos);
  //
  //     if (placeable == "true") {
  //
  //       changeColor(up);
  //       changeColor(down);
  //       changeColor(left);
  //       changeColor(right);
  //       changeColor(ur);
  //       changeColor(dr);
  //       changeColor(dl);
  //       changeColor(ul);
  //
  //       placeCircle(maxWhite.pos);
  //     }
  //   } else if (checkCandidate().length == 0 && status == "end" && myColor == "white") {
  //     document.getElementById("comment").innerHTML = "No Place for White";
  //     changeTurn();
  //   }
  // }
  //
  // if(myColor == "black" && checkCandidate().length > 0) {
  //   document.getElementById("comment").innerHTML = "Go Black";
  // } else if (myColor == "black" && checkCandidate().length == 0) {
  //   document.getElementById("comment").innerHTML = "No Place for Black";
  //   changeTurn();
  //   var alertmsg = function(){
  //     console.log("3秒経過");
  //     status = "end";
  //     autoWhite();
  //   }
  //   setTimeout(alertmsg, 2000);
  // }

});
