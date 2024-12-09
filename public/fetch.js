const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OThiMzU1NDMxYzg4M2I5NmE3N2MzNDc1YjNiMDZjYyIsIm5iZiI6MTcyOTU3MDM0Ni42NjU4NDUsInN1YiI6IjY3MTcyMWU0NWU5ZDZmNWQwZDQ4ZTdmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hMiBr1ab49oPU8ECBEnPaRdEL0rA916VT0lgaL312y4'
  }
};


let selectedGenres = [];

const toggleGenre = (genreId, buttonElement) => {
  if(selectedGenres.includes(genreId)) {
    //remove genre if it's already selected
    selectedGenres = selectedGenres.filter(id => id !== genreId);
    buttonElement.classList.remove('toggled')
  } else {
    //add genre if not selectef
    selectedGenres.push(genreId);
    buttonElement.classList.add('toggled')
  }
  console.log('Selected Genres:', selectedGenres);
}


const resetGenres = () => {
    selectedGenres = []; // Clear selected genres
    console.log('Genres reset');

    // Get all buttons and remove the 'toggled' class
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.remove('toggled');
    });

    // Optionally clear any displayed movies
    const movieContainer = document.getElementById('movie-container');
    if (movieContainer) {
        movieContainer.innerHTML = '';
    }
};


const fetchMovie = async () => {
    try {
        let pageNum = Math.floor(Math.random() * 500);
        let movieNum = Math.floor(Math.random() * 20);
        const genreParam = selectedGenres.join(',');

        const baseURL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&with_genres=${genreParam}&sort_by=popularity.desc&page=${pageNum + 1}&api_key=860d35011d4b382eb01bfd0343baa89e`;

        // Fetch the movie data
        const movieResponse = await fetch(baseURL);
        if (!movieResponse.ok) throw new Error('Failed to fetch movie data');
        const movieData = await movieResponse.json();

        const movieContainer = document.getElementById('movie-container');
        movieContainer.innerHTML = ''; // Clear previous content

        if (movieData.results && movieData.results.length > 0) {
            const movie = movieData.results[movieNum];
            const movieTitle = movie.original_title;
            const movieId = movie.id;

            console.log(movieTitle, movieId);

            // Update the title in the container
            const movieName = document.createElement('h2');
            movieName.textContent = movieTitle;
            movieContainer.appendChild(movieName);

            // Fetch the image for the specific movie
            const imageURL = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=860d35011d4b382eb01bfd0343baa89e`;
            const imageResponse = await fetch(imageURL);
            if (!imageResponse.ok) throw new Error('Failed to fetch image data');
            const imageData = await imageResponse.json();

            if (imageData.backdrops && imageData.backdrops.length > 0) {
                const imagePath = `https://image.tmdb.org/t/p/w300${imageData.posters[0].file_path}`;
                const image = document.createElement('img');
                image.setAttribute('src', imagePath);
                movieContainer.appendChild(image);
            } else {
                const imageNotFoundText = document.createElement('p');
                imageNotFoundText.textContent = 'No image found'
                movieContainer.appendChild(imageNotFoundText)
            }
        } else {
            // No movies found for the selected genres
            movieContainer.innerHTML = 'No movies found for the selected genres.';
        }
    } catch (error) {
        console.error("An error occurred:", error);
        const movieContainer = document.getElementById('movie-container');
        movieContainer.innerHTML = 'An error occurred while fetching movie data. Please try again later.';
    }
};



document.getElementById('action-btn').addEventListener('click', (e) => toggleGenre(28, e.target));
document.getElementById('adventure-btn').addEventListener('click', (e) => toggleGenre(12, e.target));
document.getElementById('animation-btn').addEventListener('click', (e) => toggleGenre(16, e.target));
document.getElementById('comedy-btn').addEventListener('click', (e) => toggleGenre(35, e.target));
document.getElementById('crime-btn').addEventListener('click', (e) => toggleGenre(80, e.target));
document.getElementById('drama-btn').addEventListener('click', (e) => toggleGenre(18, e.target));
document.getElementById('documentary-btn').addEventListener('click', (e) => toggleGenre(99, e.target));
document.getElementById('fantasy-btn').addEventListener('click', (e) => toggleGenre(14, e.target));
document.getElementById('horror-btn').addEventListener('click', (e) => toggleGenre(27, e.target));
document.getElementById('mystry-btn').addEventListener('click', (e) => toggleGenre(9648, e.target));
document.getElementById('romance-btn').addEventListener('click', (e) => toggleGenre(10749, e.target));
document.getElementById('scifi-btn').addEventListener('click', (e) => toggleGenre(878, e.target));
document.getElementById('thriller-btn').addEventListener('click', (e) => toggleGenre(53, e.target));
document.getElementById('war-btn').addEventListener('click', (e) => toggleGenre(10752, e.target));
document.getElementById('submit-btn').addEventListener('click', () => fetchMovie());
document.getElementById('reset-btn').addEventListener('click', () => resetGenres());

