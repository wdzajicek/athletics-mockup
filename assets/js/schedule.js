// Custom JavaScript to pull in game schedule:
'use strict';
var Schedule = (function scheduleLoading() {
  var sortGames, team;
  var scheduletest = $('body').attr('data-sn');

  function init() {
    var urls ='https://spreadsheets.google.com/feeds/list/1Twj1SjoGY6H6tj3uwQ1MHMTLvaV2jV8MTvs40dSIvOI/' + scheduletest + '/public/values?alt=json';
    $.ajax({
      url:urls,
      dataType:'jsonp',
      data: {
        feed: 'entry'
      },
      success:function(data) {
        sortedSports(data.feed.entry);
      },
    });

  }

  function playing(player) {
    var gamePlayer;
    if(player.indexOf('at ') == -1 && player.indexOf('vs. ') == -1){
      gamePlayer = player;
    } else if (player.indexOf('at') >=0){
      gamePlayer = player.split('at ')[1];
    } else if (player.indexOf('vs') >=0){
      gamePlayer = player.split('vs. ')[1].split('@')[0];
    }
    return gamePlayer;
  }

  function HomeOrAway(opponent) {
    var locationColor, located;
    (opponent.indexOf('at ') >= 0 || opponent.indexOf('vs. ') >= 0 ) ? (locationColor = 'schedule-carousel__date-blue', located = opponent) : (locationColor = 'schedule-carousel__date-red', located = 'Home');
    return [locationColor, located];
  }

  function whereIsGame(at) {
    var located;
    if(at.indexOf('at ') == -1 && at.indexOf('@ ') == -1){
      located = 'Home';
    } else if (at.indexOf('at') >=0){
      located = at.split('at ')[1];
    } else if (at.indexOf('@') >=0){
      located = at.split('@ ')[1];
    }
    return [located];
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
      prevArrow:'<img class="a-left control-c prev slick-prev" src="http://athletics.kcc.edu/assets/img/blue-prev.svg">',
      nextArrow:'<img class="a-right control-c next slick-next" src="http://athletics.kcc.edu/assets/img/blue-next.svg">',
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
  }

  //Only list games as long as they have not been played
  //Sort each item returned by the date
  function sortedSports(sortGames){
    var d = new Date().toISOString(),
      months = [ 'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ],
      dateOfGame,
      slideString=[],
      slideStringLength;

    $.each(sortGames, function() {
      var that = this;
      dateOfGame = that.gsx$datecreated.$t;

      if(dateOfGame > d) { //If the entry's date is greater than the date then setup the track with a new div
        var arr = (dateOfGame).split('-'),
          opponent = that.gsx$vs.$t,
          scheduledGame = HomeOrAway(opponent),
          where = whereIsGame(opponent),
          ply = playing(opponent);
        slideString.push('<div class="slick slide"><div id="carousel_date" class="'+ scheduledGame[0] +'"><span class="schedule-carousel__date-month">'+months[-1+parseInt(arr[1],10)]+'</span><br><span class="schedule-carousel__date-day">'+arr[2].slice(0,2)+'</span></div><div><h3 class="schedule-carousel__sport"> ' + that.gsx$sport.$t + '</h3><p><span class="schedule-carousel__title">vs. ' + ply + '</span><br>'+ where +'<br><span class="schedule-carousel__time">'+ ((that.gsx$summary.$t).split('M: ')[0]).split('at ')[1] + '.M.<span></p></div></div>');
      }
    });

    slideStringLength = slideString.length;
    if(slideStringLength > 0 && slideStringLength <= 3) {
      document.querySelector('#track').innerHTML = slideString.join('');
      slickOptions();
      Youtube_carousel.init();
    } else if (slideStringLength === 0){
      document.querySelector('#track').innerHTML = '<p style="margin:10px;font-weight:bold;">Currently there are no upcoming games.</p>';
      Youtube_carousel.init();
    }
  }

  return {
    init: init
  };

})();
