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
let keyPressed;
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
key0.addEventListener('click', ()=>{currentNumberKey=0;keyPressed=0;dotHandler();numKeyHandler();}); 
key1.addEventListener('click', ()=>{currentNumberKey=1;keyPressed=1;dotHandler();numKeyHandler();}); 
key2.addEventListener('click', ()=>{currentNumberKey=2;keyPressed=2;dotHandler();numKeyHandler();}); 
key3.addEventListener('click', ()=>{currentNumberKey=3;keyPressed=3;dotHandler();numKeyHandler();}); 
key4.addEventListener('click', ()=>{currentNumberKey=4;keyPressed=4;dotHandler();numKeyHandler();}); 
key5.addEventListener('click', ()=>{currentNumberKey=5;keyPressed=5;dotHandler();numKeyHandler();}); 
key6.addEventListener('click', ()=>{currentNumberKey=6;keyPressed=6;dotHandler();numKeyHandler();}); 
key7.addEventListener('click', ()=>{currentNumberKey=7;keyPressed=7;dotHandler();numKeyHandler();}); 
key8.addEventListener('click', ()=>{currentNumberKey=8;keyPressed=8;dotHandler();numKeyHandler();}); 
key9.addEventListener('click', ()=>{currentNumberKey=9;keyPressed=9;dotHandler();numKeyHandler();});

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
let recycleFlag=false;
let clearFlag=false;
let changeSignFlag=false;
let backspaceFlag=false;

// Operations event listeners 
sumKey.addEventListener('click', ()=>{ sumFlag=true;keyPressed=NaN;dotHandler();operatorsRouter();}); 
minusKey.addEventListener('click', ()=>{ minusFlag=true;keyPressed=NaN;dotHandler();operatorsRouter();}); 
multiplyKey.addEventListener('click', ()=>{ multiplyFlag=true;keyPressed=NaN;dotHandler();operatorsRouter();}); 
divideKey.addEventListener('click', ()=>{ divideFlag=true;keyPressed=NaN;dotHandler();operatorsRouter();});
percentageKey.addEventListener('click', ()=>{percentageFlag=true;keyPressed=NaN;dotHandler();operatorsRouter();});

clearKey.addEventListener('click', () =>{clearFlag=true;keyPressed=NaN;dotHandler();clear();});
changeSignKey.addEventListener('click', ()=>{changeSignFlag=true;keyPressed=NaN;dotHandler() ;changeSignRouter();}); 
backspaceKey.addEventListener('click', ()=>{backspaceFlag=true;keyPressed=NaN;dotHandler() ;backspaceRouter();}); 
equalKey.addEventListener('click', ()=>{equalFlag=true;keyPressed=NaN;dotHandler();equal();});
dotKey.addEventListener('click', ()=>{currentNumberKey='.';dotFlag=true;dotHandler();
// operatorsRouter();
});
// To display on LCD the last operator
const lastOpDispl = document.querySelector('#lastOpDispl');
// Grab LCD to display calculation numbers and signs
const lcd=document.querySelector('#lcd');
// Notifications area
const notif = document.querySelector ('#notification');
const alertColor=document.querySelector ('#notification-area').style;

let dotOutstanding=false;
let rightDigitsCnt;

