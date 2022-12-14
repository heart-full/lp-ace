/**
 * Navigation Button
 */
const wake_menus = document.querySelectorAll('.wake-menu');
wake_menus.forEach((elm) => {
  elm.addEventListener('click', () => {
    const target = elm.nextElementSibling;
    elm.classList.toggle('on');
    target.classList.toggle('on');
  });
});



/** 
 * Scroll Prompt
 */ 
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
 * Sections Intersection Observation
 */

window.addEventListener('DOMContentLoaded', ()=>{
  //Trigger Target
  const inviews  = document.querySelectorAll('.inview');

  //Options
  const options = {
    root: null,
    threashold: 0,
    rootMargin: "-50% 0%"
  };

  //Create Observer Instance
  const observer = new IntersectionObserver(showElements, options);

  // Observe Execution
  inviews.forEach(inview => {
    observer.observe(inview);
  });

  // Callback
  function showElements(inviews){
    inviews.forEach((inview) => {
      if (inview.isIntersecting) {
        // 各 .inview に .active を加える
        inview.target.classList.add('active');
      } else {
        inview.target.classList.remove('active');
      }
    });
  }
})



/** 
 * Side Grobal Navigation
 */
window.addEventListener('DOMContentLoaded', ()=>{
  //
  const sideNav = document.getElementById('side-nav');
  const anchorLists = document.querySelectorAll('#side-nav li');
  // Get Anchor Link
  const bodys = document.getElementsByTagName('body');
  const _id = bodys[0].getAttribute('id');
  console.log(_id);
  anchorLists.forEach(list =>{
    if(list.dataset.id === _id)
    list.classList.add('active');
  });

  //Intersection Observe Trigger
  const outViews = document.querySelectorAll('.outview');
  
  // options
  const options = {
    root: null,
    threashold: 0,
    rootMargin: "0% 0%"
  };

  // Create Observer Instance Object
  const outViewObserver = new IntersectionObserver(hideNav, options);

  // Observe Execution
  outViews.forEach(outview =>{
    outViewObserver.observe(outview);
  });

  // Callback
  /** 
   * ヘッダーが表示されたら非表示
   */
  function hideNav(outViews){
    outViews.forEach((outview, index) => {
      if (outview.isIntersecting) {
        // サイドナビを非表示にする
        sideNav.classList.add('hide');
      } else {
        sideNav.classList.remove('hide');
      }
    });
  }
});



/** 
 * Tabole Of Contents
 */
// Make TOC
window.addEventListener('DOMContentLoaded', ()=>{
  const _header     = document.querySelector('.page_header');
  const topSections = document.querySelectorAll('.top-section');
  const inviews     = document.querySelectorAll('.inview');
  const toc         = document.getElementById('toc');
  const anchors     = document.querySelectorAll('#toc a');
  //Insert Elements
  topSections.forEach((elm)=>{
    const _id = elm.getAttribute('id');
    const _title = elm.getAttribute('data-title');
    toc.insertAdjacentHTML('beforeend', `<li><a href="#${_id}">${_title}</a></li>`);
  });

  // Intersection Observation
  // options
  const options = {
    root: null,
    threashold: 0,
    rootMargin: "0% 0% 0% 0%"
  };
  // Create Observer Instance Object
  const TOCObserver = new IntersectionObserver(showElements, options);
  // Observe Execution
  inviews.forEach(inview => {
    TOCObserver.observe(inview);
  });
  // Callback Function
  function showElements(inviews,outViews){
    inviews.forEach((inview, index) => {
      if (inview.isIntersecting) {
        // 目次の色を変える
        activateIndex(inview.target);
      } else {
        inview.target.classList.remove('active');
      }
    });
  }

  /**
  * 目次の色を変える関数
  * @param element
  */
  function activateIndex(element) {
    // すでにアクティブになっている目次を選択
    const currentActiveIndex = document.querySelector("#toc .active");
    // すでにアクティブになっているものが0個の時（=null）以外は、activeクラスを除去
    if (currentActiveIndex !== null) {
      currentActiveIndex.classList.remove("active");
    }
    // 引数で渡されたDOMが飛び先のaタグを選択し、activeクラスを付与
    const newActiveIndex = document.querySelector(`a[href='#${element.id}']`);
    if(newActiveIndex)
    newActiveIndex.classList.add("active");
    if(!element)
    newActiveIndex.classList.remove("active");
  }

  /**
   * header領域が表示されたら目次の反転表示を解除する
   */
  /*
  //Intersection Observe Trigger
  const outViews = document.querySelectorAll('.outview');
  // options
  const options2 = {
    root: null,
    threashold: 0,
    rootMargin: "0px 0px 0px 0px"
  };
  // Create Observer Instance Object
  const OutViewObserver = new IntersectionObserver(inActive, options2);
  // Observe Execution
  outViews.forEach(outview =>{
    OutViewObserver.observe(outview);
  });
  // Callback Function
  function inActive(element) {
    // すでにアクティブになっている目次を選択
    const currentActiveIndex = document.querySelector("#toc .active");
    // すでにアクティブになっているものが0個の時（=null）以外は、activeクラスを除去
    if (currentActiveIndex !== null) {
      currentActiveIndex.classList.remove("active");
    } else {
      // 引数で渡されたDOMが飛び先のaタグを選択し、activeクラスを付与
      const newActiveIndex = document.querySelector(`a[href='#${element.id}']`);
      if(newActiveIndex)
      newActiveIndex.classList.add("active");
      if(!element)
      newActiveIndex.classList.remove("active");
      }
    }
  })
  */
})

/** 
 * Through Header Block
 */
const scroll_prompt = document.querySelector('.scroll_prompt');
let scrollHeight = window.innerHeight;
window.scrollBy({
  top: scrollHeight,
  left: 0,
  behavior: 'smooth'
})
