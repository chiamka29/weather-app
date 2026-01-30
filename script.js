const apiKey = "df07753291a613f6fb5f65c9069dbba0";

const tempEl = document.getElementById("temp");
const cityEl = document.getElementById("city");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const iconEl = document.getElementById("weatherIcon");

async function getWeather(city) {
  if (!city) {
    city = document.getElementById("cityInput").value;
  }  

  if (!city) return alert("Enter a city");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found");
      return;     
    }

    updateUI(data);

  } catch (error) {
    alert("Error fetching data");
  }
}

function updateUI(data) {
  tempEl.innerText = `${Math.round(data.main.temp)}°C`;
  cityEl.innerText = data.name;
  humidityEl.innerText = `${data.main.humidity}%`;
  windEl.innerText = `${data.wind.speed} km/h`;

  const condition = data.weather[0].main.toLowerCase();
  console.log("Weather condition:", condition);

  if (condition.includes("cloud")) {
    iconEl.src = "../images/clouds.png";
    console.log("Setting icon to clouds.png");
  } else if (condition.includes("rain") || condition.includes("drizzle")) {
    iconEl.src = "../images/rain.png";
    console.log("Setting icon to rain.png");
  } else if (condition.includes("clear")) {
    iconEl.src = "../images/clear.png";
    console.log("Setting icon to clear.png");
  } else if (condition.includes("snow")) {
    iconEl.src = "../images/snow.png";
    console.log("Setting icon to snow.png");
  } else if (condition.includes("thunder")) {
    iconEl.src = "../images/rain.png";
    console.log("Setting icon to rain.png (thunder)");
  } else if (condition.includes("mist") || condition.includes("fog") || condition.includes("haze")) {
    iconEl.src = "../images/clouds.png";
    console.log("Setting icon to clouds.png (mist/fog/haze)");
  } else {
    iconEl.src = "../images/clear.png";
    console.log("Setting icon to clear.png (default)");
  }
}

// Auto location weather (disabled)
// navigator.geolocation.getCurrentPosition(async position => {
//   const lat = position.coords.latitude;
//   const lon = position.coords.longitude;

//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
//   const res = await fetch(url);
//   const data = await res.json();
//   updateUI(data);
// });

document.querySelector(".search button")
  .addEventListener("click", () => {
    getWeather();
  });

document.getElementById("cityInput")
  .addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      getWeather();
    }
  });

