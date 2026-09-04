const movieCardsDiv = document.querySelector(".movie-cards-div");
const watchLater = JSON.parse(localStorage.getItem("watchLater")) || [];

async function loadMovies() {
  const movies = await Promise.all(
    watchLater.map((movieId) => getMovie(movieId)),
  );

  loadSearchedMovies(movies);
}

loadMovies();

async function loadSearchedMovies(movies) {
  movies.forEach((movie) => {
    if (movie.data.title != null) {
      console.log(movie.data.title);
      const movieCard = document.createElement("div");

      movieCard.classList.add("movie-card");

      const image = document.createElement("img");
      image.src = `https://image.tmdb.org/t/p/w500/${movie.data.poster_path}`;

      movieCard.append(image);

      const titleRowDiv = document.createElement("div");
      titleRowDiv.classList.add("title-row");
      movieCard.append(titleRowDiv);

      const movieTitle = document.createElement("span");
      movieTitle.classList.add("movie-title");
      movieTitle.textContent = movie.data.title;
      titleRowDiv.append(movieTitle);

      const dateRatingRow = document.createElement("div");
      dateRatingRow.classList.add("date-rating-row");

      const ratingDiv = document.createElement("div");

      ratingDiv.classList.add("rating");

      const ratingValueSpan = document.createElement("span");
      ratingValueSpan.classList.add("rating-value");
      ratingValueSpan.textContent = movie.data.vote_average;
      ratingDiv.append(ratingValueSpan);

      const starSpan = document.createElement("span");
      starSpan.classList.add("star");
      starSpan.textContent = "★";
      ratingDiv.append(starSpan);

      const date = document.createElement("span");
      date.classList.add("date");
      date.textContent = movie.data.release_date.split("-")[0];
      dateRatingRow.append(date);
      dateRatingRow.append(ratingDiv);
      titleRowDiv.append(dateRatingRow);

      const removeBtn = document.createElement("button");
      removeBtn.classList.add("remove");
      removeBtn.textContent = "Remove";
      movieCard.append(removeBtn);

      movieCardsDiv.append(movieCard);

      removeBtn.addEventListener("click", () => {
        event.stopPropagation();

        let watchLater = JSON.parse(localStorage.getItem("watchLater")) || [];

        watchLater.forEach((id, index) => {
          if (id == movie.data.id) {
            watchLater.splice(index, 1);
          }
        });

        localStorage.setItem("watchLater", JSON.stringify(watchLater));

        window.location.href = `watch_later.html`;
      });

      movieCard.addEventListener("click", () => {
        window.location.href = `movie_page.html?query=${encodeURIComponent(movie.data.id)}`;
      });
    }
  });
}

async function getMovie(movieId) {
  try {
    const response = await fetch(
      `https://nex-play-media-service.onrender.com/api/v1/movie/details?id=${movieId}&lang=en-US`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error(response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch movie: ", error);
  }
}
