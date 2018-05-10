// Custom JavaScript to pull in YouTube playlist:
var Youtube_carousel = (function youtube_carousel_module(){

  var $apiK = $('meta[name=yt-api-k]').attr('value'),
    $ytList = $('#yt_list'),
    $ytPlayer = $('#yt_player');

  function init(){
    var default_user_name = 'KankakeeCommCollege';
    selectChannel(default_user_name);
  }

  function selectChannel(user_name) {
    $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/channels',
      type: 'GET',
      dataType: 'json',
      data: {
        part: 'contentDetails',
        forUsername: user_name,
        key: $apiK
      },
      success: function (d) {
        $ytList.html('');
        if (d.pageInfo.totalResults > 0) {
          for (var _i = 0, _a = d.items; _i < _a.length; _i++) {
            var item = _a[_i];
            var uploads = 'PLEnNvZd4X-lVSveRGpbsXLCmf7hYXX97q';
            getVideos(uploads);
          }
        }
        else {
          $('input#user_name').addClass('error');
          $('div#channel_input > .info')
            .show()
            .html('This user not exists');
        }
      },
      error: function (x) {
        console.dir(x);
      }
    });
  }
  function getVideos(yt_id, next_page) {
    if (next_page === void 0) { next_page = ''; }
    var limit = 8;
    var more = '';
    var xhr = $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/playlistItems',
      type: 'GET',
      dataType: 'json',
      data: {
        part: 'snippet',
        playlistId: yt_id,
        maxResults: limit,
        pageToken: next_page,
        key: $apiK
      },
      success: function (data) {
        if (data.nextPageToken) {
          more = ''
        }
        if (next_page === '') {
          $ytPlayer.attr('src', 'https://youtube.com/embed/' +
                    data.items[0].snippet.resourceId.videoId +
                    '?controls=0&showinfo=0&rel=0');
        }
        for (var i = 0; i < limit; i++) {
          var title = $('<h3 class="video-carousel__title">').append(data.items[i].snippet.title),
            thumb = $('<img class="img-fluid" src="assets/img/yt-loading.png">').attr('data-src', data.items[i].snippet.thumbnails.medium.url),
            video_id = data.items[i].snippet.resourceId.videoId,
            link = $('<a class="video-link" data-toggle="modal" data-target="#exampleModalCenter" href="#">')
              .data('videoid', video_id)
              .append(thumb),
            holder = $('<div class="item">').append(link, title);
          $ytList.append(holder);
        }
        $ytList.append(more);
        $ytList.slick({
          dots: false,
          infinite: false,
          autoplay: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          adaptiveHeight: false,
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
        lzFunction();   // Lazy load function
      }
    });
  }
  /* load more */
  $ytList.on('click', '#load-more', function () {
    $(this)
      .animate({
        'transform': 'scaleX(4)',
        'opacity': '0.1'
      }, function () {
        var that = $(this);
        getVideos(that.data('yt-id'), that.data('next-page'));
        that.remove();
      });
  });
  /* embeds */
  $ytList.on('click', 'a.video-link', function () {
    var video_id = $(this).data('videoid');
    $ytPlayer.attr(
      'src',
      'https://youtube.com/embed/' +
      video_id +
      '?controls=0&showinfo=0&rel=0&autoplay=1'
    );
  });

  $('#exampleModalCenter').on('hide.bs.modal', function (e) {
    var video_id = $(this).data('videoid');
    var leg=$ytPlayer.attr(
      'src',
      'https://youtube.com/embed/' +
      video_id +
      '?controls=0&showinfo=0&rel=0&autoplay=0');
    $ytPlayer.attr('src',leg);
  });

  return {
    init: init
  };

})();
