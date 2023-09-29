const APP_ID = 'cefe4da1';
const APP_KEY = 'e3f78351773c05bd184572bf76d83521'; 
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('recipe-search-form');
    const resultsContainer = document.querySelector('.recipe-results');

  

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const searchType = document.getElementById('search-type').value;
    const query = document.getElementById('ingredients').value;

    
    let apiUrl = '';

    if (searchType === 'q') {
        apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    } else if (searchType === 'ingredients') {
        apiUrl = `https://api.edamam.com/search?ingr=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

      
        displayResults(data.hits);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});



    function displayResults(recipes) {
        resultsContainer.innerHTML = '';

        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');

            recipeCard.innerHTML = `
                <h2>${recipe.recipe.label}</h2>
                <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                <p>${recipe.recipe.source}</p>
                <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
            `;

            resultsContainer.appendChild(recipeCard);
        });
    }
});
