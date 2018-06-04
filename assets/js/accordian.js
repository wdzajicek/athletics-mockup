// Acordian.JS
// Allows anchor jump-link to work with with acordian function
//
$('#my-link').click(function() {
  $('#collapseOne').collapse('hide');
  $('#collapseOne').collapse('show');
});

function toggleAccordian() {
  var plusMinus = document.getElementById('plusMinus');
  if (plusMinus.firstChild.nodeValue == '+') {
    plusMinus.firstChild.nodeValue = '-';
  } else {
    plusMinus.firstChild.nodeValue = '+';
  }
}

var member = document.getElementById('plusButton');
member.addEventListener('click', toggleAccordian, false);

$('#my-link2').click(function() {
  $('#collapseTwo').collapse('hide');
  $('#collapseTwo').collapse('show');
});

function toggleAccordian2() {
  var plusMinus = document.getElementById('plusMinus2');
  if (plusMinus.firstChild.nodeValue == '+') {
    plusMinus.firstChild.nodeValue = '-';
  } else {
    plusMinus.firstChild.nodeValue = '+';
  }
}

var trainer = document.getElementById('plusButton2');
trainer.addEventListener('click', toggleAccordian2, false);
