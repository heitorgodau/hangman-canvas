class HangmanCanvas {
  constructor(secretWord) {
    this.ctx = document.getElementById('hangman').getContext('2d');
    this.secretWord = secretWord;
  }
  createBoard() {
    this.ctx.clearRect(0, 0, 1200, 800)
    this.ctx.beginPath();
    this.ctx.moveTo(150, 600);
    this.ctx.lineTo(0, 700);
    this.ctx.lineTo(300, 700);
    this.ctx.lineTo(150, 600);
    this.ctx.lineTo(150, 200);
    this.ctx.lineTo(450, 200);
    this.ctx.lineTo(450, 300);
    this.ctx.stroke();
  }

  drawLines() {
    let x = 350;
    const y = 700; 
    for (let i = 0; i < this.secretWord.length; i += 1) {
      this.ctx.moveTo(x,y);
      this.ctx.lineTo(x + 60, y);
      this.ctx.stroke();
      x += 70;
    }
  }
  
  writeCorrectLetter(idx) {
    this.ctx.font = '70px Georgia';
    const letter = this.secretWord[idx]
    this.ctx.fillText(letter.toUpperCase(), 350 + (idx * 70), 695);
  }

  writeWrongLetter(key) {
    const randomX = Math.floor(Math.random() * (1000 - 700)) + 700 
    const randomY = Math.floor(Math.random() * (400 - 50)) + 50 
    this.ctx.font = '70px Georgia'
    this.ctx.fillText(key, randomX, randomY);    
  }

  drawHangman(shape) {
    this.ctx.closePath();
    this.ctx.beginPath();
    switch (shape) {
      case 'head':
        this.ctx.arc(450, 330, 30, 0, 7);
        this.ctx.stroke();
        this.ctx.closePath();
        break;
      case 'body':
        this.ctx.beginPath();
        this.ctx.moveTo(450, 360);
        this.ctx.lineTo(450,450);
        this.ctx.stroke();
        this.ctx.closePath();
        break;
      case 'arms':
        this.ctx.beginPath();
        this.ctx.moveTo(450, 370);
        this.ctx.lineTo(400, 410);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.moveTo(450, 370);
        this.ctx.lineTo(500, 410);
        this.ctx.stroke();
        this.ctx.closePath();
        break;
      case 'legs':
        this.ctx.beginPath();
        this.ctx.moveTo(450, 450);
        this.ctx.lineTo(435, 530);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.moveTo(450, 450);
        this.ctx.lineTo(465, 530);
        this.ctx.stroke();
        this.ctx.closePath();
        break;
    }
  }

  gameOver() {
    let img = document.getElementById("loser");
    this.ctx.drawImage(img, 10, 10);
    setTimeout(() => {
      alert('Your soul is mine! :] ');
    }, 100);
  }

  winner() {
    let img = document.getElementById("winner");
    this.ctx.drawImage(img, 10, 10);
    setTimeout(() => {
      alert('I don\'t wanna your filthy soul. Go to heaven! >: ');
    }, 100);
  }
}
