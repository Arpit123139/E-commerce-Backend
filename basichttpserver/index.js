//Creating First Server 
/*Http Module - It provides the functionality to run our server whenever the user request a URL the request is send to http module it looks up for the logic and then returns the file
*/

const http = require('http')

const port = 8000
// port- when the service is running on the system then they are uniquely define by port number

//To read index.html file
const fs = require('fs')

/*Returning the response


// function requestHandler(req, res) {

//     console.log(req.url)

//     //writing the head of response like statusCode returnType

//     res.writeHead(200, { 'content-type': 'text/html' })

//     // This will be returning the response (Returning a HTML request)
    
//         fs.readFile("./index.html",function(err,data){
//             // data is the file data that e are reading
//             if(err){
//                 console.log('error ',err)
//                 return res.end('<h1>Error!!!!!</h1>')
//             }
    
//             return res.end(data)
//         })
//        // res.end("<h1>Gotcha!!!!!!!!!!</h1>")
       
// }
*/

// Handling response on the basis of different request URL
function requestHandler(req, res){
    console.log(req.url);
    res.writeHead(200, {'content-type': 'text/html'});
    
    
    let filePath;

    switch(req.url){
        case '/':
            filePath = './index.html'
            break;
        case '/profile':
            filePath = './Profile.html'
            break;
        default:
            filePath = './404.html'    
    }

    fs.readFile(filePath, function(err,data){
        if(err){
            console.log('error', err);
            return res.end('<h1>Error!</h1>');
        }
        return res.end(data);
    })
    
}

const server = http.createServer(requestHandler);

server.listen(port, function (err) {
    if (err) {
        console.log(err)
        return

    } else {
        console.log("Server is Runnig in port  ", port)
    }

})

