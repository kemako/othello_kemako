var scoreBoard = [
  [60, -11, 4, -1, -1, 4, -11, 60],
  [-11, -16, -1, -3, -3, -1, -16, -11],
  [4, -1, 2, -1, -1, 2, -1, 4],
  [-1, -3, -1, 0, 0, -1, -3, -1],
  [-1, -3, -1, 0, 0, -1, -3, -1],
  [4, -1, 2, -1, -1, 2, -1, 4],
  [-11, -16, -1, -3, -3, -1, -16, -11],
  [60, -11, 4, -1, -1, 4, -11, 60]
]

function evaluateBoard(boardCurrent){
  var whiteScore = 0;
  var blackScore = 0;
  var point = 1;
  for (var i = 0; i < boardCurrent.length; i++) {
    for(var j = 0; j < boardCurrent[i].length; j++) {
      if(boardCurrent[i][j] == "white") {
        whiteScore = whiteScore + scoreBoard[i][j];
      } else if (boardCurrent[i][j] == "black") {
        blackScore = blackScore + scoreBoard[i][j];
      }
    }
  }
  var rivalCandidateLen = checkCandidate(rivalColor, boardCurrent).length;
  var score = whiteScore - blackScore*1.0 - rivalCandidateLen*0.5;
  return score;
}

function copyBoard(boardCurrent){
  var boardNew = [];
  for (var n = 0; n <= 7 ; n++) {
    boardNew[n] = ["no","no","no","no","no","no","no","no"];
  }
  for (var l = 0; l < boardCurrent.length; l++){
    for (var m = 0; m < boardCurrent[l].length; m++){
      boardNew[l][m] = boardCurrent[l][m];
    }
  }
  return boardNew;
}

function autoWhite(){
  console.log(myColor);
  if(myColor == "white"){
    if (checkCandidate("white",board) != "[]") {
      document.getElementById("comment").innerHTML = " ";
      var count = 1;
      // var eval = {score: 1000, pos: []};
      // eval = minmax(board, count, eval);

      var maxWhite = {score: -10000, pos: []};

      // 白の手
      for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
          if (board[i][j] == "no"){
            var newBoard = copyBoard(board);
            checkAllDirection([i,j], newBoard);

            if (checkRule([i,j], newBoard)) {
              var changePoints;
              changePoints = up.data.concat(down.data, right.data, left.data, ur.data, dr.data, dl.data, ul.data);
              changePoints.push([i,j]);
              updateBoard(changePoints, myColor, newBoard);

              changeTurn();
              // 黒の手
              var minWhite = {score: 10000, pos: []};

              for (var n = 0; n < newBoard.length; n++) {
                for (var m = 0; m < newBoard[n].length; m++){
                  if (newBoard[n][m] == "no") {
                    var n2Board = copyBoard(newBoard);
                    checkAllDirection([n,m], n2Board);

                    if (checkRule([n,m], n2Board)) {
                      var changeP;
                      changeP = up.data.concat(down.data, right.data, left.data, ur.data, dr.data, dl.data, ul.data);
                      changeP.push([n,m]);
                      updateBoard(changeP, myColor, n2Board);

                      changeTurn();
                      // 白の手
                      var max3White = {score: -10000, pos: []};

                      for (var k = 0; k < n2Board.length; k++) {
                        for (var l = 0; l < n2Board[n].length; l++){
                          if (n2Board[k][l] == "no") {
                            var n3Board = copyBoard(n2Board);
                            checkAllDirection([k,l], n3Board);

                            if (checkRule([k,l], n3Board)) {
                              var changeP3;
                              changeP3 = up.data.concat(down.data, right.data, left.data, ur.data, dr.data, dl.data, ul.data);
                              changeP3.push([k,l]);
                              updateBoard(changeP3, myColor, n3Board);
                              var score = evaluateBoard(n3Board);
                              if (max3White.score <= score) {
                                max3White.score = score;
                                max3White.pos = [k,l];
                              }
                            }
                          }
                        }
                      }

                      if (max3White.pos == "[]") {
                        console.log("max3White.pos = []")
                        max3White.score = minWhite.score;
                      }

                      changeTurn();
                      // var score = evaluateBoard(n2Board);
                      if (minWhite.score >= max3White.score) {
                        minWhite.score = max3White.score;
                        minWhite.pos = [n,m];
                      }
                    }
                  }
                }
              }

              if (minWhite.pos == "[]") {
                console.log("minWhite.pos = []")
                minWhite.score = maxWhite.score;
              }
              changeTurn();

              // var score = evaluateBoard(newBoard);
              if (maxWhite.score <= minWhite.score) {
                maxWhite.score = minWhite.score;
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
      console.log(maxWhite);
      console.log(changeWhite);

      updateBoard(changeWhite, myColor, board);
      drawBoard(board);
    } else {
      document.getElementById("comment").innerHTML = "No Place for White";
      console.log("no place");
    }
    changeTurn();
    console.log("changed");
    calScore();
  }
}
