"use strict";
// Initialize on page load
window.onload = function(){
  clear();
  updDebug();
};
// Grab number keys
const btn0 = document.querySelector('#key0');
const btn1 = document.querySelector('#key1');
const btn2 = document.querySelector('#key2');
const btn3 = document.querySelector('#key3');
const btn4 = document.querySelector('#key4');
const btn5 = document.querySelector('#key5');
const btn6 = document.querySelector('#key6');
const btn7 = document.querySelector('#key7');
const btn8 = document.querySelector('#key8');
const btn9 = document.querySelector('#key9');
const dotBtn = document.querySelector('#dotKey');

// Event listeners for numeric keys
let numFromKey=null;
let dotFlag =false;
btn0.addEventListener('click', ()=>{numFromKey=0;numKeyHandler();}); 
btn1.addEventListener('click', ()=>{numFromKey=1;numKeyHandler();}); 
btn2.addEventListener('click', ()=>{numFromKey=2;numKeyHandler();}); 
btn3.addEventListener('click', ()=>{numFromKey=3;numKeyHandler();}); 
btn4.addEventListener('click', ()=>{numFromKey=4;numKeyHandler();}); 
btn5.addEventListener('click', ()=>{numFromKey=5;numKeyHandler();}); 
btn6.addEventListener('click', ()=>{numFromKey=6;numKeyHandler();}); 
btn7.addEventListener('click', ()=>{numFromKey=7;numKeyHandler();}); 
btn8.addEventListener('click', ()=>{numFromKey=8;numKeyHandler();}); 
btn9.addEventListener('click', ()=>{numFromKey=9;numKeyHandler();}); 
dotBtn.addEventListener('click', ()=>{numFromKey=null;const dotFlag=true;dupOpFilter();});
// Grab LCD
const lcd=document.querySelector('#lcd');

// Grab operation keys
const sumBtn = document.querySelector('#sum');
const minusBtn = document.querySelector('#minus');
const multiplyBtn = document.querySelector('#multiply');
const divideBtn = document.querySelector('#divide');
const equalBtn = document.querySelector('#equal');
const percentageBtn = document.querySelector('#percentage');
const changeSignBtn = document.querySelector('#change-sign');
const backspaceBtn = document.querySelector('#backspace');
const clearBtn = document.querySelector('#clear');


// Operations event listeners 
let sumFlag=false;
let minusFlag=false;
let multiplyFlag=false;
let divideFlag=false;
let percentageFlag=false;
sumBtn.addEventListener('click', ()=>{ sumFlag=true;dupOpFilter();}); 
minusBtn.addEventListener('click', ()=>{ minusFlag=true;dupOpFilter();}); 
multiplyBtn.addEventListener('click', ()=>{ multiplyFlag=true;dupOpFilter();}); 
divideBtn.addEventListener('click', ()=>{ divideFlag=true;dupOpFilter();});
equalBtn.addEventListener('click', equal); 
percentageBtn.addEventListener('click', ()=>{ percentageFlag=true;dupOpFilter();}); 
changeSignBtn.addEventListener('click', changeSign); 
backspaceBtn.addEventListener('click', backspace); 
clearBtn.addEventListener('click', clear);


// Show on LCD the last operator
const lastOpDispl = document.querySelector('#lastOpDispl');

function dupOpFilter(){
  const notif = document.querySelector ('#notification');
 if(anOpIsOutstanding){
    // reject operation
    notif.innerHTML = 'Operation Rejected';
 }else{
      // accept operation
 notif.innerHTML='';
 if(sumFlag){sum();}
 else if(minusFlag){minus();} 
 else if(multiplyFlag){multiply();} 
 else if(divideFlag){divide();} 
 else if(divideFlag){percentage();}
 else{}
  }
  if(aDotIsOutstanding){
    // reject oprration
  }else{dot();}
}

// Push a numeric to the lcd 
let inputBuffer=0; // This is the source register for numeric values. All other numeric values feed from it. 

let previousNumFromKey;
function numKeyHandler(){
  if(lastOpKey==='='){// '=' signals end of calc. A numeric key is expected afterwards. Arrival of numeric key must clear previous result on LCD in preparation for a new calculation.
    previousNumFromKey=numFromKey;// Preserve numFromKey
    clear();
    numFromKey=previousNumFromKey; // Restore previous numFromKey
    inputBuffer = inputBuffer*10+numFromKey;
lcd.innerHTML = inputBuffer;
updDebug();
}else if(numFromKey===0 && inputBuffer===0){
  // NOP. We don't want zeroes on the left hand side of our numbers
updDebug();
}else if(inputBuffer<0){ // we are appending digits to an existing negative number on LCD. Since this is a number (not a sring) we requite a special mathematical procedure to achieve "appendage" to the existing negative number on LCD. 
changeSign();
inputBuffer = inputBuffer*10+numFromKey;
changeSign();
lcd.innerHTML = inputBuffer;
updDebug();
}else if(lastOpKey==='&middot;'){// add digit to the right
 inputBuffer = inputBuffer + numFromKey / 10;
lcd.innerHTML = inputBuffer;
 lastOpKey=previousLastOpKey; // Restore previous lastOpKey
updDebug();
} else {
inputBuffer = inputBuffer*10+numFromKey;
lcd.innerHTML = inputBuffer;
updDebug();
    }
  }

