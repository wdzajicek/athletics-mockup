$(function() {
  var subNavOffset = $('.sub-nav').height() - 5;
  if ($(window).width() > 992) {
    $('table').stickyTableHeaders({ fixedOffset: subNavOffset });
  }
  else {
    $('table').stickyTableHeaders('destroy');
  }
});
