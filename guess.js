const guessField = document.querySelector('.guessField');
const guessSubmit = document.querySelector('.guessSubmit');
const restartBtn = document.querySelector('.restartBtn');
const resultDiv = document.querySelector('.result');
const countDiv = document.querySelector('.count');
const guessesPara = document.querySelector('.guesses');
const mockTextPara = document.querySelector('.mock-text');
let randomNumber = Math.floor(Math.random() * 100) + 1;
let guessCount = 0;
let guessHistory = [];
const mockTexts = [
  "你確定你會猜嗎？🤔",
  "再努力一點嘛！😏",
  "這麼簡單都猜不到？😅",
  "我覺得你可以更認真喔！😜",
  "是不是腦袋進水了？😂",
  "連1都猜不到，佩服佩服！🙄",
  "換個方法試試看？🤪"
];

function evaluateGuess() {
  const userGuess = Number(guessField.value);

  if (!userGuess || userGuess < 1 || userGuess > 100) {
    resultDiv.textContent = '請輸入 1 到 100 的有效數字。';
    guessField.classList.add('shake');
    setTimeout(() => guessField.classList.remove('shake'), 300);
    mockTextPara.textContent = mockTexts[Math.floor(Math.random() * mockTexts.length)];
    return;
  }

  guessCount++;
  guessHistory.push(userGuess);
  guessesPara.textContent = '猜過的數字：' + guessHistory.join(', ');
  countDiv.textContent = `猜測次數：${guessCount}`;

  if (userGuess === randomNumber) {
    resultDiv.innerHTML = `🎉 恭喜你猜對了！答案是 ${randomNumber}<br>${getEvaluation()}`;
    document.body.classList.add('success');
    guessSubmit.disabled = true;
    guessField.disabled = true;
    mockTextPara.textContent = ''; 
  } else {
    resultDiv.textContent = userGuess > randomNumber ? '太高了！' : '太低了！';
    guessField.classList.add('wrong');
    setTimeout(() => guessField.classList.remove('wrong'), 300);
    mockTextPara.textContent = mockTexts[Math.floor(Math.random() * mockTexts.length)];
  }

  guessField.value = '';
  guessField.focus();
}

function getEvaluation() {
  if (guessCount <= 3) return '🌟 太厲害了，神猜！';
  if (guessCount <= 6) return '👍 不錯喔～';
  if (guessCount <= 10) return '😊 普普通通';
  if (userGuess === randomNumber) {
  // 猜對了，清空嘲諷字眼
  mockTextPara.textContent = '';
  } else {
  // 猜錯，顯示隨機嘲諷字眼
  const randomText = mockTexts[Math.floor(Math.random() * mockTexts.length)];
  mockTextPara.textContent = randomText;
}
  return '😅 下次再加油吧～';
}

function restartGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  guessCount = 0;
  guessHistory = [];
  resultDiv.textContent = '猜測數字:';
  countDiv.textContent = '猜測次數：0';
  guessesPara.textContent = '猜過的數字：';
  guessSubmit.disabled = false;
  guessField.disabled = false;
  document.body.classList.remove('success');
  guessField.value = '';
  guessField.focus();
}

guessSubmit.addEventListener('click', evaluateGuess);
restartBtn.addEventListener('click', restartGame);