// Calculations
let lastOpKey=null;
let anOpIsOutstanding;

let sumAccumulator=0;
function sum (){
  anOpIsOutstanding=true;
  if(lastOpKey === "="){
    // Use result as first operand of a new sum calculation
    console.log('Use result as first operand of a new sum calculation');
    sumAccumulator = mainAccumulator;
mainAccumulator=0;
    
  }else{
sumAccumulator = inputBuffer;
inputBuffer = null;
lcd.innerHTML = sumAccumulator;
lastOpKey = "+";
lastOpDispl.innerHTML = lastOpKey;
updDebug();
  } 
return;
} 

let minusAccumulator=0;
function minus (){
  anOpIsOutstanding=true;
minusAccumulator = inputBuffer;
inputBuffer = null;
lcd.innerHTML = minusAccumulator;
lastOpKey = "-";
lastOpDispl.innerHTML = lastOpKey;
updDebug();
return;
}

let multAccumulator=0;
function multiply (){
anOpIsOutstanding=true;
multAccumulator = inputBuffer;
inputBuffer = null;
lcd.innerHTML = multAccumulator;
lastOpKey = "&#215;";
lastOpDispl.innerHTML = lastOpKey;
updDebug();
return;
} 

let divAccumulartor = 0;
function divide (){
anOpIsOutstanding=true;
divAccumulartor = inputBuffer;
inputBuffer = null;
lcd.innerHTML = divAccumulartor;
lastOpKey = "&#247;";
lastOpDispl.innerHTML = lastOpKey;
updDebug();
return;
} 

let percentAccumulator = 0;
function percentage (){
anOpIsOutstanding=true;
percentAccumulator = inputBuffer;
inputBuffer = null;
lcd.innerHTML = percentAccumulator;
lastOpKey = "%";
lastOpDispl.innerHTML = lastOpKey;
updDebug();
return;
} 

let aDotIsOutstanding;
function dot (){
aDotIsOutstanding=true;
 if(lastOpKey==='='){// Changing sign after final result implies that after switching the sign of the final result, we intent to use the negated number as the first number for starting a new calculation.
/*sumAccumulator = lcd.innerHTML*(-1);
inputBuffer = 0;
lcd.innerHTML =lcd.innerHTML*(-1);*/
// Display change sign as the last operation, overriding the '=' operation
// lastOpKey='&#177;'; // change sign entity code
// lastOpDispl.innerHTML = lastOpKey;
// Update debug registers
// updDebug();
  }else{
inputBuffer = inputBuffer*(1);
lcd.innerHTML = inputBuffer.toString().concat('.');
previousLastOpKey = lastOpKey;// Preserve lastOpKey
lastOpKey='&middot;'; // Dot entity code 
lastOpDispl.innerHTML = lastOpKey;
updDebug();
// lastOpKey=previousLastOpKey; // Restore previous lastOpKey
} 
return;
} 

let previousInputBuffer;
let mainAccumulator = 0;
function equal (){
if(lastOpKey==="+" || lastOpKey=== 'C') {
  mainAccumulator = sumAccumulator + inputBuffer;
sumAccumulator = null;
  inputBuffer = null;
  lcd.innerHTML = mainAccumulator;
lastOpKey = '=';
lastOpDispl.innerHTML = lastOpKey;
updDebug();
}else if(lastOpKey==="-") {
  mainAccumulator = minusAccumulator - inputBuffer;
minusAccumulator = null;
  inputBuffer = null;
  lcd.innerHTML = mainAccumulator;
lastOpKey = '=';
lastOpDispl.innerHTML = lastOpKey;
updDebug();
}else if(lastOpKey==="&#215;") {// *
  mainAccumulator = multAccumulator * inputBuffer;
multAccumulator = null;
  inputBuffer = null;
  lcd.innerHTML = mainAccumulator;
lastOpKey = '='; // switch lastOpKey to "="
lastOpDispl.innerHTML = lastOpKey;
updDebug();
}else if(lastOpKey==="&#247;") {// division operation
  mainAccumulator = divAccumulartor / inputBuffer;
divAccumulartor = null;
  inputBuffer = null;
  lcd.innerHTML = mainAccumulator;
lastOpKey = "=";
lastOpDispl.innerHTML = lastOpKey;
updDebug();
}else if(lastOpKey==="%") {
  mainAccumulator = percentAccumulator * inputBuffer/100;
percentAccumulator = null;
  inputBuffer = null;
  lcd.innerHTML = mainAccumulator;
lastOpKey = "%";
lastOpDispl.innerHTML = lastOpKey;
updDebug();
}else if(lastOpKey==="&middot;") {
  /*divAccumulartor = divAccumulartor + numFromKey;
  inputBuffer = 10;
  divide();
lastOpKey = null;
lastOpDispl.innerHTML = lastOpKey;
updDebug();*/
}else{
  // next test... &#215;
} 
} 

