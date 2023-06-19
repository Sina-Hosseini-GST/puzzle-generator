var board,
  wordArr,
  wordBank,
  wordsActive,
  boardMap,
  wordElementsAcross = [],
  wordElementsDown = [];

var Bounds = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,

  Update: function (x, y) {
    this.top = Math.min(y, this.top);
    this.right = Math.max(x, this.right);
    this.bottom = Math.max(y, this.bottom);
    this.left = Math.min(x, this.left);
  },

  Clean: function () {
    this.top = 999;
    this.right = 0;
    this.bottom = 0;
    this.left = 999;
  },
};

function Generate(inputWords) {
  wordElementsAcross = [];
  wordElementsDown = [];
  wordArr = inputWords;

  for (var i = 0, isSuccess = false; i < 19 && !isSuccess; i++) {
    CleanVars();
    isSuccess = PopulateBoard();
  }

  var text = "";
  var board2 = [];
  var temp = [];
  boardMap = [];

  for (var i = Bounds.top - 1, str = ""; i < Bounds.bottom + 2; i++) {
    for (var j = Bounds.left - 1; j < Bounds.right + 2; j++) {
      if (board[j][i].value) {
        BoardCharToElement(board[j][i]);

        temp.push(board[j][i]);
        text += board[j][i].value;
        text += " ";
      } else {
        text += ". ";
        temp.push(null);
      }
    }
    board2.push(temp);
    temp = [];

    text += "\n";
  }
  //

  for (var i = 0; i < wordsActive.length; i++) {
    var elem = board[wordsActive[i].x][wordsActive[i].y];
    wordsActive[i].num = elem.num;
  }

  // console.log(wordsActive);
  return [board2, wordsActive];
}

function CleanVars() {
  Bounds.Clean();
  wordBank = [];
  wordsActive = [];
  board = [];

  for (var i = 0; i < 50; i++) {
    board.push([]);
    for (var j = 0; j < 50; j++) {
      board[i].push({ value: null, char: [] });
    }
  }
}

function PopulateBoard() {
  PrepareBoard();

  for (var i = 0, isOk = true, len = wordBank.length; i < len && isOk; i++) {
    isOk = AddWordToBoard();
  }

  return isOk;
}

function PrepareBoard() {
  wordBank = [];
  // console.log(JSON.parse(JSON.stringify(wordArr)));

  for (var i = 0, len = wordArr.length; i < len; i++) {
    wordBank.push(new WordObj(wordArr[i]));
  }

  for (i = 0; i < wordBank.length; i++) {
    for (var j = 0, wA = wordBank[i]; j < wA.char.length; j++) {
      for (var k = 0, cA = wA.char[j]; k < wordBank.length; k++) {
        for (var l = 0, wB = wordBank[k]; k !== i && l < wB.char.length; l++) {
          wA.totalMatches += cA === wB.char[l] ? 1 : 0;
        }
      }
    }
  }
}

