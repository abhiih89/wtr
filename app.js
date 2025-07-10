const apiKey = "f534f27df174ca63c5e8da43c9f24fb9";

const weatherImg = {
    clouds : "clouds.png",
    rain : "rain.png",
    clear : "sun.png",    
    snow : "snow.png",
    thunderstorm : "clouds.png",
    mist : "logosun.png",
    haze : "clouds.png"
} ;

const searchbtn = document.querySelector("#searchicon button");
const searchipt = document.getElementById("searchbar");

searchbtn.addEventListener("click", () => {
    const city = searchipt.value;
    if (city !== "") {
        getweather(city);
    }
});

searchipt.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const city = searchipt.value;
        if (city !== "") {
            getweather(city);
        }
    }
});

async function getweather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try{
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json(); /*data*/
        const cityname = data.name;
        const weathermain = data.weather[0].main.toLowerCase();
        const temp =  data.main.temp;
        const humidity = data.main.humidity;
        const windspeed = data.wind.speed;

        document.getElementById("city").textContent = cityname;
        document.getElementById("climate").textContent = weathermain
        document.getElementById("temperaturevalue").textContent = `${temp}°C`;
        document.getElementById("humidityvalue").textContent = `${humidity}%`;
        document.getElementById("windvalue").textContent = `${windspeed} km/h`;


        const weatherIcon = document.getElementById("icons");
        if (weatherImg[weathermain]) {
            weatherIcon.src = weatherImg[weathermain];
        }else {
             weatherIcon.src = "default.png";
        }

    }
    catch{
        alert("City not found");    
    }
    
}


