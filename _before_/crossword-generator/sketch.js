var crossword;
var solved = false;

function setup() {
  var myCanvas = createCanvas(500, 300);
  background(51);
  myCanvas.parent("canvasContainer");

  select("#generate").mousePressed(generatePuzzle);
  select("#solve").mousePressed(solvePuzzle);
  select("#download-text").mousePressed(downloadText);
  select("#download").mousePressed(downloadImage);
  crossword = new Crossword();
}

function draw() {}

function generatePuzzle() {
  var inputWords = [];

  const allInputs = selectAll("li", "#words-input");

  for (let i = 0; i < allInputs.length; i++) {
    const hint_answer = selectAll("input", allInputs[i]);
    inputWords.push({
      clue: hint_answer[0].value().toUpperCase(),
      value: hint_answer[1]
        .value()
        .toUpperCase()
        .replace(/[^A-Z]/gm, ""),
    });
  }
  if (inputWords.length > 0) {
    crossword.generate(inputWords);
    crossword.show(false);

    showWords(false);
  }
}

function solvePuzzle() {
  if (!solved) {
    crossword.show(true);
    showWords(true);
    solved = true;
  } else {
    crossword.show(false);
    showWords(false);
    solved = false;
  }
}

function showWords(solve) {
  var words = crossword.wordObj;
  select("#across").html("");
  select("#down").html("");

  var wordLower;
  var word;
  var content;
  var answer;
  var answerLower;

  words = words.sort((a, b) => parseFloat(a.num) - parseFloat(b.num));

  for (let i = 0; i < words.length; i++) {
    wordLower = words[i].clue.toLowerCase();
    word = wordLower.charAt(0).toUpperCase() + wordLower.slice(1);

    answer = words[i].string;

    if (solve) {
      content = `${words[i].num}.(${answer}); ${word}`;
    } else {
      content = `${words[i].num}.${word}`;
    }

    if (words[i].dir == 0) {
      createElement("li", content).parent("across");
    }

    if (words[i].dir == 1) {
      createElement("li", content).parent("down");
    }
  }
}

function downloadImage() {
  saveCanvas("Crossword Image.png");
}

function downloadText() {
  var words = crossword.wordObj;

  words = words.sort((a, b) => parseFloat(a.num) - parseFloat(b.num));

  var text = [];
  var textListDown = ["Down"];
  var textListAcross = ["Across"];

  for (let i = 0; i < words.length; i++) {
    var wordLower = words[i].clue.toLowerCase();
    var word = wordLower.charAt(0).toUpperCase() + wordLower.slice(1);
    var answer = words[i].string;

    if (words[i].dir == 0) {
      textListDown.push(`${words[i].num}.(${answer}); ${word}`);
    }

    if (words[i].dir == 1) {
      textListAcross.push(`${words[i].num}.(${answer}); ${word}`);
    }
  }

  textListAcross.push([]);

  text = textListAcross.concat(textListDown);
  text.unshift([]);
  text.unshift(document.getElementById("header-input").value);

  saveStrings(text, "crossword.txt");
}
