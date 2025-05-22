document.addEventListener('DOMContentLoaded', function () {
    const carouselContainers = document.querySelectorAll('.carousel-container'); // Select all carousel containers
    if (!carouselContainers.length) return; // Exit if no carousel containers are found

    carouselContainers.forEach(carouselContainer => { // Iterate over each carousel container
        const carouselImages = carouselContainer.querySelectorAll('.carousel-image');
        let currentImageIndex = 0;
        const cycleTime = 5000; // 5 seconds for image display (total interval time)

        if (carouselImages.length > 1) { // Only run if there's more than one image
            if (carouselImages[currentImageIndex]) { // Check if the first image exists
                carouselImages[currentImageIndex].classList.add('active'); // Show the first image
            }

            setInterval(() => {
                if (carouselImages[currentImageIndex]) {
                    carouselImages[currentImageIndex].classList.remove('active');
                }
                currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
                if (carouselImages[currentImageIndex]) {
                    carouselImages[currentImageIndex].classList.add('active');
                }
            }, cycleTime);
        } else if (carouselImages.length === 1) {
            if (carouselImages[0]) { // If only one image, just show it
                carouselImages[0].classList.add('active');
            }
        }
    });
}); 