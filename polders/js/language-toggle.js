document.addEventListener('DOMContentLoaded', function () {
    const c = document.getElementById('language-toggle');

    // Set initial language state
    setLanguage(c.value);

    // Add event listener for language change
    c.addEventListener('change', function () {
        setLanguage(c.value);
    });

    function setLanguage(language) {
        // Get all content elements
        const contentElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div.content, div');

        // Process each element
        contentElements.forEach(element => {
            // Check if element has language class
            if (element.classList.contains('ENG') || element.classList.contains('NED')) {
                // Hide all language-specific elements
                element.classList.add('hidden');

                // Show elements of selected language
                if (element.classList.contains(language)) {
                    element.classList.remove('hidden');
                }
            }
        });

        // Store language preference
        localStorage.setItem('preferredLanguage', language);
    }

    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        c.value = savedLanguage;
        setLanguage(savedLanguage);
    }
}); 