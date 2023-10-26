fetch('https://script.google.com/macros/s/AKfycbxcL6StbNqWEeXTSo4wxmTSu2Kr2FI7DSwBm5XwvvZaKxXibtI8bP4TGRIatA1R0kcIiA/exec')
.then(res => res.json())
.then(data => {
    let rows = data.content.map((row, index) => {
        let rowContent = row.map((cell, cellIndex) => {
            // Make the first row (index 0) bold
            const isHeaderRow = (index === 0);
            const cellTag = isHeaderRow ? 'th' : 'td';
            const cellStyle = isHeaderRow ? 'font-weight: bold;' : '';

            // Check if it's the timestamp column and format it
            if (cellIndex === 0 && !isHeaderRow) {
                const timestamp = new Date(cell);

                const dateOptions = { timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit' };

                const hours = timestamp.getHours().toString().padStart(2, '0');
                const minutes = timestamp.getMinutes().toString().padStart(2, '0');
                const seconds = timestamp.getSeconds().toString().padStart(2, '0');

                const formattedTimestamp = `${hours}:${minutes}:${seconds}`;
                const formattedDate = timestamp.toLocaleString('id-ID', dateOptions);
                
                return `<${cellTag} class="drk" style="${cellStyle}">${formattedDate} ${formattedTimestamp}</${cellTag}>`;
            }
            
            return `<${cellTag} class="drk" style="${cellStyle}">${cell}</${cellTag}>`;
        });
        return `<tr>${rowContent.join("")}</tr>`;
    });

    const table = document.querySelector("table");
    table.innerHTML = rows.join("\r");
    table.style.display = "table"; // Display the table after loading the data.
    const loadingSpinner = document.querySelector(".spinner-border");
    loadingSpinner.style.display = "none"; // Hide the loading spinner.
});

// Function to toggle dark mode
function toggleDarkMode() {     
const body = document.body;
body.classList.toggle("dark-mode");

// Store the dark mode state in local storage
const isDarkModeEnabled = body.classList.contains("dark-mode");
localStorage.setItem("darkModeEnabled", isDarkModeEnabled);
}

// Add event listener for dark mode toggle switch
const darkModeToggle = document.getElementById("dark-mode-toggle");

// Check local storage for the dark mode state
const isDarkModeEnabled = localStorage.getItem("darkModeEnabled") === "true";

// Set the initial state based on the value in local storage
if (isDarkModeEnabled) {
document.body.classList.add("dark-mode");
}

darkModeToggle.checked = isDarkModeEnabled; // Update the checkbox state

darkModeToggle.addEventListener("change", toggleDarkMode);