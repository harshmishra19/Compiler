const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const compiler=require("compilex")
const options = {stats:true}
compiler.init(options)
// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use("/codemirror-5.65.16",express.static("C:/Users/DELL/Downloads/COMPILER/COMPILER/codemirror-5.65.16"))

// Route handler for the root path
app.get("/", function(req, res) {
    // Sending the index.html file
    res.sendFile("C:/Users/DELL/Downloads/COMPILER/COMPILER/index.html");
});
app.post("/compile",function(req,res){
    var code=req.body.code
    var input=req.body.input   
    var lang=req.body.lang
    //if windows  
    try{
       if(lang=="Cpp"){
        if(!input){
            var envData = { OS : "windows" , cmd : "g++",options:{timeout:10000}}; // (uses g++ command to compile )
    
            compiler.compileCPP(envData , code , function (data) {
                res.send(data);
                
            });
            
        }
        else{
            var envData = { OS : "windows" , cmd : "g++",options:{timeout:10000}}; // (uses g++ command to compile )
            //else

            compiler.compileCPPWithInput(envData , code , input , function (data) {
                if(data.output){
                    res.send(data)
                }
                else{
                    res.send({output:"error"})
                }
            });
        }
       }
       else if(lang=="Java"){
        if(!input){
            var envData = { OS : "windows"}; 
            //else
           
            compiler.compileJava( envData , code , function(data){
                res.send(data);
            });   
        }
        else if(lang=="Python"){
                //if windows  
            var envData = { OS : "windows"}; 
            //else
        
            compiler.compileJavaWithInput( envData , code , input ,  function(data){
                res.send(data);
            });
        }
       }
       else{
        if(!input){
                //if windows  
            var envData = { OS : "windows"}; 
            //else
            compiler.compilePython( envData , code , function(data){
                if(data.output){
                    res.send(data)
                }
                else{
                    res.send({output:"error"})
                }
            });    
        }
        else{
                //if windows  
            var envData = { OS : "windows"}; 
            //else
            
            compiler.compilePythonWithInput( envData , code , input ,  function(data){
                if(data.output){
                    res.send(data)
                }
                else{
                    res.send({output:"error"})
                }     
            });
        }
       }
    }catch(e){
       console.log("error")
    }
})

// Start the server on port 8000
app.listen(8000, function() {
    console.log("Server is running on port 8000");
});
