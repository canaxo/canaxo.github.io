var linkcontainer = document.getElementById('linkcontainer')

let video_request = fetch('JSON_content/videos/videos.json', {
	method: 'GET',
}).then(function (response) {
	return response.json()
}).then(function (json) {
	var i
	for(i = 0; i < Object.keys(json).length; i++) {
		var newLink = document.createElement('a')
		var linkTitle = document.createElement('span')
		linkTitle.innerHTML = json[Object.keys(json)[i]]['seriesname'] + ' - ' + json[Object.keys(json)[i]]['episode']
		newLink.href = 'watch.html?id=' + Object.keys(json)[i]
		newLink.style.backgroundImage = 'url(' + json[Object.keys(json)[i]]['thumbnail'] + ')'
		newLink.classList.add('linktovideo')
		if(i % 2 != 0) {
			newLink.style.gridRow = Math.floor(i/2)
			newLink.style.gridColumn = 1
		} else {
			newLink.style.gridRow = Math.floor(i/2) - 1
			newLink.style.gridColumn = 2
		}
		newLink.appendChild(linkTitle)
		linkcontainer.appendChild(newLink)
		resizeLinks()
	}
})

function resizeLinks() {
	var links = document.querySelectorAll('.linktovideo')
	var i
	for(i = 0; i < links.length; i++)
		links[i].style.height = (links[i].offsetWidth * 9/16) + 'px'
}

window.addEventListener('resize', resizeLinks)
