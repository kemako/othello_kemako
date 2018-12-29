var cs       = document.getElementById('othelloCanvas'),
    ctx      = cs.getContext('2d'),
    csWidth  = cs.width,
    csHeight = cs.height,
    center   = {
      x: csWidth / 2,
      y: csHeight / 2
    };

var count = 0;

var board = [];
for (var i = 0; i <= 7 ; i++) {
	board[i] = ["no","no","no","no","no","no","no","no"];
}

var up = [];
var down = [];
var right = [];
var left = [];
var ur = [];
var dr = [];
var dl = [];
var ul = [];

var myColor = "black";
var rivalColor = "white";

var placeable = "false";

ctx.lineWidth = 2;
// ctx.fillStyle = 'rgba(155, 187, 89, 0.7)';
ctx.fillStyle = "seagreen";
ctx.fillRect(0, 0, 480, 480);

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
  board[x][y] = color;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(60*x + 30 , 60*y + 30, 20, 0, Math.PI*2, true);
  ctx.fill();
  ctx.stroke();
}

function initCircle(pos,color) {
  var x = pos[0];
  var y = pos[1];
  board[x][y] = color;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.arc(60*x + 30 , 60*y + 30, 20, 0, Math.PI*2, true);
  ctx.fill();
  ctx.stroke();
}

function drawSupportCircle(pos) {
  var x = pos[0];
  var y = pos[1];
  ctx.beginPath();
  ctx.fillStyle = "gold";
  ctx.arc(60*x + 30 , 60*y + 30, 10, 0, Math.PI*2, true);
  ctx.fill();
  ctx.stroke();
}

for (var i = 0; i <= 8; i++) {
  drawLine(60*i,0,60*i,csHeight);
  drawLine(0,60*i,csWidth,60*i);
}

function initOthello(){
  drawCircle([4,4],'white');
  drawCircle([4,3],'black');
  drawCircle([3,3],'white');
  drawCircle([3,4],'black');
};

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
  count++;
  document.getElementById("turn").innerHTML = "Next turn : " + rivalColor;
  if(count%2 == 0){
    rivalColor = "white";
    myColor = "black";
  } else {
    rivalColor = "black";
    myColor = "white";
  }
}

function placeCircle(pos){
  drawCircle(pos,myColor);
  changeTurn();
  scores = calScore();
  whiteScore = scores[0];
  blackScore = scores[1];
  var score = document.getElementById("score").innerHTML
    = "White Score : " + whiteScore + "<br>" + " Black Score : " + blackScore;
}

function changeColor(arr) {
  for (var i = 0; i < arr.length; i++){
    drawCircle(arr[i],myColor);
  }
}

function initDirection(){
  up.length = 0;
  down.length = 0;
  right.length = 0;
  left.length = 0;
  ur.length = 0;
  dr.length = 0;
  dl.length = 0;
  ul.length = 0;
  placeable = "false";
  changable = "false";
}

var changable = "false";

function checkAllDirection(pos) {
  initDirection();

  checkDirection(pos, 'up');
  checkDirection(pos, 'down');
  checkDirection(pos, 'right');
  checkDirection(pos, 'left');
  checkDirection(pos, 'ur');
  checkDirection(pos, 'dr');
  checkDirection(pos, 'dl');
  checkDirection(pos, 'ul');

  if ((up.length + down.length + right.length + left.length + ur.length
    + dr.length + dl.length + ul.length > 0) && (changable == "true")){
    console.log(up,down,right,left,ur,dr,dl,ul);
    placeable = "true";
  } else {
    console.log("false");
    placeable = "false";
  }
}

// directionの方向にある敵の座標を格納していく
function checkDirection(pos, direction){
  var deltaX;
  var deltaY;
  var arr;
  if (direction == 'up') {
    deltaX = 0;
    deltaY = -1;
    arr = up;
  } else if (direction == 'down') {
    deltaX = 0;
    deltaY = +1;
    arr = down;
  } else if (direction == 'right') {
    deltaX = +1;
    deltaY = 0;
    arr = right;
  } else if (direction == 'left') {
    deltaX = -1;
    deltaY = 0;
    arr = left;
  } else if (direction == 'ur') {
    deltaX = +1;
    deltaY = -1;
    arr = ur;
  } else if (direction == 'dr') {
    deltaX = +1;
    deltaY = +1;
    arr = dr;
  } else if (direction == 'dl') {
    deltaX = -1;
    deltaY = +1;
    arr = dl;
  } else if (direction == 'ul') {
    deltaX = -1;
    deltaY = -1;
    arr = ul;
  }

  var newPos = [pos[0] + deltaX, pos[1] + deltaY];
  if(newPos[0] >= 0 && newPos[0] < 8 && newPos[1] >= 0 && newPos[1] < 8) {
    var color = board[newPos[0]][newPos[1]];

    if(color == rivalColor){
      arr.push(newPos);
      checkDirection(newPos,direction);
    } else if (color == myColor) {
      if (arr.length > 0) {
        changable = "true";
      }
    } else {
      arr.length = 0;
    }
  } else {
    arr.length = 0;
  }
}

function checkCandidate(){
  var candidate = [];
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] == "no"){
        checkAllDirection([i,j]);
        if (placeable == "true") {
          candidate.push([i,j]);
        }
      }
    }
  }
  return candidate;
}

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

    if (placeable == "true") {
      console.log('true');

      changeColor(up);
      changeColor(down);
      changeColor(left);
      changeColor(right);
      changeColor(ur);
      changeColor(dr);
      changeColor(dl);
      changeColor(ul);

      placeCircle(currentPos);
      console.log(count);
    }
  }

  var alertmsg = function(){
    console.log("3秒経過");
    status = "end";
    autoWhite();
  }

  setTimeout(alertmsg, 2000);

  function autoWhite(){
    if (checkCandidate().length > 0 && status == "end" && myColor == "white") {
      initDirection();
      var maxWhite = {score: 0, pos: []};
      for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
          if (board[i][j] == "no"){
            checkAllDirection([i,j]);
            if (placeable == "true") {
              scores = calScore();
              whiteScore = scores[0];
              if (maxWhite.score < whiteScore) {
                maxWhite.score = whiteScore;
                maxWhite.pos = [i,j];
              }
            }
          }
        }
      }
      checkAllDirection(maxWhite.pos);

      if (placeable == "true") {

        changeColor(up);
        changeColor(down);
        changeColor(left);
        changeColor(right);
        changeColor(ur);
        changeColor(dr);
        changeColor(dl);
        changeColor(ul);

        placeCircle(maxWhite.pos);
      }
    } else if (checkCandidate().length == 0 && status == "end" && myColor == "white") {
      document.getElementById("comment").innerHTML = "No Place for White";
      changeTurn();
    }
  }

  if(myColor == "black" && checkCandidate().length > 0) {
    document.getElementById("comment").innerHTML = "Go Black";
  } else if (myColor == "black" && checkCandidate().length == 0) {
    document.getElementById("comment").innerHTML = "No Place for Black";
    changeTurn();
    var alertmsg = function(){
      console.log("3秒経過");
      status = "end";
      autoWhite();
    }
    setTimeout(alertmsg, 2000);
  }

});
