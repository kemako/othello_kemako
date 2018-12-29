var cs       = document.getElementById('othelloCanvas'),
    ctx      = cs.getContext('2d'),
    csWidth  = cs.width,
    csHeight = cs.height,
    center   = {
      x: csWidth / 2,
      y: csHeight / 2
    };

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

function drawCircle(x,y,color) {
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
  drawCircle(4,4,'white');
  drawCircle(4,3,'black');
  drawCircle(3,3,'white');
  drawCircle(3,4,'black');
};

initOthello();
