var element = document.querySelector('.collapse');
element.classList.contains('show');
console.log('Hello Roger 1');
if (element.classList.contains('show')){
  console.log('Hello Roger 2');
  // do this
  document.querySelector('#plusMinus').innerHTML = '-';
} else {
  // DO SOMETHINGS ELSE
  document.querySelector('#plusMinus').innerHTML = '+';
}
