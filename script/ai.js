function evaluateBoard(boardCurrent){
  var whiteScore = 0;
  var blackScore = 0;
  var point = 1;
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
  var score = whiteScore - blackScore*0.5 - rivalCandidateLen*0.5;
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
  if(myColor == "white"){
    if (checkCandidate("white",board).length > 0) {
      document.getElementById("comment").innerHTML = " ";
      var count = 1;
      // var eval = {score: 1000, pos: []};
      // eval = minmax(board, count, eval);

      var maxWhite = {score: -100, pos: []};

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
              var minWhite = {score: 1000, pos: []};

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
                      var score = evaluateBoard(n2Board);
                      if (minWhite.score > score) {
                        minWhite.score = score;
                        minWhite.pos = [n,m];
                      }
                    }

                  }
                }
              }
              changeTurn();

              // var score = evaluateBoard(newBoard);
              if (maxWhite.score < minWhite.score) {
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
