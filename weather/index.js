const express = require('express');
const router = express.Router();
//const fetch = require('node-fetch');

const fetchWeather = async (searchtext) => {
    if(!searchtext) {
        return { Error: "Search text is required." };
    }

    if(!process.env.WEATHER_API_KEY) {
        throw new Error("WEATHER_API_KEY is not set in the dotenv");
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchtext}&units=metric&appid=${process.env.WEATHER_API_KEY}`;
    
    try {
        const weatherStream = await fetch(url);
        const weatherJson = await weatherStream.json();
        return weatherJson;
    } catch (err) {
        console.log("Error fetching weather data: ", err);
        return { Error: err.stack };
    }
}

 router.get("/", (req, res) => {
    res.json({ success: "Hello Weather!"});
 });

 router.get("/:searchtext", async (req, res) => {
    const searchtext = req.params.searchtext;
    const data = await fetchWeather(searchtext);
    res.json(data);
 })

 router.post("/", async (req, res) => {
    const searchtext = req.body.searchtext;
    const data = await fetchWeather(searchtext);
    res.json(data);
 })

 module.exports = router;