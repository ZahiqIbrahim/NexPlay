const params = new URLSearchParams(window.location.search);

const movieName = params.get("query");

const movieCardsDiv = document.querySelector(".movie-cards-div");

// eslint-disable-next-line no-unused-vars
async function loadSearchedMovies(movies) {
  movies.data.results.forEach((movie) => {
    if (movie.title != "") {
      console.log(movie.title);
      const movieCard = document.createElement("div");
      
      movieCard.classList.add("movie-card");

      const image = document.createElement("img");
      image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

      movieCard.append(image);

      const titleRowDiv = document.createElement("div");
      titleRowDiv.classList.add("title-row");
      movieCard.append(titleRowDiv);

      const movieTitle = document.createElement("span");
      movieTitle.classList.add("movie-title");
      movieTitle.textContent = movie.title;
      titleRowDiv.append(movieTitle);

      const ratingDiv = document.createElement("div");
      
      ratingDiv.classList.add("rating");

      const ratingValueSpan = document.createElement("span");
      ratingValueSpan.classList.add("rating-value");
      ratingValueSpan.textContent = movie.vote_average;
      ratingDiv.append(ratingValueSpan);

      const starSpan = document.createElement("span");
      starSpan.classList.add("star");
      starSpan.textContent = "★";
      ratingDiv.append(starSpan); 

      titleRowDiv.append(ratingDiv);

      movieCardsDiv.append(movieCard);
    }
  });
}

// eslint-disable-next-line no-unused-vars
async function searchMovie(movieName, page) {
  const response = await fetch(
    `https://nex-play-media-service.onrender.com/api/v1/global/search?query=${encodeURIComponent(movieName)}&includeAdult=true&page=${page}&lang=en-US`,
    {
      method: "GET",
    },
  );

  const data = await response.json();
  loadSearchedMovies(data);
}

searchMovie(movieName, 1);
