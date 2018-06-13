var v = document.querySelectorAll('v')
var i
for(i = 0; i < v.length; i++) {
	v[i].style.fontFamily = 'VFont'
	var dun = v[i].getAttribute('dun')
	switch(dun) {
		case 'play' :
			v[i].innerHTML = 'A'
			break;
		case 'pause' :
			v[i].innerHTML = 'B'
			break;
		case 'forward' :
			v[i].innerHTML = 'C'
			break;
		case 'backward' :
			v[i].innerHTML = 'D'
			break;
		case 'fastforward' :
			v[i].innerHTML = 'E'
			break;
		case 'fastbackward' :
			v[i].innerHTML = 'F'
			break;
		case 'cinema' :
			v[i].innerHTML = 'G'
			break;
		case 'fullscreen' :
			v[i].innerHTML = 'H'
			break;
		case 'gear' :
			v[i].innerHTML = 'I'
			break;
	}
}