function AddWordToBoard() {
  var i,
    len,
    curIndex,
    curWord,
    curChar,
    curMatch,
    testWord,
    testChar,
    minMatchDiff = 9999,
    curMatchDiff;

  if (wordsActive.length < 1) {
    curIndex = 0;
    for (i = 0, len = wordBank.length; i < len; i++) {
      if (wordBank[i].totalMatches < wordBank[curIndex].totalMatches) {
        curIndex = i;
      }
    }
    wordBank[curIndex].successfulMatches = [{ x: 12, y: 12, dir: 0 }];
  } else {
    curIndex = -1;

    for (i = 0, len = wordBank.length; i < len; i++) {
      curWord = wordBank[i];

      curWord.effectiveMatches = 0;
      curWord.successfulMatches = [];
      for (var j = 0, lenJ = curWord.char.length; j < lenJ; j++) {
        curChar = curWord.char[j];
        for (var k = 0, lenK = wordsActive.length; k < lenK; k++) {
          testWord = wordsActive[k];
          for (var l = 0, lenL = testWord.char.length; l < lenL; l++) {
            testChar = testWord.char[l];
            if (curChar === testChar) {
              curWord.effectiveMatches++;
              var curCross = { x: testWord.x, y: testWord.y, dir: 0 };
              if (testWord.dir === 0) {
                curCross.dir = 1;
                curCross.x += l;
                curCross.y -= j;
              } else {
                curCross.dir = 0;
                curCross.y += l;
                curCross.x -= j;
              }

              var isMatch = true;

              for (var m = -1, lenM = curWord.char.length + 1; m < lenM; m++) {
                var crossVal = [];
                if (m !== j) {
                  if (curCross.dir === 0) {
                    var xIndex = curCross.x + m;

                    if (xIndex < 0 || xIndex > board.length) {
                      isMatch = false;
                      break;
                    }

                    crossVal.push(board[xIndex][curCross.y].value);
                    crossVal.push(board[xIndex][curCross.y + 1].value);
                    crossVal.push(board[xIndex][curCross.y - 1].value);
                  } else {
                    var yIndex = curCross.y + m;

                    if (yIndex < 0 || yIndex > board[curCross.x].length) {
                      isMatch = false;
                      break;
                    }

                    crossVal.push(board[curCross.x][yIndex].value);
                    crossVal.push(board[curCross.x + 1][yIndex].value);
                    crossVal.push(board[curCross.x - 1][yIndex].value);
                  }

                  if (m > -1 && m < lenM - 1) {
                    if (crossVal[0] !== curWord.char[m]) {
                      if (crossVal[0] !== null) {
                        isMatch = false;
                        break;
                      } else if (crossVal[1] !== null) {
                        isMatch = false;
                        break;
                      } else if (crossVal[2] !== null) {
                        isMatch = false;
                        break;
                      }
                    }
                  } else if (crossVal[0] !== null) {
                    isMatch = false;
                    break;
                  }
                }
              }
              if (isMatch === true) {
                curWord.successfulMatches.push(curCross);
              }
            }
          }
        }
      }

      curMatchDiff = curWord.totalMatches - curWord.effectiveMatches;

      if (curMatchDiff < minMatchDiff && curWord.successfulMatches.length > 0) {
        curMatchDiff = minMatchDiff;
        curIndex = i;
      } else if (curMatchDiff <= 0) {
        return false;
      }
    }
  }

  if (curIndex === -1) {
    return false;
  }

  var spliced = wordBank.splice(curIndex, 1);
  wordsActive.push(spliced[0]);

  var pushIndex = wordsActive.length - 1,
    rand = Math.random(),
    matchArr = wordsActive[pushIndex].successfulMatches,
    matchIndex = Math.floor(rand * matchArr.length),
    matchData = matchArr[matchIndex];

  wordsActive[pushIndex].x = matchData.x;
  wordsActive[pushIndex].y = matchData.y;
  wordsActive[pushIndex].dir = matchData.dir;

  var prevObj = null;
  for (i = 0, len = wordsActive[pushIndex].char.length; i < len; i++) {
    var cObj,
      cIndex,
      xInd = matchData.x,
      yInd = matchData.y;

    if (matchData.dir === 0) {
      xInd = matchData.x + i;
    } else {
      yInd = matchData.y + i;
    }

    cObj = {
      wordIndex: pushIndex,
      prev: prevObj,
      value: wordsActive[pushIndex].char[i],
      next: null,
    };

    cIndex = board[xInd][yInd].char.length;

    board[xInd][yInd].char.push(cObj);
    board[xInd][yInd].value = wordsActive[pushIndex].char[i];

    Bounds.Update(xInd, yInd);

    if (prevObj !== null) {
      prevObj.next = board[xInd][yInd].char[cIndex];
    }

    prevObj = board[xInd][yInd].char[cIndex];
  }

  prevObj = null;
  // console.log(board);
  return true;
}

function BoardCharToElement(c) {
  if (c.value !== null) {
    var num = "";

    for (var i = 0; i < c.char.length; i++) {
      c.char[i].index = boardMap.length;
      if (c.char[i].prev === null) {
        var matchingObj = wordsActive[c.char[i].wordIndex];

        if (num === "") {
          num = wordElementsDown.length + wordElementsAcross.length + 1;
        }
        if (matchingObj.dir === 0) {
          wordElementsAcross.push({ num: num, ele: matchingObj.element });
        } else {
          wordElementsDown.push({ num: num, ele: matchingObj.element });
        }
        c.num = num; // kuben added
      }
    }
    boardMap.push(c);
  }
}

function WordObj(wordData) {
  this.string = wordData.value;
  this.clue = wordData.clue;
  this.char = wordData.value.split("");
  this.totalMatches = 0;
  this.effectiveMatches = 0;
  this.successfulMatches = [];
}
