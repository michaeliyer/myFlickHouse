const movies = [
  ...flicksHorror,
  ...flicksBlackComedy,
  ...flicksThriller,
  ...flicksDrama,
  ...flicksComedy,
  ...flicksMusic,
  ...flicksWestern,
  ...flicksMysterySuspense,
  ...flicksActionAdventure,
  ...flicksFranky,
  ...flicksShows,
  ...flicksSports,
  ...flicksHindu,
  ...flicksCrimeDrama,
  ...flicksActionComedy,
  ...flicksRandos,
  ...flicksDocumentary,
];

const digitToWord = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};

function normalizeForSearch(text) {
  let result = text.toLowerCase();

  // Expand single digits by adding word form after
  for (const [digit, word] of Object.entries(digitToWord)) {
    result = result.replace(new RegExp(`${digit}`, "g"), `${digit} ${word}`);
  }

  // Expand number words by adding digit form after
  for (const [word, digit] of Object.entries(wordToDigit)) {
    result = result.replace(
      new RegExp(`\\b${word}\\b`, "g"),
      `${word} ${digit}`
    );
  }

  return result;
}

const wordToDigit = Object.fromEntries(
  Object.entries(digitToWord).map(([d, w]) => [w, d])
);

let isSingleView = false;
let currentMovie = null;

// Define emoji mapping for genres
const genreEmojis = {
  Drama: "🎭",
  Comedy: "😂",
  Horror: "👻",
  BlackComedy: "🤣",
  ActionAdventure: "🏴‍☠️",
  MysterySuspense: "🔍",
  Music: "🎵",
  Phish: "🎸",
  Western: "🤠",
  Thriller: "🔪",
  FrankyFiles: "📽️",
  Shows: "📺",
  Sports: "🏈",
  Hindu: "🕉️",
  CrimeDrama: "👮‍♂️",
  ActionComedy: "🤡",
  Randos: "👀",
};

function populateGenreDropdown() {
  const genreSelect = document.getElementById("genreSelect");
  genreSelect.innerHTML = ""; // Clear existing options

  // Add default "Choose Genre" option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.textContent = "Choose Genre";
  genreSelect.appendChild(defaultOption);

  const counts = {};

  // Count genres
  movies.forEach((movie) => {
    const genre = movie.genre;
    counts[genre] = (counts[genre] || 0) + 1;
  });

  // Total count
  const total = movies.length;

  // Create "All Titles" option
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = `🎥All Titles📽️ (${total})`;
  genreSelect.appendChild(allOption);

  // Create options for each genre (sorted)
  Object.entries(counts)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([genre, count]) => {
      const option = document.createElement("option");
      option.value = genre;
      option.textContent = `${genre} (${count})`;
      genreSelect.appendChild(option);
    });
}

function clearFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("keywordInput").value = "";
  document.getElementById("yearInput").value = "";
  document.getElementById("refInput").value = "";
  document.getElementById("genreSelect").value = "";
  document.getElementById("movieList").style.display = "none";
}

// Helper function to get sort title (removes leading "The ")
function getSortTitle(title) {
  return title.replace(/^The\s+/i, "");
}

function renderMovies(filters = {}) {
  const list = document.getElementById("movieList");
  list.innerHTML = "";

  let filtered = movies;
  // If ref is filled, filter by ref (exact match, number)
  if (filters.ref) {
    filtered = filtered.filter(
      (movie) => String(movie.ref) === String(filters.ref)
    );
  } else {
    filtered = filtered.filter((movie) => {
      const titleMatch =
        !filters.title ||
        movie.title
          .toLowerCase()
          .split(/\s+/)[0]
          .startsWith((filters.title || "").toLowerCase());
      // Multi-word keyword search: all words must be present in title or genre
      //   const keywordInput = (filters.keyword || "").toLowerCase().trim();
      //   const keywordWords = keywordInput.split(/\s+/).filter(Boolean);
      //   const keywordMatch = keywordWords.every(
      //     (word) =>
      //       movie.title.toLowerCase().includes(word) ||
      //       movie.genre.toLowerCase().includes(word)
      //   );
      const normalizedTitle = normalizeForSearch(movie.title);
      const normalizedGenre = normalizeForSearch(movie.genre);
      const keywordInput = normalizeForSearch(filters.keyword || "");
      const keywordWords = keywordInput.split(/\s+/).filter(Boolean);

      const keywordMatch = keywordWords.every(
        (word) =>
          normalizedTitle.includes(word) || normalizedGenre.includes(word)
      );
      const yearMatch =
        !filters.year ||
        (filters.year.toLowerCase() === "null"
          ? !movie.year
          : movie.year === parseInt(filters.year));
      // Treat 'all' as no genre filter
      const genreMatch =
        !filters.genre ||
        filters.genre === "all" ||
        movie.genre === filters.genre;
      return titleMatch && keywordMatch && yearMatch && genreMatch;
    });
  }
  filtered = filtered.sort((a, b) =>
    getSortTitle(a.title).localeCompare(getSortTitle(b.title))
  );

  if (filtered.length === 0) {
    list.innerHTML = "<p>No movies found.</p>";
    list.style.display = "block";
    return;
  }

  filtered.forEach((movie) => {
    const div = document.createElement("div");
    div.className = "movie-card";
    div.innerHTML = `
        <h3>${movie.title} (${movie.year})</h3>
        <p><strong>Genre:</strong> ${movie.genre} <span class="ref-num">[Ref #${
      movie.ref || "N/A"
    }]</span></p>
        <button class="view-movie" data-movie-id="${
          movie.title
        }">View Movie</button>
      `;
    list.appendChild(div);
  });

  // Show the movie list only when we have results
  list.style.display = "block";

  // Add click handlers for view buttons
  document.querySelectorAll(".view-movie").forEach((button) => {
    button.addEventListener("click", (e) => {
      const movieTitle = e.target.dataset.movieId;
      showSingleMovie(movieTitle);
    });
  });
}

