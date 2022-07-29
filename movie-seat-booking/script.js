const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

populateUI()

let ticketPrice = +movieSelect.value 

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovie', movieIndex)
  localStorage.setItem('selectedMoviePrice', moviePrice)
}

// Update total and count
function updateSelectedCountAndTotal() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected')

  // Copy selected seats into arr
  // Map through array
  // Return a new array indexes
  const seatsIndex = [...selectedSeats].map(seat => {
    return [...seats].indexOf(seat)
  })

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

  const selectedSeatsCount = selectedSeats.length

  count.innerText = selectedSeatsCount
  total.innerText = selectedSeatsCount * ticketPrice
}

// Get data from localStorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovie')

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex
  }
}

// Movie select event
movieSelect.addEventListener('change', (event) => {
  ticketPrice = +event.target.value
  setMovieData(event.target.selectedIndex, event.target.value)
  updateSelectedCountAndTotal()
})

// Seat click event
container.addEventListener('click', (event) => {
  if (
    event.target.classList.contains('seat') && 
    !event.target.classList.contains('occupied')
  ) {
    event.target.classList.toggle('selected')
    updateSelectedCountAndTotal()
  }
})

// Initial count and total set
updateSelectedCountAndTotal()
