 function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    // 만약 event의 css속성 중에 transform(.playing)이 없다면 
    e.target.classList.remove('playing');
    // // 만약 event의 css속성 중에 transform이 있다면 playing 삭제
  }

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) return;

  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}
const keys = document.querySelectorAll('.key');

keys.forEach(key => {
  key.addEventListener('transitionend', removeTransition)
});
window.addEventListener('keydown', playSound);
