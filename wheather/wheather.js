const apiKey = "2098fa9f5b7cda8ca7a48d7931b0ab62";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// DOM
const searchInput = document.querySelector("#inp1");
const searchIcon = document.querySelector("#icon");
const cityEl = document.querySelector(".city");
const tempEl = document.querySelector(".temp");
const humidityEl = document.querySelector(".hmd");
const windEl = document.querySelector(".wind");
const weatherImg = document.querySelector(".wheather-img");
const bgVideo = document.getElementById("bg-video");

// Weather icons
const weatherImages = {
  Clouds: "./assets/cld.png",
  Rain: "./assets/rain.png",
  Haze: "./assets/haze.png",
  Snow: "./assets/snowy.png",
  Clear: "./assets/clr.png",
  Drizzle: "./assets/rain.png",
  Mist: "./assets/haze.png"
};

// Weather Videos
const weatherVideos = {
  Clear: "./assets/videos/clear.mp4",
  Rain: "./assets/videos/rain.mp4",
  Clouds: "./assets/videos/clouds.mp4",
  Snow: "./assets/videos/snow.mp4",
  Mist: "./assets/videos/mist.mp4",
  Haze: "./assets/videos/mist.mp4",
  Drizzle: "./assets/videos/rain.mp4",
  Default: "./assets/videos/default.mp4"
};

async function checkWeather(city) {
  if (!city) return alert("Enter city name");

  const res = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await res.json();

  cityEl.innerHTML = data.name;
  tempEl.innerHTML = Math.round(data.main.temp) + "°C";
  humidityEl.innerHTML = data.main.humidity + "%";
  windEl.innerHTML = data.wind.speed + " km/hr";

  const weatherType = data.weather[0].main;
  weatherImg.src = weatherImages[weatherType] || "./assets/default.png";

  updateVideo(weatherType);
}

// Change Background Video
function updateVideo(weather) {
  const videoSrc = weatherVideos[weather] || weatherVideos.Default;

  if (!bgVideo.src.includes(videoSrc)) {
    bgVideo.src = videoSrc;
    bgVideo.load();
  }
}

// Search
searchIcon.addEventListener("click", () => {
  checkWeather(searchInput.value);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") checkWeather(searchInput.value);
});
