# 9. Vanilla JS는 재밌엉!  &nbsp;  video player

*바닐라js를 이용하여 비디오 플레이어를 만들어보자!*

<img width="70%" src="./gif (1).gif"/>

<br/>

## 1) 요점

*비디오 태그의 'paused, play, currentTime'속성을 이용해 비디오를 조작해보자*

- 아래 그림은 html태그의 구성이다.

<img src="https://blogfiles.pstatic.net/MjAyMDEwMDdfMTE1/MDAxNjAyMDUwNjczNDQ2.AI3STxGsZ-w_IvY3laChFkX5KblJ0vYDxMlaV2J9YIcg.4TXtAhnaqdaQsvnZzhQqOFoMuA2A8YNwZ3wPtjlVjLEg.PNG.rmawjdals/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2020-10-07_%EC%98%A4%ED%9B%84_2.52.29.png"/>


<br/>

## 2) 구현

### (1) index.html
```html
<div class="player">
 <video class="player__video viewer" src="652333414.mp4"></video>

 <div class="player__controls">
   <div class="progress">
    <div class="progress__filled"></div>
   </div>
   <button class="player__button toggle" title="Toggle Play">►</button>
   <input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
   <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
   <button data-skip="-10" class="player__button">« 10s</button>
   <button data-skip="25" class="player__button">25s »</button>
 </div>
</div>
```


<br/>

### (2) javascript

[1] html 태그들을 불러온다.

```js
/*[1]*/
const player = document.querySelector('.player');            //root
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');             //play or pause button
const skipButtons = player.querySelectorAll('[data-skip]'); //data-skip 사용자 정의 속성
const ranges = player.querySelectorAll('.player__slider');  //volum, speed input

```

<br/><br/>

[2] 아래는 비디오 이벤트에 대한 코드이다.

[2-1] video를 클릭하면 영상이 멈추거나 재생된다.

[2-2] video의 play 이벤트 발생시 play&pause버튼이 변한다.

[2-3] 비디오의 재생 위치가 변경 될 때 timeupdate 이벤트가 발생한다.

[2-4] video.paused는 true, false 데이터 형식이다.

[2-5] `htmlTag[property]` -> `video[play]()`,  play속성으로 실행한다.

[3] <a href="https://velog.io/@raram2/%EB%8B%B9%EC%8B%A0%EC%9D%B4-innerHTML%EC%9D%84-%EC%93%B0%EB%A9%B4-%EC%95%88%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0">innerText, textContent 차이</a>

[4] progressBar는 `flexBasis`값이 0 -> 100%로 변하면서 프로그래스 바가 채워진다.



```js
/*[2]*/
video.addEventListener('click', togglePlay);    //[2-1]
video.addEventListener('play', updateButton);   //[2-2]
video.addEventListener('pause', updateButton);  
video.addEventListener('timeupdate', handleProgress);   //[2-3]


function togglePlay() {
  const method = video.paused ? 'play' : 'pause';       //[2-4]  
  video[method]();    //video[play]()                   //[2-5]
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚'; 
  console.log(icon);
  toggle.textContent = icon;     //[3]
}

//[4]
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
```

<br/><br/>

[5] 재생&중지, 스킵, 스피드, 볼륨 버튼 관련 이벤트이다.

[5-1] 재생&중지 버튼 클릭시 버튼모양 변경된다.

[5-2] 스킵버튼 클릭시 재생위치 변경된다.

[5-3] 스피드, 볼륨에 변화가 생기면 재생위치가 업데이트된다.

[6] `video.currentTime`으로 현재 재생위치를 가져오고, 이 time에 `this.dataset.skip`의 값을 더한다.

```js
/* [5]*/   
toggle.addEventListener('click', togglePlay);    //[5-1]
skipButtons.forEach(button => button.addEventListener('click', skip));          //[5-2]
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));   //[5-3]
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));


function skip() {  //[6]
 video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {  //@
  video[this.name] = this.value;
}
```

<br/><br/>

[7] progress 이벤트이다.

[7-1] 재생바를 클릭하면  해당 위치로 재생위치 변경된다.

[7-2] 재생바를 클릭하면 -> 해당 위치로 재생위치 변경

```js
/* [7]*/
let mousedown = false;
progress.addEventListener('click', scrub);   //[7-1]
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));  
progress.addEventListener('mousedown', () => mousedown = true);       
progress.addEventListener('mouseup', () => mousedown = false);     

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

```
