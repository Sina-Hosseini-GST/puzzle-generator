// https://github.com/robatron/sudoku.js/

class Sudoku {
  constructor() {
    this.solvedBoard;
    this.unsolvedBoard;
    this.boardInfo;
    this.size;
    this.res = 50;
  }

  generate(size, difficulty) {
    this.size = size;

    if (size == 6) {
      var diffLevel;

      if (difficulty == "easy") diffLevel = 10;
      if (difficulty == "medium") diffLevel = 17;
      if (difficulty == "hard") diffLevel = 20;
      if (difficulty == "very hard") diffLevel = 24;

      var sudoku = new Board();
      this.solvedBoard = JSON.parse(JSON.stringify(sudoku.getBoard()));
      sudoku.setDifficulty(diffLevel);
      this.unsolvedBoard = sudoku.board;
      return;
    }
    var mySudokuJS = $("").sudokuJS({ boardSize: size });

    if (size == 4) {
      mySudokuJS.generateBoard("easy");
    } else {
      mySudokuJS.generateBoard(difficulty);
    }
    this.unsolvedBoard = this.boardToArray(
      JSON.parse(JSON.stringify(mySudokuJS.getBoard()))
    );
    mySudokuJS.solveAll();
    this.solvedBoard = this.boardToArray(mySudokuJS.getBoard());
    this.boardInfo = mySudokuJS.analyzeBoard();

    if (size == 4) {
      var addAmount;

      if (difficulty == "easy") addAmount = 3;
      else if (difficulty == "medium") addAmount = 2;
      else if (difficulty == "hard") addAmount = 1;
      else if (difficulty == "very hard") addAmount = 0;
      var added = 0;
      while (added < addAmount) {
        const y = Math.floor(Math.random() * 4);
        const x = Math.floor(Math.random() * 4);

        if (this.unsolvedBoard[y][x] == null) {
          this.unsolvedBoard[y][x] = this.solvedBoard[y][x];
          added++;
        }
      }
    }
  }

  boardToArray(board) {
    var tempArray = [];
    var boardArray = [];
    for (let i = 0; i < board.length; i++) {
      tempArray.push(board[i].val);
    }

    while (tempArray.length) boardArray.push(tempArray.splice(0, this.size));
    return boardArray;
  }

  drawBoard(board) {
    background(255);
    let res = this.res;

    resizeCanvas(this.size * 50, this.size * 50);

    textAlign(CENTER, CENTER);
    textSize(50 * 0.7);
    strokeWeight(1);
    rectMode(CENTER);
    board.forEach(function (row, i) {
      row.forEach(function (element, j) {
        fill(255);
        stroke(50);
        rect(j * res + res / 2, i * res + res / 2, res, res);
        fill(0);
        if (element) {
          text(element, j * res + res / 2, i * res + res / 2);
        }
      });
    });

    noFill();
    strokeWeight(3);
    stroke(0);
    rectMode(CORNER);
    rect(2, 2, this.size * res - 4, this.size * res - 4);

    strokeWeight(3);
    stroke(0);

    if (this.size == 6) {
      line(3 * res, 0, 3 * res, res * this.size);

      for (let i = 1; i < 3; i++) {
        line(0, i * 2 * res, res * this.size, i * 2 * res);
      }
      return;
    }

    let sizeSqrt = Math.sqrt(this.size);
    for (let i = 1; i < sizeSqrt; i++) {
      line(i * sizeSqrt * res, 0, i * sizeSqrt * res, res * this.size);
    }

    for (let i = 1; i < sizeSqrt; i++) {
      line(0, i * sizeSqrt * res, res * this.size, i * sizeSqrt * res);
    }
    document.getElementsByTagName("canvas")[0].removeAttribute("style");
  }
}

class Board {
  constructor(size) {
    this.size = size;
  }

  emptyBoard() {
    let board = new Array(6);
    for (var i = 0; i < board.length; i++) {
      board[i] = new Array(6);
    }
    this.board = board;
  }

  getBoard() {
    while (!this.generateBoard()) {}
    return this.board;
  }

  setDifficulty(removeAmount) {
    var removed = 0;

    while (removed < removeAmount) {
      const y = Math.floor(Math.random() * 6);
      const x = Math.floor(Math.random() * 6);

      if (this.board[y][x] !== "") {
        this.board[y][x] = "";
        removed++;
      }
    }
  }

  generateBoard() {
    var valid = true;
    var randArr;
    this.emptyBoard();

    for (var y = 0; y < 6; y++) {
      for (var x = 0; x < 6; x++) {
        randArr = this.shuffle([1, 2, 3, 4, 5, 6]);
        for (var k = 0; k < 6; k++) {
          var n = randArr[k];
          valid = false;
          if (this.possible(y, x, n)) {
            this.board[y][x] = n;
            valid = true;
            break;
          }
        }
        if (!valid) {
          return valid;
        }
      }
    }
    return true;
  }

  possible(y, x, n) {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[y][i] == n) return false;
      if (this.board[i][x] == n) return false;
    }

    var xPartition = 3;
    var yPartition = 2;

    var y0 = Math.floor(y / yPartition) * yPartition;
    var x0 = Math.floor(x / xPartition) * xPartition;

    for (var i = 0; i < yPartition; i++) {
      for (var j = 0; j < xPartition; j++) {
        if (this.board[y0 + i][x0 + j] == n) {
          return false;
        }
      }
    }
    return true;
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
