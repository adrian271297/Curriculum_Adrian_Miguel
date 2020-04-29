function Header_Fixed(){
	let header_fijo = false;
	let header = document.querySelector(".header");
	let punto_fijacion = document.querySelector(".header").clientHeight;

	function pingToTop(){
		if(header_fijo) return;
		header.classList.add("fijar");
		header_fijo=true;
	}
	function unPingFromTop(){
		if(!header_fijo) return;
		header.classList.remove("fijar");
		header_fijo=false;
	}

window.addEventListener('scroll',function(ev){
		if (window.scrollY<punto_fijacion+550) return unPingFromTop();
		let coords = header.getBoundingClientRect();
		if (coords.top <= 0) return pingToTop();
		unPingFromTop();
	})
}

function Info_Expand_Fixed(){
	let info_expand_fijo = false;
	let info_expander = document.querySelector(".info_expand");

	let punto_fijacion = document.querySelector(".header").clientHeight;

	function pingToTop1(){
		if(info_expand_fijo) return;
		info_expander.classList.add("info_expand_fijo");
		
		info_expand_fijo=true;
	}
	function unPingFromTop1(){
		if(!info_expand_fijo) return;
		info_expander.classList.remove("info_expand_fijo");

		info_expand_fijo=false;
	}

window.addEventListener('scroll',function(ev){
		if (window.scrollY<punto_fijacion+220) return unPingFromTop1();

		let coords = info_expander.getBoundingClientRect();
		if (coords.top <= 80) return pingToTop1();
		unPingFromTop1();
		
	})
}

function Info_Visible(){
	let info_expander = document.querySelector(".info_expand");
	let degradar_body = document.querySelector(".foto_titulo");
	let degradar_acordeon = document.querySelector(".accordion");

		if(info_expander.classList.contains('info_visible')){
			info_expander.classList.remove("info_visible");
			degradar_body.classList.remove("body_difuso");
			degradar_acordeon.classList.remove("accordion_difuso");
		}else{ 
			info_expander.classList.add("info_visible");
			degradar_body.classList.add("body_difuso");
			degradar_acordeon.classList.add("accordion_difuso");
			visible=true;	
		}
		
	}

/*function Desplegar(){
	let desplegado = document.querySelector(".displayador");

		if(desplegado.classList.contains('rotacion_displayador')){
			desplegado.classList.remove("rotacion_displayador");
		}else{ 
			desplegado.classList.add("rotacion_displayador");	
		}
	}

*/
var modal = $('#modal')

$(function(){
	$('img').click(function(){
		var idImg = $(this).attr("id");
		console.log(idImg);
		var srcImg = $(this).attr("src");
		console.log(srcImg);
		showImage(idImg,srcImg);
	});
	hideModal();
	//PARTE DEL NAVBAR:
	$('.fa-bars').click(function(){
		$('nav ul li').addClass("show");
		$('.logo-space').addClass("change");
		$('#contenedor').removeClass("container");
		$('#contenedor').addClass("container_on");
		$('nav ul').removeClass("naveg");
		$('.fa-times').css("display","block");
		$('.fa-bars').css("display","none");
	});
	$('.fa-times').click(function(){
		$('nav ul li').removeClass("show");
		$('.logo-space').removeClass("change");
		$('#contenedor').addClass("container");
		$('#contenedor').removeClass("container_on");
		$('nav ul').addClass("naveg");
		$('.fa-bars').css("display","block");
		$('.fa-times').css("display","none");
	});
});
	function showImage(idImg,srcImg){
		var imagen=idImg;
		var src = srcImg;
		$("#imgModal").attr("src,srcImg");
		modal.css("display","block");
	}
	function hideModal(){
		$('.cerrar').click(function(){
			modal.css('display','none');
		});

	}
//-------------------------------------------------ACCORDION
class Accordion{
	constructor(selector,multiple=true){

		this.accordion=document.querySelector(selector);
		this.bindEvents();
		this.multiple=multiple;
	}

	bindEvents(){
		this.accordion.querySelectorAll(".item header").forEach(itemHeader =>{
			itemHeader.addEventListener("click",()=>{
				let item = itemHeader.parentNode;

				this.validateMultiple(item);
				item.classList.toggle("active");
			})
		});
	}

	validateMultiple(selectedItem){
		if(this.multiple) return;

		this.accordion.querySelectorAll(".item").forEach(item => {
			if(selectedItem == item) return;

			item.classList.remove("active");
	})
	}
}

(function(){
	new Accordion(".accordion",true)
})()

/*--------------------------------Botones de despliegue---------------------------------*/
class Expansion{
	constructor(selector,multiple=true){
		this.expansion=document.querySelector(selector);
		this.bindEvents();
		this.multiple=multiple;
	}
	bindEvents(){
		this.expansion.querySelectorAll(".displayador").forEach(element =>{
			element.addEventListener("click",()=>{
				this.validateMultiple(element);
				element.classList.toggle("rotacion_displayador");
			})
		});
	}

