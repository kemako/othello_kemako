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

function initOthello(){
  ctx.lineWidth = 2;
  ctx.fillStyle = "seagreen";
  ctx.fillRect(0, 0, 480, 480);
  for (var i = 0; i <= 8; i++) {
    drawLine(60*i,0,60*i,csHeight);
    drawLine(0,60*i,csWidth,60*i);
  }
  var whiteFirst = [[4,4],[3,3]];
  var blackFirst = [[3,4],[4,3]];
  updateBoard(whiteFirst, "white", board);
  updateBoard(blackFirst, "black", board);
  drawBoard(board);
  document.getElementById("turn").innerHTML = "Go ahead!";
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
