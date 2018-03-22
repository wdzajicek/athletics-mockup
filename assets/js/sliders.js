// DO NOT PLACE IN A DOCUMENT READY FUNTION - it will break

// Main Athletics carousel
$('.heroSlider').slick({
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  prevArrow:"<img class='a-left control-c prev slick-prev' src='assets/img/dbl-prev.svg'>",
  nextArrow:"<img class='a-right control-c next slick-next' src='assets/img/dbl-next.svg'>"
});
// Baseball carousel
$('.baseballSlider').slick({
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  prevArrow:"<img class='a-left control-c prev slick-prev' src='../../assets/img/dbl-prev.svg'>",
  nextArrow:"<img class='a-right control-c next slick-next' src='../../assets/img/dbl-next.svg'>"
});
