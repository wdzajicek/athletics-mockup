// Custom JavaScript to pull in game schedule:
"use strict";
var Schedule = (function scheduleLoading() {
  var sortGames, team;

  function init() {
    var urls ='https://spreadsheets.google.com/feeds/list/1Twj1SjoGY6H6tj3uwQ1MHMTLvaV2jV8MTvs40dSIvOI/1/public/values?alt=json';
    $.ajax({
      url:urls,
      dataType:"jsonp",
      data: {
        feed: "entry"
      },
      success:function(data) {
        sortedSports(data.feed.entry);
      },
    });

  }

  //Decide if it is a home or away game and set color
  function whereIsGame(at){
    var locationColor, located;
    (at.indexOf('at ') >= 0) ? (locationColor="schedule-carousel__date-blue",located=at) : (locationColor="schedule-carousel__date-red",located="at Kankakee");
    return [locationColor, located];
  }

  function slickOptions(){
            $('.slick.games').slick({
          dots: false,
          autoplay: false,
          centerMode: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          initialSlide: 0,
          arrows: true,
          buttons: true,
          prevArrow:"<img class='a-left control-c prev slick-prev' src='assets/img/blue-prev.svg'>",
          nextArrow:"<img class='a-right control-c next slick-next' src='assets/img/blue-next.svg'>",
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
          ]
        });
      Youtube_carousel.init();
  }

  //Only list games as long as they have not been played
  //Sort each item returned by the date
  function sortedSports(sortGames){
        var d = new Date().toISOString(),
         months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ],
         dateOfGame,
         slideString=[];

     $.each(sortGames, function() {
       var that = this;
       dateOfGame = that.gsx$datecreated.$t;

        if(dateOfGame > d) { //If the entry's date is greater than the date then setup the track with a new div
          var arr = (dateOfGame).split("-"),
            at = that.gsx$vs.$t,
            scheduledGame = whereIsGame(at);
            slideString.push('<div class="slick slide"><div id="carousel_date" class="'+ scheduledGame[0] +'"><span class="schedule-carousel__date-month">'+months[-1+parseInt(arr[1],10)]+'</span><br><span class="schedule-carousel__date-day">'+arr[2].slice(0,2)+'</span></div><div><h3 class="schedule-carousel__sport"> ' + that.gsx$sport.$t + '</h3><p><span class="video-carousel__title">vs. ' + (that.gsx$title.$t).split('vs. ')[1] + '</span><br>'+ scheduledGame[1] +'<br>'+ ((that.gsx$summary.$t).split('M: ')[0]).split('at ')[1] + 'M</p></div></div>');
        }
        });
    document.querySelector('#track').innerHTML = slideString.join("");
    slickOptions();
    }

return {
  init: init
};

})();
