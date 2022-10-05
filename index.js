console.log("Hello World")

function add(a,b){

    return a+b;
}

console.log(add(5,6))

//Process is a global object it looks over whatever is running in node js
console.log(process.argv)
// It has 2 pre defined arguement first it looks over the complete environment its the node.js file fath
// the seconfd arguement is the path of the folder
// and further are the arguemrent that we pass rom the console .. THEY ARE AUTOMATICALLY CONVERTED TO STRING...


var args=process.argv.slice(2)    // removes the first two arguements

console.log("Adding two numbers ",add(parseInt(args[0]),parseInt(args[1])))