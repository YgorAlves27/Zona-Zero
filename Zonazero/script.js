   
const dropdown = document.querySelector('.dropdown');
const submenu = document.querySelector('.submenu');
dropdown.addEventListener('click', (event) => {
    event.preventDefault();
    if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
        submenu.style.opacity = '0';
    } else {
        submenu.style.display = 'block';
        submenu.style.opacity = '1';
    }
});
document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
        submenu.style.display = 'none';
        submenu.style.opacity = '0';
    }
});


/*---------------LOGIN------------------*/