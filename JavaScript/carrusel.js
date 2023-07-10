// Fetch JSON data
fetch('https://cococabj.pythonanywhere.com/productos')
    .then(response => response.json())
    .then(data => {
        const imageGallery = document.getElementById('id_carrusel');

        // buscar los datos de bicycles dentro del Json
        //const data = data;

        // buscar cada elemento
        data.forEach(data => {
            // buscar la url de cada bici
            const imageUrl = data.image;
            const imagetype = data.type;

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