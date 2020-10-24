# 10. Vanilla JS는 재밌엉!  &nbsp;  num counter

*바닐라js를 이용하여 counter을 만들어보자!*

<img width="50%" src="https://j.gifs.com/q7vN5y.gif"/>

<br/>

## 1) 요점

- 처음 로딩이 됐을 때 원하는 숫자범위까지 숫자를 증가시킨다.
- setInterval을 이용해 특정 작업을 반복하게 한다. 

<br/>

## 2) 구현

### (1) html

- [1] `data-..`는 새로 생성한 가상의 속성이다. 이 속성을 이용해 이벤트 설정을 한다.


```html
<head>
  <meta charset="UTF-8">
</head>

<body>
  <div class="num_animation" data-start="0" data-rate="90">0</div>   <!--[1]-->
  <div class="num_animation" data-start="5000" data-rate="5120">0</div>
</body>
```

<br/>

### (2) js

- setInterval을 이용해 증가하는 숫자를 html에 뿌린다.
- 증가한 숫자(startNum)이 targetNum과 같아지면 clearInterval을 하여 중단한다.

```js
 //dom 가져오기
  var numAnimation = document.querySelectorAll(".num_animation");

  function changeNum(id) {
    var intervalTime = 10;
    var targetNum = numAnimation[id].getAttribute("data-rate");
    var startNum = numAnimation[id].getAttribute("data-start");
    var timer = setInterval(function () {
      ++startNum;
      numAnimation[id].innerText = startNum; //html에서 증가
      if (startNum == targetNum) {
        clearInterval(timer);                //stop
      }
    }, intervalTime);
  }

  for (var i = 0; i < numAnimation.length; i++) {
    changeNum(i);
  }
```
