# 3. Vanilla JS는 재밌엉!  &nbsp;  JS Array(1)

*바닐라js의 Array에 대해 알아보자!*

<br/>

### 0) 사전 데이터

```js
const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
  { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
  { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
  { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];

```

## 1) Array.prototype.filter()
### (1) 설명
- 특정 조건에 해당하는 값을 저장한다.
- invertors에서 year이 1500~1600사이의 데이터만 저장합니다.
```js
const fifteen = inventors.filter(inventor => (inventor.year >= 1500 && inventor.year < 1600));
```

### (2) 출력 형태

```js
[ { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 } ]
```

<br/>

## 2) Array.prototype.map()
### (1) 설명
- callback 함수를 각각의 요소에 대해 한번씩 순서대로 불러 그 함수의 반환값으로 새로운 배열을 만든다.
- invertors의 각각의 요소를 first, last인 형태로 저장한다.(성이름 형태)
```js
const fullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
```

### (2) 출력 형태

```js
[ 'Albert Einstein',
  'Isaac Newton',
  'Galileo Galilei',
  'Marie Curie',
  'Johannes Kepler',
  'Nicolaus Copernicus',
  'Max Planck',
  'Katherine Blodgett',
  'Ada Lovelace',
  'Sarah E. Goode',
  'Lise Meitner',
  'Hanna Hammarström' ]
```

<br/>

## 3) Array.prototype.sort()
### (1) 설명
- 정렬 순서를 정의하는 함수. 생략하면 배열은 각 요소의 문자열 변환에 따라 각 문자의 유니 코드 포인트 값에 따라 정렬된다.
- invertors를 year를 기준으로 오름차순 정렬한다.
```js
const ordered = inventors.sort((a, b) => a.year > b.year ? 1 : -1);
```

### (2) 출력 형태

```js
[ { first: 'Nicolaus',
    last: 'Copernicus',
    year: 1473,
    passed: 1543 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 } ]
```

<br/>

## 4) Array.prototype.reduce(callback[, initialValue])
### (1) 설명
- reduce()는 빈 요소를 제외하고 배열 내에 존재하는 각 요소에 대해 callback 함수를 한 번씩 실행하는데, 콜백 함수는 다음의 네 인수를 받는다.
```
- accumulator
- currentValue
- currentIndex
- array

콜백의 최초 호출 때 accumulator와 currentValue는 다음 두 가지 값 중 하나를 가질 수 있다. 
만약 reduce() 함수 호출에서 initialValue를 제공한 경우, accumulator는 initialValue와 같고 currentValue는 배열의 첫 번째 값과 같다. 
initialValue를 제공하지 않았다면, accumulator는 배열의 첫 번째 값과 같고 currentValue는 두 번째와 같다.
```
```js
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
// 1 + 2 + 3 + 4
// console.log(array1.reduce(reducer));
// 5 + 1 + 2 + 3 + 4
// console.log(array1.reduce(reducer, 5));
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
861
```

### (3) reduce() 응용

```js
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck', 'pogostick'];

const transportation = data.reduce(function(obj, item) {
  if (!obj[item]) {
    obj[item] = 0;
  }
  obj[item]++;
  return obj;
}, {});
```
```js
//출력형태
{ car: 5, truck: 3, bike: 2, walk: 2, van: 2, pogostick: 1 }
```



