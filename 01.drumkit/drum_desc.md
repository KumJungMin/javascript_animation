# 1. Vanilla JS는 재밌엉!  &nbsp;  drumkit

*바닐라js를 이용하여 drumkit을 만들어보자!*

<img width="70%" src="https://j.gifs.com/jZ153z.gif"/>

<br/>

## 1) 요점

- 우리는 키를 눌렀을 때 키에 해당하는 악기 소리가 나게 한다.

- 키 코드의 경우, <a href="www.keycode.info">keycode.info</a> 에서 키별 코드번호를 알 수 있다.

- 우리는 키 코드번호를 이용하여 이벤트를 설정한다. 

- 이벤트 설정의 경우, 우리가 해당 키를 눌렀을 때 `playing`이라는 클래스가 추가되게 하는 방식이다. 

- 키를 눌렀을 때, `audio`에서 같은 `data-key`를 가진 소리를 작동시키며, `data-key`라는 가상 속성이다.

<br/>

## 2) 구현

### (1) index.html

- [1] `favicon.ico Status 404`문제를 해결하기 위한 코드이다.

- [2] `data-key`는 새로 생성한 가상의 속성이다. 이 속성을 이용해 이벤트 설정을 한다.


```html
<head>
  <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon">   <!--[1]-->
  <meta charset="UTF-8">
  <title>JS Drum Kit</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div class="keys">
    <div data-key="65" class="key">
      <kbd>A</kbd>
      <span class="sound">clap</span>
    </div>
    <div data-key="83" class="key">
      <kbd>S</kbd>
      <span class="sound">hihat</span>
    </div>
    <div data-key="68" class="key">
      <kbd>D</kbd>
      <span class="sound">kick</span>
    </div>
    <div data-key="70" class="key">
      <kbd>F</kbd>
      <span class="sound">openhat</span>
    </div>
    <div data-key="71" class="key">
      <kbd>G</kbd>
      <span class="sound">boom</span>
    </div>
    <div data-key="72" class="key">
      <kbd>H</kbd>
      <span class="sound">ride</span>
    </div>
    <div data-key="74" class="key">
      <kbd>J</kbd>
      <span class="sound">snare</span>
    </div>
    <div data-key="75" class="key">
      <kbd>K</kbd>
      <span class="sound">tom</span>
    </div>
    <div data-key="76" class="key">
      <kbd>L</kbd>
      <span class="sound">tink</span>
    </div>
  </div>

  <audio data-key="65" src="sounds/clap.wav"></audio>   <!--[2]-->
  <audio data-key="83" src="sounds/hihat.wav"></audio>
  <audio data-key="68" src="sounds/kick.wav"></audio>
  <audio data-key="70" src="sounds/openhat.wav"></audio>
  <audio data-key="71" src="sounds/boom.wav"></audio>
  <audio data-key="72" src="sounds/ride.wav"></audio>
  <audio data-key="74" src="sounds/snare.wav"></audio>
  <audio data-key="75" src="sounds/tom.wav"></audio>
  <audio data-key="76" src="sounds/tink.wav"></audio>
</body>
</html>
```

<br/>

### (2) style.css

- [1] 배경이미지는 `background`을 사용하여 설정한다.

- [2] <a href="https://www.w3schools.com/css/css3_flexbox.asp">flex</a>는 내부에 위치한 버튼들을 일렬로 정렬하는 데 쓰인다.

- [3] <a href="https://www.w3schools.com/css/css3_transitions.asp">transition</a>는 주어진 시간 동안 속성 값을 매끄럽게 변경하게 한다.

