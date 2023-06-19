class Puzzle {
  showGrid = true;
  words = [];
  resolution = 50;

  orientations = [
    "horizontal",
    "horizontalBack",
    "vertical",
    "verticalUp",
    "diagonal",
    "diagonalUp",
    "diagonalBack",
    "diagonalUpBack",
  ];

  createPuzzle(puzzleWidth, puzzleHeight) {
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    this.puzzleWidth = puzzleWidth;
    this.puzzleHeight = puzzleHeight;
    this.puzzle = wordfind.newPuzzle(this.words, {
      height: puzzleHeight,
      width: puzzleWidth,
      orientations: this.orientations,
      fillBlanks: false,
      preferOverlap: false,
    });

    this.dotPuzzle = JSON.parse(JSON.stringify(this.puzzle));

    for (let i = 0; i < this.dotPuzzle.length; i++) {
      for (let j = 0; j < this.dotPuzzle[i].length; j++) {
        if (this.dotPuzzle[i][j] == "") {
          this.dotPuzzle[i][j] = ".";
        }
      }
    }

    for (let i = 0; i < this.puzzle.length; i++) {
      for (let j = 0; j < this.puzzle[i].length; j++) {
        if (this.puzzle[i][j] == "") {
          this.puzzle[i][j] = letters[Math.floor(Math.random() * 26)];
        }
      }
    }

    this.answers = wordfind.solve(this.puzzle, this.words);
  }

  drawPuzzle() {
    let minSize = this.resolution;
    resizeCanvas(this.puzzleWidth * 50, this.puzzleHeight * 50);
    let showGrid = this.showGrid;
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    textSize(minSize - minSize * 0.4);
    strokeWeight(1);

    this.puzzle.forEach(function (row, i) {
      row.forEach(function (element, j) {
        if (showGrid) {
          stroke(0);
        } else {
          noStroke();
        }
        fill(255);
        rect(
          j * minSize + minSize / 2,
          i * minSize + minSize / 2,
          minSize,
          minSize
        );

        fill(0);
        noStroke();
        text(element, j * minSize + minSize / 2, i * minSize + minSize / 2);
      });
    });
  }

  solvePuzzle() {
    rectMode(CENTER);
    stroke("rgba(255,0,0, 1)");
    strokeWeight(10);
    let minSize = this.resolution;
    let xdir;
    let ydir;
    let angle;

    this.answers.found.forEach(function (answer) {
      switch (answer.orientation) {
        case "horizontal":
          xdir = 1;
          ydir = 0;
          angle = PI / 2;
          break;
        case "horizontalBack":
          xdir = -1;
          ydir = 0;
          angle = PI / 2;
          break;
        case "vertical":
          xdir = 0;
          ydir = 1;
          angle = 0;
          break;
        case "verticalUp":
          xdir = 0;
          ydir = -1;
          angle = 0;
          break;
        case "diagonal":
          xdir = 1;
          ydir = 1;
          angle = -PI / 4;
          break;
        case "diagonalUp":
          xdir = 1;
          ydir = -1;
          angle = PI / 4;
          break;
        case "diagonalBack":
          xdir = -1;
          ydir = 1;
          angle = PI / 4;
          break;
        case "diagonalUpBack":
          xdir = -1;
          ydir = -1;
          angle = -PI / 4;
          break;
      }

      let startPointx = answer.x * minSize + minSize / 2;
      let startPointy = answer.y * minSize + minSize / 2;
      let endPointx =
        (answer.x + (answer.overlap - 1) * xdir) * minSize + minSize / 2;
      let endPointy =
        (answer.y + (answer.overlap - 1) * ydir) * minSize + minSize / 2;

      strokeWeight(2);
      noFill();
      let midPointX = (startPointx + endPointx) / 2;
      let midPointY = (startPointy + endPointy) / 2;

      push();
      translate(midPointX, midPointY);
      rotate(angle);
      rect(
        0,
        0,
        minSize * 0.7,
        dist(startPointx, startPointy, endPointx, endPointy) + minSize,
        30
      );
      pop();
    });
  }
}
