"use strict";
// Initialize on page load
window.onload = function(){
  clear();
  updDebug();
};

// global variables
let currentNumberKey=null;
let preservedNumberKey=null;
let currentOpKey=null;
let preservedOpKey=null;
let anOpIsOutstanding=false;
let aDotIsOutstanding=false;
let inputBuffer=0; // This is the source register for numeric values. All other numeric values feed from it. 
let additionAccum=0;
let substractionAccum=0;
let multiplicationAccum=0;
let divisionAccum = 0;
let percentAccum = 0;
let dotAccum = 0;
let mainAccum = null;

// Grab number keys
const key0 = document.querySelector('#key0');
const key1 = document.querySelector('#key1');
const key2 = document.querySelector('#key2');
const key3 = document.querySelector('#key3');
const key4 = document.querySelector('#key4');
const key5 = document.querySelector('#key5');
const key6 = document.querySelector('#key6');
const key7 = document.querySelector('#key7');
const key8 = document.querySelector('#key8');
const key9 = document.querySelector('#key9');
const dotKey = document.querySelector('#dotKey');

// Event listeners for numeric keys
key0.addEventListener('click', ()=>{currentNumberKey=0;numKeyHandler();}); 
key1.addEventListener('click', ()=>{currentNumberKey=1;numKeyHandler();}); 
key2.addEventListener('click', ()=>{currentNumberKey=2;numKeyHandler();}); 
key3.addEventListener('click', ()=>{currentNumberKey=3;numKeyHandler();}); 
key4.addEventListener('click', ()=>{currentNumberKey=4;numKeyHandler();}); 
key5.addEventListener('click', ()=>{currentNumberKey=5;numKeyHandler();}); 
key6.addEventListener('click', ()=>{currentNumberKey=6;numKeyHandler();}); 
key7.addEventListener('click', ()=>{currentNumberKey=7;numKeyHandler();}); 
key8.addEventListener('click', ()=>{currentNumberKey=8;numKeyHandler();}); 
key9.addEventListener('click', ()=>{currentNumberKey=9;numKeyHandler();});

// Grab operation keys
const sumKey = document.querySelector('#sum');
const minusKey = document.querySelector('#minus');
const multiplyKey = document.querySelector('#multiply');
const divideKey = document.querySelector('#divide');
const equalKey = document.querySelector('#equal');
const percentageKey = document.querySelector('#percentage');
const changeSignKey = document.querySelector('#change-sign');
const backspaceKey = document.querySelector('#backspace');
const clearKey = document.querySelector('#clear');

// Flags used by operators event listeners
let sumFlag=false;
let minusFlag=false;
let multiplyFlag=false;
let divideFlag=false;
let percentageFlag=false;
let dotFlag =false;
let equalFlag=false;

// Operations event listeners 
sumKey.addEventListener('click', ()=>{ sumFlag=true;operatorsRouter();}); 
minusKey.addEventListener('click', ()=>{ minusFlag=true;operatorsRouter();}); 
multiplyKey.addEventListener('click', ()=>{ multiplyFlag=true;operatorsRouter();}); 
divideKey.addEventListener('click', ()=>{ divideFlag=true;operatorsRouter();});
equalKey.addEventListener('click',  ()=>{equalFlag=true;equal();});
percentageKey.addEventListener('click', ()=>{ percentageFlag=true;operatorsRouter();}); 
dotKey.addEventListener('click', ()=>{currentNumberKey=0.0; dotFlag=true;operatorsRouter();});
changeSignKey.addEventListener('click', changeSignRouter); 
backspaceKey.addEventListener('click', backspaceRouter); 
clearKey.addEventListener('click', clear);

// To display on LCD the last operator
const lastOpDispl = document.querySelector('#lastOpDispl');
// Grab LCD to display calculation numbers and signs
const lcd=document.querySelector('#lcd');
// Notifications area
const notif = document.querySelector ('#notification');
const alertColor=document.querySelector ('#notification-area').style;



// ***** NEW FEATURE UNDER TEST *****
function operatorsRouter(){
// If an operator key is pressed after obtaining a final result ( pressing "="), use Final Result as 1st number of next calculation. 
if(mainAccum===null){
dupOpFilter();
}else{
currentNumberKey=mainAccum;
numKeyHandler();
dupOpFilter();
  }
return; 
}

function dupOpFilter(){
 if(anOpIsOutstanding){
    // reject operation
 alertColor.backgroundColor='darkred';
 notif.innerHTML = 'You pressed consecutive operator keys . Enter your next number, to continue calculating using your original operator.';
 }else{ // accept operation
 notif.innerHTML='';
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
 else{}
  }
  if(aDotIsOutstanding){
    // reject operation
  }else{
//dotFlag=false;
    //dot();
  }
}
 
