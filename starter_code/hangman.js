class Hangman {
  constructor(){
    this.words = ['SATAN', 'BEELZEBUB', 'BELIAL', 'LUCIFER'];
    this.secretWord = this.getWord();
    this.letters = [];
    this.guessedLetter = '';
    this.errorsLeft = 10;
  }

  getWord() {
    const randomIdx = Math.floor(Math.random() * this.words.length);
    return this.secretWord = this.words[randomIdx].toUpperCase();
  }

  checkIfLetter(keyCode) {
    return (keyCode >= 65 && keyCode <= 90)
  }

  checkClickedLetters(key) {
    if (this.letters.includes(key)) {
      return false;
    }
    if (this.secretWord.includes(key)) {
      let index = this.secretWord.indexOf(key);
      while(this.secretWord.indexOf(key, index) !== -1) {
        let pos = this.secretWord.indexOf(key, index);
        this.addCorrectLetter(pos);
        hangmanCanvas.writeCorrectLetter(pos);
        index = pos + 1;
      }
      this.checkWinner();
      return true;
    } else if (!this.letters.includes(key) && !this.secretWord.includes(key)) {
      this.addWrongLetter(key, this.errorsLeft);
      hangmanCanvas.writeWrongLetter(key);
      this.checkGameOver();
    }
    return false;
  }

  checkGameOver() {
    if (this.errorsLeft <= 1) {
      hangmanCanvas.gameOver();
      return true;
    }
    return false;
  }

  checkWinner() {
    const sortWord = (word) => [...word].sort().join(''); 
    if (sortWord(this.secretWord) === sortWord(this.guessedLetter)) {
      hangmanCanvas.winner();
      return true;
    }
    return false;
  }

  addCorrectLetter(i) {
    this.guessedLetter += this.secretWord[i].toUpperCase();
  }

  addWrongLetter(letterArg, errorsLeft) {
    this.letters.push(letterArg);
    this.errorsLeft -= 1;
    switch (errorsLeft) {
      case 8:
        hangmanCanvas.drawHangman('head');
        break;
      case 6:
        hangmanCanvas.drawHangman('body');
        break;
      case 4:
        hangmanCanvas.drawHangman('arms');
        break;
      case 2:
        hangmanCanvas.drawHangman('legs');
        break;
    }
  }
}
let hangman;
let hangmanCanvas;

document.getElementById('start-game-button').onclick = function () {
  hangman = new Hangman();
  hangmanCanvas = new HangmanCanvas(hangman.secretWord);
  hangmanCanvas.createBoard();
  hangmanCanvas.drawLines();
};


document.onkeydown = function (e) {
  const key = e.key.toUpperCase();
  const keyCode = e.keyCode;
  if (hangman.checkIfLetter(keyCode)) {
    hangman.checkClickedLetters(key)
  }
};