function dotHandler (){
//1
console.log('if 1 ', 'dotFlag: ', dotFlag);
 if (dotFlag) {//1y key press was a dot?
//3 is the yes of 1
//3
console.log('if 3 ', 'dotOutstanding: ', dotOutstanding );
if (dotOutstanding){//3y A dot on LCD already?
alertColor.backgroundColor='darkred';
notif.innerHTML = 'You pressed two consecutive dots.';
dotFlag = false;
 return;
}else{//3n No dot on LCD yet. 
dotOutstanding = true;
rightDigitsCnt = 0;
// Push a dot to the LCD.
lcd.innerHTML = lcd.innerHTML.concat('.');
dotFlag = false;
return;}
}else{
//2 is the else of 1
//2
console.log('if 2 ', 'keyPressed: ', keyPressed);
if(!isNaN(keyPressed)){//2y key press was a number? 
//5 is the yes of 2:
//5
console.log('if 5 ','dotOutstanding: ', dotOutstanding);
if(dotOutstanding){//5y dotOutstanding? 
rightDigitsCnt ++;
dotFlag=false;
return;
}else{//5n
dotFlag=false;
return;}
}else{
//4 is the else of 2:
//4
console.log('if 4 ', 'changeSignFlag: ', changeSignFlag, 'backspaceFlag: ', backspaceFlag);
if(!changeSignFlag &&!backspaceFlag){//4y was key the press an operator?
// note: operatorsRouter() will call the pertinent operator procedure. The procedure will take into account the rightDigitsCnt resulting from the dotHandler.
operatorsRouter();//7y 7n
rightDigitsCnt = 0;
dotOutstanding = false;
dotFlag = false;
return;
}else{
//6 is the else of 4
//6
console.log('if 6 ', 'changeSignFlag: ', changeSignFlag);
if(changeSignFlag){//6y was key press a changeSign?
// yes of 6:
dotFlag = false;
return;
}else{//6n
//8 is the else of 6
//8
console.log('if 8 ', 'backspaceFlag: ',backspaceFlag );
if(backspaceFlag){//key press was a backspace? 
// 9 is the yes of 8:
//9
console.log('if 9 ', 'dotOutstanding: ', dotOutstanding);
if(dotOutstanding){//9y Is there a dot on LCD?
// 0 is the yes of 9:
//0
console.log('if 0 ', 'rightDigitsCnt: ', rightDigitsCnt);
if(rightDigitsCnt===0){//0y 
//Delete dot from LCD.
lcd.innerHTML = lcd.innerHTML.slice(0, lcd.innerHTML.length-1);
console.log('lcd.innerHTML: ',lcd.innerHTML);
dotOutstanding = false;
dotFlag = false;
return;
}else{// else of 0
rightDigitsCnt--;dotFlag=false;return;}
}else{//else of 9:
dotFlag=false;
return;}
}else{// else of 8
dotFlag=false;
return;
}
}
}
}
} 
} 

function operatorsRouter (){
// If an operator key is pressed after obtaining a final result (after pressing "="), use Final Result as 1st number of next calculation. 
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
/*else if(dotFlag){
   dotFlag=false;
   dot();}*/
else if(equalFlag){
equalFlag=false;
equal();}
 else{}
  }
/*  if(aDotIsOutstanding){
    // reject operation
  }else{
//dotFlag=false;
    //dot();
  }*/
}
 
// Handle numbers proceeding from the keyboard
function numKeyHandler(){
// clear error alert
alertColor.backgroundColor='transparent';
notif.innerHTML = '';
if(currentOpKey==='='){
// '=' signals end of calc. A numeric key is expected afterwards. Arrival of numeric key must clear previous result on LCD in preparation for a new calculation.
 preservedNumberKey=currentNumberKey;// Preserve currentNumberKey
 clear();
 currentNumberKey=preservedNumberKey;
 // Restore previous currentNumberKey
 inputBuffer = inputBuffer*10+currentNumberKey;
lcd.innerHTML = inputBuffer;
updDebug();
}else if(currentNumberKey===0 && inputBuffer===0){
// NOP. We don't want zeroes on the left hand side of our numbers
updDebug();
}else if(inputBuffer<0){
// we are appending digits to an existing negative number on LCD. Since this is a number (not a sring) we requite a special mathematical procedure to achieve "appendage" to the existing negative number on LCD. 
changeSign();
inputBuffer = inputBuffer*10+currentNumberKey;
changeSign();
lcd.innerHTML = inputBuffer;
updDebug();
/*}else if(currentOpKey==='&middot;'){
// add digit to the right
 inputBuffer = inputBuffer + currentNumberKey / 10;
lcd.innerHTML = inputBuffer;
 currentOpKey=preservedOpKey;
 // Restore previous currentOpKey
updDebug();*/
} else {
inputBuffer = inputBuffer*10+currentNumberKey;
//lcd.innerHTML = inputBuffer;
console.log('concatening');
lcd.innerHTML = lcd.innerHTML.concat(currentNumberKey);
updDebug();
    }
  }

