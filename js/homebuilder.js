var linkcontainer = document.getElementById('linkcontainer')
var switchLine = 1
var switchColumn = 1

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
		if(switchColumn == 1) {
			newLink.style.gridRow = switchLine
			newLink.style.gridColumn = 1
			switchColumn = 2
			switchLine += 1
		} else {
			newLink.style.gridRow = switchLine
			newLink.style.gridColumn = 2
			switchColumn = 1
			switchLine += 1
		}
		newLink.appendChild(linkTitle)
		linkcontainer.appendChild(newLink)
		resizeHeader()
		resizeLinksContainer()
		resizeLinks()
	}
})

function resizeHeader() {
	header.style.width = document.body.clientWidth + 'px'
}

function resizeLinksContainer() {
	linkcontainer.style.width = (document.body.clientWidth - 50) + 'px'
}

function resizeLinks() {
	var links = document.querySelectorAll('.linktovideo')
	var i
	for(i = 0; i < links.length; i++)
		links[i].style.height = (links[i].offsetWidth * 9/16) + 'px'
}

window.addEventListener('resize', () => {
	resizeHeader()
	resizeLinksContainer()
	resizeLinks()
})
