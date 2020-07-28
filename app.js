'use strict';
const express = require("express");
const server = require("https");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();


app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());
require("dotenv").config();

app.use(express.static(path.join(__dirname,"public")));



app.get("/",(req,res)=>{
   
    res.sendFile(path.join(__dirname+'index.html'))
})

app.get("/messages",(req,res)=>{
 
    
    const jobsapi = `https://jobs.github.com/positions.json?search=node`;


    server.get(jobsapi, response => {
        var allData = "";
        response.on("data", data => {
            allData += data;
           
        })
        response.on("end", () => {
            if (res.statusCode === 200) {
                try {
                    var data = JSON.parse(allData);

                    res.json(data);
                    
                } catch (e) {
                    console.log('Error parsing JSON!');
                }
            } else {
                console.log('Status:', res.statusCode);
            }
        })
    }).on('error', err => {
        console.log('Error:', err);
    })
    
})


app.listen(process.env.HOST, () => {
    console.log(`app running at localhost ${host}`);
})


