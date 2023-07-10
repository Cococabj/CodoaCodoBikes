const { blue } = Vue

createApp({
  data() {
    return {
      blue: {},
      url: "https://api.bluelytics.com.ar/v2/latest", // lee JSON de valores "blue" actualizados 
    }
  },
  methods: {
    fetchData(url) {  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data.blue.value_sell)
          console.log(data)
          this.blue = data

          const dolarBlue = data.blue.value_sell  // guarda los valores de venta del JSON 
          const euroBlue = data.blue_euro.value_sell  // guarda los valores de venta del JSON 
          
          // Crear tabla de valores de monedas "Blue"


          /*
          const table = `
      <table border="1">
        <tr>
          <th>Moneda</th>
          <th>Valores</th>
        </tr>
        <tr>
          <td>Dolar "Blue"</td>
          <td id="dolarBlue">${dolarBlue}</td>
        </tr>
        <tr>
          <td>Euro "Blue"</td>
          <td>${euroBlue}</td>
        </tr>
      </table>
      `;
          document.getElementById("app-blue").innerHTML = table;
          // inserta la tabla en alquila.html
          console.log(dolarBlue, euroBlue)
          */
        })
        .catch(error => alert("Ups... se produjo un error: " + error))
        
    },
  },
  created() {
    this.fetchData(this.url)                                                  //   
  },
}).mount('#app-blue')