// Calculations
function sum (){
additionAccum = inputBuffer/(10**rightDigitsCnt);
lcd.innerHTML = additionAccum;
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

/*function dot(){
  inputBuffer = inputBuffer.toFixed(0);
  lcd.innerHTML = lcd.innerHTML.concat('.');
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
currentOpKey = "=";
lastOpDispl.innerHTML = currentOpKey;
updDebug();
}else if(currentOpKey==="&middot;") {
//NOP
}else if(currentOpKey==="=") {
preservedNumberKey = mainAccum;
clear();
currentNumberKey = preservedNumberKey;
numKeyHandler();
currentOpKey = "♽";
lastOpDispl.innerHTML = currentOpKey;
updDebug();
}else{
// next test...;
}
anOpIsOutstanding=false;
aDotIsOutstanding=false;
return;
} 

// FUNCTION IS NOT USED:
/*function dupEqualFilter(){
 if(false){
 //equalKey.setAttribute('value', '♽');
//lastOpDispl.innerHTML='♽';
changeSignRouter();
changeSignRouter();
lastOpDispl.innerHTML='♽';
 }else{
 equal();
 }
} */

function equalRouter(){
if (currentOpKey === '=') {
equalKey.setAttribute('value', '♽');
lastOpDispl.innerHTML='♽';
console.log('if 2');
return;
}else if(lastOpDispl.innerHTML === '♽') {
equalKey.setAttribute('value', '=');
currentOpKey='=';
lastOpDispl.innerHTML = '=';
console.log('else');
}else{
  equal();
}
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
if(currentOpKey==='='){
// Changing sign after final result implies that after switching the sign of the final result, we intent to use the negated number as the first number for starting a new calculation.
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
changeSignRouter();
changeSignRouter();
backspace ();
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
 lcd.innerHTML = null;
 currentNumberKey=null;
 currentOpKey = 'C' ;
 lastOpDispl.innerHTML = currentOpKey;
 notif.innerHTML = '';
 anOpIsOutstanding=false;
 aDotIsOutstanding=false;
 alertColor.backgroundColor='transparent';
 // equalKey.setAttribute('value', '=');
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

function test(){
}
const testBtn = document.querySelector('#test');
testBtn.addEventListener('click', test);

/*
CUSTOM CALCULATOR

A calculator that calculates like people do.

Features already implemented:

🔹Complete clear function at any point in time. 

🔹A dedicated button to change sign +/-.

🔹So far only integer numbers input.

🔹Backspace for any number being input at any point in time

🔹Change sign for any input number at any point in time

🔹+, -, x, /, % for any mixture of positive and negative numbers

🔹After pressing '=' to obtain final result, no need to clear. Just enter first number to start next calc.

🔹Pressing '=' after entering the first number of a new calculation, totalized to the same number.

🔹Divide by zero is "infinity"

🔹No action upon consecutive and repeated operators, but: Notification of, and solution, to consecutive and repeated operators.

🔹 After obtaining a final result, press any operator key to use that result as first operand of next calculation. 

🔹After pressing '=', optionally press "=" again to enter &#x267d; recycle mode. This permits editing resulting number. Change sign, backspace digits, and add digits. Press next operator to exit recycle mode and use edited number as the first number of next calculation. If you do not press "=" twice, you may use the result as is as the first number of next calculation. You may also just enter a new number altogether for the next calculation. No need to press "Clear"

🔹Continuous display of last operator that was entered. 

🔹Notification area to inform users about erroneous key presses. 

NOW:

🔹Implement numbers w/ decimal points

NEXT:

🔹Multiple operations before '='
🔹Memorize number on display and recall for subsequent operations
🔹preserve state of the calculator at quit time, and restore state when restarting the calculator
🔹Toggle operations (to correct mistaken entries of operations)
🔹highlighted the key of the last operator key that was entered
🔹Visibility of the sequence of all numbers and operator keys for the current calculation
🔹calc history visibility of the sequence of all numbers and operator keys for the last 5 calculation
🔹Paste into the calculator any number cut or copied from any other app
🔹share a number from any other app to the calculator
🔹copy results from the calculator to paste somewhere else

*/
