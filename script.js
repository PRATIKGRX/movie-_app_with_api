let movie = [];
var apiKey = "7b316e6d";
const fetchMovies = async function (search = null) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=7b316e6d&s=${search ?? "movie"}&page=1`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("API Response:", data);

        movie = data.Search;

        console.log(movie);
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
        const anchor = document.createElement("a");
        anchor.href=`/displayMovie.html?id=${m.imdbID
}`;
        const movieImg = document.createElement("img");
        movieImg.src = m.Poster; 
        const movieName = document.createElement("h3");
        movieName.textContent = m.Title;
        anchor.appendChild(movieImg)
        movieCard.appendChild(anchor);
        movieCard.appendChild(movieName);
        movieContainer.appendChild(movieCard);
    });
};
const searchMovies = (event)=>{
    const searchBar = document.getElementById("search-bar").value.toLowerCase() ;
    if(searchBar.trim() != "" || searchBar.lenght >=3 ){
        fetchMovies(searchBar);
    }
    else if (searchBar.trim() == "" ){
        fetchMovies();
    }
}




fetchMovies();
document.getElementById("search-bar").addEventListener("input", searchMovies);