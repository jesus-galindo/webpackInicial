
//importamos el archivo de css esto es de la primera prueba
import '../css/componentes.css';


//para que no made error despues del webpack, se pone export en la
//funcion
export const saludar =( nombre ) =>{

    console.log('creando etiqueta h1!!');

    //creamos la etiqueta h1
    const h1 = document.createElement('h1');
    h1.innerText = `Hola  ${nombre} desde js`;

    //insertamos en html
    document.body.append( h1 );

}
