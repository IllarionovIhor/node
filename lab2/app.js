const express = require("express");
const hbs = require("hbs");
const fetch = require("node-fetch");


hbs.registerPartials(__dirname + "/views/partials");
let app = express();
app.set("view engine", "hbs");

const weatherganger = {
    weather: [{icon:"50d"}],
    name:" оберіть місто",
    main:{
    temp:"оберіть місто",
    feels_like: "оберіть місто",
    temp_min: "оберіть місто",
    temp_max: "оберіть місто",
    pressure: "оберіть місто",
    humidity: "оберіть місто",
    sea_level: "оберіть місто",
    grnd_level: "оберіть місто"
}}
app.get("/", (req,res) => {
    let weather = weatherganger;
    res.render("weather.hbs", {weather});
});
app.get("/weather(/:city?)", async (req,res)=>{
    let city = req.params.city;
    if(!city){
        city = req.query.city;
    }
    if(!city){
        let weather = weatherganger;
        res.render("weather.hbs", {weather});
        return;
    }
    const key = "3d70f27ec4bacecb99701f788cbf3fa8";
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
    let weather = await response.json();
    res.render("weather.hbs", {weather});
    console.log(weather);
});

app.get("/weather/Zhytomyr", (req,res)=>{
    res.send("red monkey")
});
app.listen(3000, () => {
    console.log("an example!!!!!");
})