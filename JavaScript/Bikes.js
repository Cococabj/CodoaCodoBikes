const { createApp } = Vue

createApp({
    data() {
      return {
        bicycles:[],
        url: "https://cococabj.pythonanywhere.com/productos",
      }
    },
    methods: {
        fetchData(url) {  // lee datos de la API de Bicis propia
         fetch(url) 
           .then(response => response.json()) 
           .then(data => {
             console.log(data)
             this.bicycles=data
           })
           .catch(error=>alert("Ups... se produjo un error: "+ error))
       },
     },
     created() {
     this.fetchData(this.url)                                                  //   
     },
  }).mount('#app-bici')