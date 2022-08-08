const search = document.getElementById('search')
const submit = document.getElementById('submit')
const random = document.getElementById('random')
const mealsElement = document.getElementById('meals')
const resultHeading = document.getElementById('result-heading')
const single_mealElement = document.getElementById('single-meal')

// Search meal and fetch from API
function searchMeal(event) {
  event.preventDefault()

  // Clear single meal
  single_mealElement.innerHTML = ''

  // Get search term
  const term = search.value

  // Check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then(response => response.json())
    .then(data => {
      resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`

      if (data.meals === null) {
        resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`
      } else {
        mealsElement.innerHTML = data.meals.map(meal => `
          <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="meal-info" data-mealid="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>
        `).join('')
      }
    })
    // Clear search text
    search.value = ''
  } else {
    alert('Please enter a search term')
  }
}

// Fetch meal by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  .then(response => response.json())
  .then(data => {
    const meal = data.meals[0]
    addMealToDOM(meal)
  })
}

// Fetch random meal from API
function getRandomMeal() {
  // Clear meals and heading
  mealsElement.innerHTML = ''
  resultHeading.innerHTML = ''
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
  .then(response => response.json())
  .then(data => {
    const meal = data.meals[0]
    addMealToDOM(meal)
  })
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
    } else {
      break
    }
  }

  single_mealElement.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `
}

// Event listeners
submit.addEventListener('submit', searchMeal)
random.addEventListener('click', getRandomMeal)

mealsElement.addEventListener('click', event => {
  const mealInfo = event.path.find(item => {
    if (item.classList) {
      return item.classList.contains('meal-info')
    } else {
      return false
    }
  })
  
  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid')
    getMealById(mealID)
  }
})