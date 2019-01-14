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

var count = 4;

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
        var centerCircle = calCenter(x,y);
        var centerX = Math.floor(centerCircle.x);
        var centerY = Math.floor(centerCircle.y);
        var currentPos = [centerX,centerY]

        checkAllDirection(currentPos, board);

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

    setTimeout("autoWhite()",300);

  } else {
    setTimeout("autoWhite()",300);
  }
});