function showSingleMovie(movieTitle) {
  const movie = movies.find((m) => m.title === movieTitle);
  if (!movie) return;

  currentMovie = movie;
  document.getElementById("movieList").style.display = "none";
  const singleView = document.getElementById("singleMovieView");
  const selectedMovie = document.getElementById("selectedMovie");

  selectedMovie.innerHTML = `
      <h2>${movie.title} (${movie.year})</h2>
      <p><strong>Genre:</strong> ${movie.genre} <span class="ref-num">[Ref #${
    movie.ref || "N/A"
  }]</span></p>
      <video id="moviePlayer" width="600" controls>
        <source src="${movie.dropboxUrl}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div class="volume-control">
        <label for="volumeSlider">Volume:</label>
        <input type="range" id="volumeSlider" min="0" max="1" step="0.01" value="1">
      </div>
      <div class="repeat-control">
        <label for="repeatCount">Repeat:</label>
        <input type="number" id="repeatCount" min="0" value="0" style="width: 60px;">
        <span id="repeatsLeft" style="margin-left:10px; color:#aaa;"></span>
      </div>
      <div class="movie-actions">
        <a href="${
          movie.downloadUrl
        }" download class="download-btn">Download Movie</a>
      </div>
    `;

  singleView.style.display = "block";

  // Set up custom volume slider
  const video = document.getElementById("moviePlayer");
  const volumeSlider = document.getElementById("volumeSlider");
  const repeatInput = document.getElementById("repeatCount");
  const repeatsLeftSpan = document.getElementById("repeatsLeft");
  let repeatsLeft = 0;

  function updateRepeatsLeftDisplay() {
    if (repeatsLeftSpan) {
      repeatsLeftSpan.textContent = `Remaining repeats: ${repeatsLeft}`;
    }
  }

  if (volumeSlider) {
    volumeSlider.value = video.volume;
    volumeSlider.addEventListener("input", function () {
      video.volume = this.value;
    });
  }

  // Set repeatsLeft when the input changes
  if (repeatInput) {
    repeatsLeft = Math.max(0, parseInt(repeatInput.value, 10) || 0);
    updateRepeatsLeftDisplay();
    repeatInput.addEventListener("input", function () {
      repeatsLeft = Math.max(0, parseInt(this.value, 10) || 0);
      updateRepeatsLeftDisplay();
    });
  }

  // Set repeatsLeft when a new movie is loaded (i.e., when showSingleMovie is called)
  repeatsLeft = Math.max(
    0,
    parseInt(repeatInput ? repeatInput.value : 0, 10) || 0
  );
  updateRepeatsLeftDisplay();

  if (video) {
    video.addEventListener("ended", function () {
      if (repeatsLeft > 0) {
        repeatsLeft--;
        updateRepeatsLeftDisplay();
        video.currentTime = 0;
        video.play();
      } else {
        updateRepeatsLeftDisplay();
      }
    });
  }
}

function showMovieList() {
  document.getElementById("singleMovieView").style.display = "none";
  document.getElementById("movieList").style.display = "block";
  currentMovie = null;
}

// Event Listeners
document.getElementById("searchInput").addEventListener("input", updateFilters);
document
  .getElementById("keywordInput")
  .addEventListener("input", updateFilters);
document.getElementById("yearInput").addEventListener("input", updateFilters);
document.getElementById("refInput").addEventListener("input", updateFilters);
document
  .getElementById("genreSelect")
  .addEventListener("change", updateFilters);
document.getElementById("backToList").addEventListener("click", showMovieList);
document.getElementById("clearButton").addEventListener("click", clearFilters);

function updateFilters() {
  const filters = {
    title: document.getElementById("searchInput").value,
    keyword: document.getElementById("keywordInput").value,
    year: document.getElementById("yearInput").value,
    ref: document.getElementById("refInput").value,
    genre: document.getElementById("genreSelect").value,
  };
  renderMovies(filters);
}

// Initialize the page
document.getElementById("movieList").style.display = "none";
populateGenreDropdown();
console.log("Watch Movies All The Time!!!");
