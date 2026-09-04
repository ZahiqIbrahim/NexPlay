async function loadComponent(elementId, file) {
  const element = document.getElementById(elementId);

  const response = await fetch(file);
  const html = await response.text();

  element.innerHTML = html;
}

async function init() {
  const isRootPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
  const componentPath = isRootPage ? 'html/components/' : 'components/';
  const htmlPath = isRootPage ? 'html/' : '';
  const cssPath = isRootPage ? 'css/' : '../css/';
  
  // Load CSS for header/footer
  const headerCss = document.createElement('link');
  headerCss.rel = 'stylesheet';
  headerCss.href = cssPath + 'header.css';
  document.head.appendChild(headerCss);
  
  const footerCss = document.createElement('link');
  footerCss.rel = 'stylesheet';
  footerCss.href = cssPath + 'footer.css';
  document.head.appendChild(footerCss);
  
  await loadComponent("header", componentPath + "header.html");
  await loadComponent("footer", componentPath + "footer.html");

  const form = document.getElementById("search-form");
  const formInput = document.getElementById("search-input");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const movieName = formInput.value.trim();
    // eslint-disable-next-line no-undef
     if (!movieName) {
      return;
    }

    window.location.href = `${htmlPath}searchResults.html?query=${encodeURIComponent(movieName)}`;
  });
  
  // Fix navigation links based on current page location
  const homeLink = document.getElementById('home-link');
  const watchLaterLink = document.getElementById('watch-later-link');
  
  if (isRootPage) {
    if (homeLink) homeLink.href = 'index.html';
    if (watchLaterLink) watchLaterLink.href = 'html/watch_later.html';
  } else {
    if (homeLink) homeLink.href = '../index.html';
    if (watchLaterLink) watchLaterLink.href = 'watch_later.html';
  }
}

init();
