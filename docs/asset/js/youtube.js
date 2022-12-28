  // YouTube Movies
window.addEventListener('DOMContentLoaded', function(){
  const htmls        = document.getElementsByTagName('html');
  const playLists    = document.querySelectorAll('.playList');
  const movie_modal  = document.querySelector('.movie-modal');
  const movie        = document.querySelector('.movie');
  const modal_wrap   = document.querySelector('.modal-wrap');
  const modal        = document.querySelector('modal');
  const overlay      = document.getElementById('overlay');
  const close        = document.getElementById('close');
  playLists.forEach(function(playList){
    // console.log(playList.dataset.ytid);
    playList.addEventListener('click', function(){
      let ytid  = this.dataset.ytid;
      console.log('click');
      let title = playList.dataset.title;
      let end   = playList.dataset.end;
      //
      let iframe = `<iframe id="player" 
                            width="640" 
                            height="360" 
                            src="https://www.youtube.com/embed/${ytid}?rel=0&autoplay=1&start=0&end=${end}&mute=1&enablejsapi=1&modestbranding=1&origin=https://heart-full.org" 
                            title="${title}" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
                            loading="lazy"
                    </iframe>`;
      movie.innerHTML = '';
      movie.innerHTML = iframe;
      movie_modal.classList.add("active");
      modal_wrap.classList.add('playStart');
      htmls[0].style.overflowY = 'hidden';
      // $(".global-nav, .clone-nav").hide();
      // $("#page-top").hide();
      // onYouTubeIframeAPIReady();
      return false;
    })
  });

  close.addEventListener("click",function(){
      movie_modal.classList.remove("active");
      modal_wrap.classList.remove('playStart');
      html[0].style.overflowY = 'auto';
  //     $(".global-nav, .clone-nav").show();
  //     $("#page-top").show();
  });


  let tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  let firstScriptTag = document.getElementsByTagName('script')[1];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  let player;

});
window.addEventListener('load', function(){
  function onYouTubeIframeAPIReady() {
      player = new YT.Player("player",{
          events: {
              'onStateChange': onPlayerStateChange
          }
      });
  };

  function onPlayerStateChange(event) {
      let ytStatus = event.data;
      if (ytStatus == YT.PlayerState.ENDED) {
          movie_modal.classList.remove("active");
          modal_wrap.classList.remove('playStart');
          movie.oinnerHTML('');
          html[0].style({"overflow-y":"auto"});
          // $(".global-nav, .clone-nav").show();
          // $("#page-top").show();
          // scrollBack();
      }
  }
  
  onYouTubeIframeAPIReady();
});