let previousLastOpKey;
function changeSign (){
  if(lastOpKey==='='){// Changing sign after final result implies that after switching the sign of the final result, we intent to use the negated number as the first number for starting a new calculation.
sumAccumulator = lcd.innerHTML*(-1);
inputBuffer = 0;
lcd.innerHTML =lcd.innerHTML*(-1);
// Display change sign as the last operation, overriding the '=' operation
lastOpKey='&#177;'; // change sign entity code
lastOpDispl.innerHTML = lastOpKey;
// Update debug registers
updDebug();
  }else{
inputBuffer = inputBuffer*(-1);
lcd.innerHTML = inputBuffer;
previousLastOpKey = lastOpKey;// Preserve lastOpKey
lastOpKey='&#177;'; // Change sign entity code 
lastOpDispl.innerHTML = lastOpKey;
updDebug();
lastOpKey=previousLastOpKey; // Restore previous lastOpKey
} 
return;
} 


function backspace (){
  if(inputBuffer===0){
  // nop
  lastOpKey='&#x232b'; // backspace key
lastOpDispl.innerHTML = lastOpKey;
  updDebug();
  }else if(inputBuffer<0) {
  inputBuffer = inputBuffer*(-1);
inputBuffer = Math.floor(inputBuffer/10);
inputBuffer=inputBuffer*(-1);
lcd.innerHTML = inputBuffer;
previousLastOpKey = lastOpKey;// Preserve lastOpKey
lastOpKey='&#x232b'; // lastOp is backspace 
lastOpDispl.innerHTML = lastOpKey;
  updDebug();
lastOpKey=previousLastOpKey; // Restore previous lastOpKey
} else{ // inputBuffer >=0
inputBuffer = Math.floor(inputBuffer/10);
  lcd.innerHTML = inputBuffer;
  previousLastOpKey = lastOpKey;// Preserve lastOpKey
lastOpKey='&#x232b';// lastOp is backspace 
lastOpDispl.innerHTML = lastOpKey;
  updDebug();
  lastOpKey=previousLastOpKey; // Restore previous lastOpKey
}
  }
  
// Debugg items
const lastOpKeyDebug = document.querySelector('#last-op-debug');
const lcdDebug = document.querySelector('#lcd-debug');
const inpBufferDebug = document.querySelector('#inpBufferDebug');
const mainAccDebug = document.querySelector('#mainAccDebug');

const sumAccDebug = document.querySelector('#sumAccDebug');
const minusAccDebug = document.querySelector('#minusAccDebug');
const multAccDebug = document.querySelector('#multAccDebug');
const divAccDebug = document.querySelector('#divAccDebug');
const percentAccDebug = document.querySelector('#prcntAccDebug');


function clear (){
 inputBuffer=0;
 sumAccumulator=0;
 minusAccumulator=0;
 multAccumulator=0;
 divAccumulartor=0;
 percentAccumulator=0;
 mainAccumulator=0;
 lcd.innerHTML = 0;
 numFromKey=null;
 lastOpKey = 'C' ;
 lastOpDispl.innerHTML = lastOpKey;
 //lastOpKeyDebug.textContent= lastOpKey ;
// debug items:
updDebug();
} 

function updDebug() {
inpBufferDebug.innerText = inputBuffer;
sumAccDebug.innerHTML = sumAccumulator;
minusAccDebug.innerHTML = minusAccumulator;
multAccDebug.innerText = multAccumulator;
divAccDebug.innerHTML = divAccumulartor;
mainAccDebug.innerText = mainAccumulator;
lastOpKeyDebug.innerHTML =lastOpKey;
lcdDebug.innerHTML = lcd.innerHTML;
percentAccDebug.innerHTML = percentAccumulator;
}

const testBtn = document.querySelector('#test');
testBtn.addEventListener('click', test);
function test(){
  lastOpKeyDebug.innerHTML='&middot;';
}
// Features already implemented:
// clear function
// So far only integer numbers input
// Backspace for any number being input at any point in time
// Change sign for any number being input at any point in time
// +, -, x, /, % for any mixture of positive and negative numbers
// After pressing '=' to obtainffinal result, no need to clear. Just enter first number to start next calc. 
// Pressing '=' after entering any number results in the same number.
// Divide by zero is "infinity"


// Next features:
// Notification of forbidden operations 
// Press any operator key to use result as first operator of the operation 
// Multiple operations before '='
// Implement nums w/ decimal points
// Use final result (after pressing '=') as first number of next calc. Allowing modifications of the number. Namely, only change sign
// Memorize for number on display 

