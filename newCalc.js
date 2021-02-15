"use strict";

// global variables
let currentNumberKey=null;
let preservedNumberKey=null;
let currentOpKey=null;
let preservedOpKey=null;
let keyPressed;
let anOpIsOutstanding=false;
let inputBuffer=0; // This is the source register for numeric values. All other numeric values feed from it. 
let additionAccum=0;
let substractionAccum=0;
let multiplicationAccum=0;
let divisionAccum = 0;
let percentAccum = 0;
let dotAccum = 0;
let mainAccum = null;
let dotOutstanding=false;
let rightDigitsCnt=0;

// Flags used by operators event listeners
let keyPressedUnary=false;
let keyPressedNumber=false;
let keyPressedDot=false;
let keyPressedChgSign=false;
let keyPressedBackspace=false;
let keyPressedInv=false;
let keyPressedSqrt=false;
let keyPressedSquare=false;
let keyPressedAdd=false;
let keyPressedSubstract=false;
let keyPressedMultiply=false;
let keyPressedDivide=false;
let keyPressedPercentage=false;
let keyPressedEquals=false;
let sumFlag=false;
let minusFlag=false;
let multiplyFlag=false;
let divideFlag=false;
let percentageFlag=false;
let dotFlag =false;
let equalFlag=false;
let recycleFlag=false;
let clearFlag=false;
let changeSignFlag=false;
let backspaceFlag=false;

// Grab debugg items
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

// Grab items to display on LCD the last operator
const lastOpDispl = document.querySelector('#lastOpDispl');
// Grab LCD to display calculation numbers and signs
const lcd=document.querySelector('#lcd');
// Notifications area
const notif = document.querySelector ('#notification');
const alertColor=document.querySelector ('#notification-area').style;

// Reset auxiliary functions:
function updDebug () {
inpBufferDebug.innerText = inputBuffer;
sumAccDebug.innerHTML = additionAccum;
minusAccDebug.innerHTML =substractionAccum;
multAccDebug.innerText = multiplicationAccum;
divAccDebug.innerHTML = divisionAccum;
mainAccDebug.innerText = mainAccum;
currentOpKeyDebug.innerHTML =currentOpKey;
lcdDebug.innerHTML = lcd.innerHTML;
percentAccDebug.innerHTML = percentAccum;
dotAccDebug.innerHTML = rightDigitsCnt;
} 
function clear (){
 inputBuffer=0;
 additionAccum=0;
 substractionAccum=0;
 multiplicationAccum=0;
 divisionAccum=0;
 percentAccum=0;
 lcd.innerHTML = null;
 currentNumberKey=null;
 currentOpKey = 'C' ;
 lastOpDispl.innerHTML = currentOpKey;
 notif.innerHTML = '';
 anOpIsOutstanding=false;
 dotSensor();
 dotAccum =rightDigitsCnt;
 mainAccum=null;
 alertColor.backgroundColor='transparent';
// debug items:
updDebug();
} 

// Initialize calc
window.onload = function(){
  clear();
  updDebug();
};

// Key Presses - Event listeners for numeric keys:
key0.addEventListener('click', ()=>{
  keyPressedUnary=true;
  keyPressedNumber=true;
  keyPressed=0;
  main();
}); 
key1.addEventListener('click', ()=>{
  keyPressedUnary=true;
  keyPressedNumber=true;
  keyPressed=1;
  main();
}); 
key2.addEventListener('click',()=>{
  keyPressedUnary=true;
  keyPressedNumber=true;
  keyPressed=2;
  main();
}); 
key3.addEventListener('click',()=>{
  keyPressedUnary=true;
  keyPressedNumber=true;
  keyPressed=3;
  main();
}); 
key4.addEventListener('click',()=>{
  keyPressedUnary=true;
  keyPressedNumber=true;
  keyPressed=4;
  main();
}); 
key5.addEventListener('click',()=>{
  keyPressedUnary=true;
  keyPressedNumber=true;
  keyPressed=5;
  main();
}); 
key6.addEventListener('click',()=>{
  keyPressedUnary=true;
  keyPressedNumber=true;
  keyPressed=6;
  main();
}); 
key7.addEventListener('click',()=>{
  keyPressedUnary=true;
  keyPressedNumber=true;
  keyPressed=7;
  main();
}); 
key8.addEventListener('click',()=>{
  keyPressedUnary=true;
  keyPressedNumber=true;
  keyPressed=8;
  main();
}); 
key9.addEventListener('click',()=>{
  keyPressedUnary=true;
  keyPressedNumber=true;
  keyPressed=9;
  main();
});
dotKey.addEventListener('click', ()=>{
  keyPressedUnary=true;
  keyPressedNumber=true;
  keyPressed='.';
  main();
});
changeSignKey.addEventListener('click', ()=>{
  keyPressedUnary=true;
  keyPressedNumber=true;
  keyPressed = '&#177';
  main();
});
backspaceKey.addEventListener('click', ()=>{
  keyPressedUnary=true;
  keyPressedNumber=true;
  keyPressed='&#x232b';
  main();
});
invertKey.addEventListener('click', ()=>{
  keyPressedUnary=true;
  keyPressedNumber=true;
  keyPressed='invert';
  main();
});
sqrtKey.addEventListener('click', ()=>{
  keyPressedUnary=true;
  keyPressedNumber=true;
  keyPressed='sqrt';
  main();
});
squareKey.addEventListener('click', ()=>{
  keyPressedUnary=true;
  keyPressedNumber=true;
  keyPressed='square';
  main();
});