	validateMultiple(selectedItem){
		if(this.multiple) return;
		this.expansion.querySelectorAll(".displayador").forEach(element => {
			if(selectedItem == element){ 
			element.classList.remove("rotacion_displayador");
		}else{
			return
		}
	})
	}
}

(function(){
	new Expansion(".accordion",true)
})()

/*---------------------PONER ANIMATE CSS EN IMAGENES EN EXP PROFESIONAL-------------*/

class ImgAnimation{
	constructor(selector){
		this.imganimation=document.querySelector(selector);
		this.bindEvents();
	}
	bindEvents(){
		this.imganimation.querySelectorAll(".img_animated").forEach(element =>{
			element.addEventListener("mouseover",()=>{
				this.validateMultiple(element);
				element.classList.add('animated','pulse');
			})
		});
	}

	validateMultiple(selectedItem){
		if(this.multiple) return;
		this.imganimation.querySelectorAll(".img_animated",).forEach(element => {
			element.addEventListener('animationend',()=>{
				element.classList.remove('animated','pulse');
			})
			if(selectedItem == element){ 
			element.classList.remove('animated','pulse');
		}else{
			return
		}
	})
	}
}

(function(){
	new ImgAnimation(".mi_div")
})()


/*-------------------------CAJON APTITUDES Y AFICIONES---------------------------------------*/

		class IndexForSiblings{
	static get(el){
		let children=el.parentNode.children;

		for(var i=0 ; i< children.length; i++){

			let child=children[i];
			if(child == el) return i;
		}
	}
}


class TabsManager{
	constructor(selector_tabs, controls_selector, indicator_selector){
		this.tabs=document.querySelector(selector_tabs);
		this.controls=document.querySelectorAll(controls_selector);
		this.indicator=document.querySelector(indicator_selector);
		this.handleClick=this.handleClick.bind(this);
		this.setIndicatorWidth();
		this.bindEvents();
	}
	setIndicatorWidth(){
		this.indicator.style.width = this.controls[0].clientWidth + "px";
	}

	bindEvents(){
		this.controls.forEach(button =>{
			button.addEventListener("click",this.handleClick)
		})
	}

	handleClick(ev){
		ev.preventDefault();
		let button=ev.currentTarget;
		let position =IndexForSiblings.get(button);
		this.indicator.style.left=(position*this.indicator.clientWidth)+"px";
		this.openTab(button.hash);

	}
	openTab(hash){
		let tab = document.querySelector(hash);
		let position=IndexForSiblings.get(tab);
		this.tabs.querySelector(".container_aptitudes").style.left=-(position*100)+"%";
	}
}

new TabsManager(".tabs",".tabs-control a", ".indicator")


/*---------------------AÑADIR CLASE EN TABLA DE SOFTWARE-------------*/

class TableAnimation{
	constructor(selector){
		this.imganimation=document.querySelector(selector);
		this.bindEvents();
	}
	bindEvents(){
		this.imganimation.querySelectorAll(".animate_td").forEach(element =>{
			element.addEventListener("mouseover",()=>{
				this.validateMultiple(element);
				element.classList.add('animated','pulse');
			})
		});
	}

	validateMultiple(selectedItem){
		if(this.multiple) return;
		this.imganimation.querySelectorAll(".animate_td").forEach(element => {
			element.addEventListener('animationend',()=>{
				element.classList.remove('animated','pulse');
			})
			if(selectedItem == element){ 
			element.classList.remove('animated','pulse');
		}else{
			return
		}
	})
	}
}

(function(){
	new TableAnimation(".software")
})()

/*---------------------AÑADIR CLASE EN TABLA DE SOFTWARE-------------*/

class tit_exp_Animation{
	constructor(selector){
		this.decoradoranimation=document.querySelector(selector);
		this.bindEvents();
	}
	bindEvents(){
		this.decoradoranimation.querySelectorAll(".decorador").forEach(element =>{
			element.addEventListener("mouseover",()=>{
				let info= document.querySelector(".overlay")
				this.validateMultiple(element);
				info.classList.add('element_visible');

				console.log("SI");
			})
		});
	}

	validateMultiple(selectedItem){
		if(this.multiple) return;
		this.decoradoranimation.querySelectorAll(".decorador").forEach(element => {
			let info= document.querySelector(".overlay")
			element.addEventListener('mouseout',()=>{
				info.classList.remove('element_visible');
			})
			/*if(selectedItem == element){ 
			info.classList.remove('overlay_visible');
			info.classList.add('overlay');
		}else{
			return
		}*/
	})
	}
}

(function(){
	new tit_exp_Animation(".software")
})()

