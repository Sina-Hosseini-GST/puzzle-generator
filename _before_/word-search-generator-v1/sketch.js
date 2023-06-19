let puzzle;
let checkbox;
let words;
var solved = false;

let allOrientations = [
  "horizontal",
  "horizontalBack",
  "vertical",
  "verticalUp",
  "diagonal",
  "diagonalUp",
  "diagonalBack",
  "diagonalUpBack",
];

function setup() {
  var myCanvas = createCanvas(500, 500);
  myCanvas.parent("canvasContainer");
  background(200);
  select("#generate").mousePressed(generatePuzzle);

  select("#upload-text").mousePressed(getWordTextarea);
  select("#solve").mousePressed(solvePuzzle);
  checkbox = select("#show-grid").elt;
  checkbox.onchange = showHideGrid;

  saveButton = select("#saveBtn").elt;
  saveButton.onclick = selecOrientation;

  createFileInput(getWords).parent("#get-words");

  select("#saveImage").mousePressed(downloadImage);
  select("#saveText").mousePressed(downloadText);
  select("#saveFullText").mousePressed(downloadFullText);

  puzzle = new Puzzle();
}

function draw() {}

function showHideGrid() {
  puzzle.showGrid = checkbox.checked;
}

function selecOrientation() {
  puzzle.orientations = [];

  modal = select("#orientation").elt;
  modal.style.display = "none";
  orientationCheckbox = selectAll(".orientation-checkbox");

  orientationCheckbox.forEach((orientation, i) => {
    if (orientation.elt.checked) {
      puzzle.orientations.push(allOrientations[i]);
    }
  });
}

function getWords(event) {
  let inputFile;
  words = [];
  if (event.file.type != "text/plain") {
    return;
  }

  inputFile = event.data;
  inputFile = split(inputFile, "\n");

  inputFile.forEach((row) => {
    row = trim(row);
    if (row) {
      row = row.toUpperCase();
      row = row.replace(/[^A-Z]/gm, "");
      words.push(row);
    }
  });

  puzzle.words = words;
}

function getWordTextarea() {
  let inputFile;
  words = [];
  inputFile = document.getElementById("text-input").value;

  inputFile = split(inputFile, "\n");

  inputFile.forEach((row) => {
    row = trim(row);
    if (row) {
      row = row.toUpperCase();
      row = row.replace(/[^A-Z]/gm, "");
      words.push(row);
    }
  });

  puzzle.words = words;
  generatePuzzle();
}

function generatePuzzle() {
  solved = false;
  background(200);
  pWidth = parseInt(select("#puzzle-width").value());
  pHeight = parseInt(select("#puzzle-height").value());
  if (!isNaN(pWidth) && !isNaN(pHeight)) {
    puzzle.createPuzzle(pWidth, pHeight);
    puzzle.drawPuzzle();
    drawWords();
  }
}

function solvePuzzle() {
  if (solved) {
    puzzle.drawPuzzle();
    solved = false;
  } else {
    puzzle.solvePuzzle();
    solved = true;
  }
}

function drawWords() {
  ul = select("#word-list");
  ul.html("");
  ul.style("font-size", puzzle.resolution - puzzle.resolution * 0.5 + "px");
  ul.style("column-count", floor(width / (puzzle.resolution * 5)));

  header = select("#header");
  header.style("font-size", puzzle.resolution - puzzle.resolution * 0.4 + "px");

  list_container = select("#list-container").elt;
  list_container.style.width = width;

  sort(puzzle.words).forEach((word, i) => {
    word_in_list = createElement("li", word);
    word_in_list.style(
      "line-height",
      puzzle.resolution - puzzle.resolution * 0.4 + 10 + "px"
    );
    word_in_list.parent("word-list");
  });
}

function downloadImage() {
  saveCanvas("puzzle", "png");
}

function downloadText() {
  var dotPuzzle = puzzle.dotPuzzle;
  var text;
  var headerName = document.getElementById("header-input").value;

  var textList = [[headerName], []];
  for (let i = 0; i < dotPuzzle.length; i++) {
    text = "";
    for (let j = 0; j < dotPuzzle[i].length; j++) {
      text += dotPuzzle[i][j];
      text += " ";
    }
    textList.push(text);
  }
  textList.push([]);
  sort(puzzle.words).forEach((word, i) => {
    textList.push(word);
  });

  saveStrings(textList, "puzzle.txt");
}

function downloadFullText() {
  var headerName = document.getElementById("header-input").value;
  var fullPuzzle = puzzle.puzzle;
  var text;
  var textList = [[headerName], []];
  for (let i = 0; i < fullPuzzle.length; i++) {
    text = "";
    for (let j = 0; j < fullPuzzle[i].length; j++) {
      text += fullPuzzle[i][j];
      text += " ";
    }
    textList.push(text);
  }
  textList.push([]);
  sort(puzzle.words).forEach((word, i) => {
    textList.push(word);
  });

  saveStrings(textList, "Full puzzle.txt");
}
