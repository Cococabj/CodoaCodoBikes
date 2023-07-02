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
            const imagetype = bicycle.type;

            // crear las <img> 
            const image = document.createElement('img');
            image.src = imageUrl;
            image.classList.add('imagen-carrusel');

            const type = document.createElement('p')
            type.textContent = imagetype;
            type.classList.add('type-carrusel')

            // agregar las imagenes al carrusel
            imageGallery.appendChild(image);
            imageGallery.appendChild(type);

            console.log(image)
            console.log(type)
        });
    })
    .catch(error => console.log(error));