# 8. Vanilla JS는 재밌엉!  &nbsp;  Hold Shift and Checkboxes

*바닐라js를 이용하여 여러개를 체크하는 체크박스를 만들어보자!*

<img width="70%" src="https://j.gifs.com/JyogQo.gif"/>

<br/>

## 1) 요점

*전체 체크박스를 순회하고 inBetween값에 따라 체크를 조절하자*

<img src="https://blogfiles.pstatic.net/MjAyMDEwMDdfMjk3/MDAxNjAyMDQ4MDg4Nzk1.uV1FjcoLgJZHFXyGTl5REhyeLjRb8fphwuCJFnxBjUIg.RGOqT_u8q3IUeo56bUWJPngxyotU-ZWdtunlLYD0o_Ig.PNG.rmawjdals/Untitled_Diagram.png"/>

- `lastChecked = this`를 사용하여 클릭한 체크박스객체를 가져온다.

- `e.shiftKey && this.checked`를 사용하여 쉬프트+클릭한 체크박스객체를 가져온다.

<br/>

## 2) 구현

### (1) index.html
```html
<div class="inbox">
    <div class="item">
      <input type="checkbox">
      <p>This is an inbox layout.</p>
    </div>
    <div class="item">
      <input type="checkbox">
      <p>Check one item</p>
    </div>
    <div class="item">
      <input type="checkbox">
      <p>Hold down your Shift key</p>
    </div>
    <div class="item">
      <input type="checkbox">
      <p>Check a lower item</p>
    </div>
    <div class="item">
      <input type="checkbox">
      <p>Everything in between should also be set to checked</p>
    </div>
    <div class="item">
      <input type="checkbox">
      <p>Try do it without any libraries</p>
    </div>
    <div class="item">
      <input type="checkbox">
      <p>Just regular JavaScript</p>
    </div>
    <div class="item">
      <input type="checkbox">
      <p>Good Luck!</p>
    </div>
    <div class="item">
      <input type="checkbox">
      <p>Don't forget to tweet your result!</p>
    </div>
  </div>
```


<br/>

### (2) javascript

[1] `htmlTag[html_property="value"]`를 사용하여 체크박스들을 가져온다.

[2] 만약 체크박스를 클릭했을 때, `handleCheck`함수를 실행한다.

[3] shift키 없이 click만한 체크박스 객체를 가져온다.

[4] 이 변수가 `true` 또는 `false`인가에 따라 체크를 좌우한다.

[5] 만약 사용자가 shift+click를 했다면, 이 로직을 실행한다.

[6] start, end checkbox일 때만 `isBetween`값을 변경한다.

```
만약 1,2,3,4,5 체크박스가 있다고 하자!
이때, lastChecked는 2번이고, click&shift한 체크박스가 5번이라고 한다.

루프를 사용해 전체 체크박스를 순회하는데, 
2번 체크박스일 때, isBetween변수가 true로 변경된다.
그렇다면 5번 체크박스전까지 isBetween값은 true이므로, 이전 체크박스들은 checked = true가 된다.
```

```js
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');  //[1]
let lastChecked;  

function handleCheck(e) {
  let inBetween = false;                //[4]
  if (e.shiftKey && this.checked) {     //[5]
    // loop over every single checkbox
    checkboxes.forEach(checkbox => {  
      if (checkbox === this || checkbox === lastChecked) {  //[6]
        inBetween = !inBetween; 
      }
      
      if (inBetween) {              //
        checkbox.checked = true;
      }
    });
  }

  lastChecked = this;   //[3]
  console.log(lastChecked)
}

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));  //[2]
```
