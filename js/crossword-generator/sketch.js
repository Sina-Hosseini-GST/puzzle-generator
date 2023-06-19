var crossword;
var solved = false;

function setup() {
  var myCanvas = createCanvas(500, 300);
  background(51);
  myCanvas.parent("canvasContainer");

  document.getElementsByTagName("canvas")[0].removeAttribute("style");
  document.getElementsByTagName("canvas")[0].classList.add("mx-auto" , "lg4:h-100", "lg1:h-88", "h-68", "w-auto");
  
  var c = document.getElementById("defaultCanvas0");
  var ctx = c.getContext("2d");
  ctx.fillStyle = "#CBD5E0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  select("#generate").mousePressed(generatePuzzle);
  select("#solve").mousePressed(solvePuzzle);
  select("#download-text").mousePressed(downloadText);
  select("#download").mousePressed(downloadImage);
  crossword = new Crossword();
}

function draw() {}

function generatePuzzle() {
  document.getElementById("solve").innerHTML= "Show Solution";
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
  
  document.getElementsByTagName("canvas")[0].removeAttribute("style");
  document.getElementsByTagName("canvas")[0].classList.add("mx-auto" , "lg4:h-100", "lg1:h-88", "h-68", "w-auto");
  
}

function solvePuzzle() {
  if (!solved) {
    crossword.show(true);
    showWords(true);
    solved = true;
		document.getElementById("solve").innerHTML = "Hide Solution";
    document.getElementsByTagName("canvas")[0].removeAttribute("style");
    document.getElementsByTagName("canvas")[0].classList.add("mx-auto" , "lg4:h-100", "lg1:h-88", "h-68", "w-auto");
  } else {
    crossword.show(false);
    showWords(false);
    solved = false;
		document.getElementById("solve").innerHTML = "Show Solution";
    document.getElementsByTagName("canvas")[0].removeAttribute("style");
    document.getElementsByTagName("canvas")[0].classList.add("mx-auto" , "lg4:h-100", "lg1:h-88", "h-68", "w-auto");
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
      var elm1 = document.querySelectorAll('ul#across li');
      for (var j = 0; j < elm1.length; ++j) {
        elm1[j].classList.add("lg1:mx-3", "mx-2", "border", "border-white", "bg-gray-800", "lg2:p-2", "p-1.5");
      }
    }

    if (words[i].dir == 1) {
      createElement("li", content).parent("down");
      var elm2 = document.querySelectorAll('ul#down li');
      for (var k = 0; k < elm2.length; ++k) {
        elm2[k].classList.add("lg1:mx-3", "mx-2", "border", "border-white", "bg-gray-800", "lg2:p-2", "p-1.5");
      }
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
