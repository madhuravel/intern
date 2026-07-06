// Reusable Navbar & Footer components, injected into placeholder elements.
// Keeping these as JS-rendered partials avoids duplicating markup across
// login.html / register.html — edit once here, both pages update.

function renderNavbar(activePage) {
  const links = [
    { href: 'login.html', label: 'login' },
    { href: 'register.html', label: 'register' },
  ];

  const linksHtml = links.map(link => {
    const isActive = link.href === activePage;
    return `<a class="nav-link${isActive ? ' active' : ''}" href="${link.href}">${link.label}</a>`;
  }).join('');

  return `
    <nav class="navbar navbar-terminal">
      <div class="container d-flex justify-content-between align-items-center">
        <a class="navbar-brand" href="index.html">
          <span class="dot dot--red"></span><span class="dot dot--yellow"></span><span class="dot dot--green"></span>
          ~/auth
        </a>
        <div class="d-flex gap-4">${linksHtml}</div>
      </div>
    </nav>
  `;
}

function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="footer-terminal">
      &copy; ${year} Madhuravel P — Task 2, ApexPlanet Full Stack Internship
    </footer>
  `;
}

function mountComponents(activePage) {
  const navSlot = document.getElementById('navbar-slot');
  const footerSlot = document.getElementById('footer-slot');
  if (navSlot) navSlot.innerHTML = renderNavbar(activePage);
  if (footerSlot) footerSlot.innerHTML = renderFooter();
}
