class Crossword {
  constructor() {
    this.size = 50;
  }

  generate(inputWords) {
    [this.board, this.wordObj] = Generate(inputWords);
  }
  show(solve = false) {
    const size = this.size;
    const boardHeight = this.board.length;
    const boardWidth = this.board[0].length;

    resizeCanvas(size * boardWidth, size * boardHeight);
    background(255);

    this.board.forEach(function (row, i) {
      row.forEach(function (element, j) {
        if (element) {
          fill(255);
          stroke(0);
          strokeWeight(2);
          rect(j * size, i * size, size, size);
          fill(0);
          stroke(200);
          strokeWeight(1);
          if (solve) {
            textAlign(CENTER, CENTER);
            textSize(size * 0.7);
            text(element.value, j * size + size / 2, i * size + size / 2);
          }

          if (element.num) {
            textAlign(LEFT, TOP);
            textSize(size * 0.35);
            text(element.num, j * size + 1, i * size + 1);
          }
        }
        // else {
        //   fill(255);
        //   noStroke();
        //   rect(j * size, i * size, size, size);
        // }
      });
    });
  }
}