- [4] <a href="https://www.w3schools.com/css/css3_2dtransforms.asp">transform</a>는 요소를 이동, 회전, 크기 조정 및 기울인다. `transform의 발동 여부가 이벤트 설정에 중요하다.`
```css
/*[1] 배경에 대한 설정*/
html {  
  font-size: 10px;
  background: url('img 주소') bottom center;
  background-size: cover;
}

body,html {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

/*[2] 버튼 배열에 대한 설정*/
.keys {
  display: flex;
  flex: 1;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}

/*[3] 버튼에 대한 설정*/
.key {
  border: .4rem solid #FCF340;
  border-radius: .5rem;
  margin: 1rem;
  font-size: 1.5rem;
  padding: 1rem .5rem;
  transition: all .07s ease;  
  width: 10rem;
  text-align: center;
  color: white;
  background: rgba(249, 255, 199, 0.4);
  text-shadow: 0 0 .5rem black;
}

/*[4] 버튼이 작동됐을 때의 설정*/
.playing {
  transform: scale(1.1);
  border-color: #00ffff;
  box-shadow: 0 0 1rem #17e7d6;
}

kbd {
  display: block;
  font-size: 4rem;
}

.sound {
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: .1rem;
  color: #ffc600;
}
```

<br/>

### (2) javascript

```
버튼별로 고유의 번호가 있다.
사용자가 키를 눌렀을 때, 해당 버튼의 고유값을 받아 해당하는 오디오 태그를 실행시킨다.
사용자가 키를 눌렀을 때, 또한 버튼에 playing클래스가 추가되고 playing클래스의 transform으로 인해 효과가 부여된다.
playing클래스의 transform이 end된 후, 버튼에서 playing클래스를 삭제한다.(버튼이 원래대로 돌아옴)
```
<br/>

```js
const keys = document.querySelectorAll('.key');               //[1]
keys.forEach(key => {
  key.addEventListener('transitionend', removeTransition)     //[2]
});
window.addEventListener('keydown', playSound);                //[3]
```
번호 | 코드 | 설명
---- | ---- | ----
[1] | querySelectorAll | 모든 버튼태그를 불러온다.
[2] | forEach | 버튼에 `transitionend`이벤트 발생시 `removeTransition(버튼되돌림)`함수가 실행되게 한다.
[3] | window.addEventListener | `keydown`이벤트 발생시 `playSound(버튼효과&소리나게함)`함수를 실행하게 한다.

<br/>

```js
function playSound(e) { //[4-0]
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); //[4-1]    
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);     //[4-2]
  if (!audio) return;   //[4-3]

  key.classList.add('playing');   //[4-4] 
  audio.currentTime = 0;          //[4-5]
  audio.play();                   //[4-6]
}
```
번호 | 코드 | 설명
---- | ---- | ----
[4-0] | playSound(e) | 키 클릭시 버튼에 효과를 부여하고 소리를 재생한다.
[4-1] | audio[data-key="${e.keyCode}"] | `audio`태그 중 `data-key`속성이 버튼의 키코드와 같은 태그를 가리킨다.
[4-2] | div[data-key="${e.keyCode}"] | `div`태그 중 `data-key`속성이 해당 키코드와 같은 태그를 가리킨다.
[4-3] | if (!audio) return | 해당하는 키코드를 가지고 있지 않다면 실행하지 않는다.
[4-4] | key.classList.add('playing') | 만약 키코드가 같은 오디오 태그가 있다면 버튼태그에 `playing` 클래스를 추가한다.
[4-5] | audio.currentTime = 0 | 오디오를 재생할 때, 항상 0초부터 시작하게 한다.
[4-6] | audio.play() | 오디오 태그를 실행시킨다.

<br/>

```js
function removeTransition(e) {                  //[5-0]
  if (e.propertyName !== 'transform') return;   //[5-1]
  e.target.classList.remove('playing');         //[5-2]
}
```
번호 | 코드 | 설명
---- | ---- | ----
[5-0] | removeTransition(e) | 키를 누른 후 키에 부여된 효과를 지우는 역할을 한다.
[5-1] | if (e.propertyName !== 'transform') return | 만약 `event`의 `css`속성 중에 `transform`이 있다면? <br/> `(playing클래스에만 transform속성이 있음)`
[5-2] | e.target.classList.remove('playing'); | `playing`클래스를 삭제한다.

<br/>
