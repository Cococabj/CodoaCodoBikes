// Fetch JSON data
fetch('https://api.npoint.io/e97e10b6bdb13a92ee8d')
    .then(response => response.json())
    .then(data => {
        const imageGallery = document.getElementById('id_carrusel');

        // Get the "bicycles" property from the JSON
        const bicycles = data.bicycles;

        // Iterate over each bicycle object
        bicycles.forEach(bicycle => {
            // Get the image URL for each bicycle
            const imageUrl = bicycle.image;

            // Create an <img> element for each image
            const image = document.createElement('img');
            image.src = imageUrl;
            image.classList.add('imagen-carrusel');

            // Append the image to the gallery container
            imageGallery.appendChild(image);
        });
    })
    .catch(error => console.log(error));