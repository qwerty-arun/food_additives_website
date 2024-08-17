document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
    const additiveInfo = document.getElementById("additiveInfo");

    // Load data from JSON file
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Initially, hide the additive info
            additiveInfo.innerHTML = "";

            // Search functionality
            searchBar.addEventListener("keyup", () => {
                const searchQuery = searchBar.value.toLowerCase();

                // Only display if there's a search query
                if (searchQuery.trim()) {
                    const filteredData = data.filter(additive => 
                        additive.code.toLowerCase().includes(searchQuery) ||
                        additive.name.toLowerCase().includes(searchQuery)
                    );
                    displayAdditives(filteredData);
                } else {
                    // Clear the content if no search term is entered
                    additiveInfo.innerHTML = "";
                }
            });
        });

    function displayAdditives(additives) {
        additiveInfo.innerHTML = "";
        if (additives.length === 0) {
            additiveInfo.innerHTML = "<p>No results found</p>";
            return;
        }

        additives.forEach(additive => {
            // Create a button for the collapsible section
            const collapsible = document.createElement("button");
            collapsible.classList.add("collapsible");
            collapsible.textContent = `${additive.name} (${additive.code})`;

            // Create the content section for the additive details
            const content = document.createElement("div");
            content.classList.add("content");
            content.innerHTML = `
                <p><strong>Overview:</strong> ${additive.overview}</p>
                <p><strong>Uses:</strong> ${additive.uses}</p>
                <p><strong>Precautions:</strong> ${additive.precautions}</p>
                <p><strong>Interactions:</strong> ${additive.interactions}</p>
                <p><strong>Origin:</strong> ${additive.origin}</p>
                <p><strong>Daily Intake:</strong> ${additive.dailyIntake}</p>
            `;

            additiveInfo.appendChild(collapsible);
            additiveInfo.appendChild(content);

            // Add event listener to toggle collapsible content
            collapsible.addEventListener("click", function() {
                this.classList.toggle("active");
                const content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    }
});