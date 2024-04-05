const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");

search.addEventListener("click", () => {
  const APIkey = "d96842fc5db10d08fa8f7f2af3c31d30";
  const city = document.querySelector(".search-box input").value;

  if (city == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      if (cityHide.textContent == city) {
        return;
      } else {
        cityHide.textContent = city;
        container.style.height = "555px";
        container.classList.add("active");
        weatherBox.classList.add("active");
        weatherDetails.classList.add("active");
        error404.classList.remove("active");

        setTimeout(() => {
          container.classList.remove("active");
        }, 2500);

        switch (json.weather[0].main) {
          case "Clear":
            image.src = "../images/clear.png";
            break;
          case "Rain":
            image.src = "../images/rain.png";
            break;
          case "Snow":
            image.src = "../images/snow.png";
            break;
          case "Clouds":
            image.src = "../images/cloud.png";
            break;
          case "Mist":
            image.src = "../images/mist.png";
            break;
          case "Haze":
            image.src = "../images/haze.png";
            break;

          default:
            image.src = "../images/clouds.png";
        }

        temperature.innerHTML = `${json.main.temp.toFixed()} <span>°C</span>`;
        description.textContent = json.weather[0].description;
        humidity.textContent = `${json.main.humidity} %`;
        wind.textContent = `${parseInt(json.wind.speed)} Km/h`;

        console.log(temperature);
        console.log(description);
      }
    });
});