// Channel numbers proceeding from the keyboard
function numKeyHandler(){
// clear error alert
alertColor.backgroundColor='transparent';
notif.innerHTML = '';
  if(currentOpKey==='='){// '=' signals end of calc. A numeric key is expected afterwards. Arrival of numeric key must clear previous result on LCD in preparation for a new calculation.
    preservedNumberKey=currentNumberKey;// Preserve currentNumberKey
    clear();
    currentNumberKey=preservedNumberKey; // Restore previous currentNumberKey
    inputBuffer = inputBuffer*10+currentNumberKey;
lcd.innerHTML = inputBuffer;
updDebug();
}else if(currentNumberKey===0 && inputBuffer===0){
  // NOP. We don't want zeroes on the left hand side of our numbers
updDebug();
}else if(inputBuffer<0){ // we are appending digits to an existing negative number on LCD. Since this is a number (not a sring) we requite a special mathematical procedure to achieve "appendage" to the existing negative number on LCD. 
changeSign();
inputBuffer = inputBuffer*10+currentNumberKey;
changeSign();
lcd.innerHTML = inputBuffer;
updDebug();
}else if(currentOpKey==='&middot;'){// add digit to the right
 inputBuffer = inputBuffer + currentNumberKey / 10;
lcd.innerHTML = inputBuffer;
 currentOpKey=preservedOpKey; // Restore previous currentOpKey
updDebug();
} else {
inputBuffer = inputBuffer*10+currentNumberKey;
lcd.innerHTML = inputBuffer;
updDebug();
    }
  }

// Calculations
function sum (){
console.log("iam sum. ", "inputBuffer: ", inputBuffer);
additionAccum = inputBuffer;
lcd.innerHTML =additionAccum;
inputBuffer = null;
currentOpKey = "+";
lastOpDispl.innerHTML = currentOpKey;
updDebug();
anOpIsOutstanding=true;
return;
} 

function minus (){
 anOpIsOutstanding=true;
substractionAccum = inputBuffer;
inputBuffer = null;
lcd.innerHTML =substractionAccum;
currentOpKey = "-";
lastOpDispl.innerHTML = currentOpKey;
updDebug();
return;
}

function multiply (){
anOpIsOutstanding=true;
multiplicationAccum = inputBuffer;
inputBuffer = null;
lcd.innerHTML = multiplicationAccum;
currentOpKey = "&#215;";
lastOpDispl.innerHTML = currentOpKey;
updDebug();
return;
} 

function divide (){
anOpIsOutstanding=true;
divisionAccum = inputBuffer;
inputBuffer = null;
lcd.innerHTML = divisionAccum;
currentOpKey = "&#247;";
lastOpDispl.innerHTML = currentOpKey;
updDebug();
return;
} 

function percentage (){
anOpIsOutstanding=true;
percentAccum = inputBuffer;
inputBuffer = null;
lcd.innerHTML = percentAccum;
currentOpKey = "%";
lastOpDispl.innerHTML = currentOpKey;
updDebug();
return;
} 

function dot(){
  inputBuffer = inputBuffer.toFixed(0);
  lcd.innerHTML = lcd.innerHTML.concat('.');
return;
} 
  
    /*if(currentOpKey==='='){
// NOP 
  }else{
inputBuffer = inputBuffer*(1);
lcd.innerHTML = inputBuffer.toString().concat('.');
preservedOpKey = currentOpKey;// Preserve currentOpKey
currentOpKey='&middot;'; // Dot entity code 
lastOpDispl.innerHTML = currentOpKey;
updDebug();
// currentOpKey=preservedOpKey; // Restore previous currentOpKey
}
aDotIsOutstanding=true;
return;
} */

function equal (){
if(currentOpKey==="+" || currentOpKey=== 'C') {
  mainAccum =additionAccum + inputBuffer;
additionAccum = 0;
  inputBuffer = null;
  lcd.innerHTML = mainAccum;
currentOpKey = '=';
lastOpDispl.innerHTML = currentOpKey;
updDebug();
}else if(currentOpKey==="-") {
  mainAccum =substractionAccum - inputBuffer;
substractionAccum = 0;
  inputBuffer = null;
  lcd.innerHTML = mainAccum;
currentOpKey = '=';
lastOpDispl.innerHTML = currentOpKey;
updDebug();
}else if(currentOpKey==="&#215;") {// *
  mainAccum = multiplicationAccum * inputBuffer;
multiplicationAccum = 0;
  inputBuffer = null;
  lcd.innerHTML = mainAccum;
currentOpKey = '='; // switch currentOpKey to "="
lastOpDispl.innerHTML = currentOpKey;
updDebug();
}else if(currentOpKey==="&#247;") {// division operation
  mainAccum = divisionAccum / inputBuffer;
divisionAccum = 0;
  inputBuffer = null;
  lcd.innerHTML = mainAccum;
currentOpKey = "=";
lastOpDispl.innerHTML = currentOpKey;
updDebug();
}else if(currentOpKey==="%") {
  mainAccum = percentAccum * inputBuffer/100;
percentAccum = 0;
  inputBuffer = null;
  lcd.innerHTML = mainAccum;
currentOpKey = "%";
lastOpDispl.innerHTML = currentOpKey;
updDebug();
}else if(currentOpKey==="&middot;") {
  /*divisionAccum = divisionAccum + currentNumberKey;
  inputBuffer = 10;
  divide();
currentOpKey = null;
lastOpDispl.innerHTML = currentOpKey;
updDebug();*/
}else{
  // next test... &#215;
}
anOpIsOutstanding=false;
aDotIsOutstanding=false;
return;
} 

