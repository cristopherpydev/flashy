//LEE EL ARCHIVO CSV MEDIANTE PAPA.parse
let soluciones = []
let contenedor = document.getElementById('flashCards');
document.getElementById('fileInput').addEventListener("change", function(e){
    const archivo = e.target.files[0];
    Papa.parse(archivo, {
        header: true,
        skipEmptyLines:true,
        complete: function(resultado){
            //fallback de validación
            const columnasRequeridas = ["ID", "pregunta", "descriptor", "respuesta"];
            const columnasCSV = resultado.meta.fields;
            const formatoCorrecto = columnasRequeridas.every(
                columna => columnasCSV.includes(columna)
            );
            if (!formatoCorrecto) {
                alert("El CSV no tiene el formato correcto");
                return;
            }
            //container
            if (contenedor && contenedor.children.length === 0){
                let id = 1;
                resultado.data.forEach(element => {
                    console.log(resultado.data);
                    contenedor.innerHTML += `
                    <div class="flashCard" id=${id} onclick=reveal(this)>
                        <h2>${element.pregunta}</h2>
                        <p>${element.descriptor}</p>
                    </div>`;
                    soluciones.push({[element.ID]: element.respuesta});

                id++;
                });
            }
            else{
                contenedor = "";
                let id = 1;
                resultado.data.forEach(element => {
                    console.log(resultado.data);
                    contenedor.innerHTML += `
                    <div class="flashCard" id=${id} onclick=reveal(this)>
                        <h2>${element.pregunta}</h2>
                        <p>${element.descriptor}</p>
                    </div>`;
                    soluciones.push({[element.ID]: element.respuesta});

                id++;});
            }            

        }
    });
});

function reveal(element){
    let id_pinchado = Number(element.id);

    if (element.dataset.mostrado !== "true") {
        element.innerHTML += `<p id="sol">${soluciones[id_pinchado - 1][id_pinchado]}</p>`;
        element.dataset.mostrado = "true";
    }
    else {
        element.querySelector("#sol").remove();
        element.dataset.mostrado = "false";
    }
}