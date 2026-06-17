"use strict";
console.log("======== QUESTION - 1 ========");
for (let i = 1; i <= 10; i++) {
    console.log(i);
}
console.log("======== QUESTION - 2 ========");
for (let i = 10; i >= 1; i--) {
    console.log(i);
}
console.log("======== QUESTION - 3 ========");
for (let i = 1; i <= 20; i++) {
    if (i % 2 == 0) {
        console.log(i);
    }
}
console.log("======== QUESTION - 4 ========");
for (let i = 1; i <= 20; i++) {
    if (i % 2 !== 0) {
        console.log(i);
    }
}
console.log("======== QUESTION - 5 ========");
for (let i = 1; i <= 10; i++) {
    console.log("Tisha");
}
console.log("======== QUESTION - 6 ========");
for (let i = 1; i <= 100; i++) {
    console.log(i);
}
console.log("======== QUESTION - 7 ========");
for (let i = 1; i <= 50; i++) {
    if (i % 5 == 0) {
        console.log(i);
    }
}
console.log("======== QUESTION - 8 ========");
for (let i = 1; i <= 100; i++) {
    if (i % 3 == 0 && i % 5 == 0) {
        console.log(i);
    }
}
console.log("======== QUESTION - 9 ========");
let sum = 0;
for (let i = 1; i <= 10; i++) {
    sum += i;
}
console.log("Sum : ", sum);
console.log("======== QUESTION - 10 ========");
let Sum = 0;
for (let i = 1; i <= 50; i++) {
    if (i % 2 == 0) {
        Sum += i;
    }
}
console.log("Sum : ", Sum);
console.log("======== QUESTION - 11 ========");
let Add = 0;
for (let i = 1; i <= 50; i++) {
    if (i % 2 !== 0) {
        Add += i;
    }
}
console.log("Sum : ", Add);
console.log("======== QUESTION - 12 ========");
let num = 5;
for (let i = 1; i <= 10; i++) {
    console.log(`${num} X ${i} = ${num * i}`);
}
console.log("======== QUESTION - 13 ========");
for (let i = 1; i <= 10; i++) {
    console.log(`===== Table Of ${i} =====`);
    for (let j = 1; j <= 10; j++) {
        console.log(`${i} X ${j} = ${i * j}`);
    }
    console.log();
}
console.log("======== QUESTION - 14 ========");
let fact = 1;
for (let i = 1; i <= 7; i++) {
    fact = fact * i;
}
console.log("Factorial : ", fact);
console.log("======== QUESTION - 15 ========");
let Num = 123456;
let count = 0;
while (Num > 0) {
    count++;
    Num = (Num - (Num % 10)) / 10;
}
console.log("Total Digits : ", count);
console.log("======== QUESTION - 16 ========");
let num1 = 123456;
let rev = 0;
let digit;
console.log("Before Reverse : ", num1);
while (num1 > 0) {
    digit = num1 % 10;
    rev = rev * 10 + digit;
    num1 = (num1 - digit) / 10;
}
console.log("After Reverse : ", rev);
console.log("======== QUESTION - 17 ========");
let max = 0;
let digit1;
for (let A = 58391; A > 0; A = (A - digit1) / 10) {
    digit1 = A % 10;
    if (digit1 > max) {
        max = digit1;
    }
}
console.log("Largest Digit =", max);
console.log("======== QUESTION - 18 ========");
let Min = 9;
let Digit;
for (let A = 58391; A > 0; A = (A - Digit) / 10) {
    Digit = A % 10;
    if (Digit < Min) {
        Min = Digit;
    }
}
console.log("Smallest Digit =", Min);
console.log("======== QUESTION - 19 ========");
let original = 121;
let Rev = 0;
let Digits;
for (let a = original; a > 0; a = (a - Digits) / 10) {
    Digits = a % 10;
    Rev = Rev * 10 + Digits;
}
if (original == Rev) {
    console.log("Number is Palindrome");
}
else {
    console.log("Number is Not Palindrome");
}
console.log("======== QUESTION - 20 ========");
let Original = 153;
let Sum1 = 0;
let Digit2;
for (let B = Original; B > 0; B = (B - Digit2) / 10) {
    Digit2 = B % 10;
    Sum1 = Sum1 + (Digit2 * Digit2 * Digit2);
}
if (Sum1 == Original) {
    console.log("Armstrong Number");
}
else {
    console.log("Not Armstrong Number");
}
