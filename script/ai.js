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
