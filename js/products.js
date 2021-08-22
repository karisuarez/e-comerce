const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";

var currentProductArray = [];
var currentSortCriteria = undefined;

//Ordeno productos por nombre
function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}
//Muestro los productos
function showProductList(){

    let htmlContentToAppend = "";

    for(let i = 0; i < currentProductArray.length; i++){
        let product = currentProductArray[i];
//Armo el html
            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.soldCount + ` artículos</small> 
                            
                        </div>
                        <div class="d-flex w-100 justify-content-between">
                        <p></p>
                          <h5 class="mb-1">`+ product.cost +" "+ product.currency +`</h5>
                        
                    </div>
                    
                    
                    </div>
                </div>
            </a>
            `
 
//Agrego todo al contenedor
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend 
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductArray = productsArray;
    }

    currentProductArray = sortProducts(currentSortCriteria, currentProductArray);

   
    showProductList();
}
//Traigo todos los datos del Json ya ordenados
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

});


//para la parte dos solo escribir en este archivo 
//Ya tengo listado categorias Show-categories-list - va armando el html
//Tengo que ver como adaptar desde categorias a productos- tengo donde se arma el html.  
//El product-info.html lo tengo que sacar 
// Se puede trasladar a productos toda la estructura html. Tengo que tener cuidado de cambiar lo que no corresponde a productos, renombrar variales REFACTORUIAR
//Poner la informacion acorde a los datos del productos

//Quitar div del html de productos, ue es el que dice "A trabajar..."
//Copio la clase row de categories y lo traigo al html de productos Dentro de un main con la classs="pb-5" Camio el id

//de showcategories solo copio la parte roja del html, le cambio el nombre del contenedor 
//Seguir el hilo de currentProductArray, se le aplican filtros y se arma un aarreglo, se setea en el getJSONData, , si recibe todo ok Llama a un metodo

//Dentro del addeventListener hay que haceer uso del getJSonData para otener los productos. Cambiar la URL que viene dada en el INIT.JS. Me baso en los nombres
//Tendria pronta la funcion showProductListe(), al igual que el html ordenado para mostrar los productos
/*Dentro de el get poner un if con showProductList, puedo poner una variable global. misProductos= resultOj.data;  showProductList()*/