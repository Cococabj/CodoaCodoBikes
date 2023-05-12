const { createApp } = Vue

createApp({
    data() {
      return {
        bicycles:[],
        url: "https://api.npoint.io/e97e10b6bdb13a92ee8d",
      }
    },
    methods: {
        fetchData(url) {  // necesite un async y await porque seguia de largo y no me cargaba el array recipes ni las listas desplegables
         fetch(url) 
           .then(response => response.json()) 
           .then(data => {
             console.log(data)
             this.bicycles=data.bicycles
           })
           .catch(error=>alert("Ups... se produjo un error: "+ error))
       },
     },
     created() {
     this.fetchData(this.url)                                                  //   
     },
  }).mount('#app')