# 3. Vanilla JS는 재밌엉!  &nbsp;  Scoped CSS Variables

*바닐라js를 이용하여 Scoped CSS Variables를 만들어보자!*

<img width="70%" src="https://j.gifs.com/nx1lM5.gif"/>

<br/>

## 1) 요점

*css를 테스트할 수 있는 css를 테스트할 수 있는 화면을 만들어보자*

- css에서 블러, 색깔, 두께에 대한 변수를 선언한다.

- input(블러, 색깔, 두께 입력버튼)에서 값이 변경될 때마다 이미지의 변수값을 바꾼다.


<br/>

## 2) 구현

### (1) index.html

[4] data-sizing속성이 있으므로 어떤 값이 변하고 그 값 뒤에 데이터타입을 붙게 한다.

```html
<body>
  <h2>Update CSS Variables with <span class='hl'>JS</span></h2>
  <div class="controls">
    <label for="spacing">Spacing:</label>
    <input id="spacing" type="range" name="spacing" min="10" max="200" value="10" data-sizing="px">

    <label for="blur">Blur:</label>
    <input id="blur" type="range" name="blur" min="0" max="25" value="10" data-sizing="px">

    <label for="base">Base Color</label>
    <input id="base" type="color" name="base" value="#ffc600">          <!--[4] -->
  </div>

  <img src="https://thumb.mt.co.kr/06/2019/10/2019101809313679160_1.jpg/dims/optimize/">
</body>
```

<br/>

### (2) style.css

[1] <a href="https://www.w3schools.com/css/css3_variables.asp">css변수</a>을 만드는 코드로, `:root`는 최상위 레벨이며 변수는 `var(변수명)`방식으로 사용된다. 

```css
:root{
  --base : #ffc600;     /*[1] 이미지 배경색*/
  --spacing : 10px;
   --blur : 10px;
}
img{
  padding : var(--spacing);
  background : var(--base);
  filter : blur(var(--blur));
}
.hl{
  color: var(--base);
}
  
body {
  text-align: center;
  background : #193549 url('imgs.jpg');
  background-repeat : no-repeat;
  background-size : cover;
  color: white;
  font-family: 'helvetica neue', sans-serif;
  font-weight: 100;
  font-size: 50px;
}

.controls {
  margin-bottom: 50px;
}

input {
  width: 100px;
}
```

<br/>

### (2) javascript



[2] controls안에 있는 모든 input값들을 가져온다.(input값을 받아 이미지의 변수값을 변경할 예정)

[3] inputs의 값이 변할 때마다 마우스로 움직일 때마다 handleUpdate을 호출한다.

[5] `this`를 사용해 현재객체(어떠한 input객체)의 데이터를 가져온다. (<a href="https://developer.mozilla.org/ko/docs/Web/API/HTMLElement/dataset">dataset</a>은 해당 input의 data-뭐시기 속성정보를 가져옴)

[6] `document.documentElement`는 `document`의 루트 요소인`Element`를 리턴하는데, 원래는 `<html>`이 루트요소이지만 `css`에 `:root`선택자를 생성했으므로 이것이 루트요소이다.

[7] `style.setProperty(속성명, 속성값)`는 CSS속성을 재할당하는데, `:root`의 블러, 색상 혹은 두께 값을 변경한다.

```js
const inputs = document.querySelectorAll('.controls input');     //[2]


function handleUpdate(){
  const suffix = this.dataset.sizing || '';                     //[5]

  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);    //[6]&[7]
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));          [3]
inputs.forEach(input => input.addEventListener('movemove', handleUpdate));

```
