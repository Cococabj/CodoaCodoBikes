console.log(location.search)     // lee los argumentos pasados a este formulario
var id=location.search.substr(4)  // producto_update.html?id=1
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        id: 0,
        type: "",
        total_length_cm: "",
        wheel_size_inches: "",
        comment:"",
        image:"",
        precio: 0,
        url:'https://cococabj.pythonanywhere.com/productos/'+id,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id=data.id
                    this.type = data.type;
                    this.total_length_cm=data.total_length_cm
                    this.wheel_size_inches=data.wheel_size_inches
                    this.comment=data.comment
                    this.image=data.image
                    this.precio=data.precio                    
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
            let producto = {
                type:this.type,
                total_length_cm: this.total_length_cm,
                wheel_size_inches: this.wheel_size_inches, 
                comment: this.comment,
                image: this.image,
                precio: this.precio
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./productos.html"; // navega a productos.html          
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
