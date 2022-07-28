const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const passwordConfirm = document.getElementById('password-2')

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement
  if (formControl.classList.contains('success')) {
    formControl.classList.remove('success')
  }
  formControl.classList.add('error')
  const small = formControl.querySelector('small')
  small.innerText = message
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement
  if (formControl.classList.contains('error')) {
    formControl.classList.remove('error')
  }
  formControl.classList.add('success')
}

// Check email is valid
function checkEmail(input) {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  if (emailRegex.test(input.value.trim())) {
    showSuccess(input)
  } else {
    showError(input, 'Email is not valid')
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`)
    } else {
      showSuccess(input)
    }
  })
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`)
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max}`)
  } else {
    showSuccess(input)
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match')
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Event listeners
form.addEventListener('submit', function(event) {
  event.preventDefault()

  checkRequired([username, email, password, passwordConfirm])
  checkEmail(email)
  checkLength(username, 3, 10)
  checkLength(password, 6, 15)
  checkPasswordsMatch(password, passwordConfirm)
})