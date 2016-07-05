//
function restart(){
  m = 0;
  for(i=0; i < oCells.length; i++){
    oCells[i].innerHTML = '';
  }

  //
  numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  //
  numbers.shuffle();
  for(i=0; i < numbers.length; i++){
    oCells[i].innerHTML = numbers[i];
  }
  reDrawBoard(numbers.length);
}





function reDrawBoard(num){
  for(var i = 0; i < oCells.length; i++){
    oCells[i].onclick = oCells[i].length.className = oCells[i].title = "";
  }
}
