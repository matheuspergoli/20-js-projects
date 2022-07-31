const currencyElementOne = document.getElementById('currency-one')
const currencyElementTwo = document.getElementById('currency-two')
const amountElementOne = document.getElementById('amount-one')
const amountElementTwo = document.getElementById('amount-two')
const rateElement = document.getElementById('rate')
const swapElement = document.getElementById('swap')

// Fetch exchange rates and update the DOM
function calculate() {
  const currencyOne = currencyElementOne.value
  const currencyTwo = currencyElementTwo.value

  fetch(`https://v6.exchangerate-api.com/v6/f1711a44f3f1cf91b6a22d79/latest/${currencyOne}`)
  .then(response => response.json())
  .then(json => {
    const rate = json.conversion_rates[currencyTwo]
    rateElement.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`
    amountElementTwo.value = (amountElementOne.value * rate).toFixed(2)
  })
}

// Event listeners
currencyElementOne.addEventListener('change', calculate)
currencyElementTwo.addEventListener('change', calculate)
amountElementOne.addEventListener('input', calculate)
amountElementTwo.addEventListener('input', calculate)
swapElement.addEventListener('click', () => {
  const temp = currencyElementOne.value
  currencyElementOne.value = currencyElementTwo.value
  currencyElementTwo.value = temp
  calculate()
})

calculate()
