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
let dotFlag =false;
let equalFlag=false;
sumBtn.addEventListener('click', ()=>{ sumFlag=true;dupOpFilter1();}); 
minusBtn.addEventListener('click', ()=>{ minusFlag=true;dupOpFilter1();}); 
multiplyBtn.addEventListener('click', ()=>{ multiplyFlag=true;dupOpFilter1();}); 
divideBtn.addEventListener('click', ()=>{ divideFlag=true;dupOpFilter1();});
equalBtn.addEventListener('click',  ()=>{equalFlag=true;equal();});
percentageBtn.addEventListener('click', ()=>{ percentageFlag=true;dupOpFilter1();}); 
dotBtn.addEventListener('click', ()=>{numFromKey=0.0; dotFlag=true;dupOpFilter1();});
changeSignBtn.addEventListener('click', changeSign); 
backspaceBtn.addEventListener('click', backspace); 
clearBtn.addEventListener('click', clear);

// Show on LCD the last operator
const lastOpDispl = document.querySelector('#lastOpDispl');
const notif = document.querySelector ('#notification');

let mainAccumulator = null;

// ***** NEW FEATURE UNDER TEST *****

  // If operator key is pressed after obtaining a final result ( pressing "="), use Final Result as 1st number of next calculation
  
/*function recycleFinalResult(){
if(!isNaN(mainAccumulator)){
  // Preserve value
const mainAccToRecycle = mainAccumulator;
clear();
inputBuffer = mainAccToRecycle;
//mainAccumulator = null;
lcd.innerHTML = mainAccToRecycle;
console.log('New feature tested!');
updDebug();
}else{
//NOP
}
return;
}*/

let anOpIsOutstanding=false;
let aDotIsOutstanding=false;
let previousNumFromKey;
const alertColor=document.querySelector ('#notification-area').style;

function dupOpFilter1(){
 if(anOpIsOutstanding){
    // reject operation
 alertColor.backgroundColor='darkred';
 notif.innerHTML = 'You pressed consecutive operator keys . Enter your next number, to continue calculating using your original operator.';
 }else{ // accept operation
 notif.innerHTML='';
 
/*if(!isNaN(mainAccumulator)){
// '=' signals end of calc. A numeric key is expected afterwards. Arrival of numeric key must clear previous result on LCD in preparation for a new calculation.
previousNumFromKey=mainAccumulator;// Preserve numFromKey
clear();
mainAccumulator=previousNumFromKey; // Restore previous numFromKey
inputBuffer = mainAccumulator;
lcd.innerHTML = inputBuffer;
updDebug();
console.log("mainAccumulator: ", mainAccumulator, "");
anOpIsOutstanding=true;
}*/

 if(sumFlag){
sumFlag=false;
   sum();}
 else if(minusFlag){
minusFlag=false;
   minus();} 
 else if(multiplyFlag){
multiplyFlag=false;
   multiply();} 
 else if(divideFlag){
divideFlag=false;
   divide();} 
else if(percentageFlag){
   percentageFlag=false;
   percentage();}
else if(dotFlag){
   dotFlag=false;
   dot();}   
//else if(equalFlag){
  // equalFlag=false;
  // equal();}
 else{}
  }
  if(aDotIsOutstanding){
    // reject oprration
  }else{
//dotFlag=false;
    //dot();
  }
  
}
 
let inputBuffer=0; // This is the source register for numeric values. All other numeric values feed from it. 

