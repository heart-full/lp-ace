window.addEventListener("DOMContentLoaded",(function(){const e=document.getElementsByTagName("html"),t=document.querySelectorAll(".playList"),a=document.querySelector(".movie-modal"),o=document.querySelector(".movie"),n=document.querySelector(".modal-wrap"),l=(document.querySelector("modal"),document.getElementById("overlay"),document.getElementById("close"));t.forEach((function(t){t.addEventListener("click",(function(){let l=this.dataset.ytid;console.log("click");let r=t.dataset.title,i=`<iframe id="player" \n                            width="640" \n                            height="360" \n                            src="https://www.youtube.com/embed/${l}?rel=0&autoplay=1&start=0&end=${t.dataset.end}&mute=1&enablejsapi=1&modestbranding=1&origin=https://heart-full.org" \n                            title="${r}" \n                            frameborder="0" \n                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>\n                    </iframe>`;return o.innerHTML="",o.innerHTML=i,a.classList.add("active"),n.classList.add("playStart"),e[0].style.overflowY="hidden",!1}))})),l.addEventListener("click",(function(){a.classList.remove("active"),n.classList.remove("playStart"),html[0].style.overflowY="auto"}));let r=document.createElement("script");r.src="https://www.youtube.com/iframe_api";let i=document.getElementsByTagName("script")[1];i.parentNode.insertBefore(r,i)})),window.addEventListener("load",(function(){player=new YT.Player("player",{events:{onStateChange:function(e){e.data==YT.PlayerState.ENDED&&(movie_modal.classList.remove("active"),modal_wrap.classList.remove("playStart"),movie.oinnerHTML(""),html[0].style({"overflow-y":"auto"}))}}})}));