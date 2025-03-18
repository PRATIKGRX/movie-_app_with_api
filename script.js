let movie = [];
const fetchMovies = async function (searchBar=null) {
    try {
        const response = await fetch(`https://api.dynoacademy.com/test-api/v1/movies?search=${searchBar??""}`);
        
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
        const imgAnker=document.createElement("a");
        imgAnker.href=`/movieDetail.html?id=${m.id}`;
        imgAnker.append(movieImg);
        const movieName = document.createElement("h3");
        movieName.textContent = m.name;
        movieCard.appendChild(imgAnker);
        movieCard.appendChild(movieName);
        movieContainer.appendChild(movieCard);
    });
};

const searchMovies = (event) => {
    var note=document.getElementById("note");
    const searchBar = event.target.value.toLowerCase();
    if(searchBar.trim()!="" && searchBar.length >= 3) {
        note.style.display="none";
        fetchMovies(searchBar);
    }
    else if(searchBar.trim()=="")
    {
        note.style.display="none";
    }
    else
    {
        note.style.display="block";
        fetchMovies();
    }
};

fetchMovies();

document.getElementById("search-bar").addEventListener("input", searchMovies);
