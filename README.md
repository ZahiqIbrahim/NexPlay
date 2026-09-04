# Nex Play

Nex Play is a modern movie discovery and streaming platform that lets you browse trending, top-rated, and popular movies and watch them for free. Features include movie search, detailed movie information with posters and trailers, a watch later list, and similar movie recommendations.

## Features

- **Movie Discovery**: Browse trending, top-rated, and popular movies
- **Search**: Find movies by title with instant search results
- **Watch Later**: Save movies to your watch later list for later viewing
- **Movie Details**: View comprehensive movie information including:
  - Movie posters and backdrops
  - Release dates, ratings, and runtime
  - Genre information
  - Budget and revenue details
  - Production companies
  - Similar movie recommendations
  - Movie trailers
- **Watch for Free**: Stream movies directly from the platform
- **Modern UI**: Clean, responsive dark theme design
- **Fast Performance**: Lightweight vanilla JavaScript implementation

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **API**: TMDB (The Movie Database) API
- **Storage**: LocalStorage for watch later functionality

## Getting Started

### Prerequisites
- A modern web browser
- Internet connection for API calls

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/NexPlay.git
```

2. Navigate to the project directory:
```bash
cd NexPlay
```

3. Open `index.html` in your web browser

No build process or dependencies required!

## Project Structure

```
NexPlay/
├── index.html              # Main landing page
├── html/
│   ├── components/         # Reusable header/footer components
│   │   ├── header.html
│   │   └── footer.html
│   ├── movie_page.html     # Individual movie details
│   ├── searchResults.html  # Search results page
│   └── watch_later.html    # Watch later list
├── css/                    # Styling files
│   ├── index.css
│   ├── header.css
│   ├── footer.css
│   ├── movie_page.css
│   ├── searchResults.css
│   ├── watch_later.css
│   └── similar_movies.css
├── js/                     # JavaScript functionality
│   ├── index.js
│   ├── search.js
│   ├── movie_page.js
│   ├── watch_later.js
│   └── componentes.js
└── README.md
```

## Usage

1. **Browse Movies**: The homepage displays trending, top-rated, and popular movies
2. **Search**: Use the search bar to find specific movies
3. **View Details**: Click on any movie card to see detailed information
4. **Watch Later**: Click the watch later button to save movies for later
5. **Watch**: Click the "Play Now" button to stream movies

## Deployment

This project can be easily deployed to GitHub Pages:

1. Create a new GitHub repository
2. Push your code to the repository
3. Enable GitHub Pages in repository settings
4. Select the main branch as the source

## API

This project uses the TMDB API through a custom media service backend for movie data and images.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- TMDB API for providing movie data
- All contributors and users of Nex Play