function changeSignRouter(){
if (mainAccum ===null) {
changeSign();
}else{
preservedNumberKey = mainAccum;
clear();
currentNumberKey = preservedNumberKey;
numKeyHandler();
changeSign();
 }
}

function changeSign (){
  if(currentOpKey==='='){// Changing sign after final result implies that after switching the sign of the final result, we intent to use the negated number as the first number for starting a new calculation.
additionAccum = lcd.innerHTML*(-1);
inputBuffer = 0;
lcd.innerHTML =lcd.innerHTML*(-1);
// Display change sign as the last operation, overriding the '=' operation
currentOpKey='&#177;'; // change sign entity code
lastOpDispl.innerHTML = currentOpKey;
// Update debug registers
updDebug();
  }else{
inputBuffer = inputBuffer*(-1);
lcd.innerHTML = inputBuffer;
preservedOpKey = currentOpKey;// Preserve currentOpKey
currentOpKey='&#177;'; // Change sign entity code 
lastOpDispl.innerHTML = currentOpKey;
updDebug();
currentOpKey=preservedOpKey; // Restore previous currentOpKey
} 
return;
} 

function backspaceRouter (){
if (mainAccum ===null) {
backspace();
}else{
preservedNumberKey = mainAccum;
clear();
currentNumberKey = preservedNumberKey;
numKeyHandler();
backspace();
}
} 
  

function backspace (){
  if(inputBuffer===0){
  // nop
  currentOpKey='&#x232b'; // backspace key
lastOpDispl.innerHTML = currentOpKey;
  updDebug();
  }else if(inputBuffer<0) {
  inputBuffer = inputBuffer*(-1);
inputBuffer = Math.floor(inputBuffer/10);
inputBuffer=inputBuffer*(-1);
lcd.innerHTML = inputBuffer;
preservedOpKey = currentOpKey;// Preserve currentOpKey
currentOpKey='&#x232b'; // lastOp is backspace 
lastOpDispl.innerHTML = currentOpKey;
  updDebug();
currentOpKey=preservedOpKey; // Restore previous currentOpKey
} else{ // inputBuffer >=0
inputBuffer = Math.floor(inputBuffer/10);
  lcd.innerHTML = inputBuffer;
  preservedOpKey = currentOpKey;// Preserve currentOpKey
currentOpKey='&#x232b';// lastOp is backspace 
lastOpDispl.innerHTML = currentOpKey;
  updDebug();
  currentOpKey=preservedOpKey; // Restore previous currentOpKey
}
  }
  
// Debugg items
const currentOpKeyDebug = document.querySelector('#last-op-debug');
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
additionAccum=0;
substractionAccum=0;
 multiplicationAccum=0;
 divisionAccum=0;
 percentAccum=0;
 dotAccum =0;
 mainAccum=null;
 lcd.innerHTML = 0;
 currentNumberKey=null;
 currentOpKey = 'C' ;
 lastOpDispl.innerHTML = currentOpKey;
 notif.innerHTML = '';
 anOpIsOutstanding=false;
 aDotIsOutstanding=false;
 alertColor.backgroundColor='transparent';
// debug items:
updDebug();
} 

function updDebug() {
inpBufferDebug.innerText = inputBuffer;
sumAccDebug.innerHTML =additionAccum;
minusAccDebug.innerHTML =substractionAccum;
multAccDebug.innerText = multiplicationAccum;
divAccDebug.innerHTML = divisionAccum;
mainAccDebug.innerText = mainAccum;
currentOpKeyDebug.innerHTML =currentOpKey;
lcdDebug.innerHTML = lcd.innerHTML;
percentAccDebug.innerHTML = percentAccum;
dotAccDebug.innerHTML = dotAccum;
} 

// ***** TEST *****
function recycleFinalResult(){
if(!isNaN(mainAccum)){
  // Preserve value
const mainAccToRecycle = mainAccum;
clear();
inputBuffer = mainAccToRecycle;
//mainAccum = null;
lcd.innerHTML = mainAccToRecycle;
console.log('New feature tested!');
updDebug();
}else{
//NOP
}
return;
}

function test(){
  if(!isNaN(mainAccum)){
// '=' signals end of calc. A numeric key is expected afterwards. Arrival of numeric key must clear previous result on LCD in preparation for a new calculation.
preservedNumberKey=mainAccum ;// Preserve currentNumberKey
clear();
currentNumberKey=preservedNumberKey; // Restore previous currentNumberKey
inputBuffer = currentNumberKey;
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
// Pressing '=' after entering any number finalizes the calculation, resulting in the same number.
// Divide by zero is "infinity"
// No action for consecutive and repeated operators 
// Display of last operator that was entered 
// Notification of consecutive and repeated operators 
// After obtaining a final result, press any operator key to use that result as first operand of next calculation. 
// Use final result (after pressing '=') as first number of next calc. Allowing modifications of the number. Namely, only change sign

//NOW:
// Implement nums w/ decimal points

// Next features:
// Multiple operations before '='
// Memorize number on display and recall for subsequent operations 
