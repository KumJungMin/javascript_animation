# 2. Vanilla JS는 재밌엉!  &nbsp;  CLOCK

*바닐라js를 이용하여 시계를 만들어보자!*

<img width="70%" src="https://j.gifs.com/71RMoB.gif"/>

<br/>

## 1) 요점

*CurrentTime을 이용하여 시간을 가져오고 css로 실제시계처럼 시침,분침이 움직이자*

- html에서 div를 사용해 시계를 만든다.

- 시침, 분침, 조침들은 시계안에서 `rotate`를 이용해 회전을 한다.

- JS에서 현재 시간을 받고 1초마다 시침, 분침, 초짐들의 회전값을 변경한다.


<br/>

## 2) 구현

### (1) index.html

```html
<body>
    <div class="clock">
      <div class="clock-face">
        <div class="hand hour-hand"></div>
        <div class="hand min-hand"></div>
        <div class="hand second-hand"></div>
      </div>
    </div>
    <script src="index.js" />
</body>
```

<br/>

### (2) style.css

- [1] 회전 중심(원점·기준점)을 지정 : 시침,분침들이 rotate를 하면 시계처럼 가운데를 중심으로 회전하게 만든다.

- [2] 처음시작하는 시간을 12시 정각으로 하기위해 시계 자체를 돌린다.

- [3] <a href="https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions">transitions</a>는 CSS 속성을 변경할 때 애니메이션 속도를 조절한다.

- [4] <a href="https://www.codingfactory.net/1094">transition-timing-function</a> transition의 진행 속도를 조절 시계가 움직일 때마다 약간의 반동을 준다.틱톡틱톡하는 효과!


```css
html {
  background: #018DED url(https://t2.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/guest/image/caTw7KNdDMeoe833RVMZ4Y11ErQ.JPG);
  background-size: cover;
  font-family: 'helvetica neue';
  text-align: center;
  font-size: 10px;
    }

body {
  margin: 0;
  font-size: 2rem;
  display: flex;
  flex: 1;
  min-height: 100vh;
  align-items: center;
}

.clock {
  width: 30rem;
  height: 30rem;
  border: 20px solid white;
  border-radius: 50%;
  margin: 50px auto;
  position: relative;
  padding: 2rem;
}

.clock-face {
  position: relative;
  width: 100%;
  height: 100%;
  transform: translateY(-3px); 
}

.hand {
  width: 50%;
  height: 6px;
  background: black;
  position: absolute;
  top: 50%;
  transform-origin : 100%;      /*[1]*/
  transform : rotate(90deg);    /*[2]*/
  transition : all 0.05s;       /*[3]*/
  transition-timing-function : cubic-bezier(0.1,2.7,0.58,1);  /*[4]*/
}

.hour-hand{
  transform : rotate(30deg);
}
```

<br/>

### (2) javascript

- [5] 초의 각도는 (second/60)*360가 맞지만 우리가 시계자체를 90도 회전시켰으므로 시계에서 똑바로 표기하려면 +90을 해주면 된다.

- [6] 해당함수를 1초마다 호출한다.

```js
const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
    
    
function setDate(){       
  const now = new Date();
  const second = now.getSeconds();
  const secondsDegrees = (second/60)*360 + 90; //[5]
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const mins = now.getMinutes();
  const minDegrees = (mins/60)*360 + 90;
  minHand.style.transform = `rotate(${minDegrees}deg)`

  const hours = now.getHours();
  const hourDegrees = (hours/60)*360 + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`
}

setInterval(setDate, 1000);                 //[6]

```
