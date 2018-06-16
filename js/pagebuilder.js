function extractUrlParams(){	
	var t = location.search.substring(1).split('&')
	var f = []
	for (var i=0; i<t.length; i++){
		var x = t[ i ].split('=')
		f[x[0]]=x[1]
	}
	return f
}

var id = extractUrlParams()

let video_request = fetch('JSON_content/videos/' + id[0] + '.json', {
	method: 'GET',
}).then(function (response) {
	return response.json()
}).then(function (json) {
	var video = document.getElementById('video')
	var episodename = document.getElementById('episodename')
	var seriesname = document.getElementById('seriesname')
	var episode = document.getElementById('episode')
	var description = document.getElementById('description')
	var next = document.querySelector('.nextVideo')
	console.log(json)
	if(video != null) {
		video.src = 'http://93.4.85.60/NowlowPlayer/src/videos/' + id[0].toLowerCase() + '.mp4'
		episodename.innerHTML = json.episodename
		seriesname.innerHTML = json.seriesname
		episode.innerHTML = json.episode
		description.innerHTML = json.description
		next.href = id[0] == 'GravityFallsS02E01' ? 'RickAndMortyS01E07' : 'GravityFallsS02E01'
		document.head.title = json.seriesname + ' - ' + json.episode + ' - Nowlow\'s video player'
	}
	
})
