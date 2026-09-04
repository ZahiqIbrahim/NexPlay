async function loadComponent(elementId, file) {
  const element = document.getElementById(elementId);

  const response = await fetch(file);
  const html = await response.text();

  element.innerHTML = html;
}

async function init() {
  await loadComponent("header", "/html/components/header.html");
  await loadComponent("footer", "/html/components/footer.html");

  const form = document.getElementById("search-form");
  const formInput = document.getElementById("search-input");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const movieName = formInput.value.trim();
    // eslint-disable-next-line no-undef
     if (!movieName) {
      return;
    }

    window.location.href = `/html/searchResults.html?query=${encodeURIComponent(movieName)}`;
  });
}

init();
