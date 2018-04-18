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

  //Decide if it is a home or away game and set color
  function whereIsGame(at) {
    var locationColor, located;
    (at.indexOf('at ') >= 0) ? (locationColor = 'schedule__date-blue', located = at) : (locationColor = 'schedule__date-red', located = 'Home');
    return [locationColor, located];
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

      if (dateOfGame > d) { //If the entry's date is greater than the date then setup the track with a new div
        var arr = (dateOfGame).split('-'),
          at = that.gsx$vs.$t,
          vsSchool = (at.indexOf('at ') >= 0) ? (that.gsx$title.$t).split('vs. ')[1]:(that.gsx$title.$t).split('vs. ')[0],
          scheduledGame = whereIsGame(at);

        slideString.push('<tr><td class="' + scheduledGame[0] + '">' + months[-1 + parseInt(arr[1], 10)] + ' / ' + arr[2].slice(0, 2) + '</td><td>vs. ' + vsSchool + '</td><td class="text-right">' + ((that.gsx$summary.$t).split('M: ')[0]).split(' at ')[1] + 'M </td><td>' + scheduledGame[1] + '</td></tr>');

      }
    });
    document.querySelector('#track-table').innerHTML = slideString.join('');
  }

  return {
    init: init
  };

})();
