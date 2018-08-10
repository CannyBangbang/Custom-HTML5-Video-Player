const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const playButton = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
let mousedown = false;
const fullscreenButton = player.querySelector('.fullscreenButton');
let isFullscreen = false;

function togglePlay() {
  if(video.paused) {
    video.play();
  }
  else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚❚';
  playButton.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const time = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = time;
}

// goes to fullscreen but not to custom UI
function handleFullscreen() {
  if (isFullscreen == false) {
    if(video.requestFullscreen)
    video.requestFullscreen();
    else if(video.mozRequestFullScreen)
    video.mozRequestFullScreen();
    else if(video.webkitRequestFullscreen)
    video.webkitRequestFullscreen();
    else if(video.msRequestFullscreen)
    video.msRequestFullscreen();
    isFullscreen = true;
  }
  else {
    if(document.exitFullscreen)
		document.exitFullscreen();
	  else if(document.mozCancelFullScreen)
		document.mozCancelFullScreen();
	  else if(document.webkitExitFullscreen)
		document.webkitExitFullscreen();
	  else if(document.msExitFullscreen)
		document.msExitFullscreen();
    isFullscreen = false;
  }
}

// hook ups
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
playButton.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
fullscreenButton.addEventListener('click', handleFullscreen);
