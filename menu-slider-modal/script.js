const toggleBtn = document.getElementById('toggle')
const closeBtn = document.getElementById('close')
const openBtn = document.getElementById('open')
const modalBtn = document.getElementById('modal')

// Toggle nav
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('show-nav')
})

// Show modal
openBtn.addEventListener('click', () => {
  modalBtn.classList.add('show-modal')
})

// Hide modal
closeBtn.addEventListener('click', () => {
  modalBtn.classList.remove('show-modal')
})

// Hide modal on outside click
window.addEventListener('click', event => {
  event.target === modalBtn ? modalBtn.classList.remove('show-modal') : false
})
