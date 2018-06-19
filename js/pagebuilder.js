function extractUrlParams(){	
	var t = location.search.substring(1).split('&')
	var f = []
	for (var i=0; i<t.length; i++){
		var x = t[ i ].split('=')
		f[x[0]]=x[1]
	}
	return f
}

var urlPar = extractUrlParams()

var video = document.getElementById('video')
var video_c = document.getElementById('video_c')
var episodename = document.getElementById('episodename')
var seriesname = document.getElementById('seriesname')
var episode = document.getElementById('episode')
var description = document.getElementById('description')
var next = document.querySelector('.nextVideo')

let video_request = fetch('JSON_content/videos/videos.json', {
	method: 'GET',
}).then(function (response) {
	return response.json()
}).then(function (json) {
	var exists = false
	var i
	for(i = 0; i < Object.keys(json).length; i++) {
		if(urlPar['id'] == Object.keys(json)[i]) exists = true
	}
	if(exists) {
		if(video != null) {
			video.src = 'http://93.4.85.60/NowlowPlayer/src/videos/' + urlPar['id'].toLowerCase() + '.mp4'
			episodename.innerHTML = json[urlPar['id']]['episodename']
			seriesname.innerHTML = json[urlPar['id']]['rocks'] ? json[urlPar['id']]['seriesname'] + ' <span class=\"thtRocks\"><i class=\"fas fa-check-circle\"></i><span class=\"thtDesc\">That rocks!</span></span>' : json[urlPar['id']]['seriesname']
			episode.innerHTML = json[urlPar['id']]['episode']
			description.innerHTML = json[urlPar['id']]['description']
			var rand = Math.floor((Math.random() * Object.keys(json).length))
			while(Object.keys(json)[rand] == urlPar['id']) {
				rand = Math.floor((Math.random() * Object.keys(json).length))
			}
			next.href = 'watch.html?id=' + Object.keys(json)[rand]
			document.title = json[urlPar['id']]['seriesname'] + ' - ' + json[urlPar['id']]['episode'] + ' - Canaxo\'s video player'
			video_c.style.backgroundImage = 'url(' + json[urlPar['id']]['thumbnail'] + ')'
			video.style.opacity = 0
		} else {
			episodename.innerHTML = 'Video not found'
			seriesname.innerHTML = 'Wrong URL'
			episode.innerHTML = 'S00E00'
			description.innerHTML = 'Please make us a feedback '
			next.href = 'index.html'
			next.innerHTML = 'Go home'
			document.title ='Video not found - Canaxo\'s video player'
		}
	}
})
