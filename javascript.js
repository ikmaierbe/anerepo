/*--------------MENU RESPONSIVE--------------*/
const abrir = document.getElementById("abrir");
const cerrar = document.getElementById("cerrar");

abrir.addEventListener("click", () =>{
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () =>{
    nav.classList.remove("visible");
})

/*--------------VALIDACIÓN VOTAR--------------*/
async function validacion(){  
    /*patron que debe seguir el email*/       
    let email = document.getElementById("email");
	let validarEmail =  /^[a-zA-Z0-9._-]+@+[a-zA-Z0-9.-]+.+[a-zA-Z]{2,10}$/;

	if(validarEmail.test(email.value)){
		alert("Email válido");

        /*concatenar email y película*/
        let pelicula = document.getElementById("pelicula");
        let emailPelicula = email.value + pelicula.value;    
        emailPelicula = emailPelicula.replace(/\s+/g, '');
        
        /*llamar a la función de crear el hash*/
        const hash = await crearHash(emailPelicula);
        console.log(hash);

        /*guardar los últimos 6 dígitos del hash*/
        let finalHash = hash.substring(hash.length-6,hash.length);

        /*validar tiquet*/  
        let tiquet = document.getElementById("tiquet");
        let inicioTiquet = tiquet.value.substring(0,6);
        let validarTiquet =  /^[a-z0-9]{6}-[0-9]{2}-[0-9]{2}$/;
    
        if((validarTiquet.test(tiquet.value)) && (finalHash == inicioTiquet)){
            alert("Tiquet valido"); 
            alert("Su valoración se ha guardado correctamente");
        } else{
            alert("El tiquet introducido no es correcto, por favor, vuelva a introducirlo");
            tiquet.style.borderColor = "red";
        }          
    } else{
		alert("El email no es correcto, por favor, vuelva a introducirlo");
        email.style.borderColor = "red";
        return false;
	}
} 

/*--------------CREAR HASH--------------*/
async function crearHash(emailPelicula){
    const textAsBuffer = new TextEncoder().encode(emailPelicula);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", textAsBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray
        .map((item) => item.toString(16).padStart(2, "0"))
        .join("");
    return hash;
}