// Operations event listeners 
sumKey.addEventListener('click', ()=>{
  keyPressedBinary=true;
  keyPressedNumber=true;
  keyPressed='square';
  main();
});
minusKey.addEventListener('click', ()=>{ minusFlag=true;keyPressed=NaN;dotHandler();operatorsRouter();}); 
multiplyKey.addEventListener('click', ()=>{ multiplyFlag=true;keyPressed=NaN;dotHandler();operatorsRouter();}); 
divideKey.addEventListener('click', ()=>{ divideFlag=true;keyPressed=NaN;dotHandler();operatorsRouter();});
percentageKey.addEventListener('click', ()=>{percentageFlag=true;keyPressed=NaN;dotHandler();operatorsRouter();});

clearKey.addEventListener('click', () =>{clearFlag=true;keyPressed=NaN;dotHandler();clear();});
equalKey.addEventListener('click', ()=>{equalFlag=true;keyPressed=NaN;dotHandler();equal();});

//operatorsRouter();
});

// functions called by Main
function appendDigit (){

}

function appendDot (){

}

function changeSign (){

}

function backspace (){

}

function invert (){

}

function sqrt (){

}

function square (){

}

function equals (){

}

function recycle (){

}

function operandLoader (){

}

function addition (){

}

function subtraction (){

}

function multiplication (){

}

function division (){

}

function percentage (){

}

function performCalc(){

}

// Main
function main(){
if(keyPressedUnary){// 0y, key press was unary?
console.log('if 0');
// 1 is the yes of 0
//1
if(keyPressedNumber){// 1y
console.log('if 1');
//call sub appendDigit.
appendDigit();
}else{// 1n
// 2 is the else of 1
// 2
if(keyPressedDot){// 2y
console.log('if 2');
// call sub appendDot.
appendDot();
}else{// 2n, 
// 3 is the else of 2
// 3
if(keyPressedChgSign){// 3y
console.log('if 3');
//call sub changeSign.
changeSign();
}else{// 3n, 
// 4 is the else of 3
// 4
if(keyPressedBackspace){// 4y
console.log('if 4');
// call sub backspace.
backspace();
}else{// 4n, 
// 5 is the else of 4
// 5
if(keyPressedInv){// 5y
console.log('if 5');
//call sub invert
invert();
}else{// 5n, 
// 6 is the else of 5
// 6
if(keyPressedSqrt){// 6y
console.log('if 6');
// call sub sqrt.
sqrt();
}else{// 6n
// 7 is the else of 6
// 7
if(keyPressedSquare){// 7y
console.log('if 7');
// call sub square.
square();
}else{// 7n, 
// return is the else of 7
// 7
return;
}
}
}
}
}
}
}
}else{//0n, key press was '=' ?
// 8 is the else of 0
// 8
if(keyPressedEquals){// 8y
console.log('if 8');
// 9 is the yes of 8
// 9
if(currentOpKey!=='='){// 9y
console.log('if 9');
// 1st time equal is true.
// call sub performCalc.
performCalc();
}else{// 9n, 
// call sub recycle, to enter recycle mode.
recycle();
return;
}
}else{// 8n, 
// 10 is the else of 8
// 10
if(keyPressedAdd){// 10y
console.log('if 10');
// call sub operandLoader.
operandLoader();
}else{// 10n
// 11
// 11 is the else of 10
if(keyPressedSubstract){// 11y
console.log('if 11');
// call sub operandLoader.
operandLoader();
}else{// 11n
// 12 is the else of 11
// 12
if(keyPressedMultiply){// 12y
console.log('if 12');
// call sub operandLoader.
operandLoader();
}else{// 12n
// 13 is the else of 12
// 13
if(keyPressedDivide){// 13y
console.log('if 13');
// call sub operandLoader.
operandLoader();
}else{// 13n
// 14 is the else of 13
// 14
if(keyPressedPercentage){// 14y
console.log('if 14');
// 14 is the else of 13
// call sub operandLoader.
operandLoader();
}else{// 14n
// NOP is the else of 14
return;
}
}
}
}
}
}
}
} 