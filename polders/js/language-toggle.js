function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


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


document.addEventListener('DOMContentLoaded', function () {

    const langParam = getUrlParam('lang');
    const savedLanguage = localStorage.getItem('preferredLanguage');
    const c = document.getElementById('language-toggle');

    // Set initial language state
    if (langParam) {
        c.value = langParam.toUpperCase(); 
    } else if (savedLanguage) {
        c.value = savedLanguage;
    } 
    setLanguage(c.value);

    // Add event listener for language change
    c.addEventListener('change', function () {
        setLanguage(c.value);
    });

    // Check for saved language preference
    

}); 