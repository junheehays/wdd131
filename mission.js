const script = document.createElement('script');

const themeSelector = document.querySelector('.theme-select');
function changeTheme() {
    const selected = themeSelector.value;
    const body = document.body;
    const logo = document.querySelector('#logo');

    if (selected === 'dark') {
        body.classList.add('dark');
        logo.src = "https://wdd131.netlify.app/assets/images/byui-logo_white.png";
    }
    
    else {
        body.classList.remove('dark');
        logo.src = "byui-logo_blue.webp";
    }
}

// add an event listener to the themeSelector element here.
// Use the changeTheme function as the event handler function.
themeSelector.addEventListener('change', changeTheme);