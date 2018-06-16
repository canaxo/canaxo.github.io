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
var episodename = document.getElementById('episodename')
var seriesname = document.getElementById('seriesname')
var episode = document.getElementById('episode')
var description = document.getElementById('description')
var next = document.querySelector('.nextVideo')

let video_request = fetch('JSON_content/videos.json', {
	method: 'GET',
}).then(function (response) {
	return response.json()
}).then(function (json) {
	var exists = false
	for(var i=0; i < json.length; i++) {
		console.log(json[i])
		if(urlPar['id'] == json[i]) exists = true
	}
	if(exists) {
		fetch('JSON_content/videos/' + urlPar['id'] + '.json', {
			method: 'GET',
		}).then(function (response) {
			return response.json()
		}).then(function (video_json) {
			if(video != null) {
				video.src = 'http://93.4.85.60/NowlowPlayer/src/videos/' + urlPar['id'].toLowerCase() + '.mp4'
				episodename.innerHTML = video_json.episodename
				seriesname.innerHTML = video_json.seriesname
				episode.innerHTML = video_json.episode
				description.innerHTML = video_json.description
				var rand = Math.floor((Math.random() * json.length) + 1)
				while(json[rand] == urlPar[id]) {
					rand = Math.floor((Math.random() * json.length) + 1)
				}
				next.href = 'watch.html?id=' + json[rand]
				document.title = json.seriesname + ' - ' + video_json.episode + ' - Nowlow\'s video player'
			}
		})
	} else {
		episodename.innerHTML = 'Video not found'
		seriesname.innerHTML = 'Wrong URL'
		episode.innerHTML = 'S00E00'
		description.innerHTML = 'Please make us a feedback '
		next.href = urlPar['id'] == 'index.html'
		next.innerHTML = 'Go home'
		document.title ='Video not found - Nowlow\'s video player'
	}
})
