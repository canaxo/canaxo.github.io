var linkcontainer = document.getElementById('linkcontainer')

let video_request = fetch('JSON_content/videos.json', {
	method: 'GET',
}).then(function (response) {
	return response.json()
}).then(function (json) {
	var i
	for(i = 0; i < Object.keys(json).length; i++) {
		var newLink = document.createElement('a')
		var linkTitle = document.createElement('div')
		linkTitle.innerHTML = json[i]['seriesname'] + ' - ' + json[i]['episode']
		newLink.href = 'watch.html?id=' + json[i]
		newLink.classList.add('linktovideo')
		newLink.appendChild(linkTitle)
		linkcontainer.appendChild(newLink)
	}
})
