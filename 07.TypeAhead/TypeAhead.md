# 7. Vanilla JS는 재밌엉!  &nbsp;  TypeAhead

*바닐라js를 이용하여 TypeAhead를 만들어보자!*

<img width="70%" src="https://j.gifs.com/QnMoAM.gif"/>

<br/>

## 1) 요점

*input에 데이터 입력시, 해당하는 데이터를 미리 보여주자*

- `display:flex`를 이용하여 요소를 유동화시킨다. 

- `flex: 1` -> `flex: 5`로 너비를 확대하여 특정 패널을 확대시킨다.

<br/>

## 2) 구현

### (1) index.html
```html
<form class="search-form">
  <input type="text" class="search" placeholder="City or State">
  <ul class="suggestions">
    <li>Filter for a city</li>
    <li>or a state</li>
  </ul>
</form>
```


<br/>

### (2) javascript

#### A. fetch(json데이터, callback function)

[1] fetch는 <a href="https://joshua1988.github.io/web-development/javascript/promise-for-beginners/#promise%EA%B0%80-%EB%AD%94%EA%B0%80%EC%9A%94">promise</a>를 리턴한다.

: 데이터를 받아오기도 전에 화면에 데이터를 표시하려고 하면 오류가 발생하는데, promise설정으로 특정 과정을 먼저 실행한다.

: `.then(data)`은 결과 값을 data라는 인자로 받는다는 것이다.

```js
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';  //json data
const cities = [];
fetch(endpoint)  //[1]
   //raw data객체에서 json데이터를 json()으로 호출함(해당 데이터 명세에 그렇게 표시되어있음(blob 출력시 -> json이라는 속성이 있음))
  .then(blob => blob.json())  
  //json데이터객체들을 -> cities배열에 담음
  .then(data => cities.push(...data)); 

```

<br/>

[2] <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/RegExp">`RegExp`</a>를 이용하여 //안에 변수를 넣는다. 

[3] 검색을 했을 때 regax(정규표현식)가 city 혹은 state 중에서 regax가 들어간 값이 있다면 true를 리턴

```js
//here we need to figure out if the city or state matches what was searched
function findMatches(wordToMatch, cities){
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');               [2]
    return place.city.match(regex) || place.state.match(regex) [3]
  });
}
```

<br/>

[5] input에 입력된 값을 -> findMatches에 넣어서 -> 일치하는 값을 array에 담는다.

[6] matchArray값을 span태그에 담는다.

[7] html에 matchArray span태그를 추가한다.

[8] 사용자가 input에 data 입력시 -> 결과값에 data부분이 하이라이트가 되게 한다.

[8-1] input에 입력된 값을 정규표현식으로 변경한다.

[8-2] <a href="https://hianna.tistory.com/343">place.city</a>데이터에서 regax에 해당하는 데이터를 -> span으로 감싼 하이라이트 형식으로 변경한다.

[8-3] city뿐만 아니라 state도 하이라이트 되게 한다.

```js
function displayMathches(){
  //현재 객체(input)의 속성값(value)
  const matchArray = findMatches(this.value, cities);   //[5]

  //[6]
  const html = matchArray.map(place => {
     //[8]
    const regex = new RegExp(this.value, 'gi');         //[8-1]
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);  //https://hianna.tistory.com/343
    //[8-2]

    //[8-3]
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);

    return `
      <li>
        <!-- numberWithCommas(place.population)를 해서 숫자 100단위마다 쉼표를 붙임-->
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
    `
  }).join(''); 
  suggestions.innerHTML = html;   //[7]

}
```

<br/>

[4] input에 입력된 값이 변경되면 -> displayMathches함수를 실행 -> 나타나는 값을 변경된다.

[9] <a href="https://mizzo-dev.tistory.com/entry/JavaScript%EC%A0%95%EA%B7%9C%EC%8B%9D-%EC%88%AB%EC%9E%90%EC%97%90-1000%EB%8B%A8%EC%9C%84%EB%A1%9C-%EC%BD%A4%EB%A7%88%EC%89%BC%ED%91%9C-%EA%B5%AC%EB%B6%84%EC%9E%90-%EB%84%A3%EA%B8%B0">숫자 100단위마다</a> 콤마 넣는다.

```js
const searchInput = document.querySelector('.search');      //input
const suggestions = document.querySelector('.suggestions'); //ul

searchInput.addEventListener('change', displayMathches);
searchInput.addEventListener('keyup', displayMathches);  //keyup은 타이핑할때마다

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
```
