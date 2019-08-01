var express= require("express");
var app= express();

//we start listening the server

var server= app.listen(3000,()=>{
  console.log("server is running on port",server.address().port);
});


//we are going to use static file

app.use(express.static(__dirname));

// using mongoose

var mongoose= require("mongoose");

var db="mongodb+srv://hari:hari%4012345@cluster0-zdevw.mongodb.net/test?retryWrites=true&w=majority";


mongoose.connect(db,(err)=>{
  console.log("mongodb connected",err);
});

var Message=mongoose.model("Message",{name:String, message:String});


//using body parser

var bodyparsor=require("body-parser");
app.use(bodyparsor.json());
app.use(bodyparsor.urlencoded({extended:false}));

// routing
app.get("/messages",(req,res)=>{
  Message.find({},(err,messages)=>
{res.send(messages);
});
});

app.post("/messages",(req,res)=>{
  var message= new message(req.body);
  message.save((err)=>{
    if(err)
    sendStatus(500);
    res.sendStatus(200);
  });
});


// using socket.io so that no need to refresh the page everytime


var http= require("http").Server(app);
var io=require("socket.io")(http);

//we can create a connection

io.on("connection",()=>{
  console.log("a user is connected");
});

app.post("/messages",(req,res)=>{
  var message=new messae(req.body);
  message.save((err)=>{
    if(err)
    sendStatus(500);
    io.emit("message",req.body);
    res.sendStatus(200);
  });
});
