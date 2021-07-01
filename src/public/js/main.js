
// Mostrar la constraseña ingresada
function mostrarPassword(){
		var cambio = document.getElementById("txtPassword");
		if(cambio.type == "password"){
			cambio.type = "img  ";
			$('.svg').removeClass('src/utils/img/visibility_off.svg').addClass('src/utils/img/visibility_black.svg');
		}else{
			cambio.type = "password";
			$('.svg').removeClass('src/utils/img/visibility_off.svg').addClass('src/utils/img/visibility_black.svg');
		}
} 
visibility_off