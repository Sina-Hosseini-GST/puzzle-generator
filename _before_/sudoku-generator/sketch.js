function setup() {
  var myCanvas = createCanvas(500, 500);
  myCanvas.parent("canvasContainer");
  sudoku = new Sudoku();

  select("#generate").mousePressed(generateBoard);
  select("#showSolution").mousePressed(showSolution);
  select("#download").mousePressed(downloadImage);
  select("#download-solved").mousePressed(downloadSolvedImage);
}

function draw() {}

var size, difficulty;
function generateBoard() {
  size = parseInt(select("#sudoku-size").value());
  difficulty = select("#sudoku-difficulty").value();

  sudoku.generate(size, difficulty);
  solutionVisible = false;
  sudoku.drawBoard(sudoku.unsolvedBoard);
}

var solutionVisible = false;
function showSolution() {
  solutionVisible = !solutionVisible;
  if (solutionVisible) {
    sudoku.drawBoard(sudoku.solvedBoard);
  } else {
    sudoku.drawBoard(sudoku.unsolvedBoard);
  }
}

function downloadImage() {
  sudoku.drawBoard(sudoku.unsolvedBoard);
  saveCanvas(difficulty.replace(/^\w/, c => c.toUpperCase()) + " " + size + "x" + size + " Sudoku.png");
  if (solutionVisible) {
    sudoku.drawBoard(sudoku.solvedBoard);
  } else {
    sudoku.drawBoard(sudoku.unsolvedBoard);
  }
}

function downloadSolvedImage() {
  sudoku.drawBoard(sudoku.solvedBoard);
  saveCanvas("Solved " + difficulty.replace(/^\w/, c => c.toUpperCase()) + " " + size + "x" + size + " Sudoku.png");
  if (solutionVisible) {
    sudoku.drawBoard(sudoku.solvedBoard);
  } else {
    sudoku.drawBoard(sudoku.unsolvedBoard);
  }
}
