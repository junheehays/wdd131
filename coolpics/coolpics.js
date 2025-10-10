/* ----------------------------------------------------
 * Image Gallery Modal/Viewer Logic
 * ----------------------------------------------------
 */

const gallery = document.querySelector('.gallery');
// Declare 'modal' and 'closeButton' outside to ensure they are accessible
// and represent the single, persistent modal and its button.
let modal = null;
let closeButton = null;

function toggleMenu() {
    // 1. Get the menu list element using the ID added in the HTML
    const menuList = document.getElementById('menuList');
    
    // 2. Check if the element exists
    if (menuList) {
        // 3. Use the toggle method to add or remove the 'open' class
        //    The 'open' class in CSS changes the display from none to block.
        menuList.classList.toggle('open');
    }
}

/**
 * @function createModal
 * Dynamically creates the <dialog> element with the image and close button.
 * This should only run once.
 * @returns {HTMLDialogElement} The created dialog element.
 */
function createModal() {
    const dialog = document.createElement('dialog');
    dialog.classList.add('image-viewer-modal');
    dialog.innerHTML = `
        <img src="" alt="">
        <button class='close-viewer' aria-label="Close image viewer">X</button>
    `;
    document.body.appendChild(dialog);

    // After creation, get the close button once
    closeButton = dialog.querySelector('.close-viewer');

    // Add listeners once to the newly created modal and its close button
    addModalListeners(dialog, closeButton); // Pass both the dialog and the button
    
    return dialog;
}

/**
 * @function viewImage
 * Handles the click event on the gallery, opens the modal, and sets image attributes.
 * @param {Event} event - The click event object.
 */
function viewImage(event) {
    const clickedImage = event.target.closest('img');
    if (!clickedImage) {
        return;
    }

    // If modal hasn't been created yet, create it
    if (!modal) {
        modal = createModal();
    }
    
    const src = clickedImage.getAttribute('src');
    const alt = clickedImage.getAttribute('alt');
    const fullSrc = src.replace('-sm.jpeg', '-full.jpeg');
    
    const modalImage = modal.querySelector('img');
    modalImage.setAttribute('src', fullSrc);
    modalImage.setAttribute('alt', alt);
    
    modal.showModal();
}

/**
 * @function closeModal
 * Closes the dialog/modal.
 * @param {HTMLDialogElement} dialogElement - The dialog element to close.
 */
function closeModal(dialogElement) {
    dialogElement.close();
}

/**
 * @function addModalListeners
 * Adds all necessary event listeners to the modal and its close button after it's created.
 * This should ideally run only once when the modal is first created.
 * @param {HTMLDialogElement} dialogElement - The dialog element.
 * @param {HTMLButtonElement} closeBtn - The close button element.
 */
function addModalListeners(dialogElement, closeBtn) {
    // 1. Close button listener
    closeBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent bubbling to the dialog itself
        closeModal(dialogElement);
    });

    // 2. Outside click listener (backdrop click)
    dialogElement.addEventListener('click', (event) => {
        if (event.target === dialogElement) {
            closeModal(dialogElement);
        }
    });
}

// Add event listener to the gallery
gallery.addEventListener('click', viewImage);