'use strict';
/**
 * Sends your request to @param url 
 * @param url Endpoint to get your data
 * @param callback A callback function to handle your data
 */
function sendRequest(url,callback) {
	var req = createXMLHTTPObject();	
	if (!req) return;
	//var method = (postData) ? "POST" : "GET"; //It's gonna be always GET
	req.open('GET',url,true);
	req.setRequestHeader('accept', 'application/json');
	req.onreadystatechange = function () {
		if (req.readyState != 4) return;
		if (req.status != 200 && req.status != 304) {
			//TODO: handle server or network errors here
            console.log("Error!");
			return;
		}
		callback(req);
	}
	if (req.readyState == 4) return;
	req.send();
}

//Make it compatible with major browsers
var XMLHttpFactories = [
	function () {return new XMLHttpRequest()},
	function () {return new ActiveXObject("Msxml2.XMLHTTP")},
	function () {return new ActiveXObject("Msxml3.XMLHTTP")},
	function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];

/**
 * @returns A XMLHTTP Object
 */
function createXMLHTTPObject() {
	var xmlhttp = false;
	for (var i = 0; i < XMLHttpFactories.length; i++) {
		try {
			xmlhttp = XMLHttpFactories[i]();
		}
		catch (e) {
			continue;
		}
		break;
	}
	return xmlhttp;
}


/**
 * Show ligthbox
 */
function showLigthbox(key){
	var potion = potions[key];
	var ingredientsStr = '';
	for(var i = 0; i < potion.ingredients.length; i++){
		ingredientsStr += '<p>' + potion.ingredients[i] + '</p>';
	}
	document.getElementById('img-wrap').innerHTML = 
	'<div>'+
		'<img class="lgb-img" src="assets/products/' + potion.image +'" />'+
		'<div class="lgb-info">' +
			'<h2>' + potion.name + '</h2>'+
		
			'<h2>Use/Effect</h2>'+
			'<p>' + potion.effect + '</p>'+

			'<h2>Ingredients</h2>'+
			ingredientsStr +			
			'<h2>Price</h2>'+
			'<p class="lgb-price">$' + potion.price + '</p>' +

			'<button href="#" id="add-cart" class="btn">Add to cart</button>' +

		'</div>'+
	'</div>'
	
	document.getElementById('light-box-overlay').style.display='block';
	document.getElementById('view-port').style.display='block';
}
/**
 * Hides ligthbox
 */
function hideLightBox(){
	document.getElementById('view-port').style.display='none';
	document.getElementById('light-box-overlay').style.display='none'
}

//Store potions in meory
var potions = {};
/**
 * Make a call to potions data.
 * TODO: Handle server/network errors
 */
sendRequest('assets/potions.json', function(data){ 
	var el = document.getElementById('potions');
	potions = JSON.parse(data.response).potions;
	var str = "";
	for(var key in potions){
	   var potion = potions[key];
	   //console.log('potions[key]: ', potion);
	   //TODO: Handle possible undefined properties.
	   str += 
		'<li onclick="showLigthbox(' + key +')">'+
			'<img src="assets/products/' + potion.image +'" />' +
			'<div class="item-info">'+
				'<p><span class="item-title">' + potion.name + '</span> - <span class="item-price">$' + potion.price + '</span></p>'+
			'</div>'+
		'</li>'
	}
	el.innerHTML = str;
});


/**
 * Change menu state when resizing the window
 */
window.addEventListener('resize', function(evt){
	if(window.innerWidth >= 769) {
		document.body.classList.remove('menu-open');
		document.getElementById('nav-viewport').style.height = '';
	}
}, true);

//Toggle main menu
function toggleMenu(el){
	document.getElementById('nav-viewport').style.height = document.body.offsetHeight + 'px';
	el.classList.toggle('open');
	document.body.classList.toggle('menu-open');
}

//Key listener for hidding lighbox. Hit 'esc' to hide lighbox
document.addEventListener('keyup', function(evt){
   if (evt.keyCode){
       hideLightBox();
   }
})