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

/** 
 * Orientation Observation
 */
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

/** 
 * Table OF Contents
 */

window.addEventListener('DOMContentLoaded', ()=>{
  const topSections = document.querySelectorAll('.top-section');
  const toc = document.getElementById('toc');
  let anchor = '';
  topSections.forEach((elm)=>{
    const _id = elm.getAttribute('id');
    const _title = elm.getAttribute('data-title');
    toc.insertAdjacentHTML('beforeend', `<li><a href="#${_id}">${_title}</a></li>`);
  });
});

/** 
 * Side Grobal Navigation
 */

window.addEventListener('DOMContentLoaded', ()=>{
  const anchor = document.getElementById('side-nav');
  const anchorLists = document.querySelectorAll('#side-nav li');
  const bodys = document.getElementsByTagName('body');
  const _id = bodys[0].getAttribute('id');
  const _height = window.innerHeight;
  const _scroll = window.scrollY;
  console.log(_id);
  anchorLists.forEach(list =>{
    if(list.dataset.id === _id)
    list.classList.add('active');
  });
});
