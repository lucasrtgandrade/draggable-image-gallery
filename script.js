const images = document.querySelectorAll('.galeria-de-imagens .secundaria img');

const galeria = document.getElementById('galeria-de-imagens');
let estaArrastando = false;
let posInicial = 0;
let scrollLeftStart = 0; // Corrected variable name and declaration

galeria.addEventListener('mousedown', (event) => {
    estaArrastando = true;
    posInicial = event.pageX - galeria.offsetLeft;
    scrollLeftStart = galeria.scrollLeft; // Use the correct property here
    galeria.style.cursor = 'grabbing';
});

galeria.addEventListener('mouseleave', () => {
    estaArrastando = false;
    galeria.style.cursor = 'grab';
});

galeria.addEventListener('mouseup', () => {
    estaArrastando = false;
    galeria.style.cursor = 'grab';
});

galeria.addEventListener('mousemove', (event) => {
    if (!estaArrastando) return;
    event.preventDefault();
    const x = event.pageX - galeria.offsetLeft;
    const walk = (x - posInicial) * 2; // The distance moved since the mousedown
    galeria.scrollLeft = scrollLeftStart - walk; // Correctly update the scroll position
})

document.querySelectorAll('.galeria-de-imagens img').forEach(img => {
img.addEventListener('dragstart', (event) => {
    event.preventDefault(); // Prevents the image from being dragged
});
});

        // Prevent default drag behavior for images
        document.querySelectorAll('.galeria-de-imagens img').forEach(img => {
    img.addEventListener('dragstart', (event) => {
        event.preventDefault();
    });
});

function scrollThumbnailIntoView(index) {
const gallery = document.getElementById('galeria-de-imagens');
const thumbnails = document.querySelectorAll('.galeria-de-imagens .secundaria');
if (thumbnails.length > index) {
    const selectedThumbnail = thumbnails[index];

    // Get bounding rectangles
    const galleryRect = gallery.getBoundingClientRect();
    const thumbnailRect = selectedThumbnail.getBoundingClientRect();

    // Check if the thumbnail is out of view and scroll accordingly
    if (thumbnailRect.left < galleryRect.left) {
        // Thumbnail is too far to the left; scroll left
        gallery.scrollLeft -= galleryRect.left - thumbnailRect.left;
    } else if (thumbnailRect.right > galleryRect.right) {
        // Thumbnail is too far to the right; scroll right
        gallery.scrollLeft += thumbnailRect.right - galleryRect.right;
    }
}
}

// Function to set the main image and update active thumbnail
function setMainImage(index) {
const images = document.querySelectorAll('.galeria-de-imagens .secundaria img');
const mainImage = document.getElementById('main-image');
mainImage.src = images[index].src;
mainImage.alt = images[index].alt;

// Update the image info display
const imageInfo = document.getElementById('image-info');
imageInfo.textContent = `${index + 1} / ${images.length}`; // 1-based index for display

document.querySelectorAll('.galeria-de-imagens .secundaria').forEach((container, idx) => {
    if (idx === index) {
        container.classList.add('active');
    } else {
        container.classList.remove('active');
    }
});

    // Ensure the active thumbnail is visible in the scrollable area
    scrollThumbnailIntoView(index);
}


const prevButton = document.getElementById('prev-image');
const nextButton = document.getElementById('next-image');
let currentIndex = 0; // Initialize currentIndex

// Previous image button click event
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Cycle backwards through the images
    setMainImage(currentIndex);
});

// Next image button click event
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length; // Cycle forwards through the images
    setMainImage(currentIndex);
});

// Setup initial active thumbnail and click events for gallery images
document.querySelectorAll('.galeria-de-imagens .secundaria img').forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index; // Update currentIndex to match clicked image
        setMainImage(currentIndex);
    });
});

// Call setMainImage initially to set the first image and active class correctly
setMainImage(currentIndex);