# 6. Vanilla JS는 재밌엉!  &nbsp;  JS Array(2)

*바닐라js의 Array에 대해 알아보자!*

<br/>

### 0) 사전 데이터

```js
const people = [
  { name: 'Wes', year: 1988 },
  { name: 'Kait', year: 1986 },
  { name: 'Irv', year: 1970 },
  { name: 'Lux', year: 2015 }
];

const comments = [
  { text: 'Love this!', id: 523423 },
  { text: 'Super good', id: 823423 },
  { text: 'You are the best', id: 2039842 },
  { text: 'Ramen is my fav food ever', id: 123523 },
  { text: 'Nice Nice Nice!', id: 542328 }
];
```

## 1) Array.prototype.some()
### (1) 설명
- 배열 안의 어떤 요소라도 주어진 판별 함수를 통과하는지 테스트한다.
```js
const isAdult = people.some(person => ((new Date()).getFullYear()) - person.year >= 19);
console.log(isAdult);
```

### (2) 출력 형태

```js
{ isAdult: true }
```

<br/>

## 2) Array.prototype.find()
### (1) 설명
- 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환하며, 그런 요소가 없다면 undefined를 반환한다.
```js
const comment = comments.find(comment => comment.id === 823423);
```

### (2) 출력 형태

```js
{ text: 'Super good', id: 823423 }
```

<br/>

## 3) Array.prototype.every()
### (1) 설명
-  배열 안의 모든 요소가 주어진 판별 함수를 통과하는지 테스트한다.
```js
const allAdults = people.every(person => ((new Date()).getFullYear()) - person.year >= 19);
console.log({allAdults});
```

### (2) 출력 형태

```js
{ allAdults: false }
```

<br/>

## 4) Array.prototype.findIndex()
### (1) 설명
- 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환하며 만족하는 요소가 없으면 -1을 반환한다.

```js
const index = comments.findIndex(comment => comment.id === 823423);
```
<br/>

- 모든 invertor가 몇 년 동안 함께 살았는지 저장한다.

```js
const totalYears = inventors.reduce((total, inventor) => {
  return total + (inventor.passed - inventor.year);
}, 0);
```

### (2) 출력 형태

```js
1
```

<br/>

## 5) Array.prototype.splice()
### (1) 설명
- <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/splice">splice()</a> 메서드는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경한다.

```js
const newComments = [
  ...comments.slice(0, index),
  ...comments.slice(index + 1)
];
```


### (2) 출력 형태

```js
[ { text: 'Love this!', id: 523423 },
  { text: 'You are the best', id: 2039842 },
  { text: 'Ramen is my fav food ever', id: 123523 },
  { text: 'Nice Nice Nice!', id: 542328 } ]
```

