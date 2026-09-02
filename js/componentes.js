async function loadComponent(elementId, file) {
  const element = document.getElementById(elementId);

  const response = await fetch(file);
  const html = await response.text();

  element.innerHTML = html;
}

async function init() {
  await loadComponent("header", "components/header.html");
  await loadComponent("footer", "components/footer.html");

  const form = document.getElementById("search-form");
  const formInput = document.getElementById("search-input");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const movieName = formInput.value.trim();
    // eslint-disable-next-line no-undef
     if (!movieName) {
      return;
    }

    window.location.href =
      `searchResults.html?query=${encodeURIComponent(movieName)}`;
  });
}

init();
