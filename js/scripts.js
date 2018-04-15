// Script by Arry Tapiheroe
// for FreeCodeCamp

// initialise variables
var lat,
  long,
  apiLink,
  apiKey = "&appid=dfe72f1a53bf9360ccd2c62959b9cf48";

var condition,
  tCelcius,
  tFahr,
  city,
  cityName,
  country,
  id,
  iconUrl,
  image,
  imageCred,
  imageUn,
  weatherIcon;

// selection of images for weather
var imageWeather = {
  thunder: {
    url: "https://source.unsplash.com/trnTvywx2Rg/1600x900",
    credit: "Marc Wieland",
    uSplash: "https://unsplash.com/@marcwieland95"
  },
  rainy: {
    url: "https://source.unsplash.com/mYOea-xnu-k/1600x900",
    credit: "Freddie Marriage",
    uSplash: "https://unsplash.com/@fredmarriage"
  },
  cloudy: {
    url: "https://source.unsplash.com/GnSUxDu5YB4/1600x900",
    credit: "Benjamin Child",
    uSplash: "https://unsplash.com/@bchild311"
  },
  snow: {
    url: "https://source.unsplash.com/QLi7bGPxwtM/1600x900",
    credit: "Filip Gielda",
    uSplash: "https://unsplash.com/@filipovsky"
  },
  sunny: {
    url: "https://source.unsplash.com/f3s9JUjahhs/1600x900",
    credit: "Fritz Bielmeier",
    uSplash: "https://unsplash.com/@fritzbielmeier"
  },
  haze: {
    url: "https://source.unsplash.com/jYChcwbXqnI/1600x900",
    credit: "Thomas Morter Laing",
    uSplash: "https://unsplash.com/@t_g_m_l"
  },
  nasa: {
    url: "https://source.unsplash.com/yZygONrUBe8/1600x900",
    credit: "NASA",
    uSplash: "https://unsplash.com/@nasa"
  }
};

// function to select appropriate weather image
function selectImage(id) {
  if (id >= 200 && id <= 232) {
    image = imageWeather.thunder.url;
    imageCred = imageWeather.thunder.credit;
    imageUn = imageWeather.thunder.uSplash;
  } else if (id >= 300 && id <= 531) {
    image = imageWeather.rainy.url;
    imageCred = imageWeather.rainy.credit;
    imageUn = imageWeather.rainy.uSplash;
  } else if (id >= 600 && id <= 622) {
    image = imageWeather.snow.url;
    imageCred = imageWeather.snow.credit;
    imageUn = imageWeather.snow.uSplash;
  } else if (id == 721) {
    image = imageWeather.haze.url;
    imageCred = imageWeather.haze.credit;
    imageUn = imageWeather.haze.uSplash;
  } else if (id >= 801 && id <= 804) {
    image = imageWeather.cloudy.url;
    imageCred = imageWeather.cloudy.credit;
    imageUn = imageWeather.cloudy.uSplash;
  } else if (id === 800) {
    image = imageWeather.sunny.url;
    imageCred = imageWeather.sunny.credit;
    imageUn = imageWeather.sunny.uSplash;
  } else {
    image = imageWeather.nasa.url;
    imageCred = imageWeather.nasa.credit;
    imageUn = imageWeather.nasa.uSplash;
  }

  // jQuery to change background
  $("body").css("background-image", "url(" + image + ")");
}

// initialise default temperature unit
var tCelcius = true;

getCondition();

// a function to make an API call using jQuery ajax & store results
function getCondition() {
  // get current location
  $.getJSON(
    "https://cors-anywhere.herokuapp.com/http://freegeoip.net/json/",
    function(data) {
      lat = Math.round(data.latitude);
      long = Math.round(data.longitude);
      cityName = data.city;
      apiLink =
        "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        long +
        apiKey;

      getWeather(apiLink, cityName);
    }
  );
}

function getWeather(dataURL, location) {
  $.getJSON(dataURL, function(data) {
    city = location;
    country = data.sys.country;
    condition = data.weather[0]["main"];
    id = data.weather[0]["id"];
    weatherIcon = data.weather[0]["icon"];

    tCelcius = Math.round(data.main.temp - 273) + " &degC";
    tFahr = Math.round(9 / 5 * (data.main.temp - 273) + 32) + " &degF";
    iconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";

    $("#city").html(city);
    $("#country").html(country);
    $("#condition").html(condition);
    $("#tCelcius").html(tCelcius);
    $("#tFahr").html(tFahr);
    $("#icon").attr("src", iconUrl);

    // call select image function
    selectImage(id);
  });
}

$(document).ready(function() {
  $(".tempOnScreen").on("click", function() {
    $("#tCelcius").toggleClass("hideTemp");
    $("#tFahr").toggleClass("hideTemp");
  });
});
