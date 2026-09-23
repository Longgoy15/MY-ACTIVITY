let name = "ANDREW";
let age = 13;
let student = true;

console.log(name,age,student);

if(age>=18){
    console.log("adult na si "+ name);
}

if(age<13){
    console.log("bata pa");
}else if(age<20){
    console.log("teenager");
}else{
    console.log("adult");
}
    
if(student==false){
    console.log("naiskwelapa")
}else{
    console.log("trabaho na")
}



let fruits = ["apple", "saging", "bayabas" ];
let number = [1,2,3,4];
let subjects = ["AUTOMATA", "MOBILE PROGRAMMING", "SOFWARE ENGINEERING"];

for(let i=0;i< fruits.length;i++){L
    console.log("FRUITS "+fruits[i]);
}
let x=0;
while(x<3){
    console.log("number "+ number[x]);
    x++;                      
}
for(let subject of subjects){1
    console.log(" SUBJECT "+ subject);

}