const articles = [
	{
		id: 1,
		title: 'Septimus Heap Book One: Magyk',
		date: 'July 5, 2022',
		description:
			'If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.',
		imgSrc: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg',
		imgAlt: 'Book cover for Septimus Heap 1',
		ages: '10-14',
		genre: 'Fantasy',
		stars: '⭐⭐⭐⭐'
	},
	{
		id: 2,
		title: 'Magnus Chase Book One: Sword of Summer',
		date: 'December 12, 2021',
		description:
			'The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.',
		imgSrc:
			'https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300',
		imgAlt: 'Book cover for Magnus Chase 1',
		ages: '12-16',
		genre: 'Fantasy',
		stars: '⭐⭐⭐⭐'
	},
	{
		id: 3,
		title: "Belgariad Book One: Pawn of Prophecy",
		date: "Feb 12, 2022",
		description:
		"A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his 'Aunt Pol' and an elderly man calling himself Wolf --a father and daughter granted near-immortality by one of the Gods -- set out on a complex mission.",
		imgSrc:
		"https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg",
		imgAlt: "Book cover for Pawn of Prophecy",
		ages: "12-16",
		genre: "Fantasy",
		stars: "⭐⭐⭐⭐⭐"
    } // Ensure all articles are here
];

// Helper function to convert star characters or text to a consistent display
const getStarHtml = (stars) => {
    // Apply star-rating class for consistent styling
    // NOTE: Changed '****' to '⭐⭐⭐⭐' for consistency in data but kept the check
    if (stars === '****') {
        return '<span class="star-rating">⭐⭐⭐⭐</span>';
    }
    return `<span class="star-rating">${stars}</span>`;
};

// Function to render all articles
function renderArticles() {
    const container = document.getElementById('articles-container');
    const loadingMessage = document.getElementById('loading-message');

    // Hide the loading message once we have data
    if (loadingMessage) {
        loadingMessage.style.display = 'none';
    }

    // Clear existing content
    container.innerHTML = '';

    articles.forEach(article => {
        // All classes here are now custom classes defined in blog.css
        const articleHtml = `
            <article class="article-item">
                <div class="article-grid">

                    <div class="metadata-col post-metadata-col">
                        <p class="metadata-date">${article.date}</p>
                        <p class="metadata-detail">${article.ages}</p>
                        <p class="metadata-detail metadata-genre">${article.genre}</p>
                        <p>${getStarHtml(article.stars)}</p>
                    </div>

                    <div class="content-col">
                        <h2 class="article-title">
                            <a href="#" class="article-title-link">${article.title}</a>
                        </h2>

                        <div class="article-body-container">
                            <div class="image-wrapper">
                                <img
                                    src="${article.imgSrc}"
                                    alt="${article.imgAlt}"
                                    class="article-image"
                                    onerror="this.onerror=null; this.src='https://placehold.co/300x450/C28585/ffffff?text=Book+Cover'"
                                >
                            </div>
                        </div>

                        <div class="article-body-container">
                            <div class="description-wrapper">
                                <p class="description-text">
                                    ${article.description}
                                    <a href="#" class="read-more-link" aria-label="Read More about ${article.title}">Read More...</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        `;
        container.insertAdjacentHTML('beforeend', articleHtml);
    });
}

// --- 2. INITIALIZATION ---
// Run the rendering function when the page loads
document.addEventListener('DOMContentLoaded', renderArticles);