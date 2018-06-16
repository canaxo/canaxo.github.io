var meta = document.head.querySelector('meta[name="video"]')

let video_request = fetch('JSON_content/videos/' + meta.getAttribute('content') + '.json', {
	method: 'GET',
}).then(function (response) {
	return response.json()
}).then(function (json) {
	var video = document.getElementById('video')
	var episodename = document.getElementById('episodename')
	var seriesname = document.getElementById('seriesname')
	var episode = document.getElementById('episode')
	var description = document.getElementById('description')
	video.src = 'http://93.4.85.60/NowlowPlayer/src/videos/' + meta.getAttribute('content').toLowerCase() + '.mp4'
	episodename.innerHTML = json.episodename
	seriesname.innerHTML = json.seriesname
	episode.innerHTML = json.episode
	description.innerHTML = json.description
})