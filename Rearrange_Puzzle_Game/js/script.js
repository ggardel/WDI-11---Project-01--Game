//will set the game to the user to play
function start(){
     m = 0;//with m = moves 0
  //clear all cells
  for(i=0; i < oCells.length; i++){
    oCells[i].innerHTML = '';
  }
  //the number to be written on the box
    numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  //set the number for a position to play the game
  //will call the function to write on the board
  for(i=0; i < numbers.length; i++){
    oCells[i].innerHTML = numbers[i];
  }

    drawBoard(numbers.length);
  //will shuffle 100 times based on legal moves
  for(var i = 0; i < 100; i++){
    shuffle()

  }/////start the timer on the click of start new game
  timer();
}


//This will write on the board
function drawBoard(num){
  for(var i = 0; i < oCells.length; i++){
    oCells[i].onclick = oCells[i].className = oCells[i].title = "";
  }
  //will locate the cell based on the row and cell where the blank cell is
  //and setting the next possible moves with the touchingCells creating
  //a new array with new set
  touchingCells = new Array();
  oBlank = oCells[num];
  console.log(oBlank);
  oBlank.rowNum = new Number(getRowIndex(oBlank));
  oBlank.cellNum = new Number(getCellIndex(oBlank));
  oBlank.cellIndx = (oBlank.rowNum*4)+oBlank.cellNum;
//get the cells touching blank square to the cells currently touching the blank square
  touchingCells = getTouchingCells(oBlank);
//will write on the clicked assigned touching cells
     assignOnclicks();

  }


  //will mix the numbers based on the legal moves of touching cells
  function shuffle() {
    //swap inner html of blank cell and random touching cell
    var randomNum = Math.floor(Math.random()*touchingCells.length);
    //oBlank.innerHTML = touchingCells[randomNum].innerHTML;
     //touchingCells[randomNum].innerHTML = '';
    moveTile(touchingCells[randomNum],"shuffle");
  }


//to select the cells around the blank space the ones..
//that will be able to move...(legal move)
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
///Will assign the click with the legal move from the touching cells
function assignOnclicks(){
  m = m + 1;
  for(i=0; i < touchingCells.length; i++){
     touchingCells[i].onclick=function (event) {
       moveTile(event.target, "click");
     }
   }
 }
///Will write the moves on the board
 function moveTile(targetElement, check){
   var cellIndex = (getRowIndex(targetElement)*4)+getCellIndex(targetElement);
   var blankIndx = oBlank.cellIndx;
   //will make swap clicked cell contents with blank cell contents
   var temp = oCells[cellIndex].innerHTML;
   oCells[cellIndex].innerHTML = '';
   oCells[blankIndx].innerHTML = temp;
   //cellIndex is the cell index of the new blank square

///Based on the last move if goal combination will check for the
///for the winner if the winner will send a alert...with the total moves made by the player
///also display the time used to solve the puzzle
   if (checkWinner()&& check == "click"){
      alert("Congratulations, You Win!!!! " + "  Your Total: " + m*0.5 + " moves.      " + "           Time: " + h5.textContent);
////if winner stop the timer
      clearTimeout(t);
////reset to zero the timer
      clear();
  ///continue the game moves
  } else{
     drawBoard(cellIndex);
}
}
/////

///Will check for the goal combination
function checkWinner(){
  var isWin =true;
  numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  for(var i = 0; i < numbers.length; i ++){
    if (oCells[i].innerHTML != numbers[i]){
      isWin = false;
      i = numbers.length;
    }
  }
  return isWin;
}

//called to run when assigned on click.
window.onload=function() {
  m = 1;
  oTable = document.getElementById('board');
  oRows = document.getElementById('board').getElementsByTagName('tr');
  oCells = document.getElementById('board').getElementsByTagName('td');
 document.getElementById('btnStart').onclick = start;
}

///////
///END
//////
var h5 = document.getElementsByTagName('h5')[0],
    seconds = 0, minutes = 0, hours = 0,
    t;
///counter for the timer
 function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }


////display the timer
h5 = document.getElementsByTagName('h5')[0],
    h5.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
////run the timer
function timer() {
    t = setTimeout(add, 1000);
}

/// Clear button
    function clear() {
    h5.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}
