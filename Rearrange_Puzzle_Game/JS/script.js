//will set the game to the user to play
function restart(){
  m = 0;//with m = moves 0
  for(i=0; i < oCells.length; i++){
    oCells[i].innerHTML = '';
  }
  //the number to be written on the box
  numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  //set the number for a position to play the game
  //will call the function to mix the position...
 numbers.shuffle();
  for(i=0; i < numbers.length; i++){
    oCells[i].innerHTML = numbers[i];
  }
    reDrawBoard(numbers.length);

}
/*not sure yet! I believe will act the same as restart so maybe
 no need for it.. once will restart after reset..and to restart will reset automactly
 will need to .....remove the button..... in case decide for not use it.*/

///////to reset the board combination button...
/*function reset1(){
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
}*/

///////


//This will make the board to 'clear'to new set of combination
function reDrawBoard(num){
  for(var i = 0; i < oCells.length; i++){
    oCells[i].onclick = oCells[i].className = oCells[i].title = "";
  }
  //will locate the cell based on the row and cell where the blank cell is
  //and setting the next possible moves with the touchingCells creating
  //a new array with new set
  touchingCells = new Array();
  oBlank = oCells[num];
  oBlank.rowNum = new Number(getRowIndex(oBlank));
  oBlank.cellNum = new Number(getCellIndex(oBlank));
  oBlank.cellIndx = (oBlank.rowNum*4)+oBlank.cellNum;
//get the cells touching blank square to the cells currently touching the blank square
  touchingCells = getTouchingCells(oBlank);
     assignOnclicks();
  }

/////////

//to select the cells around the blank space the ones..
//that will be able to move...
function getTouchingCells(obj){
  var newTouchingCells = new Array();
  //select left touching cell
   if(obj.cellNum-1 >= 0){
     newTouchingCells.push(oTable.rows[obj.rowNum].cells[obj.cellNum-1]);
  }
  //select right touching cell
   if(obj.cellNum+1 <= 3){
     newTouchingCells.push(oTable.rows[obj.rowNum].cells[obj.cellNum+1]);
  }
  //select above touching cell
   if(obj.rowNum-1 >= 0){
     newTouchingCells.push(oTable.rows[obj.rowNum-1].cells[obj.cellNum]);
  }
  //select below touching cell
   if(obj.rowNum+1 <= 3){
     newTouchingCells.push(oTable.rows[obj.rowNum+1].cells[obj.cellNum]);
  }
 for(i=0; i < newTouchingCells.length; i++){
   newTouchingCells[i].className='touchingCells';
   newTouchingCells[i].title = 'Swap this number';
  }
   return newTouchingCells;
}
/////
//search the row (to locate which row the blank cell is)
function getRowIndex(obj){
  var oParent = obj.parentNode;
  while(oParent.nodeName.toLowerCase() != 'tr'){
  oParent = oParent.parentNode;
  }
   return oParent.rowIndex;
}

//search through the row for the the cell (to locate which cell the blank cell is in the row)
function getCellIndex(obj){
  var rowIndex = getRowIndex(obj);
  for(i=0; i < oRows[rowIndex].cells.length; i++){
    if(obj == oRows[rowIndex].cells[i]){
     return i;
    }
  }
 }


function assignOnclicks(){
    m = m + 1;
  for(i=0; i < touchingCells.length; i++){
     touchingCells[i].onclick=function(){
  var cellIndex = (getRowIndex(this)*4)+getCellIndex(this);
  var blankIndx = oBlank.cellIndx;
//will make swap clicked cell contents with blank cell contents
  var temp = oCells[cellIndex].innerHTML;
     oCells[cellIndex].innerHTML = '';
     oCells[blankIndx].innerHTML = temp;
  if(isWinner()) {
     alert('Congratulations, You win...!!!');
     document.write("Totals: ", m);
  } else {
    //cellIndex is the cell index of the new blank square
    reDrawBoard(cellIndex);
    }
  }
 }
 }
