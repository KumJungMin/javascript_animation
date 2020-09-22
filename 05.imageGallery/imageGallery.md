# 5. Vanilla JS는 재밌엉!  &nbsp;  mageGallery

*바닐라js를 이용하여 mageGallery를 만들어보자!*

<img width="70%" src="./gif.gif"/>

<br/>

## 1) 요점

*image영역을 클릭시, 확대되는 애니메이션을 만든다.*

- `display:flex`를 이용하여 요소를 유동화시킨다. 

- `flex: 1` -> `flex: 5`로 너비를 확대하여 특정 패널을 확대시킨다.

<br/>

## 2) 구현

### (1) index.html


```html
<div class="panels">
  <div class="panel panel1">
    <p>Hey</p>
    <p>Let's</p>
    <p>Dance</p>
  </div>
  <div class="panel panel2">
    <p>Give</p>
    <p>Take</p>
    <p>Receive</p>
  </div>
  <div class="panel panel3">
    <p>Experience</p>
    <p>It</p>
    <p>Today</p>
  </div>
  <div class="panel panel4">
    <p>Give</p>
    <p>All</p>
    <p>You can</p>
  </div>
  <div class="panel panel5">
    <p>Life</p>
    <p>In</p>
    <p>Motion</p>
  </div>
</div>
```

<br/>

### (2) style.css

[1] <a href="https://www.w3schools.com/css/css3_flexbox.asp">`flex`</a>를 이용하여 이미지들을 유동적으로 세로 배치한다.

```css
html {
  box-sizing: border-box;
  background: #ffc600;
  font-family: 'helvetica neue';
  font-size: 20px;
  font-weight: 200;
}

body {
  margin: 0;
}

*, *:before, *:after {
  box-sizing: inherit;
}

.panels {
  min-height: 100vh;
  overflow: hidden;
  display : flex;   /*[1]*/
}
```
<br/>

[2] 부모요소를 기준으로 내부요소(panel)들은 1:1 비율로 정렬된다.(차지할너비 비율)

[3-1] 패널 내부에 있는 글자들을 상하좌우 중앙에 위치시키려면(p태그) 먼저 부모요소인 panel의 display를 flex로 바꾼다.(내부 요소들이 유동적으로 변할 수 있음)
 
[3-2] <a href="https://developer.mozilla.org/ko/docs/Web/CSS/flex-direction">`flex-direction`</a> 은 플렉스 컨테이너 내의 아이템을 배치할 때 사용할 주축 및 방향(정방향, 역방향)을 지정한다.

```css
.panel {
  background: #6B0F9C;
  box-shadow: inset 0 0 0 5px rgba(255,255,255,0.1);
  color: white;
  text-align: center;
  align-items: center;
  /* Safari transitionend event.propertyName === flex */
  /* Chrome + FF transitionend event.propertyName === flex-grow */
  transition:
    font-size 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
    flex 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
    background 0.2s;
  font-size: 20px;
  background-size: cover;
  background-position: center;
  flex : 1;                  /*[2]*/

  display : flex;            /*[3-1]*/
  justify-content : center;
  align-items : center;
  flex-direction : column;   /*[3-2]*/
}

/*panel 배경이미지설정*/
.panel1 { background-image:url(https://source.unsplash.com/gYl-UtwNg_I/1500x1500); }
.panel2 { background-image:url(https://source.unsplash.com/rFKUFzjPYiQ/1500x1500); }
.panel3 { background-image:url(https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&w=1500&h=1500&fit=crop&s=967e8a713a4e395260793fc8c802901d); }
.panel4 { background-image:url(https://source.unsplash.com/ITjiVXcwVng/1500x1500); }
.panel5 { background-image:url(https://source.unsplash.com/3MNzGlQM7qs/1500x1500); }
```

<br/>

[4]  글자들을 균일하게 세로 배치시키는데, `flex`로 요소 유동화를 시키야 `justify-content`,`align-items`을 할 수 있다.

[5] panel내의 글자들을 `translate-y`로 숨긴다.

[6] 만약 panel이 `open active` 클래스를 가진 경우 `transform :translateY(0)`으로 하여 화면에 글자들이 나타나게 한다.

[7] 패널에 open클래스가 추가되면 해당 패널의 너비를 5가 된다. (패널의 너비가 증가해 확대됨)
```css
/* Flex Children */
.panel > * {
  margin: 0;
  width: 100%;
  border : 1px solid red;
  transition: transform 0.5s;
  /* [4] */
  flex: 1 0 auto;   /*이 요소들을 균일하게 배분 (마치 격자)*/
  display: flex;    
  justify-content: center;
  align-items: center;

}

/*[5]*/
.panel > *:first-child{transform : translateY(-100%)}   /* 제일 첫번째 p태그를 위로 숨김 */
.panel > *:last-child{transform : translateY(100%)}     /* 제일 마지막 p태그는 아래로 숨김 */

/*[6]*/
.panel.open-active > *:first-child {transform :translateY(0)}
.panel.open-active > *:last-child {transform :translateY(0)}


.panel p {
  text-transform: uppercase;
  font-family: 'Amatic SC', cursive;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.72), 0 0 14px rgba(0, 0, 0, 0.45);
  font-size: 2em;
}

.panel p:nth-child(2) {
  font-size: 4em;
}

/*[7]*/
.panel.open {
  font-size: 40px;
  flex : 5;
}
```


<br/>

### (2) javascript

[8] panel 클래스들을 모두 가져온다.

[9] 요소에 open클래스를 추가한다(너비증가!-> transition))

[10] flex속성을 가지고 있다면 toggle(add,remove)로 글자위치 변경한다.

```js
const panels = document.querySelectorAll('.panel');    //[8]
 
function toggleOpen() {                                //[9]
  console.log('Hello');
  this.classList.toggle('open');
}

function toggleActive(e) {                            //[10]
  console.log(e.propertyName);
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('open-active');
  }
}

//[9] -> 패널이 클릭될 시 toggleOpen함수를 실행
panels.forEach(panel => panel.addEventListener('click', toggleOpen));

//[10] -> panel에서 transition이 끝나면 toggleActive를 실행
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));

```
