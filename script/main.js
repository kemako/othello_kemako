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

var myColor;
var rivalColor;

ctx.lineWidth = 2;
// ctx.fillStyle = 'rgba(155, 187, 89, 0.7)';
ctx.fillStyle = 'seagreen';
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
};

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

function placeCircle(pos){
  drawCircle(pos,myColor);
  count++;
}

function changeColor(arr) {
  for (var i = 0; i < arr.length; i++){
    drawCircle(arr[i],myColor);
  }
}

function checkAllDirection(pos) {
  up = [];
  down = [];
  right = [];
  left = [];
  ur = [];
  dr = [];
  dl = [];
  ul = [];

  checkDirection(pos, 'up');
  checkDirection(pos, 'down');
  checkDirection(pos, 'right');
  checkDirection(pos, 'left');
  checkDirection(pos, 'ur');
  checkDirection(pos, 'dr');
  checkDirection(pos, 'dl');
  checkDirection(pos, 'ul');

  if (up.length + down.length + right.length + left.length + ur.length
    + dr.length + dl.length + ul.length > 0){
    console.log(up,down,right,left,ur,dr,dl,ul);
    placeCircle(pos);
  } else {
    console.log("false");
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
      changeColor(arr);
    } else {
      arr.length = 0;
    }
  }
}

initOthello();

document.getElementById("othelloCanvas").addEventListener("click", function(event) {
	var clickX = event.pageX ;
	var clickY = event.pageY ;

	// 要素の位置を取得
	var clientRect = this.getBoundingClientRect() ;
	var positionX = clientRect.left + window.pageXOffset ;
	var positionY = clientRect.top + window.pageYOffset ;

	// 要素内におけるクリック位置を計算
	var x = clickX - positionX ;
	var y = clickY - positionY ;

  if(count%2 == 0){
    rivalColor = "white";
    myColor = "black";
  } else {
    rivalColor = "black";
    myColor = "white";
  }

  var turn = document.getElementById("turn").innerHTML = "Next turn : " + rivalColor; 

  if(x && y){
    centerCircle = calCenter(x,y);
    centerX = Math.floor(centerCircle.x);
    centerY = Math.floor(centerCircle.y);
    currentPos = [centerX,centerY]

    checkAllDirection(currentPos);

  }
});
