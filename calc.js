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

let numFromKey=null;
// Event listeners for numeric keys
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
dotBtn.addEventListener('click', ()=>{numFromKey='.';numKeyHandler();}); 

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
sumBtn.addEventListener('click', sum); 
minusBtn.addEventListener('click', minus); 
multiplyBtn.addEventListener('click', multiply); 
divideBtn.addEventListener('click', divide);
equalBtn.addEventListener('click', equal); 
percentageBtn.addEventListener('click', percentage); 
changeSignBtn.addEventListener('click', changeSign); 
backspaceBtn.addEventListener('click', backspace); 
clearBtn.addEventListener('click', clear);

// Show on LCD the last operator
const lastOpDispl = document.querySelector('#lastOpDispl');

// Push a numeric to the lcd 
let inputBuffer=0; // This is the source register for numeric values. All other numeric values feed from it. 

function numKeyHandler(){
  if(lastOpKey==='='){// '=' signals end of calc. A numeric key is expected afterwards. Arrival of numeric key must clear previous result on LCD in preparation for a nrw calculation.
    clear();
  }
  if(numFromKey===0 && inputBuffer===0){
  // NOP. We don't want zeroes on the left hand side of our numbers
updDebug();
    }else{
if(inputBuffer<0){ // we are appending digits to an existing negative number on LCD. Since this is a number (not a sring) we requite a special mathematical procedure to achieve "appendage" to the existing negative number on LCD. 
changeSign();
inputBuffer = inputBuffer*10+numFromKey;
changeSign();
lcd.innerHTML = inputBuffer;
updDebug();
}
inputBuffer = inputBuffer*10+numFromKey;
lcd.innerHTML = inputBuffer;
updDebug();
    }
  }

// Calculations
let lastOpKey=null;

let sumAccumulator=0;
function sum (){
lastOpKey = "+";
sumAccumulator = sumAccumulator + inputBuffer;
inputBuffer = null;
lcd.innerHTML = sumAccumulator;
lastOpDispl.innerHTML = lastOpKey;
updDebug();
return;
} 
// sssssssssssssddddddddddddddddddd
let minusAccumulator=0;
function minus (){
if(lastOpKey === "-"){

sumAccumulator = sumAccumulator - inputBuffer;
lastOpKey = "-";
lastOpDispl.innerHTML = lastOpKey;
updDebug();
}else{
sumAccumulator = inputBuffer;
lcd.innerHTML = inputBuffer;
lastOpKey = "-";
lastOpDispl.innerHTML = lastOpKey;
updDebug();
}
return;
}

let multAccumulator=1;
function multiply (){
multAccumulator = multAccumulator * inputBuffer;
inputBuffer = 0;
lastOpKey = "&#215;";
lastOpDispl.innerHTML = lastOpKey;
updDebug();
return;
} 

let divAccumulartor = 1;
function divide (){
lastOpKey = "&#247;";
lastOpDispl.innerHTML = lastOpKey;
updDebug();
} 
  
let mainAccumulator = 0;
function equal (){
  if(lastOpKey==="*"){
    mainAccumulator = multAccumulator * inputBuffer;
    lcd.innerHTML = mainAccumulator;
lastOpKey = "=";
lastOpDispl.innerHTML = lastOpKey;
  }else if(lastOpKey==="+"||lastOpKey==="&#177;") {// &#177 is the change sign entity code 
    sumAccumulator = sumAccumulator + inputBuffer;
inputBuffer = null;
lcd.innerHTML = sumAccumulator;
lastOpKey = '=';
lastOpDispl.innerHTML = lastOpKey;
updDebug();
  }else{
    // nop
  }
  return;
} 

let percentAccumulator = 0;
function percentage (){
  if(lastOpKey==='per'){
    console.log(lastOpKey);
percentAccumulator = percentAccumulator*inputBuffer/100;
  lcd.innerHTML = percentAccumulator;
lastOpKey = '=';
lastOpDispl.innerHTML = lastOpKey;
updDebug();
  }else{
  percentAccumulator = inputBuffer;
  inputBuffer = 0;
lastOpDispl.innerHTML = 'per';
updDebug();
} 
} 

function changeSign (){
  if(lastOpKey==='='){// Changing sign after final result implies that after switching the sign of the final result, we intent to use the negated number as the first number for starting a new calculation.
  console.log(`lcd.innerHTML`);
  console.log(isNaN(lcd.innerHTML));
    sumAccumulator = lcd.innerHTML*(-1);
inputBuffer = 0;
lcd.innerHTML =lcd.innerHTML*(-1);
// Display change sign as the last operation, overriding the '=' operation
lastOpKey='&#177;'; // change sign entity code
lastOpDispl.innerHTML = lastOpKey;
// Update debug registers
updDebug();
  }else{
inputBuffer = lcd.innerHTML*(-1);
lcd.innerHTML = inputBuffer;
lastOpKey='&#177;'; // Change sign entity code 
lastOpDispl.innerHTML = lastOpKey;
updDebug();
} 
return;
} 

function backspace (){
  if(inputBuffer===0){
  // nop
  lastOpKey='&#x232b';
lastOpDispl.innerHTML = lastOpKey;
  updDebug();
  }else if(inputBuffer<0) {
  inputBuffer = inputBuffer*(-1);
inputBuffer = Math.floor(inputBuffer/10);
inputBuffer=inputBuffer*(-1);
lcd.innerHTML = inputBuffer;
lastOpKey='&#x232b';
lastOpDispl.innerHTML = lastOpKey;
  updDebug();
} else{
inputBuffer = Math.floor(inputBuffer/10);
  lcd.innerHTML = inputBuffer;
lastOpKey='&#x232b';
lastOpDispl.innerHTML = lastOpKey;
  updDebug();
}
  }

function clear (){
 inputBuffer=0;
 sumAccumulator=0;
 multAccumulator=1;
 mainAccumulator=0;
 lcd.innerHTML = 0;
lastOpKey = 'C' ;
lastOpDispl.innerHTML = lastOpKey;
// debug items:
updDebug();
} 

// Debugg items

const lastOpDebug = document.querySelector('#lastOpDebug');
const lcdDebug = document.querySelector('#debug-lcd');
const inpBuffer = document.querySelector('#inpBuffer');
const mainAcc = document.querySelector('#mainAcc');

const sumAcc = document.querySelector('#sumAcc');
const minusAccumDebug = document.querySelector('#minusAcc');
const multAcc = document.querySelector('#multAcc');
const divAccumDebug = document.querySelector('#divAcc');
const percentAccDebug = document.querySelector('#percentAcc');


function updDebug() {
inpBuffer.innerText = inputBuffer;
sumAcc.innerHTML = sumAccumulator;
minusAccumDebug.innerHTML = minusAccumulator;
multAcc.innerText = multAccumulator;
divAccumDebug.innerHTML = divAccumulartor;
mainAcc.innerText = mainAccumulator;
lastOpDebug.innerHTML =lastOpDispl.innerHTML;
lcdDebug.innerHTML = lcd.innerHTML;
percentAccDebug.innerHTML = percentAccumulator;
  
}