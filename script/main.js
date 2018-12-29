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
  if(count%2 == 1){
    drawCircle(pos,'white');
    count++;
  } else {
    drawCircle(pos,'black');
    count++;
  }
}

function changeColor(arr) {
  var myColor;
  if (rivalColor == 'white') {
    myColor = 'black';
  } else {
    myColor = 'white';
  }

  for (var i = 0; i < arr.length; i++){
    drawCircle(arr[i],myColor);
  }
}

//上にあるライバルの座標をupに格納していく
function checkUp(pos){
  var x = pos[0];
  var y = pos[1]-1;
  var color = board[x][y];
  if(count%2 == 1){
    rivalColor = "white";
  } else {
    rivalColor = "black";
  }
  console.log(rivalColor,color);

  if(y >= 0){
    if(color == rivalColor){
      newPos = [pos[0], pos[1]-1]
      up.push(newPos);
      checkUp(newPos);
    } else {
      return false;
    }
  }
  return false;
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
  if(x && y){
    centerCircle = calCenter(x,y);
    centerX = Math.floor(centerCircle.x);
    centerY = Math.floor(centerCircle.y);
    console.log(centerX);
    console.log(centerY);

    placeCircle([centerX,centerY]);
    console.log(board[4]);
    up = [];
    checkUp([centerX,centerY]);
    console.log(up);
    changeColor(up);

  }
});
