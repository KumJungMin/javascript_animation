/* [1] Get Our Elements */
const player = document.querySelector('.player');       //root
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');        //play or pause button
const skipButtons = player.querySelectorAll('[data-skip]'); //data-skip 사용자 정의 속성
const ranges = player.querySelectorAll('.player__slider');  //volum, speed input

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';  
  video[method]();    //video[play]()               
}


function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';    
  console.log(icon);
  toggle.textContent = icon;    
}


function skip() {  
 video.currentTime += parseFloat(this.dataset.skip);
}

//
function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* [2] video 이벤트 */
video.addEventListener('click', togglePlay);    
video.addEventListener('play', updateButton);   
video.addEventListener('pause', updateButton);  
video.addEventListener('timeupdate', handleProgress);  

/* [3] 재생&중지, 스킵, 스피드, 볼륨 버튼 관련 이벤트*/   
toggle.addEventListener('click', togglePlay);    
skipButtons.forEach(button => button.addEventListener('click', skip));  
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));   
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

/* [4] progress 이벤트*/
let mousedown = false;
progress.addEventListener('click', scrub);   
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));  
progress.addEventListener('mousedown', () => mousedown = true);        
progress.addEventListener('mouseup', () => mousedown = false);         
