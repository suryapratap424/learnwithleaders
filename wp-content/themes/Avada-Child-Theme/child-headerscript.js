// Create a function to fire the keydown event
function fireKeydownEvent() {
    const inputField = document.getElementById('footer-text-copyright');
    
    const event = new KeyboardEvent('keydown', {
        key: 'backspace', // You can change the key according to your requirements
        keyCode: 8, // ASCII code for 'backspace', you can change it for a different key
        bubbles: true,
        cancelable: true
    });

    // Dispatch the event on the input field
    inputField.dispatchEvent(event);
}

// Call the function when the page loads
window.addEventListener('load', function() {
    fireKeydownEvent();
});