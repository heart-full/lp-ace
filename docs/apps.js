setTimeout((()=>{document.getElementById("loading").remove()}),500);const wake_menus=document.querySelectorAll(".wake-menu");wake_menus.forEach((e=>{e.addEventListener("click",(()=>{const t=e.nextElementSibling;e.classList.toggle("on"),t.classList.toggle("on")}))}));const sticky_wake_menus=document.querySelectorAll(".sticky-wake-menu"),global_nav=document.getElementById("Global");sticky_wake_menus.forEach((e=>{e.addEventListener("click",(()=>{console.log("click!"),global_nav.classList.toggle("on"),wake_menus.forEach((e=>{e.classList.remove("on")}))}))}));const closeBtn=document.querySelector(".closebtn");function throughHeader(){document.getElementById("intro").scrollIntoView({behavior:"smooth"})}closeBtn.addEventListener("click",(()=>{global_nav.classList.remove("on"),wake_menus.forEach((e=>{e.classList.remove("on")}))})),document.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelector(".scroll_prompt"),t=document.getElementById("intro");e.addEventListener("click",(()=>{t.scrollIntoView({behavior:"smooth"})}))})),window.addEventListener("load",(()=>{if(navigator.userAgent.match(/iPhone|Android.+Mobile/)){let e=window.innerWidth,t=window.innerHeight;parseInt(t/e)?html[0].classList.add("portrait"):html[0].classList.add("landscape")}})),window.addEventListener("orientationchange",(()=>{const e=document.getElementsByTagName("html"),t=document.getElementById("header");let n=window.innerWidth,o=window.innerHeight,s=parseInt(o/n);console.log(s),navigator.userAgent.match(/iPhone|Android.+Mobile/)&&new ResizeObserver((function(t){for(let n of t)s?(e[0].classList.add("landscape"),e[0].classList.remove("portrait")):(e[0].classList.add("portrait"),e[0].classList.remove("landscape"))})).observe(t)})),window.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelectorAll(".inview"),t=new IntersectionObserver((function(e){e.forEach((e=>{e.isIntersecting?e.target.classList.add("active"):e.target.classList.remove("active")}))}),{root:null,threashold:0,rootMargin:"-50% 0%"});e.forEach((e=>{t.observe(e)}))})),window.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("side-nav"),t=document.querySelectorAll("#side-nav li"),n=document.getElementsByTagName("body")[0].getAttribute("id");t.forEach((e=>{e.dataset.id===n&&e.classList.add("active")}));const o=document.querySelectorAll(".outview"),s=new IntersectionObserver((function(t){t.forEach(((t,n)=>{t.isIntersecting?e.classList.add("hide"):e.classList.remove("hide")}))}),{root:null,threashold:0,rootMargin:"0% 0%"});o.forEach((e=>{s.observe(e)}))})),window.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelectorAll(".inview"),t=document.getElementById("toc");e.forEach(((e,n)=>{const o=e.getAttribute("id"),s=e.getAttribute("data-title");t.insertAdjacentHTML("beforeend",`<li><a href="#${o}">${s}</a></li>`)}));const n=new IntersectionObserver((function(e,t){e.forEach(((e,t)=>{e.isIntersecting?function(e){const t=document.querySelector("#toc .active");null!==t&&t.classList.remove("active");const n=document.querySelector(`a[href='#${e.id}']`);n&&n.classList.add("active"),e||n.classList.remove("active")}(e.target):e.target.classList.remove("active")}))}),{root:null,threashold:0,rootMargin:"0% 0% 0% 0%"});e.forEach((e=>{n.observe(e)}))})),-1===document.cookie.indexOf("visited=yes")?document.cookie="visited=yes path=/":throughHeader();