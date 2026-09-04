const showTrendingMoviesRow = document.getElementById(
  "show-trending-movies-row",
);

const showTopRatedMoviesRow = document.getElementById(
  "show-top-rated-movies-row",
);

const showPopularMoviesRow = document.getElementById("show-popular-movies-row");

// eslint-disable-next-line no-unused-vars
async function loadSearchedMovies(movie, row) {
  movie.data.results.forEach((movie) => {
    if (movie.title != null) {
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

      const dateRatingRow = document.createElement("div");
      dateRatingRow.classList.add("date-rating-row");

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

      const date = document.createElement("span");
      date.classList.add("date");
      date.textContent = movie.release_date.split("-")[0];
      dateRatingRow.append(date);
      dateRatingRow.append(ratingDiv);
      titleRowDiv.append(dateRatingRow);

      row.append(movieCard);

      movieCard.addEventListener("click", () => {
        window.location.href = `/html/movie_page.html?query=${encodeURIComponent(movie.id)}`;
      });
    }
  });
}

// eslint-disable-next-line no-unused-vars
async function getMovies(page) {
  //get trending movies
  const trendingResponse = await fetch(
    `https://nex-play-media-service.onrender.com/api/v1/movie/trending?lang=en-US&time=week&page=${page}`,
    {
      method: "GET",
    },
  );
  const trendingData = await trendingResponse.json();

  //get top rated movies
  const topRatedResponse = await fetch(
    `https://nex-play-media-service.onrender.com/api/v1/movie/top_rated?lang=en-US&page=${page}`,
    {
      method: "GET",
    },
  );
  const topRatedData = await topRatedResponse.json();

  //get top Popular movies
  const popularResponse = await fetch(
    `https://nex-play-media-service.onrender.com/api/v1/movie/popular?lang=en-US&page=${page}`,
    {
      method: "GET",
    },
  );
  const popularData = await popularResponse.json();

  loadSearchedMovies(trendingData, showTrendingMoviesRow);
  loadSearchedMovies(topRatedData, showTopRatedMoviesRow);
  loadSearchedMovies(popularData, showPopularMoviesRow);

  addScrollButtons(
    showTrendingMoviesRow.closest(".show-movies-row"),
    showTrendingMoviesRow,
  );
  addScrollButtons(
    showTopRatedMoviesRow.closest(".show-movies-row"),
    showTopRatedMoviesRow,
  );
  addScrollButtons(
    showPopularMoviesRow.closest(".show-movies-row"),
    showPopularMoviesRow,
  );
}

getMovies(1);

function addScrollButtons(rowContainer, cardsContainer) {
  const leftBtn = document.createElement("button");
  leftBtn.classList.add("scroll-btn", "scroll-btn-left");
  leftBtn.textContent = "‹";

  const rightBtn = document.createElement("button");
  rightBtn.classList.add("scroll-btn", "scroll-btn-right");
  rightBtn.textContent = "›";

  rowContainer.append(leftBtn, rightBtn);

  const scrollAmount = 600; // px per click, adjust to taste

  leftBtn.addEventListener("click", () => {
    cardsContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  rightBtn.addEventListener("click", () => {
    cardsContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
}
