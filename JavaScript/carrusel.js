// Fetch JSON data
fetch('https://api.npoint.io/e97e10b6bdb13a92ee8d')
    .then(response => response.json())
    .then(data => {
        const imageGallery = document.getElementById('id_carrusel');

        // buscar los datos de bicycles dentro del Json
        const bicycles = data.bicycles;

        // buscar cada elemento
        bicycles.forEach(bicycle => {
            // buscar la url de cada bici
            const imageUrl = bicycle.image;

            // crear las <img> 
            const image = document.createElement('img');
            image.src = imageUrl;
            image.classList.add('imagen-carrusel');

            // agregar las imagenes al carrusel
            imageGallery.appendChild(image);
        });
    })
    .catch(error => console.log(error));