//keyUp event | widow객체에 이벤트 적용 
window.addEventListener('keydown', function(e){
// e는 현재 이벤트가 발생한 객체의 정보를 가짐(key-data도 가짐)
  // console.log(e.keyCode);
  // e.keyCode 누른 키의 고유 키값을 알려줌

  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  // audio는 data-key 속성을 가지고 있음
  // 우리가 특정키를 누르면 audio는 특정키번호를 가진 audio를 불러와서 사용 
  // console.log(audio);

// 해당 버튼 클릭시 효과 부여하기
// key클래스를 가진 div중에서 data-key가 ~인 태그
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);


  if(!audio) return ;
  // 만약 해당하는 번호의 audio태그가 없으면 함수작동 x

  audio.currentTime = 0;  
  //0초부터 해당 오디오 재생 -> 만약 오디오가 3초 짜리라면 한 번 누를 때 마다 3초간 플레이하다가 다른  버튼을 누르면 첫번째 버튼은 2초에서 머무름. 그러면 다시 첫번째 버튼을 눌러도 바로 소리가 안나고 2초부터 재생되면 올바른 소리가 안남. 그래서 처음부터 해당 소리가 재생되도록 재생시작위치를 0초로 지정함
  audio.play(); //audio 
  //키가 누르면 애니메이션 css클래스르 추가함
  // toggle을 add, remove가 동시에 지원
  // 홀수번 누르면 add, 짝수번 누르면 remove
  key.classList.add('playing');


});

function removeTransition(e){
  console.log(e);
}
// 우리는 버튼이 눌린 효과를 setTimeout으로 삭제할 수 있지만 해당 방법보다는 transition을 이용한 방법으로 효과클래스를 삭제해보자(이게 더 번거롭지 않아!)


const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

