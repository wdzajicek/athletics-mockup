// Custom JavaScript to pull in game schedule:
"use strict";
var Schedule = (function scheduleLoading() {
  var sortedEntries, team;

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
        $('.slick.games').slick({
          dots: false,
          autoplay: true,
          autoplaySpeed: 3000,
          centerMode: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          initialSlide: 1,
          arrows: true,
          buttons: true,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }

          ]
        });
      },
    });

  }

  //Decide if it is a home or away game and set color
  function whereIsGame(at){
    var locationColor, located;
    (at.indexOf('at ') >= 0) ? (locationColor="blue",located=at) : (locationColor="red",located="at Kankakee");
    return [locationColor, located];
  }

  jQuery.fn.reverse = [].reverse;

  //Sort the list in reverse as it comes in from json
  //Only list games as long as they have not been played
  //Sort each item returned by the date
  function sortedSports(sortedEntries){
     $(sortedEntries).reverse().each(function() {
        var dateCreated = this.gsx$datecreated.$t;
        var d = new Date().toISOString();
        if(dateCreated > d) {
          var arr = (dateCreated).split("-"),
            at = this.gsx$vs.$t,
            scheduledGame = whereIsGame(at),
            gameColor = scheduledGame[0],
            location = scheduledGame[1],
            months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
         $('#track').prepend('<div class="slick slide"><div id="carousel_date" class="schedule-carousel__date '+ gameColor +'"><span class="schedule-carousel__date-month">'+months[-1+parseInt(arr[1],10)]+'</span><br><span class="schedule-carousel__date-day">'+arr[2].slice(0,2)+'</span></div><div><h3 class="schedule-carousel__sport"> ' + this.gsx$sport.$t + '</h3><p><span class="video-carousel__title">vs. ' + (this.gsx$title.$t).split('vs. ')[1] + '</span><br>'+ location +'<br>'+ ((this.gsx$summary.$t).split('M: ')[0]).split('at ')[1] + 'M</p></div></div>');
        }
        });
    }

return {
  init: init
};

})();
