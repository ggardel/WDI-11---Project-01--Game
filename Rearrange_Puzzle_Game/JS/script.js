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
  //will call the function to mix the position...
 //numbers.shuffle();



  for(i=0; i < numbers.length; i++){
    oCells[i].innerHTML = numbers[i];
  }
   drawBoard(numbers.length);
    //countUP ();
}

// place all cells in order 1-15
//done
// select the touchingCells (for i = 1, there should be 2)
// var cells = document.selectElementByClassName("className")

// pick one of those cells randomly

// move one of those cells

//This will make the board to 'clear'to new set of combination
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

     assignOnclicks();
  }


  //test start
  function test() {
    moveTile();
    //swap inner html of blank cell and random touching cell
    var randomNum = Math.floor(Math.random()*touchingCells.length);
    oBlank.innerHTML = touchingCells[randomNum].innerHTML;
    touchingCells[randomNum].innerHTML = '';
  }

  // //test end

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
     touchingCells[i].onclick=function (e) {
       moveTile(e.target);
     }
   }
 }

 function moveTile(targetElement){
   var cellIndex = (getRowIndex(targetElement)*4)+getCellIndex(targetElement);
   var blankIndx = oBlank.cellIndx;
   //will make swap clicked cell contents with blank cell contents
   var temp = oCells[cellIndex].innerHTML;
   oCells[cellIndex].innerHTML = '';
   oCells[blankIndx].innerHTML = temp;
   //cellIndex is the cell index of the new blank square
   drawBoard(cellIndex);
 }

/////
//so can use the shuffle function to switch numbers position..
 //Array.prototype.shuffle = function() {



 /*var shuffle = function(){
   for(var i =0; i < 3; i++) {
   var p = document.querySelectorAll('.touchingCells')
   p[Math.floor(Math.random()*p.length)].start();
 return this;*/



//    var s = [];
//  while (this.length) s.push(this.splice(Math.random() * this.length, 1));
//  while (s.length) this.push(s.pop());
//  return this;
//}


//called to run when assigned on click.
window.onload=function() {
  m = 1;
  oTable = document.getElementById('board');
  oRows = document.getElementById('board').getElementsByTagName('tr');
  oCells = document.getElementById('board').getElementsByTagName('td');
 document.getElementById('btnStart').onclick = start;

   start();
}

///////
/*var counter = 0

function countUP () {

 counter = counter + 1;//increment the counter by 1
 //display the new value in the div
 //var timer = setInterval("countUP()", 1000 );
 document.getElementById("timer_container").innerHTML = counter;
 console.log(counter);
 }
*/
