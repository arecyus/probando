const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
var app = express();
const port= process.env.PORT || 3000;
//partials
hbs.registerPartials(__dirname+"/views/partials");
app.set("view engine","hbs");

//app.use es un middleware
app.use(express.static(__dirname+"/public"));
app.use((req,res,next)=>{
    var now =new Date().toString();
    var log= now+":"+req.method+", "+req.url;
    console.log(log);
    fs.appendFileSync("server.log",log + '\n');
    next();
});

// app.use((req,res,next)=>{
//     res.render("error.hbs");
// });
hbs.registerHelper("currentYear",()=>{
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt",(text)=>{
    return text.toUpperCase();
});

app.get("/",(req,res)=>{
    // res.send("<h1>Hola Express</h1>");
   res.render("home.hbs",{
       pageTitle:"Home Page",
       welcome: "Bienvenido"
   });
});

app.get("/about",(req,res)=>{
    res.render("about.hbs",{
        pageTitle:"About Page"
       
    });
});

app.get("/bad",(req,res)=>{
    res.send({
        errorMessage:"Something went wrong"
    });
});

app.get("/portfolio",(req,res)=>{
    res.render("portfolio.hbs",{
        pageTitle: "Portfolio Page"
    });
})

app.listen(port,()=>{
    console.log("Server is up on port "+port);
});