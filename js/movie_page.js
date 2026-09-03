const params = new URLSearchParams(window.location.search);
const movieId = params.get("query");

const title = document.querySelector("title");
const movieTitle = document.querySelector("#movie-title");
const tagline = document.getElementById("tagline");
const description = document.getElementById("description");
const rating = document.getElementById("rating-value");
const releaseDate = document.getElementById("release-date");
const duration = document.getElementById("duration");
const language = document.getElementById("original-language");
const country = document.getElementById("origin-country");
const movieStatus = document.getElementById("status");
const genres = document.querySelector(".genre-bubble-row");
const playBtn = document.getElementById("play-now-btn");
const cardsDiv = document.querySelector(".production-com");
const trailer = document.getElementById("trailer");
const backdrop = document.getElementById("backdrop");
const budget = document.getElementById("budget");
const revenue = document.getElementById("revenue");
const popularity = document.getElementById("popularity");
const voteCount = document.getElementById("vote-count");


//calling

async function loadMovie() {
  const movie = await getMovie(movieId);
  console.log(movie); //yes

  const image = document.getElementById("movie-poster");
  image.src = `https://image.tmdb.org/t/p/w500/${movie.data.poster_path}`;
  image.alt = "movie poster";

  title.textContent = movie.data.title;
  movieTitle.textContent = movie.data.title;
  tagline.textContent = movie.data.tagline;
  description.textContent = movie.data.overview;
  rating.textContent = movie.data.vote_average;
  releaseDate.textContent += movie.data.release_date;
  duration.textContent += `${movie.data.runtime} min`;
  language.textContent += movie.data.original_language.toUpperCase();
  country.textContent = movie.data.origin_country;
  movieStatus.textContent = movie.data.status;

  movie.data.genres.forEach((genre) => {
    const newGenreDiv = document.createElement("div");
    const newGenreSpan = document.createElement("span");
    newGenreSpan.textContent = genre.name;
    newGenreDiv.classList.add("genre-bubble");
    newGenreDiv.append(newGenreSpan);

    genres.append(newGenreDiv);
  });
  playBtn.addEventListener("click", () => {
    window.open(movie.data.stream_url, "_blank");
  });

  movie.data.production_companies.forEach((company) => {
    const newCard = document.createElement("div");
    newCard.classList.add("prod-info-card");

    if (company.logo_path) {
      const image = document.createElement("img");
      image.src = `https://image.tmdb.org/t/p/w500/${company.logo_path}`;
      image.alt = "Company Logo";
      newCard.append(image);
    }

    const spanName = document.createElement("span");
    spanName.textContent = company.name;
    const spanCu = document.createElement("span");
    spanCu.textContent = company.origin_country;

    newCard.append(spanName);
    newCard.append(spanCu);
    cardsDiv.append(newCard);
  });

  // src="https://www.youtube.com/embed/P3uI5sLosKU"
  // width="560"
  // height="315"
  // allowfullscreen

  trailer.src = "https://www.youtube.com/embed/" + movie.data.trailer_id;
  trailer.width = "460";
  trailer.height = "250";
  trailer.allowfullscreen = true;

  backdrop.src = "https://image.tmdb.org/t/p/w500" + movie.data.backdrop_path;

  budget.textContent += movie.data.budget;
  revenue.textContent += movie.data.revenue;
  popularity.textContent = movie.data.popularity;
  voteCount.textContent = movie.data.vote_count;
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

loadMovie();




const showSimilarMoviesRow = document.getElementById("show-similar-movies-row");

// eslint-disable-next-line no-unused-vars
async function loadSearchedMovies(movie, row) {
  movie.data.results.forEach((movie) => {
    if (movie.title != null) {
      console.log(movie.title);
      const movieCard = document.createElement("div");

      movieCard.classList.add("movie-card-sim");

      const image = document.createElement("img");
      image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

      movieCard.append(image);

      const titleRowDiv = document.createElement("div");
      titleRowDiv.classList.add("title-row-sim");
      movieCard.append(titleRowDiv);

      const movieTitle = document.createElement("span");
      movieTitle.classList.add("movie-title-sim");
      movieTitle.textContent = movie.title;
      titleRowDiv.append(movieTitle);

      const dateRatingRow = document.createElement("div");
      dateRatingRow.classList.add("date-rating-row-sim");

      const ratingDiv = document.createElement("div");

      ratingDiv.classList.add("rating");

      const ratingValueSpan = document.createElement("span");
      ratingValueSpan.classList.add("rating-value-sim");
      ratingValueSpan.textContent = movie.vote_average;
      ratingDiv.append(ratingValueSpan);

      const starSpan = document.createElement("span");
      starSpan.classList.add("star-sim");
      starSpan.textContent = "★";
      ratingDiv.append(starSpan);

      const date = document.createElement("span");
      date.classList.add("date-sim");
      date.textContent = movie.release_date.split("-")[0];
      dateRatingRow.append(date);
      dateRatingRow.append(ratingDiv);
      titleRowDiv.append(dateRatingRow);

      row.append(movieCard);

      movieCard.addEventListener("click", () => {
        window.location.href = `movie_page.html?query=${encodeURIComponent(movie.id)}`;
      });
    }
  });
}

// eslint-disable-next-line no-unused-vars
async function getMovies(page) {
  //get trending movies
  const trendingResponse = await fetch(
    `https://nex-play-media-service.onrender.com/api/v1/movie/similar?lang=en-US&id=${movieId}&page=1${page}`,
    {
      method: "GET",
    },
  );
  const trendingData = await trendingResponse.json();


  loadSearchedMovies(trendingData, showSimilarMoviesRow);

  addScrollButtons(
    showSimilarMoviesRow.closest(".show-movies-row"),
    showSimilarMoviesRow,
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
