// Dark Mode Toggle
const darkModeBtn = document.getElementById('darkModeBtn');
const body = document.body;

if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeBtn.textContent = '☀️';
}

darkModeBtn.addEventListener('click', function() {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        darkModeBtn.textContent = '☀️';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeBtn.textContent = '🌙';
        localStorage.setItem('darkMode', 'disabled');
    }
});
