// ===== DARK MODE =====
const darkModeBtn = document.getElementById('darkModeBtn');
const body = document.body;

if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeBtn.textContent = '☀️';
}

darkModeBtn.addEventListener('click', function () {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        darkModeBtn.textContent = '☀️';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeBtn.textContent = '🌙';
        localStorage.setItem('darkMode', 'disabled');
    }
});

// ===== HAMBURGER MENU =====
const navbar = document.querySelector('.navbar');
if (navbar) {
    const links = Array.from(navbar.querySelectorAll('a'));
    const dmBtn = navbar.querySelector('.dark-mode-btn');

    const navLinks = document.createElement('div');
    navLinks.className = 'nav-links';
    navLinks.id = 'navLinks';
    links.forEach(link => navLinks.appendChild(link));

    const hamBtn = document.createElement('button');
    hamBtn.className = 'hamburger-btn';
    hamBtn.setAttribute('aria-label', 'Toggle navigation');
    hamBtn.setAttribute('aria-expanded', 'false');
    hamBtn.innerHTML = '<span></span><span></span><span></span>';

    navbar.innerHTML = '';
    navbar.appendChild(hamBtn);
    navbar.appendChild(navLinks);
    if (dmBtn) navbar.appendChild(dmBtn);

    hamBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = navLinks.classList.toggle('open');
        hamBtn.setAttribute('aria-expanded', String(isOpen));
        hamBtn.classList.toggle('open', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('open');
            hamBtn.setAttribute('aria-expanded', 'false');
            hamBtn.classList.remove('open');
        });
    });

    document.addEventListener('click', function (e) {
        if (!navbar.contains(e.target)) {
            navLinks.classList.remove('open');
            hamBtn.setAttribute('aria-expanded', 'false');
            hamBtn.classList.remove('open');
        }
    });
}

// ===== PROGRESS BAR =====
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
document.body.prepend(progressBar);

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollTopBtn.textContent = '↑';
document.body.appendChild(scrollTopBtn);

scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

let scrollRafId = null;
window.addEventListener('scroll', function () {
    if (scrollRafId) return;
    scrollRafId = requestAnimationFrame(function () {
        scrollRafId = null;
        const scrollTop = document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        progressBar.style.width = docHeight > 0 ? (scrollTop / docHeight * 100) + '%' : '0%';
        scrollTopBtn.classList.toggle('visible', scrollTop > 300);
    });
}, { passive: true });

// ===== SEARCH (index page only) =====
const searchBox = document.getElementById('searchBox');
if (searchBox) {
    const pagesGrid = document.getElementById('pagesGrid');
    const pageCards = document.querySelectorAll('.page-card');

    const noResults = document.createElement('p');
    noResults.className = 'no-results';
    noResults.textContent = '🔍 No topics found. Try a different search term.';
    pagesGrid.insertAdjacentElement('afterend', noResults);

    function doSearch() {
        const term = searchBox.value.toLowerCase().trim();
        let visible = 0;
        pageCards.forEach(card => {
            const title = card.querySelector('.page-card-title').textContent.toLowerCase();
            const desc = card.querySelector('p').textContent.toLowerCase();
            const match = !term || title.includes(term) || desc.includes(term);
            card.classList.toggle('hidden', !match);
            if (match) visible++;
        });
        noResults.classList.toggle('visible', term.length > 0 && visible === 0);
    }

    searchBox.addEventListener('input', doSearch);
    searchBox.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            this.value = '';
            doSearch();
        }
    });
}
