let movie = [];
const fetchMovies = async function () {
    try {
        const response = await fetch("https://api.dynoacademy.com/test-api/v1/movies?search=");
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        movie = data.moviesData;

        displayMovies(movie); 
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
};

function displayMovies(movies) {
    let movieContainer = document.getElementById("movie-container");
    movieContainer.innerHTML = ""; 
    movies.forEach((m) => {
        const movieCard = document.createElement("div");
        const movieImg = document.createElement("img");
        movieImg.src = m.image; 
        const movieName = document.createElement("h3");
        movieName.textContent = m.name;
        movieCard.appendChild(movieImg);
        movieCard.appendChild(movieName);
        movieContainer.appendChild(movieCard);
    });
};

const searchMovies = (event) => {
    const searchBar = event.target.value.toLowerCase();
    const filteredMovies = movie.filter((m) => {
        return m.name.toLowerCase().includes(searchBar); 
    });
    displayMovies(filteredMovies); 
};

fetchMovies();

document.getElementById("search-bar").addEventListener("input", searchMovies);
