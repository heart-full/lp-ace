/**
 * Loading Remove
 */
// setTimeout(() => {
//   document.getElementById('loading').remove();
// }, 500);


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

const sticky_wake_menus = document.querySelectorAll('.sticky-wake-menu');
const global_nav        = document.getElementById('Global');
sticky_wake_menus.forEach((menu) => {
  menu.addEventListener('click', () => {
    console.log('click!');
    // console.table(global_nav_anchors);
    global_nav.classList.toggle('on');
    wake_menus.forEach(wake_menu =>{
      wake_menu.classList.remove('on');
    })
    });
});

const closeBtn = document.querySelector('.closebtn');
closeBtn.addEventListener('click', ()=>{
  global_nav.classList.remove('on');
  wake_menus.forEach(wake_menu =>{
    wake_menu.classList.remove('on');
  })
});


/** 
 * Scroll Prompt
 */ 
document.addEventListener('DOMContentLoaded', ()=>{
  const scroll_prompt = document.querySelector('.scroll_prompt');
  const firstSection  = document.getElementById('intro');
  scroll_prompt.addEventListener('click', ()=>{
    firstSection.scrollIntoView({
      behavior: 'smooth'
    });
  })
});



/** 
 * Mobile Device Initial Orientation Observation
 */
window.addEventListener('load', ()=>{
  if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
    let _width = window.innerWidth;
    let _height = window.innerHeight;
    let aspectRatio = parseInt(_height / _width);
    // console.log(aspectRatio);
    if(aspectRatio) { //portrait
      html[0].classList.add('portrait');
    } else { //landscape
      html[0].classList.add('landscape');
    }

  } 
})



/** 
 * Mobile Device Orientation Change Observation
 */
window.addEventListener('orientationchange', ()=>{
  const html = document.getElementsByTagName('html');
  const _header = document.getElementById('header');
  let _width = window.innerWidth;
  let _height = window.innerHeight;
  let aspectRatio = parseInt(_height / _width);
  console.log(aspectRatio);
  if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
    const windowResizeObserver = new ResizeObserver(resizeHandler);
    windowResizeObserver.observe(_header);
  }

  function resizeHandler(entries) {
    for (let entry of entries) {
      //回転時は幅と高さが逆転する。( _width ⇒ _height, _height ⇒ _width )
      if(aspectRatio) { //landscape
        html[0].classList.add('landscape');
        html[0].classList.remove('portrait');
      } else { //portrait
        html[0].classList.add('portrait');
        html[0].classList.remove('landscape');
      }
    }
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
  // console.log(_id);
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
  const inviews     = document.querySelectorAll('.inview');
  const toc         = document.getElementById('toc');
  //Insert Elements
  inviews.forEach((elm, index)=>{
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
})


/** 
 * 初回アクセスチェック
 */
// 初回アクセス時
// if (document.cookie.indexOf('visited=yes') === -1) {
//   document.cookie = 'visited=yes path=/';
//   // console.log('初回のアクセスです');
// } else {
//   // 2回目以降のアクセス
//   throughHeader();
//   // console.log('2回目以降のアクセスです');
// }


/** 
 * Through Header Block
 */
window.addEventListener('load', ()=>{
  if (document.cookie.indexOf('loading=finished') != -1) {
    setTimeout(() => {
      // document.getElementById('loading').remove();
      const firstSection  = document.getElementById('intro');
      firstSection.scrollIntoView({
        behavior: 'smooth'
      })
    }, 500);
  }
})
