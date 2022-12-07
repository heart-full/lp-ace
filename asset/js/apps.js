// Navigation Button
const wake_menus = document.querySelectorAll('.wake-menu');
wake_menus.forEach((elm) => {
  elm.addEventListener('click', () => {
    const target = elm.nextElementSibling;
    elm.classList.toggle('on');
    target.classList.toggle('on');
  });
});

// Scroll Prompt
document.addEventListener('DOMContentLoaded', ()=>{
  const scroll_prompt = document.querySelector('.scroll_prompt');
  scroll_prompt.addEventListener('click', ()=>{
    let height = window.innerHeight
    window.scrollBy({
      top: height,
      left: 0,
      behavior: 'smooth'
    });
    //console.log(`${height}px`);
  })
});

// Orientation Observation
window.addEventListener('DOMContentLoaded', ()=>{
  const bodys = document.getElementsByTagName('body');
  const mql = window.matchMedia("(orientation: landscape)");
  /* Event Listener */
  const listener = (e) => {
    if(e.matches) {
      bodys[0].classList.add('landscape');
      console.log('landscape');
    } else {
      bodys[0].classList.remove('landscape');
      console.log('portrait');
    }

    /* regist Listner */
    mql.addEventListener("change", listener);

    /* Initialization */
    listener(mql);
  }
})

