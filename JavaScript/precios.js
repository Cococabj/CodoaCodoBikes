document.addEventListener("DOMContentLoaded", function () {
    // Acceder a los elementos que necesitas
    var dolarBlue = 0;
    var precioDia = 0;
    var resultado = 0;
    var dolarBlue = document.getElementById("dolarBlue");
    var precioDia = document.getElementById("precioDia");
    var resultado = document.getElementById("resultados");

    // Obtener los valores numéricos de los elementos
    var dolarBlueValor = parseFloat(dolarBlue).innerText;
    var precioDiaValor = parseFloat(precioDia).innerText;

    // Realizar la multiplicación
    var resultado = dolarBlueValor * precioDiaValor;

    console.log(dolarBlue);
    console.log(precioDia);
    console.log(resultado);

    console.log(dolarBlueValor);
    console.log(precioDiaValor);
});

