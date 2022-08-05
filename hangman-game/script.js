const wordElement = document.getElementById('word')
const wrongLettersElement = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-again')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')
const figureParts = document.querySelectorAll('.figure-parts')

const words = ['application', 'programming', 'interface', 'wizard']
let selectedWord = words[Math.floor(Math.random() * words.length)]

const correctLetters = []
const wrongLetters = []

// Show hidden word
function displayWord() {
  wordElement.innerHTML = `
    ${selectedWord.split('').map(letter => ` 
      <span class="letter"> 
        ${correctLetters.includes(letter) ? letter : ''}
      </span>
      `).join('')
    }
  `
  const innerWord = wordElement.innerText.replace(/\n/g, '')

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won!'
    popup.style.display = 'flex'
  }
}

// Update the wrong letters
function updateWrongLettersElement() {

}

// Show notification
function showNotification() {
  notification.classList.add('show')
  setTimeout(() => {
    notification.classList.remove('show')
  }, 2000)
}

// Keydown letter press
window.addEventListener('keydown', event => {
  if (event.key >= 'a' && event.key <= 'z') {
    const letter = event.key
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter)
        displayWord()
      } else {
        showNotification()
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter)
        updateWrongLettersElement()
      } else {
        showNotification()
      }
    }
  }
})

displayWord()