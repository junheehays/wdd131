import recipes from "./recipes.mjs";

function random(num) {
	return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
	const listLength = list.length;
	const randomNum = random(listLength);
	return list[randomNum];
}

// to test
console.log(getRandomListEntry(recipes));


// MODIFIED to match the recipe-card CSS structure
function recipeTemplate(recipe) {
	return `<div class="recipe-card">
        <div class="image-box">
            <img src="images/${recipe.image}" alt="image of ${recipe.name}" />
        </div>
        <div class="recipe-info">

            <div class="recipe__tags">
                ${tagsTemplate(recipe.tags)}
            </div>

            <h2 class="title"><a href="#">${recipe.name}</a></h2>

            <p class="stars">
                ${ratingTemplate(recipe.rating)}
            </p>

            <p class="description">
                ${recipe.description}
            </p>

        </div>
    </div>`;
}


function tagsTemplate(tags) {
	// loop through the tags list and transform the strings to HTML
	let html = "";

	for (let tag of tags) {
		html += `<span class="tag">${tag}</span>`;
	}

	return html;
}

function ratingTemplate(rating) {
	// begin building an html string using the ratings HTML written earlier as a model.
	let html = `<span
	class="rating"
	role="img"
	aria-label="Rating: ${rating} out of 5 stars"
>`;

	// our ratings are always out of 5, so create a for loop from 1 to 5
	for (let i = 1; i <= 5; i++) {

		// check to see if the current index of the loop is less than or equal to our rating
		// if so then output a filled star
		if (i <= rating) {
			html += `<span class="star filled">★</span>`;
		}

		// else output an empty star
		else {
			html += `<span class="star empty">☆</span>`;
		}
	}

	// after the loop, add the closing tag to our string
	html += `</span>`;

	// return the html string
	return html;
}


// UNIFIED renderRecipes to target the new container ID
function renderRecipes(recipeList) {
	// 1. get the element we will output the recipes into
	// Use the ID created in index.html
	const recipeSection = document.querySelector('#recipes-container');
    if (!recipeSection) return; // Guard clause in case the element doesn't exist

	// 2. transform each recipe object into HTML using recipeTemplate
	const recipeHTML = recipeList.map(recipe => recipeTemplate(recipe)).join("");

	// 3. set the HTML inside the output element
	recipeSection.innerHTML = recipeHTML;
}

function init() {
	// get a random recipe
	const recipe = getRandomListEntry(recipes);

	// render the recipe with renderRecipes
	renderRecipes([recipe]);
}

// Call init() to display a random recipe on page load
init();


// Function to filter and sort recipes
function filterRecipes(query) {
    // Convert the query to lowercase for case-insensitive matching
    const lowerQuery = query.toLowerCase();

    // Filter recipes based on name, description, tags, or ingredients
    const filtered = recipes.filter(recipe => {
        // Check name
        const nameMatch = recipe.name.toLowerCase().includes(lowerQuery);
        // Check description
        const descMatch = recipe.description.toLowerCase().includes(lowerQuery);
        // Check tags (assuming tags is an array of strings)
        const tagMatch = recipe.tags.some(tag => tag.toLowerCase().includes(lowerQuery));

        // Check ingredients (assuming ingredients is an array of strings,
        // and using recipeIngredient key as defined in recipes.mjs)
        const ingredientMatch = recipe.recipeIngredient.some(ing => ing.toLowerCase().includes(lowerQuery));

        return nameMatch || descMatch || tagMatch || ingredientMatch;
    });

    // Sort alphabetically by recipe name
    const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));

    return sorted;
}

// Search handler to call when user submits the search
function searchHandler(e) {
    e.preventDefault();

    // Get the value from the search input
    const searchInput = document.querySelector('#search-input'); // Using ID from modified index.html
    const query = searchInput.value; // Keep original case here, filtering handles lowercasing

    // Filter and sort recipes
    const filteredRecipes = filterRecipes(query);

    // Render the filtered recipes using the unified renderRecipes function
    renderRecipes(filteredRecipes);
}


// Add event listener after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Example event listener using ID from modified index.html
    const searchForm = document.querySelector('#search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', searchHandler);
    }
});

// REMOVED THE REDEFINED renderRecipes AND simplified recipeTemplate AT THE END OF THE FILE