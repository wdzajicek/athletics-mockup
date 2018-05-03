// Custom JavaScript to pull in game schedule:
'use strict';
var SchedulePage = (function scheduleLoading() {
  var sortGames, team;
  var scheduletest = $('body').attr('data-sn');

  function init() {
    var urls = 'https://spreadsheets.google.com/feeds/list/1Twj1SjoGY6H6tj3uwQ1MHMTLvaV2jV8MTvs40dSIvOI/' + scheduletest + '/public/values?alt=json';
    $.ajax({
      url: urls,
      dataType: 'jsonp',
      data: {
        feed: 'entry'
      },
      success: function (data) {
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
    (opponent.indexOf('at ') >= 0 || opponent.indexOf('vs. ') >= 0 ) ? (locationColor = 'schedule__date-blue', located = opponent) : (locationColor = 'schedule__date-red', located = 'Home');
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

  function status(stand) {
    var s;
    if (stand.indexOf('Final') >=0){
      s = 'Final' + stand.split('Final')[1].split(',')[0];
    } else if (stand.indexOf('Postponed') >=0){
      s = 'Postponed' + stand.split('Postponed')[1].split(',')[0];
    } else if (stand.indexOf('Cancelled') >=0){
      s = 'Cancelled' + stand.split('Cancelled')[1].split(',')[0];
    } else {
      s = '';
    }
    return s;
  }
  //Only list games as long as they have not been played
  //Sort each item returned by the date
  function sortedSports(sortGames) {
    var d = new Date().toISOString(),
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      dateOfGame,
      slideString = [];

    $.each(sortGames, function () {
      var that = this;
      dateOfGame = that.gsx$datecreated.$t;

      var arr = (dateOfGame).split('-'),
        opponent = that.gsx$vs.$t,
        stand = that.gsx$summary.$t,
        scheduledGame = HomeOrAway(opponent),
        where = whereIsGame(opponent),
        stat = status(stand),
        ply = playing(opponent);
      slideString.push('<tr><td class="' + scheduledGame[0] + '">' + months[-1 + parseInt(arr[1], 10)] + ' / ' + arr[2].slice(0, 2) + '</td><td>' + ply + '</td><td class="text-right">' + ((that.gsx$summary.$t).split('M: ')[0]).split(' at ')[1] + 'M </td><td>' + where + '</td><td>' + stat + '</td><td>' + that.gsx$gamesummary.$t + '</td></tr>');

    });
    document.querySelector('#track-table').innerHTML = slideString.join('');
  }

  return {
    init: init
  };

})();
