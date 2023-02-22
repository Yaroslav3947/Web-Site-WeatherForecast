const submitButton = document.querySelector("#submitButton");
const cityInput = document.querySelector("#cityInput");
const temperatureInput = document.querySelector("#temperature");
const cityListContainer = document.querySelector("#cityListContainer");
const cityList = document.querySelector("#cityList");
const errorMessage = document.querySelector("#errorMessage");

async function getAllCities() {
    const apiKey = "769846b0b947bd962f1c2f8f261ef889";
    const response = await fetch(`http://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743&units=metric&appid=${apiKey}`);
    const data = await response.json();
    return data.list.map(city => city.name);
}

cityInput.addEventListener("input", async () => {
    const inputValue = cityInput.value;
    cityList.innerHTML = "";

    const cities = await getAllCities();

    const filteredCities = cities.filter(city => city.startsWith(inputValue));

    filteredCities.forEach(city => {
        const cityItem = document.createElement("li");
        cityItem.innerText = city;
        cityItem.addEventListener("click", () => {
            cityInput.value = city;
            cityListContainer.style.display = "none";
        });
        cityList.appendChild(cityItem);
    });

    if (filteredCities.length > 0) {
        cityListContainer.style.display = "block";
    } else {
        cityListContainer.style.display = "none";
    }
});

submitButton.addEventListener("click", async () => {
    const city = cityInput.value;
    const apiKey = "769846b0b947bd962f1c2f8f261ef889";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        const temperature = data.main.temp - 273.15;
        temperatureInput.value = `${temperature.toFixed(2)} C`;
        errorMessage.style.display = "none";
        cityInput.style.border = "1px solid #ccc";
        document.querySelector("#errorMessage").style.display = "none";
    } else {
        cityInput.classList.add("incorrectCity");
        document.querySelector("#errorMessage").style.display = "block";
        cityInput.style.border = "1px solid lightcoral";
    }
});

cityInput.addEventListener("keyup", event => {
    if (event.key === "Enter") {
        submitButton.click();
    }
});

cityInput.addEventListener("input", () => {
    errorMessage.style.display = "none";
    cityInput.style.border = "1px solid #ccc";
});

cityInput.addEventListener("keyup", event => {
    if (event.key === "Enter") {
        submitButton.click();
    }
});

document.addEventListener("click", event => {
    if (!event.target.closest("#cityListContainer")) {
        cityListContainer.style.display = "none";
    }
});

cityInput.addEventListener("input", () => {
    if (cityInput.value === "") {
        cityInput.style.border = "";
        document.querySelector("#errorMessage").style.display = "none";
    }
});

cityInput.addEventListener("input", () => {
    if (cityInput.value === "") {
        temperatureInput.value = "";
        cityInput.style.borderColor = "";
        document.querySelector("#errorMessage").style.display = "none";
    }
});



