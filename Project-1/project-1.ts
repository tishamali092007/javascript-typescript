console.log("=========QUESTION-1=========");

let username : string = "Tisha";
console.log("Name : ",username);

let age : number = 19;
console.log("Age : ",age);

let city : string = "Surat";
console.log("city : ",city);

let num1: number = 10;
let num2: number = 5;


console.log("=========QUESTION-2=========");


console.log("Addition : ",num1 + num2);
console.log("substraction : ",num1 - num2);
console.log("multiplication : ",num1 * num2);
console.log("division : ",num1 / num2);


console.log("=========QUESTION-4=========");


let num : number = 5;

console.log("number : ",num);
console.log("Square : ",num * num);
console.log("Cube : ",num * num * num);


console.log("=========QUESTION-5=========");


let Rectanglelength : number = 3;
console.log("length : ",Rectanglelength);

let width : number = 5;
console.log("width : ",width);

let area : number = Rectanglelength * width;
console.log("Area of Rectangle : ",area);


console.log("=========QUESTION-6=========");


let value : number = 10;
console.log("Number : ",value);

let text : string = "Hello Student";
console.log("String : ",text);

let isStudent : boolean = true;
console.log("Boolean : ",isStudent);


console.log("=========QUESTION-7=========");

let data : any = 10;
console.log("Number Data : ",data);

data = "Hello"
console.log("String Data : ",data);

data = true
console.log("Boolean Data : ",data);


console.log("=========QUESTION-8=========");


let str : string = "250";
console.log("String : ",str);

let numvalue : number = Number(str);
console.log("Converted : ",numvalue);

let FinalResult : number =  numvalue + 50;
console.log("After Adding 50 : ",FinalResult);


console.log("=========QUESTION-9=========");


let mynum : number = 500;
console.log("Number : ",mynum);

let str1 : string = String(mynum);
console.log("Type Of Str : ",typeof str1);


console.log("=========QUESTION-10=========");

let value1 : string = "10";
console.log("First Number : ", value1);

let value2 : string = "50";
console.log("Second Number : ", value2);

let sum : number =  Number(value1) + Number(value2);
console.log("sum : ",sum);


console.log("=========QUESTION-11=========");


let a : number = 50;
console.log("First Number :",a);

let b : number = 30;
console.log("Second Number :",b);

console.log("Addition",a + b);
console.log("Subtraction",a - b);
console.log("Multiplication",a * b);
console.log("Division",a / b);
console.log("Modulus",a % b);


console.log("=========QUESTION-12=========");


let a1 : number = 10;
let b1 : number = 5;
let temp : number;

console.log("Before Swapping :");
console.log("a1 : ",a1);
console.log("b1 : ",b1);

temp = a1;
a1 = b1;
b1= temp;

console.log("After Swapping : ");
console.log("a1 : ",a1);
console.log("b1 : ",b1);


console.log("=========QUESTION-13=========");


let x : number = 10;
let y : number = 30;

console.log("Before Swapping : ");
console.log("x : ",x);
console.log("y : ",y);

x = x + y;
y = x - y;
x = x - y;

console.log("After Swapping : ");
console.log("x : ",x);
console.log("y : ",y);


console.log("=========QUESTION-14=========");


let marks : number = 86;
console.log("marks : ",marks);

if(marks >= 80) {
    console.log("Grade : A");
}
else if(marks >= 60 && marks <= 79) {
    console.log("Grade : B");    
}  
else {
    console.log("Grade : C");
}    


console.log("=========QUESTION-15=========");


let units : number = 250;
console.log("Units Consumed : ",units);

let bill : number;

if (units <= 100) {
    bill = units * 5;
}
else {
    bill = (100 * 5) + ( (units - 100) * 8 );
}
console.log("Electricity Bill : ",bill);


console.log("=========QUESTION-16=========");


let basicsalary : number = 25000;
console.log("Basic Salary : ",basicsalary);

let hra : number = basicsalary * (10 / 100);
console.log("HRA(10%) : ",hra);

let da : number = basicsalary * (5 / 100);
console.log("DA(5%) : ", da);

let totalsalary : number = basicsalary + hra + da;
console.log("Total Salary : ",totalsalary);


console.log("=========QUESTION-17=========");


let Age : number = 20;
console.log("Age : ",Age);

if(Age >= 18) {
    console.log("You are Eligible For Voting");
}
else {
    console.log("You are Not Eligible For Voting");
    
}


console.log("=========QUESTION-18=========");


let purchase : number = 3000;
console.log("Purchased Amount : ",purchase);

let discount : number;
let Finalamount : number;

if(purchase > 5000) {
    discount = (15 / 100) * purchase;
    console.log("Discount(15%) : ",discount);
    
}
else {
    discount = (5 / 100) * purchase;
    console.log("Discount(5%) : ",discount);
    
}

Finalamount = purchase - discount;
console.log("Final Amount : ",Finalamount);


console.log("=========QUESTION-19=========");


let celsius : number = 37;
console.log("Celsius : ",celsius);

let fahrenheit : number = (celsius * 9 / 5) + 32;
console.log("Fahrenheit : ",fahrenheit);


console.log("=========QUESTION-20=========");

let Totalminutes : number = 130;
console.log("Total Minutes : ",Totalminutes);

let Hours : number = (Totalminutes - (Totalminutes % 60)) / 60;
console.log("Hours : ",Hours);

let Minutes : number = Totalminutes % 60;
console.log("Minutes : ",Minutes);

console.log("Result : ",Hours, "Hours and", Minutes,"minutes" );



