// function add(a,b){
//     return a+b;
// }

// var add=function(a,b){
//     return a+b;
// }

// var add=(a,b)=>{return a+b;}

// var add=(a,b)=>a+b;
// var result=add(2,7)
// console.log(result)


// (function(){
//     console.log("hey");
// })();
// function callback(){
//     console.log("completed");
// }

// function add(a,b,callback){            //main function
//     var result=a+b;
//     console.log(result);
//     callback();                        //a function inside a function is a callback function no matter the name eg-change callback()  
// }                                      //prince() or final()
// add(2,5,callback); 
// add(2,3,()=> console.log("hi"));       //inline function


// var fs =require("fs");
// var os=require("os");

// var user=os.userInfo();
// console.log(user.username);

// fs.appendFile("greeting.txt","hi"+user.username+"!\n",()=>{
//     console.log("file created");
// })

// const notes=require("./notes.js");    //fetch info from other files like notes.js here
// console.log("created")
// var age=notes.age;
// const result=notes.add(age+18,10);
// console.log(age);
// console.log(result);

// var _=require("lodash");          //lodash 
// data=[1,2,3,1,2,3,"hi","hi"];
// var filter=_.uniq(data);
// console.log(filter);
// // console.log(_.isString(1));
// console.log(_.isNumber("hi"));


// const jsonString = '{"name": "John", "age": 30, "city": "New York"}';    //string(json) to object
// const jsonobj=JSON.parse(jsonString);
// console.log(jsonobj);



// const obj={                            //object to string(json)
//     "name":"john",
//     "age":20
// }
// const json=JSON.stringify(obj);
// console.log(json);

// console.log(typeof json);

console.log("server file running");


const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send("welcome to my hotel");
});


const personRoutes=require("./routes/personRoutes");

app.use("/person", personRoutes);


app.listen(3000, () => {
  console.log("listening on port 3000");
});