// Channel numbers proceeding from the keyboard
function numKeyHandler(){
// clear error alert
alertColor.backgroundColor='transparent';
notif.innerHTML = '';
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
let sumAccumulator=0;

function sum (){
console.log("iam sum. ", "inputBuffer: ", inputBuffer);
sumAccumulator = inputBuffer;
lcd.innerHTML = sumAccumulator;
inputBuffer = null;
lastOpKey = "+";
lastOpDispl.innerHTML = lastOpKey;
updDebug();
anOpIsOutstanding=true;
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

let dotAccumulator = 0;
function dot(){
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
aDotIsOutstanding=true;
return;
} 

let previousInputBuffer;

function equal (){
if(lastOpKey==="+" || lastOpKey=== 'C') {
  mainAccumulator = sumAccumulator + inputBuffer;
sumAccumulator = 0;
  inputBuffer = null;
  lcd.innerHTML = mainAccumulator;
lastOpKey = '=';
lastOpDispl.innerHTML = lastOpKey;
updDebug();
}else if(lastOpKey==="-") {
  mainAccumulator = minusAccumulator - inputBuffer;
minusAccumulator = 0;
  inputBuffer = null;
  lcd.innerHTML = mainAccumulator;
lastOpKey = '=';
lastOpDispl.innerHTML = lastOpKey;
updDebug();
}else if(lastOpKey==="&#215;") {// *
  mainAccumulator = multAccumulator * inputBuffer;
multAccumulator = 0;
  inputBuffer = null;
  lcd.innerHTML = mainAccumulator;
lastOpKey = '='; // switch lastOpKey to "="
lastOpDispl.innerHTML = lastOpKey;
updDebug();
}else if(lastOpKey==="&#247;") {// division operation
  mainAccumulator = divAccumulartor / inputBuffer;
divAccumulartor = 0;
  inputBuffer = null;
  lcd.innerHTML = mainAccumulator;
lastOpKey = "=";
lastOpDispl.innerHTML = lastOpKey;
updDebug();
}else if(lastOpKey==="%") {
  mainAccumulator = percentAccumulator * inputBuffer/100;
percentAccumulator = 0;
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
anOpIsOutstanding=false;
aDotIsOutstanding=false;
return;
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
const dotAccDebug = document.querySelector('#dotAccDebug');

function clear (){
 inputBuffer=0;
 sumAccumulator=0;
 minusAccumulator=0;
 multAccumulator=0;
 divAccumulartor=0;
 percentAccumulator=0;
 dotAccumulator =0;
 mainAccumulator=null;
 lcd.innerHTML = 0;
 numFromKey=null;
 lastOpKey = 'C' ;
 lastOpDispl.innerHTML = lastOpKey;
 notif.innerHTML = '';
 anOpIsOutstanding=false;
 aDotIsOutstanding=false;
 alertColor.backgroundColor='transparent';
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
dotAccDebug.innerHTML = dotAccumulator;
} 

// ***** TEST *****
function recycleFinalResult(){
if(!isNaN(mainAccumulator)){
  // Preserve value
const mainAccToRecycle = mainAccumulator;
clear();
inputBuffer = mainAccToRecycle;
//mainAccumulator = null;
lcd.innerHTML = mainAccToRecycle;
console.log('New feature tested!');
updDebug();
}else{
//NOP
}
return;
}

function test(){
  if(!isNaN(mainAccumulator)){
// '=' signals end of calc. A numeric key is expected afterwards. Arrival of numeric key must clear previous result on LCD in preparation for a new calculation.
previousNumFromKey=mainAccumulator ;// Preserve numFromKey
clear();
numFromKey=previousNumFromKey; // Restore previous numFromKey
inputBuffer = numFromKey;
lcd.innerHTML = inputBuffer;
updDebug();
}


}
const testBtn = document.querySelector('#test');
testBtn.addEventListener('click', test);

// Features already implemented:
// clear function
// So far only integer numbers input
// Backspace for any number being input at any point in time
// Change sign for any number being input at any point in time
// +, -, x, /, % for any mixture of positive and negative numbers
// After pressing '=' to obtain final result, no need to clear. Just enter first number to start next calc. 
// Pressing '=' after entering any number results in the same number.
// Divide by zero is "infinity"
// No action for consecutive and repeated operators
// Display of last operator that was entered 
// Notification of consecutive and repeated operators 

//NOW:
// Implement nums w/ decimal points

// Next features:
// Multiple operations before '='
// Press any operator key to use result as first operator of the operation
// Use final result (after pressing '=') as first number of next calc. Allowing modifications of the number. Namely, only change sign
// Memorize number on display and recall for subsequent operations 