/*---------------------MOUSEOVER EN NIVLE-------------*/

class Nivel_Animation{
	constructor(selector){
		this.nivelanimation=document.querySelector(selector);
		this.bindEvents();
	}
	bindEvents(){
		this.nivelanimation.querySelectorAll(".nivel").forEach(element =>{
			element.addEventListener("mouseover",()=>{
				let info= document.querySelector(".overlay_Nivel")
				this.validateMultiple(element);
				info.classList.add('element_visible');

			})
		});
	}

	validateMultiple(selectedItem){
		if(this.multiple) return;
		this.nivelanimation.querySelectorAll(".nivel").forEach(element => {
			let info= document.querySelector(".overlay_Nivel")
			element.addEventListener('mouseout',()=>{
				info.classList.remove('element_visible');
			})
			/*if(selectedItem == element){ 
			info.classList.remove('overlay_visible');
			info.classList.add('overlay');
		}else{
			return
		}*/
	})
	}
}

(function(){
	new Nivel_Animation(".software")
})()

/*---------------OTROS DATOS DE INTERES-------------*/
class IndexForSiblings_interes{
	static get(el){
		let children=el.parentNode.children;

		for(var i=0 ; i< children.length; i++){

			let child=children[i];
			if(child == el) return i;
		}
	}
}
class DatosInteresManager{
	constructor(selector_tabs, controls_selector, indicator_selector){
		this.tabs=document.querySelector(selector_tabs);
		this.controls=document.querySelectorAll(controls_selector);
		this.indicator=document.querySelector(indicator_selector);
		this.handleClick=this.handleClick.bind(this);
		this.setIndicatorWidth();
		this.bindEvents();
	}
	setIndicatorWidth(){
		this.indicator.style.width = this.controls[0].clientWidth + "px";
	}

	bindEvents(){
		this.controls.forEach(button =>{
			button.addEventListener("click",this.handleClick)
		})
	}

	handleClick(ev){
		ev.preventDefault();
		let button=ev.currentTarget;
		let position =IndexForSiblings.get(button);
		this.indicator.style.top=((position*67)+60)+"px";
		this.openTab(button.hash);

	}
	openTab(hash){
		let tab = document.querySelector(hash);
		let position=IndexForSiblings_interes.get(tab);
		this.tabs.querySelector(".container_datos_interes").style.top=-(position*(this.tabs.clientHeight)-30)+"px";
	}
}

new DatosInteresManager(".tabs_datos_interes",".tabs-control_datos_interes a", ".indicator_datos_interes")

/*---------------------BOTON ARRIBA--------------------------*/

var btn_up = $('#button_up');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn_up.addClass('show_up');
  } else {
    btn_up.removeClass('show_up');
  }
});

btn_up.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '0');
});



/*--------------boton contacto--------------------*/
function btn_contacto(){
	var area_contacto= document.getElementById('contacto');

 area_contacto.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

/*--------------boton presentacion--------------------*/
function btn_presentacion(){
	var area_presentacion= document.getElementById('presentacion');

 area_presentacion.scrollIntoView({ behavior: 'smooth', block: 'center' });
};
/*--------------boton situacion actual--------------------*/
function btn_sit_actual(){
	var area_sit_actual= document.getElementById('actual');

 area_sit_actual.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

/*--------------boton situacion actual--------------------*/
function btn_for_acad(){
	var area_for_acad= document.getElementById('formacion');

 area_for_acad.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

/*--------------boton software--------------------*/
function btn_software(){
	var area_software= document.getElementById('software_id');

 area_software.scrollIntoView({ behavior: 'smooth', block: 'center' });
};
/*--------------boton interes--------------------*/
function btn_interes(){
	var area_interes= document.getElementById('interes');

 area_interes.scrollIntoView({ behavior: 'smooth', block: 'center' });
};
/*--------------boton laboral--------------------*/
function btn_exp_laboral(){
	var area_laboral= document.getElementById('exp_laboral');

 area_laboral.scrollIntoView({ behavior: 'smooth', block: 'center' });
};
/*--------------boton aptitudes--------------------*/
function btn_aptitudes(){
	var area_aptitudes= document.getElementById('aptitudes');

 area_aptitudes.scrollIntoView({ behavior: 'smooth', block: 'center' });
};


/*  -----------------------------MENU NAVEGAR------------------------*/
// Al dar clic muestra el menú
$('.open').click(function(){
  $(this).css('display', 'none');
  $('.close').css('display', 'block');
  $('.menu').css('transform', 'translateY(0px) translateX(0)');
})

// Al dar clic cierra oculta el menú
$('.close').click(function(){
    $(this).css('display', 'none');
    $('.open').css('display', 'block');
    $('.menu').css('transform', 'translateY(125px) translateX(-100%)');
})




Header_Fixed();
Info_Expand_Fixed();


