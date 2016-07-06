//will set the game to the user to play
function restart(){
  m = 0;
  for(i=0; i < oCells.length; i++){
    oCells[i].innerHTML = '';
  }
  //the number to be written on the box
  numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  //set the number for a position to play the game
 numbers.shuffle();
  for(i=0; i < numbers.length; i++){
    oCells[i].innerHTML = numbers[i];
  }
  reDrawBoard(numbers.length);
}
///////to reset the board combination button...
function reset1(){
   m = 0;
 for(i=0; i < oCells.length; i++){
   oCells[i].innerHTML = '';
}
  numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
// numbers.shuffle();
 for(i=0; i < numbers.length; i++){
   oCells[i].innerHTML = numbers[i];
  }
  reDrawBoard(numbers.length);
}

///////
//This will make the board to 'clear'to new set of combination
function reDrawBoard(num){
  for(var i = 0; i < oCells.length; i++){
    oCells[i].onclick = oCells[i].length.className = oCells[i].title = "";
  }
  //will locate the cell creating a new array with new set
  touchingCells = new Array();
  oBlank = oCells[num];
  oBlank.rowNum = new Number(getRowIndex(oBlank));
  oBlank.cellNum = new Number(getCellIndex(oBlank));
  oBlank.cellIndx = (oBlank.rowNum*4)+oBlank.cellNum;
//get the cells touching blank square to the cells currently touching the blank square
  touchingCells = getTouchingCells(oBlank);
     assignOnclicks();
  }






//

/////////
