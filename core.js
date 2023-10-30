// Check if the user previously set dark mode preference
const isDarkMode = localStorage.getItem('darkMode') === 'true';

// Function to toggle dark mode
const toggleDarkMode = dark => {
	if (dark) {
		document.body.classList.add('bg-dark', 'text-light');
		document.querySelector('.rounded-form').style.background = '#343a40';
	} else {
		document.body.classList.remove('bg-dark', 'text-light');
		document.querySelector('.rounded-form').style.background = '#fff';
	}
	// Save the user's dark mode preference to localStorage
	localStorage.setItem('darkMode', dark);
};

// Set dark mode based on the user's preference
toggleDarkMode(isDarkMode);

const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.checked = isDarkMode;

// Set the checkbox based on the preference
darkModeToggle.addEventListener('change', () => {
	toggleDarkMode(darkModeToggle.checked);	// Toggle dark mode based on user interaction
});

const successMessage = document.getElementById('successMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const redirectMessage = document.getElementById('redirectMessage');

const scriptURL = 'https://script.google.com/macros/s/AKfycbwS7sBTVs4DjJmmRLu8ObxMO_RFM2TViH5MukhhXGK4jl20v5ZyY9fFe_dXsmjfsxlH/exec';

const form = document.forms['submit-to-google-sheet'];
form.addEventListener('submit', e => {
    e.preventDefault();

    // Show the Bootstrap loading spinner while the form is being submitted
    loadingSpinner.style.display = 'block';

    // Fetch the timestamp using a public API
    fetch('https://worldtimeapi.org/api/timezone/Asia/Jakarta')
        .then(response => response.json())
        .then(timeData => {
            const formData = new FormData(form);

            // Extract the timestamp from the API response
            const timestamp = timeData.datetime;

            formData.append('timestamp', timestamp);

            fetch(scriptURL, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    // Hide the loading spinner and show the success message and then redirect
                    loadingSpinner.style.display = 'none';
                    successMessage.style.display = 'block';
                    redirectMessage.style.display = 'block';

                    form.reset(); // Clear the form

                    // Hide the success message after 4 seconds and redirect
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 2000);
                    setTimeout(() => {
                        redirectMessage.style.display = 'none';
                        window.location.href = '/bukutamu.html'; // Redirect
                    }, 4500);
                } else {
                    console.error('Error:', response);
                }
            })
            .catch(error => console.error('Error!', error.message));
        })
    .catch(error => console.error('Error fetching timestamp:', error));
});