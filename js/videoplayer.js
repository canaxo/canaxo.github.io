var vs = document.querySelectorAll('v')
var video_c = document.querySelector('.video')
var video = document.getElementById('video')
var vmenu = document.getElementById('vmenu')
var timebar = document.getElementById('timebar')
var progressbar = document.getElementById('progressbar')
var controlbar = document.getElementById('controlbar')
var timer = document.getElementById('timer')
var Video = new Object()
Video.pPlayButton = document.getElementById('startplaying')
Video.playButton = vs[1]
Video.pauseButton = vs[2]
Video.gear = vs[3]
Video.cinemaMode = vs[4]
Video.fullscreenMode = vs[5]

var vmenuDisplayed = false
var cinemaMode = false
var controlshover = false

function updateTimer() {
	var currentM = Math.floor(video.currentTime / 60)
	var currentS = Math.floor(video.currentTime - currentM * 60)
	var absM = Math.floor(video.duration / 60)
	var absS = Math.floor(video.duration - absM * 60)
	timer.innerHTML = currentM + ':' + currentS + ' / ' + absM + ':' + absS
}

updateTimer()

function player () {
	video.play()
	Video.playButton.style.display = 'none'
	Video.pauseButton.style.display = 'block'
	Video.pPlayButton.style.display = 'none'
}

function pauser() {
	video.pause()
	placePPlay()
	Video.playButton.style.display = 'block'
	Video.pauseButton.style.display = 'none'
	Video.pPlayButton.style.display = 'block'
	displayControls()
	
}

function placePPlay() {
	Video.pPlayButton.style.opacity = '0.0'
	setTimeout(() => {
		var v_left = video_c.offsetWidth
		var v_top = video_c.offsetHeight
		Video.pPlayButton.style.marginTop = (v_top / 2) - (Video.pPlayButton.clientHeight / 2) + 'px'
		Video.pPlayButton.style.marginLeft = (v_left / 2) - (Video.pPlayButton.clientWidth / 2) + 'px'
		Video.pPlayButton.style.opacity = '0.0'
		Video.pPlayButton.style.opacity = '1.0'
	}, 500)
}

Video.gear.onclick = function () {
	if(vmenuDisplayed) {
		vmenu.style.display = 'none'
		Video.gear.style.transform = 'rotate(90deg)'
		vmenuDisplayed = false
	} else {
		vmenu.style.display = 'block'
		Video.gear.style.transform = 'rotate(-90deg)'
		vmenuDisplayed = true
	}
}

Video.cinemaMode.onclick = function () {
	placePPlay()
	if(cinemaMode) {
		video_c.style.height = '360px'
		video_c.style.width = '640px'
		video_c.style.margin = '0 auto'
		video_c.style.marginTop = '10px'
		video_c.style.borderRadius = '5px'
		cinemaMode = false
	} else {
		video_c.style.width = '100%'
		video_c.style.marginTop = '0'
		video_c.style.height = '70vh'
		video_c.style.marginLeft = '0'
		video_c.style.borderRadius = '0'
		cinemaMode = true
	}
}

Video.fullscreenMode.onclick = function () {
	placePPlay()
	var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null)
	if(!isInFullScreen) {
		if(video_c.requestFullscreen) video_c.requestFullscreen()
		else if(video_c.webkitRequestFullscreen) video_c.webkitRequestFullscreen()
		else if(video_c.mozRequestFullScreen) video_c.mozRequestFullScreen()
		else if(video_c.msRequestFullscreen) video_c.msRequestFullscreen()
	} else {
		if (document.exitFullscreen) document.exitFullscreen()
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen()
        else if (document.msExitFullscreen) document.msExitFullscreen()
	}
}

function toggleControls() {
	setTimeout(() => {
		if(!video.paused && !controlshover) {
			controlbar.style.opacity = '0.0'
			controlbar.style.display = 'none'
			video.style.cursor = 'none'
		} else {
			controlbar.style.opacity = '1.0'
			controlbar.style.display = 'block'
			video.style.cursor = 'default'
		}
	}, 2500)
}

timebar.onclick = (e) => {
	var pos = e.clientX
	var start = timebar.offsetLeft + video_c.offsetLeft
	var tb_width = timebar.offsetWidth
	var percent = (((pos - start)/tb_width)*100)
	progressbar.style.width = percent + '%'
	video.currentTime = percent / 100 * video.duration
}

controlbar.onmouseover = () => {
	controlshover = true
}

controlbar.onmouseout = () => {
	controlshover = false
}

function displayControls() {
	controlbar.style.opacity = '1.0'
	controlbar.style.display = 'block'
	video.style.cursor = 'default'
}

window.onkeydown = (e) => {
	if(e.key === ' ' && !video.paused) {
		pauser()
		return !(e.keyCode == 32 && e.target == document.body)
	} else if(e.key === ' ' && video.paused) {
		player()
		return !(e.keyCode == 32 && e.target == document.body)
	} else if(e.key === 'ArrowRight') video.currentTime += 10
	else if(e.key === 'ArrowLeft') video.currentTime -= 10
}

video.ontimeupdate = function () {
	progressbar.style.width = (video.currentTime / video.duration) * 100 + '%'
	updateTimer()
}

Video.playButton.addEventListener('click', player)
Video.pPlayButton.addEventListener('click', player)

Video.pauseButton.addEventListener('click', pauser)
video.addEventListener('click', () => {
	if(!video.paused) pauser()
	else if(video.paused) player()
})

video.addEventListener('mouseover', () => {
	if(!controlshover) toggleControls()
})

var timeout
video.addEventListener('mousemove', () => {
	timeout = setTimeout(() => {
		toggleControls()
	}, 1500)
	video.onmousemove = displayControls()
})