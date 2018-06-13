window.onload = () => {
	if(readCookie('subscribed') != null) {
		if(readCookie('subscribed') == 'false') {
			subscribe.style.backgroundColor = 'darkred'
			subscribe.style.color = 'white'
			subscribe.classList.add('ho')
			subscribe.innerHTML = 'subscribe'
		} else {
			subscribe.style.backgroundColor = '#CCC'
			subscribe.style.color = 'black'
			subscribe.classList.add('ho')
			subscribe.innerHTML = 'subscribed'
		}
	} else {
		createCookie('subscribed', 'false', 99999)
		subscribe.style.backgroundColor = 'darkred'
		subscribe.style.color = 'white'
		subscribe.classList.add('ho')
		subscribe.innerHTML = 'subscribe'
	}
	
	if(readCookie('timer') != null) {
		video.currentTime = parseFloat(readCookie('timer'))
	} else {
		createCookie('timer', '0', 99999)
	}
}

var subscribe = document.getElementById('subscribe')
var video = document.getElementById('video')
var menu = document.getElementById('menu')
var menudisplayer = document.getElementById('menudisplayer')

setInterval(() => {
	createCookie('timer', video.currentTime, 99999)
}, 500)

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

subscribe.onclick = () => {
	if(readCookie('subscribed') == 'false') {
		subscribe.style.backgroundColor = '#CCC'
		subscribe.style.color = 'black'
		subscribe.innerHTML = 'subscribed'
		createCookie('subscribed', 'true', 99999)
		readCookie('subscribed')
		console.log(readCookie('subscribed'))
	} else {
		subscribe.style.backgroundColor = 'darkred'
		subscribe.style.color = 'white'
		subscribe.innerHTML = 'subscribe'
		createCookie('subscribed', 'false', 99999)
		readCookie('subscribed')
		console.log(readCookie('subscribed'))
	}
}

menudisplayer.onclick = () => {
	setTimeout(() => {
		if(menu.style.visibility == 'hidden') {
			menu.style.visibility = 'visible'
			menu.style.height = (screen.height - document.querySelector('.header').offsetHeight - document.querySelector('.footer').offsetHeight) + 'px'
			console.log(menu.style.visibility)
		} else {
			menu.style.visibility = 'hidden'
			menu.style.height = '0'
		}
	}, 50)
}
document.onclick = (e) => {
	if(menu.style.visibility != 'hidden') {
		var menuposXs = menu.offsetLeft
		var menuposXe = menuposXs + menu.offsetWidth
		var menuposYs = menu.offsetTop
		var menuposYe = menuposYs + menu.offsetHeight
		console.log('Xs = ' + menuposXs)
		console.log('Xe = ' + menuposXe)
		console.log('Ys = ' + menuposYs)
		console.log('Ye = ' + menuposYe)
		console.log('Client X = ' + e.clientX)
		console.log('Client Y = ' + e.clientY)
		if(!(menuposXs <= e.clientX && e.clientX <= menuposXe) || !(menuposYs <= e.clientY && e.clientY <= menuposYe)) {
			menu.style.visibility = 'hidden'
			menu.style.height = '0'
		}
	}
}